/**
 * Most of the functions in this file are very performance-sensitive.
 */
import {Context, Parser, unimplemented} from "./common";
import {Chars} from "./chars";
import {Token, tokenDesc} from "./token";
import * as Errors from "./errors";

export const enum Seek {
    None = 0,
    SameLine = 1 << 0,
    NewLine = 1 << 1,
}

export function hasNext(parser: Parser) {
    return parser.index < parser.source.length;
}

function advance(parser: Parser) {
    parser.index++;
    parser.column++;
}

function nextChar(parser: Parser) {
    return parser.source.charCodeAt(parser.index);
}

function nextIs(parser: Parser, code: number) {
    return hasNext(parser) && nextChar(parser) === code;
}

function consumeOpt(parser: Parser, code: number) {
    if (nextIs(parser, code)) {
        advance(parser);
        return true;
    } else {
        return false;
    }
}

function advanceNewline(parser: Parser, skipLF: boolean) {
    parser.index++;
    parser.column = 0;
    parser.line++;
    if (skipLF && nextIs(parser, Chars.LineFeed)) {
        parser.index++;
    }
}

function rewind(parser: Parser) {
    parser.index--;
    parser.column--;
}

// Skip initial BOM and/or shebang.
export function skipMeta(parser: Parser) {
    if (nextIs(parser, Chars.ByteOrderMark)) advance(parser);
    if (!consumeOpt(parser, Chars.Hash)) return;
    if (!consumeOpt(parser, Chars.Exclamation)) return;
    skipToNewline(parser);
}

function skipToNewline(parser: Parser) {
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.CarriageReturn:
                advanceNewline(parser, true);
                return true;

            case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                advanceNewline(parser, false);
                return true;

            default:
                advance(parser);
        }
    }

    return false;
}

function skipBlockComment(parser: Parser): boolean {
    let result = false;

    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.Asterisk:
                advance(parser);
                if (nextIs(parser, Chars.Slash)) return result;
                break;

            case Chars.CarriageReturn:
                result = true;
                advanceNewline(parser, true);
                break;

            case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                result = true;
                advanceNewline(parser, false);
                break;

            default:
                advance(parser);
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
        switch (nextChar(parser)) {
            /* line terminators */
            case Chars.CarriageReturn:
                result |= Seek.NewLine;
                advanceNewline(parser, true);
                break;

            case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                result |= Seek.NewLine;
                advanceNewline(parser, false);
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
                advance(parser);
                break;

            /* comments */
            case Chars.Slash:
                result |= Seek.SameLine;
                advance(parser);
                if (!hasNext(parser)) return result;
                switch (nextChar(parser)) {
                    case Chars.Slash:
                        advance(parser);
                        if (skipToNewline(parser)) result |= Seek.NewLine;
                        break;

                    case Chars.Asterisk:
                        advance(parser);
                        if (skipBlockComment(parser)) result |= Seek.NewLine;
                        break;

                    default:
                        // ignore
                }
                break;

            default:
                return result;
        }
    }

    return result;
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
        let escape = false;

        loop:
        while (hasNext(parser)) {
            const code = nextChar(parser);
            switch (code) {
                case Chars.Backslash:
                    escape = true;
                    break;

                case Chars.CarriageReturn:
                    if (!escape) break loop;
                    escape = false;
                    advanceNewline(parser, true);
                    break;

                case Chars.LineFeed: case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    if (!escape) break loop;
                    escape = false;
                    advanceNewline(parser, false);
                    break;

                case Chars.DoubleQuote: case Chars.SingleQuote:
                    if (!escape && code === quote) return false;
                    // falls through

                default:
                    escape = false;
                    advance(parser);
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
    const code = nextChar(parser);

    switch (code) {
        // `!`, `!=`, `!==`
        case Chars.Exclamation:
            advance(parser);
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
            advance(parser);
            parser.tokenValue = scanString(parser, context, Chars.DoubleQuote);
            return Token.StringLiteral;

        // `%`, `%=`
        case Chars.Percent:
            advance(parser);
            if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.ModuloAssign;
            } else {
                return Token.Modulo;
            }

        // `&`, `&&`, `&=`
        case Chars.Ampersand:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.Ampersand) {
                    advance(parser);
                    return Token.LogicalAnd;
                } else if (code === Chars.EqualSign) {
                    advance(parser);
                    return Token.BitwiseAndAssign;
                }
            }

            return Token.BitwiseAnd;

        // `'string'`
        case Chars.SingleQuote:
            advance(parser);
            parser.tokenValue = scanString(parser, context, Chars.SingleQuote);
            return Token.StringLiteral;

        // `(`
        case Chars.LeftParen:
            advance(parser);
            return Token.LeftParen;

        // `)`
        case Chars.RightParen:
            advance(parser);
            return Token.RightParen;

        // `*`, `**`, `*=`, `**=`
        case Chars.Asterisk:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.Asterisk) {
                    advance(parser);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.ExponentiateAssign;
                    } else {
                        return Token.Exponentiate;
                    }
                } else if (code === Chars.EqualSign) {
                    advance(parser);
                    return Token.MultiplyAssign;
                }
            }

            return Token.Multiply;

        // `+`, `++`, `+=`
        case Chars.Plus:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.Plus) {
                    advance(parser);
                    return Token.Increment;
                } else if (code === Chars.EqualSign) {
                    advance(parser);
                    return Token.AddAssign;
                }
            }

            return Token.Add;

        // `,`
        case Chars.Comma:
            advance(parser);
            return Token.Comma;

        // `-`, `--`, `-=`
        case Chars.Hyphen:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.Hyphen) {
                    advance(parser);
                    return Token.Decrement;
                } else if (code === Chars.EqualSign) {
                    advance(parser);
                    return Token.SubtractAssign;
                }
            }

            return Token.Subtract;

        // `.`, `...`, `.123` (numeric literal)
        case Chars.Period:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.Period) {
                    advance(parser);
                    if (consumeOpt(parser, Chars.Period)) {
                        return Token.Ellipsis;
                    }
                    parser.index -= 2;
                    parser.column -= 2;
                } else if (code >= Chars.Zero && code <= Chars.Nine) {
                    // Rewind the initial token.
                    rewind(parser);
                    parser.tokenValue = scanNumeric(parser, context);
                    return Token.NumericLiteral;
                }
            }

            return Token.Period;

        // `/`, `/=`
        case Chars.Slash:
            advance(parser);
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
            advance(parser);
            return Token.Colon;

        // `;`
        case Chars.Semicolon:
            advance(parser);
            return Token.Semicolon;

        // `<`, `<=`, `<<`, `<<=`
        case Chars.LessThan:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.LessThan) {
                    advance(parser);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.ShiftLeftAssign;
                    } else {
                        return Token.ShiftLeft;
                    }
                } else if (code === Chars.EqualSign) {
                    advance(parser);
                    return Token.LessThanOrEqual;
                }
            }

            return Token.LessThan;

        // `=`, `==`, `===`, `=>`
        case Chars.EqualSign:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.EqualSign) {
                    advance(parser);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.StrictEqual;
                    } else {
                        return Token.LooseEqual;
                    }
                } else if (code === Chars.LessThan) {
                    advance(parser);
                    return Token.Arrow;
                }
            }

            return Token.Assign;

        // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
        case Chars.GreaterThan:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.GreaterThan) {
                    advance(parser);

                    if (hasNext(parser)) {
                        const code = nextChar(parser);

                        if (code === Chars.GreaterThan) {
                            advance(parser);
                            if (consumeOpt(parser, Chars.EqualSign)) {
                                return Token.LogicalShiftRightAssign;
                            } else {
                                return Token.LogicalShiftRight;
                            }
                        } else if (code === Chars.EqualSign) {
                            advance(parser);
                            return Token.ShiftRightAssign;
                        }
                    }

                    return Token.ShiftRight;
                } else if (code === Chars.EqualSign) {
                    advance(parser);
                    return Token.GreaterThanOrEqual;
                }
            }

            return Token.GreaterThan;

        // `?`
        case Chars.QuestionMark:
            advance(parser);
            return Token.QuestionMark;

        // `[`
        case Chars.LeftBracket:
            advance(parser);
            return Token.LeftBracket;

        // `]`
        case Chars.RightBracket:
            advance(parser);
            return Token.RightBracket;

        // `^`, `^=`
        case Chars.Caret:
            advance(parser);
            if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.BitwiseXorAssign;
            } else {
                return Token.BitwiseXor;
            }

        // `\`
        case Chars.Backtick:
            advance(parser);
            if (scanTemplateStart(parser, context)) {
                return Token.TemplateTail;
            } else {
                return Token.TemplateCont;
            }

        case Chars.LeftBrace:
            advance(parser);
            return Token.LeftBrace;

        // `|`, `||`, `|=`
        case Chars.VerticalBar:
            advance(parser);
            if (hasNext(parser)) {
                const code = nextChar(parser);

                if (code === Chars.VerticalBar) {
                    advance(parser);
                    return Token.LogicalOr;
                } else if (code === Chars.EqualSign) {
                    advance(parser);
                    return Token.BitwiseOrAssign;
                }
            }

            return Token.BitwiseOr;

        case Chars.RightBrace:
            advance(parser);
            return Token.RightBrace;

        case Chars.Tilde:
            advance(parser);
            return Token.Complement;

        default:
            if (code <= Chars.Zero && code >= Chars.Nine) {
                parser.tokenValue = scanNumeric(parser, context);
                return Token.NumericLiteral;
            } else {
                return scanMaybeIdentifier(parser, context);
            }
    }
}

export function consumeSemicolon(parser: Parser, context: Context, result: Seek) {
    if (!(result & Seek.NewLine) || !hasNext(parser)) return;
    const code = nextChar(parser);

    if (code === Chars.Semicolon || code === Chars.RightBrace) {
        advance(parser);
    } else {
        Errors.report(
            parser.index, parser.line, parser.column,
            Errors.unexpectedToken(tokenDesc(scan(parser, context))),
        );
    }
}
