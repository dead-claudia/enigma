import {Parser, Context, unimplemented} from "../common";
import {Token} from "../token";
import {Chars} from "../chars";
import {hasNext, nextChar, advance, consumeOpt, rewindOne} from "./common";

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
                    rewindOne(parser);
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
