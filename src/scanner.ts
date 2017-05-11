/**
 * Most of the functions in this file are very performance-sensitive.
 */
import {Context, Parser, unimplemented} from "./common";
import {Chars} from "./chars";
import {Token, tokenDesc} from "./token";
import * as Errors from "./errors";
import {isIDStart} from "./unicode-generated";

export const enum Seek {
    None = 0,
    SameLine = 1 << 0,
    NewLine = 1 << 1,
}

export function hasNext(parser: Parser) {
    return parser.index < parser.source.length;
}

function advance(parser: Parser, ch: number) {
    parser.index++;
    parser.column++;
    if (ch & 0x10000) {
        parser.index++;
        parser.column++;
    }
}

// This also converts Unicode pairs
function nextChar(parser: Parser) {
    const hi = parser.source.charCodeAt(parser.index);

    if (hi < 0xd800 || hi > 0xdbff) return hi;
    const succ = parser.index + 1;
    if (succ === parser.source.length) return hi;
    const lo = parser.source.charCodeAt(succ);

    if (lo < 0xdc00 || lo > 0xdfff) return hi;
    return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
}

function consumeOpt(parser: Parser, code: number) {
    let {index} = parser;
    const hi = parser.source.charCodeAt(index++);

    if (hi >= 0xd800 && hi <= 0xdbff && index < parser.source.length) {
        const lo = parser.source.charCodeAt(index++);

        if (lo >= 0xdc00 && lo <= 0xdfff) {
            const codePoint = (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;

            if (codePoint !== code) return false;
            parser.index = index;
            parser.column += 2;
            return false;
        }
    }

    if (hi !== code) return false;
    parser.index = hi;
    parser.column++;
    return false;
}

function advanceNewline(parser: Parser, ch: number) {
    parser.index++;
    parser.column = 0;
    parser.line++;
    if (ch === Chars.CarriageReturn && hasNext(parser) &&
            parser.source.charCodeAt(parser.index) === Chars.LineFeed) {
        parser.index++;
    }
}

function rewind(parser: Parser, ch: number) {
    parser.index--;
    parser.column--;
    if (ch & 0x10000) {
        parser.index--;
        parser.column--;
    }
}

// Skip initial BOM and/or shebang.
export function skipMeta(parser: Parser) {
    if (!hasNext(parser)) return;
    if (parser.source.charCodeAt(parser.index) === Chars.ByteOrderMark) {
        advance(parser, Chars.ByteOrderMark);
    }
    if (!consumeOpt(parser, Chars.Hash)) return;
    if (!consumeOpt(parser, Chars.Exclamation)) return;
    skipToNewline(parser);
}

function skipToNewline(parser: Parser) {
    while (hasNext(parser)) {
        const ch = nextChar(parser);
        switch (ch) {
            case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                advanceNewline(parser, ch);
                return true;

            default:
                advance(parser, ch);
        }
    }

    return false;
}

function skipBlockComment(parser: Parser): boolean {
    let result = false;

    while (hasNext(parser)) {
        const ch = nextChar(parser);
        switch (ch) {
            case Chars.Asterisk:
                advance(parser, ch);
                if (consumeOpt(parser, Chars.Slash)) return result;
                break;

            case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                result = true;
                advanceNewline(parser, ch);
                break;

            default:
                advance(parser, ch);
        }
    }

    return Errors.report(
        parser.index,
        parser.line,
        parser.column,
        Errors.unterminatedComment(),
    );
}

// This is somewhat monolithic, and the main loop handles non-comment whitespace.
// TODO: add HTML comment support (script code only)
export function seek(parser: Parser): Seek {
    let result = Seek.None;

    while (hasNext(parser)) {
        const ch = nextChar(parser);
        switch (ch) {
            /* line terminators */
            case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                result |= Seek.NewLine;
                advanceNewline(parser, ch);
                break;

            /* general whitespace */
            case Chars.Tab: case Chars.VerticalTab: case Chars.FormFeed: case Chars.Space:
            case Chars.NonBreakingSpace: case Chars.Ogham: case Chars.EnQuad: case Chars.EmQuad:
            case Chars.EnSpace: case Chars.EmSpace: case Chars.ThreePerEmSpace:
            case Chars.FourPerEmSpace: case Chars.SixPerEmSpace: case Chars.FigureSpace:
            case Chars.PunctuationSpace: case Chars.ThinSpace: case Chars.HairSpace:
            case Chars.NarrowNoBreakSpace: case Chars.MathematicalSpace:
            case Chars.IdeographicSpace: case Chars.ZeroWidthNoBreakSpace:
                result |= Seek.SameLine;
                advance(parser, ch);
                break;

            /* comments */
            case Chars.Slash: {
                result |= Seek.SameLine;
                advance(parser, ch);
                if (!hasNext(parser)) return result;
                const next = nextChar(parser);
                if (next === Chars.Slash) {
                    advance(parser, next);
                    if (skipToNewline(parser)) result |= Seek.NewLine;
                } else if (next === Chars.Asterisk) {
                    advance(parser, next);
                    if (skipBlockComment(parser)) result |= Seek.NewLine;
                }
                break;
            }

            default:
                return result;
        }
    }

    return result;
}

export const enum DirectiveEscapeState {
    None, Any,
    LegacyOctal0,
    LegacyOctal1,
    Hex0,
    Hex1,
    Hex2,
    Hex3,
    UCS2,
    Unicode,
}

// This is also intentionally monolithic, since it's quickly preparsing for a "use strict"
// directive.
// TODO: skip Unicode/ASCII escapes
export function scanDirective(parser: Parser): boolean | void {
    const {index: start, line, column} = parser;
    let index = start;
    const raw = "";

    if (index === parser.source.length) return false;
    const quote = parser.source.charCodeAt(index++);
    if (quote !== Chars.SingleQuote && quote !== Chars.DoubleQuote) return false;

    if (index + 11 < parser.source.length &&
            parser.source.charCodeAt(index++) === Chars.LowerU &&
            parser.source.charCodeAt(index++) === Chars.LowerS &&
            parser.source.charCodeAt(index++) === Chars.LowerE &&
            parser.source.charCodeAt(index++) === Chars.Space &&
            parser.source.charCodeAt(index++) === Chars.LowerS &&
            parser.source.charCodeAt(index++) === Chars.LowerT &&
            parser.source.charCodeAt(index++) === Chars.LowerR &&
            parser.source.charCodeAt(index++) === Chars.LowerI &&
            parser.source.charCodeAt(index++) === Chars.LowerC &&
            parser.source.charCodeAt(index++) === Chars.LowerT &&
            parser.source.charCodeAt(index++) === quote) {
        parser.index = index;
        parser.column += 12; // length of decl
        return true;
    } else {
        let escape = DirectiveEscapeState.None;

        loop:
        while (hasNext(parser)) {
            const ch = nextChar(parser);
            switch (ch) {
                case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    if (escape !== DirectiveEscapeState.LegacyOctal0 &&
                            escape !== DirectiveEscapeState.Any) {
                        break loop;
                    }
                    escape = DirectiveEscapeState.None;
                    advanceNewline(parser, ch);
                    break;

                case Chars.Zero: case Chars.One: case Chars.Two: case Chars.Three:
                    advance(parser, ch);
                    if (escape === DirectiveEscapeState.Any) {
                        escape = DirectiveEscapeState.LegacyOctal1;
                    } else if (escape === DirectiveEscapeState.LegacyOctal1) {
                        escape = DirectiveEscapeState.LegacyOctal0;
                    } else if (escape === DirectiveEscapeState.LegacyOctal0) {
                        escape = DirectiveEscapeState.None;
                    }
                    break;

                case Chars.Four: case Chars.Five: case Chars.Six: case Chars.Seven:
                    advance(parser, ch);
                    if (escape === DirectiveEscapeState.Any) {
                        escape = DirectiveEscapeState.LegacyOctal0;
                    } else if (escape === DirectiveEscapeState.LegacyOctal0) {
                        escape = DirectiveEscapeState.None;
                    }
                    break;

                case Chars.DoubleQuote: case Chars.SingleQuote:
                    if (escape !== DirectiveEscapeState.None && ch === quote) return false;
                    escape = DirectiveEscapeState.None;
                    advance(parser, ch);
                    break;

                case Chars.Backslash:
                    advance(parser, ch);
                    if (escape === DirectiveEscapeState.Any) {
                        escape = DirectiveEscapeState.None;
                    } else {
                        escape = DirectiveEscapeState.Any;
                    }
                    break;

                case Chars.UpperX: case Chars.LowerX:
                    // TODO

                default:
                    escape = DirectiveEscapeState.None;
                    advance(parser, ch);
            }
        }

        return Errors.report(start, line, column, Errors.unterminatedTokenString());
    }
}

function scanString(parser: Parser, context: Context, quote: number): string {
    // TODO
    return unimplemented();
}

function scanRegExp(parser: Parser, context: Context): RegExp {
    // TODO
    return unimplemented();
}

function scanTemplateStart(parser: Parser, context: Context): boolean {
    // TODO
    return unimplemented();
}

function scanNumeric(parser: Parser, context: Context): number {
    // TODO
    return unimplemented();
}

function scanMaybeIdentifier(parser: Parser, context: Context): Token {
    // TODO
    return unimplemented();
}

export function scan(parser: Parser, context: Context): Token {
    if (!hasNext(parser)) return Token.EndOfSource;
    const ch = nextChar(parser);

    switch (ch) {
        // `!`, `!=`, `!==`
        case Chars.Exclamation:
            advance(parser, ch);
            if (consumeOpt(parser, Chars.EqualSign)) {
                if (consumeOpt(parser, Chars.EqualSign)) {
                    return Token.StrictNotEqual;
                } else {
                    return Token.LooseNotEqual;
                }
            } else {
                return Token.Negate;
            }

        // `"string"`
        case Chars.DoubleQuote:
            advance(parser, ch);
            parser.tokenValue = scanString(parser, context, Chars.DoubleQuote);
            return Token.StringLiteral;

        // `%`, `%=`
        case Chars.Percent:
            advance(parser, ch);
            if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.ModuloAssign;
            } else {
                return Token.Modulo;
            }

        // `&`, `&&`, `&=`
        case Chars.Ampersand:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Ampersand) {
                    advance(parser, next);
                    return Token.LogicalAnd;
                } else if (next === Chars.EqualSign) {
                    advance(parser, next);
                    return Token.BitwiseAndAssign;
                }
            }

            return Token.BitwiseAnd;

        // `'string'`
        case Chars.SingleQuote:
            advance(parser, ch);
            parser.tokenValue = scanString(parser, context, Chars.SingleQuote);
            return Token.StringLiteral;

        // `(`
        case Chars.LeftParen:
            advance(parser, ch);
            return Token.LeftParen;

        // `)`
        case Chars.RightParen:
            advance(parser, ch);
            return Token.RightParen;

        // `*`, `**`, `*=`, `**=`
        case Chars.Asterisk:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Asterisk) {
                    advance(parser, next);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.ExponentiateAssign;
                    } else {
                        return Token.Exponentiate;
                    }
                } else if (next === Chars.EqualSign) {
                    advance(parser, next);
                    return Token.MultiplyAssign;
                }
            }

            return Token.Multiply;

        // `+`, `++`, `+=`
        case Chars.Plus:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Plus) {
                    advance(parser, next);
                    return Token.Increment;
                } else if (next === Chars.EqualSign) {
                    advance(parser, next);
                    return Token.AddAssign;
                }
            }

            return Token.Add;

        // `,`
        case Chars.Comma:
            advance(parser, ch);
            return Token.Comma;

        // `-`, `--`, `-=`
        case Chars.Hyphen:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Hyphen) {
                    advance(parser, next);
                    return Token.Decrement;
                } else if (next === Chars.EqualSign) {
                    advance(parser, next);
                    return Token.SubtractAssign;
                }
            }

            return Token.Subtract;

        // `.`, `...`, `.123` (numeric literal)
        case Chars.Period:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Period) {
                    advance(parser, next);
                    if (consumeOpt(parser, Chars.Period)) {
                        return Token.Ellipsis;
                    }
                    parser.index -= 2;
                    parser.column -= 2;
                } else if (next >= Chars.Zero && next <= Chars.Nine) {
                    // Rewind the initial token.
                    rewind(parser, ch);
                    parser.tokenValue = scanNumeric(parser, context);
                    return Token.NumericLiteral;
                }
            }

            return Token.Period;

        // `/`, `/=`
        case Chars.Slash:
            advance(parser, ch);
            if (context & Context.Expression) {
                parser.tokenValue = scanRegExp(parser, context);
                return Token.RegularExpression;
            } else if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.DivideAssign;
            } else {
                return Token.Divide;
            }

        // `:`
        case Chars.Colon:
            advance(parser, ch);
            return Token.Colon;

        // `;`
        case Chars.Semicolon:
            advance(parser, ch);
            return Token.Semicolon;

        // `<`, `<=`, `<<`, `<<=`
        case Chars.LessThan:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.LessThan) {
                    advance(parser, next);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.ShiftLeftAssign;
                    } else {
                        return Token.ShiftLeft;
                    }
                } else if (next === Chars.EqualSign) {
                    advance(parser, next);
                    return Token.LessThanOrEqual;
                }
            }

            return Token.LessThan;

        // `=`, `==`, `===`, `=>`
        case Chars.EqualSign:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.EqualSign) {
                    advance(parser, next);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.StrictEqual;
                    } else {
                        return Token.LooseEqual;
                    }
                } else if (next === Chars.LessThan) {
                    advance(parser, next);
                    return Token.Arrow;
                }
            }

            return Token.Assign;

        // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
        case Chars.GreaterThan:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.GreaterThan) {
                    advance(parser, next);

                    if (hasNext(parser)) {
                        const next = nextChar(parser);

                        if (next === Chars.GreaterThan) {
                            advance(parser, next);
                            if (consumeOpt(parser, Chars.EqualSign)) {
                                return Token.LogicalShiftRightAssign;
                            } else {
                                return Token.LogicalShiftRight;
                            }
                        } else if (next === Chars.EqualSign) {
                            advance(parser, next);
                            return Token.ShiftRightAssign;
                        }
                    }

                    return Token.ShiftRight;
                } else if (next === Chars.EqualSign) {
                    advance(parser, next);
                    return Token.GreaterThanOrEqual;
                }
            }

            return Token.GreaterThan;

        // `?`
        case Chars.QuestionMark:
            advance(parser, ch);
            return Token.QuestionMark;

        // `[`
        case Chars.LeftBracket:
            advance(parser, ch);
            return Token.LeftBracket;

        // `]`
        case Chars.RightBracket:
            advance(parser, ch);
            return Token.RightBracket;

        // `^`, `^=`
        case Chars.Caret:
            advance(parser, ch);
            if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.BitwiseXorAssign;
            } else {
                return Token.BitwiseXor;
            }

        // `\`
        case Chars.Backtick:
            advance(parser, ch);
            if (scanTemplateStart(parser, context)) {
                return Token.TemplateTail;
            } else {
                return Token.TemplateCont;
            }

        case Chars.LeftBrace:
            advance(parser, ch);
            return Token.LeftBrace;

        // `|`, `||`, `|=`
        case Chars.VerticalBar:
            advance(parser, ch);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.VerticalBar) {
                    advance(parser, next);
                    return Token.LogicalOr;
                } else if (next === Chars.EqualSign) {
                    advance(parser, next);
                    return Token.BitwiseOrAssign;
                }
            }

            return Token.BitwiseOr;

        case Chars.RightBrace:
            advance(parser, ch);
            return Token.RightBrace;

        case Chars.Tilde:
            advance(parser, ch);
            return Token.Complement;

        default:
            if (ch <= Chars.Zero && ch >= Chars.Nine) {
                parser.tokenValue = scanNumeric(parser, context);
                return Token.NumericLiteral;
            } else {
                return scanMaybeIdentifier(parser, context);
            }
    }
}

// This only inserts semicolons before quotes (which could mean more directives), because the parser
// is reset anyways.
export function consumeDirectiveSemicolon(parser: Parser, context: Context): boolean {
    const result = seek(parser);

    if (!hasNext(parser)) return false;
    const ch = nextChar(parser);
    switch (ch) {
        case Chars.Semicolon:
            advance(parser, ch);
            return true;

        case Chars.SingleQuote: case Chars.DoubleQuote:
            if (result & Seek.NewLine) return true;
            // falls through

        default:
            return false;
    }
}

export function consumeSemicolon(parser: Parser, context: Context) {
    const result = seek(parser);

    if (!hasNext(parser)) return;
    const ch = nextChar(parser);

    if (ch === Chars.Semicolon || ch === Chars.RightBrace) {
        advance(parser, ch);
    } else if (!(result & Seek.NewLine)) {
        Errors.report(
            parser.index, parser.line, parser.column,
            Errors.unexpectedToken(tokenDesc(scan(parser, context))),
        );
    }
}
