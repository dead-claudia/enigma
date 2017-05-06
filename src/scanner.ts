import {Context, Parser, unimplemented} from "./common";
import {Chars} from "./chars";
import {Token, tokenDesc} from "./token";
import * as Errors from "./errors";

export const enum Seek {
    None = 0,
    SameLine = 1 << 0,
    NewLine = 1 << 1,
}

// This is intentionally monolithic, and fairly ugly.
export function seek(parser: Parser): Seek {
    let {index, line, column} = parser;
    let result = Seek.None;

    all:
    while (index < parser.source.length) {
        switch (parser.source.charCodeAt(index++)) {
            /* line terminators */
            case Chars.CarriageReturn:
                if (index < parser.source.length &&
                        parser.source.charCodeAt(index) === Chars.LineFeed) {
                    index++;
                }
                // falls through

            case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                result |= Seek.NewLine;
                line++;
                column = 0;
                index++;
                break;

            /* general whitespace */
            case Chars.Tab: case Chars.VerticalTab: case Chars.FormFeed: case Chars.Space:
            case Chars.NonBreakingSpace: case Chars.Ogham: case Chars.EnQuad: case Chars.EmQuad:
            case Chars.EnSpace: case Chars.EmSpace: case Chars.ThreePerEmSpace:
            case Chars.FourPerEmSpace: case Chars.SixPerEmSpace: case Chars.FigureSpace:
            case Chars.PunctuationSpace: case Chars.ThinSpace: case Chars.HairSpace:
            case Chars.NarrowNoBreakSpace: case Chars.MathematicalSpace:
            case Chars.IdeographicSpace: case Chars.ZeroWidthNoBreakSpace:
                column++;
                result |= Seek.SameLine;
                break;

            /* comments */
            case Chars.Slash:
                column++;
                result |= Seek.SameLine;
                if (index < parser.source.length) {
                    let ch = parser.source.charCodeAt(index);

                    if (ch === Chars.Slash) {
                        while (index < parser.source.length &&
                                ch !== Chars.CarriageReturn &&
                                ch !== Chars.LineFeed &&
                                ch !== Chars.ParagraphSeparator &&
                                ch !== Chars.LineSeparator) {
                            ch = parser.source.charCodeAt(index++);
                        }
                        result |= Seek.NewLine;
                        line++;
                        column = 0;
                        break;
                    } else if (ch === Chars.Asterisk) {
                        const terminated = false;

                        while (index < parser.source.length) {
                            switch (parser.source.charCodeAt(index)) {
                                case Chars.Asterisk:
                                    if (index < parser.source.length &&
                                            parser.source.charCodeAt(index) !== Chars.Slash) {
                                        index++;
                                        column++;
                                        break;
                                    }
                                    continue all;

                                case Chars.CarriageReturn:
                                    if (index < parser.source.length &&
                                            parser.source.charCodeAt(index) === Chars.LineFeed) {
                                        index++;
                                    }
                                    // falls through

                                case Chars.LineFeed:
                                case Chars.LineSeparator:
                                case Chars.ParagraphSeparator:
                                    result |= Seek.NewLine;
                                    line++;
                                    column = 0;
                                    index++;
                                    break;

                                default:
                                    column++;
                                    index++;
                            }
                        }

                        return Errors.report(index, line, column, Errors.unterminatedComment());
                    }
                }
                // falls through

            default:
                index--;
                break all;
        }
    }

    parser.index = index;
    parser.line = line;
    parser.column = column;
    return result;
}

// This is also intentionally monolithic, since it's quickly preparsing for a
// "use strict" directive.
export function scanDirective(parser: Parser): boolean | void {
    let {index, line, column} = parser;
    const start = index;
    const raw = "";

    if (index === parser.source.length) return false;
    const quote = parser.source.charCodeAt(index++);

    if (quote !== Chars.SingleQuote && quote !== Chars.DoubleQuote) {
        return false;
    }

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
        while (index < parser.source.length) {
            const code = parser.source.charCodeAt(index);
            switch (code) {
                case Chars.Backslash:
                    escape = true;
                    break;

                case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    if (escape) {
                        escape = false;
                        line++;
                        column = 0;
                        break;
                    } else {
                        break loop;
                    }

                case Chars.DoubleQuote: case Chars.SingleQuote:
                    if (!escape && code === quote) {
                        parser.line = line;
                        parser.column = column;
                        parser.index = index;
                        return false;
                    }
                    column++;
                    break;

                default:
                    escape = false;
                    column++;
            }

            index++;
        }

        return Errors.report(start, line, column, Errors.unterminatedTokenString());
    }
}

export function hasNext(parser: Parser) {
    return parser.index < parser.source.length;
}

function advance(parser: Parser) {
    parser.index++;
    parser.column++;
}

function rewind(parser: Parser) {
    parser.index--;
    parser.column--;
}

function nextIs(parser: Parser, ch: number) {
    return hasNext(parser) && parser.source.charCodeAt(parser.index) === ch;
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
    const ch = parser.source.charCodeAt(parser.index);

    switch (ch) {
        // `!`, `!=`, `!==`
        case Chars.Exclamation:
            advance(parser);
            if (nextIs(parser, Chars.EqualSign)) {
                advance(parser);
                if (nextIs(parser, Chars.EqualSign)) {
                    advance(parser);
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
            if (nextIs(parser, Chars.EqualSign)) {
                advance(parser);
                return Token.ModuloAssign;
            } else {
                return Token.Modulo;
            }

        // `&`, `&&`, `&=`
        case Chars.Ampersand:
            advance(parser);
            if (hasNext(parser)) {
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.Ampersand) {
                    advance(parser);
                    return Token.LogicalAnd;
                } else if (ch === Chars.EqualSign) {
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
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.Asterisk) {
                    advance(parser);
                    if (nextIs(parser, Chars.EqualSign)) {
                        advance(parser);
                        return Token.ExponentiateAssign;
                    }
                    return Token.Exponentiate;
                } else if (ch === Chars.EqualSign) {
                    advance(parser);
                    return Token.MultiplyAssign;
                }
            }

            return Token.Multiply;

        // `+`, `++`, `+=`
        case Chars.Plus:
            advance(parser);
            if (hasNext(parser)) {
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.Plus) {
                    advance(parser);
                    return Token.Increment;
                } else if (ch === Chars.EqualSign) {
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
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.Hyphen) {
                    advance(parser);
                    return Token.Decrement;
                } else if (ch === Chars.EqualSign) {
                    advance(parser);
                    return Token.SubtractAssign;
                }
            }

            return Token.Subtract;

        // `.`, `...`, `.123` (numeric literal)
        case Chars.Period:
            advance(parser);
            if (hasNext(parser)) {
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.Period) {
                    advance(parser);
                    if (nextIs(parser, Chars.Period)) {
                        advance(parser);
                        return Token.Ellipsis;
                    }
                    parser.index -= 2;
                    parser.column -= 2;
                } else if (ch >= Chars.Zero && ch <= Chars.Nine) {
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
            } else if (nextIs(parser, Chars.EqualSign)) {
                advance(parser);
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
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.LessThan) {
                    advance(parser);
                    if (nextIs(parser, Chars.EqualSign)) {
                        advance(parser);
                        return Token.ShiftLeftAssign;
                    } else {
                        return Token.ShiftLeft;
                    }
                } else if (ch === Chars.EqualSign) {
                    advance(parser);
                    return Token.LessThanOrEqual;
                }
            }

            return Token.LessThan;

        // `=`, `==`, `===`, `=>`
        case Chars.EqualSign:
            advance(parser);
            if (hasNext(parser)) {
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.EqualSign) {
                    advance(parser);
                    if (nextIs(parser, Chars.EqualSign)) {
                        advance(parser);
                        return Token.StrictEqual;
                    } else {
                        return Token.LooseEqual;
                    }
                } else if (ch === Chars.LessThan) {
                    advance(parser);
                    return Token.Arrow;
                }
            }

            return Token.Assign;

        // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
        case Chars.GreaterThan:
            advance(parser);
            if (hasNext(parser)) {
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.GreaterThan) {
                    advance(parser);

                    if (hasNext(parser)) {
                        const ch = parser.source.charCodeAt(parser.index);

                        if (ch === Chars.GreaterThan) {
                            advance(parser);
                            if (nextIs(parser, Chars.EqualSign)) {
                                advance(parser);
                                return Token.LogicalShiftRightAssign;
                            } else {
                                return Token.LogicalShiftRight;
                            }
                        } else if (ch === Chars.EqualSign) {
                            advance(parser);
                            return Token.ShiftRightAssign;
                        }
                    }

                    return Token.ShiftRight;
                } else if (ch === Chars.EqualSign) {
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
            if (nextIs(parser, Chars.EqualSign)) {
                advance(parser);
                return Token.BitwiseXorAssign;
            }

            return Token.BitwiseXor;

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
                const ch = parser.source.charCodeAt(parser.index);

                if (ch === Chars.VerticalBar) {
                    advance(parser);
                    return Token.LogicalOr;
                } else if (ch === Chars.EqualSign) {
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
            if (ch <= Chars.Zero && ch >= Chars.Nine) {
                parser.tokenValue = scanNumeric(parser, context);
                return Token.NumericLiteral;
            } else {
                return scanMaybeIdentifier(parser, context);
            }
    }
}

export function consumeSemicolon(parser: Parser, context: Context) {
    if (parser.index === parser.source.length) return;
    const ch = parser.source.charCodeAt(parser.index);

    if (ch === Chars.Semicolon || ch === Chars.RightBrace) {
        advance(parser);
    } else {
        Errors.report(
            parser.index, parser.line, parser.column,
            Errors.unexpectedToken(tokenDesc(scan(parser, context))),
        );
    }
}
