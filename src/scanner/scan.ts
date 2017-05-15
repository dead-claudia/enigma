import {Parser, Context} from "../common";
import {Token} from "../token";
import {Chars} from "../chars";
import {advanceOne, consumeOpt, hasNext, nextChar, rewindOne} from "./common";
import {scanString, scanTemplate} from "./string";
import {scanRegExp} from "./regexp";
import {scanNumeric} from "./numeric";
import {scanMaybeIdentifier} from "./identifier";

/**
 * Scan for a single token. You must seek first, because this assumes the current pointer is
 * pointing to either the start of a token or the end of the source.
 */
export function scan(parser: Parser, context: Context): Token {
    if (!hasNext(parser)) return Token.EndOfSource;
    switch (nextChar(parser)) {
        // `!`, `!=`, `!==`
        case Chars.Exclamation:
            advanceOne(parser);
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
            scanString(parser, context, Chars.DoubleQuote);
            return Token.StringLiteral;

        // `%`, `%=`
        case Chars.Percent:
            advanceOne(parser);
            if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.ModuloAssign;
            } else {
                return Token.Modulo;
            }

        // `&`, `&&`, `&=`
        case Chars.Ampersand:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Ampersand) {
                    advanceOne(parser);
                    return Token.LogicalAnd;
                } else if (next === Chars.EqualSign) {
                    advanceOne(parser);
                    return Token.BitwiseAndAssign;
                }
            }

            return Token.BitwiseAnd;

        // `'string'`
        case Chars.SingleQuote:
            scanString(parser, context, Chars.SingleQuote);
            return Token.StringLiteral;

        // `(`
        case Chars.LeftParen:
            advanceOne(parser);
            return Token.LeftParen;

        // `)`
        case Chars.RightParen:
            advanceOne(parser);
            return Token.RightParen;

        // `*`, `**`, `*=`, `**=`
        case Chars.Asterisk:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Asterisk) {
                    advanceOne(parser);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.ExponentiateAssign;
                    } else {
                        return Token.Exponentiate;
                    }
                } else if (next === Chars.EqualSign) {
                    advanceOne(parser);
                    return Token.MultiplyAssign;
                }
            }

            return Token.Multiply;

        // `+`, `++`, `+=`
        case Chars.Plus:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Plus) {
                    advanceOne(parser);
                    return Token.Increment;
                } else if (next === Chars.EqualSign) {
                    advanceOne(parser);
                    return Token.AddAssign;
                }
            }

            return Token.Add;

        // `,`
        case Chars.Comma:
            advanceOne(parser);
            return Token.Comma;

        // `-`, `--`, `-=`
        case Chars.Hyphen:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Hyphen) {
                    advanceOne(parser);
                    return Token.Decrement;
                } else if (next === Chars.EqualSign) {
                    advanceOne(parser);
                    return Token.SubtractAssign;
                }
            }

            return Token.Subtract;

        // `.`, `...`, `.123` (numeric literal)
        case Chars.Period:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.Period) {
                    advanceOne(parser);
                    if (consumeOpt(parser, Chars.Period)) return Token.Ellipsis;
                    parser.index -= 2;
                    parser.column -= 2;
                } else if (next >= Chars.Zero && next <= Chars.Nine) {
                    // Rewind the initial token.
                    rewindOne(parser);
                    scanNumeric(parser, context);
                    return Token.NumericLiteral;
                }
            }

            return Token.Period;

        // `/`, `/=`
        case Chars.Slash:
            advanceOne(parser);
            if (context & Context.Expression) {
                scanRegExp(parser, context);
                return Token.RegularExpression;
            } else if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.DivideAssign;
            } else {
                return Token.Divide;
            }

        // `0`-`9`
        case Chars.Zero: case Chars.One: case Chars.Two: case Chars.Three: case Chars.Four:
        case Chars.Five: case Chars.Six: case Chars.Seven: case Chars.Eight: case Chars.Nine:
            scanNumeric(parser, context);
            return Token.NumericLiteral;

        // `:`
        case Chars.Colon:
            advanceOne(parser);
            return Token.Colon;

        // `;`
        case Chars.Semicolon:
            advanceOne(parser);
            return Token.Semicolon;

        // `<`, `<=`, `<<`, `<<=`
        case Chars.LessThan:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.LessThan) {
                    advanceOne(parser);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.ShiftLeftAssign;
                    } else {
                        return Token.ShiftLeft;
                    }
                } else if (next === Chars.EqualSign) {
                    advanceOne(parser);
                    return Token.LessThanOrEqual;
                }
            }

            return Token.LessThan;

        // `=`, `==`, `===`, `=>`
        case Chars.EqualSign:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.EqualSign) {
                    advanceOne(parser);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.StrictEqual;
                    } else {
                        return Token.LooseEqual;
                    }
                } else if (next === Chars.LessThan) {
                    advanceOne(parser);
                    return Token.Arrow;
                }
            }

            return Token.Assign;

        // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
        case Chars.GreaterThan:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.GreaterThan) {
                    advanceOne(parser);

                    if (hasNext(parser)) {
                        const next = nextChar(parser);

                        if (next === Chars.GreaterThan) {
                            advanceOne(parser);
                            if (consumeOpt(parser, Chars.EqualSign)) {
                                return Token.LogicalShiftRightAssign;
                            } else {
                                return Token.LogicalShiftRight;
                            }
                        } else if (next === Chars.EqualSign) {
                            advanceOne(parser);
                            return Token.ShiftRightAssign;
                        }
                    }

                    return Token.ShiftRight;
                } else if (next === Chars.EqualSign) {
                    advanceOne(parser);
                    return Token.GreaterThanOrEqual;
                }
            }

            return Token.GreaterThan;

        // `?`
        case Chars.QuestionMark:
            advanceOne(parser);
            return Token.QuestionMark;

        // `[`
        case Chars.LeftBracket:
            advanceOne(parser);
            return Token.LeftBracket;

        // `]`
        case Chars.RightBracket:
            advanceOne(parser);
            return Token.RightBracket;

        // `^`, `^=`
        case Chars.Caret:
            advanceOne(parser);
            if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.BitwiseXorAssign;
            } else {
                return Token.BitwiseXor;
            }

        // ``string``
        case Chars.Backtick:
            advanceOne(parser);
            if (scanTemplate(parser, context)) {
                return Token.TemplateTail;
            } else {
                return Token.TemplateCont;
            }

        // `{`
        case Chars.LeftBrace:
            advanceOne(parser);
            return Token.LeftBrace;

        // `|`, `||`, `|=`
        case Chars.VerticalBar:
            advanceOne(parser);
            if (hasNext(parser)) {
                const next = nextChar(parser);

                if (next === Chars.VerticalBar) {
                    advanceOne(parser);
                    return Token.LogicalOr;
                } else if (next === Chars.EqualSign) {
                    advanceOne(parser);
                    return Token.BitwiseOrAssign;
                }
            }

            return Token.BitwiseOr;

        // `}`
        case Chars.RightBrace:
            advanceOne(parser);
            return Token.RightBrace;

        // `~`
        case Chars.Tilde:
            advanceOne(parser);
            return Token.Complement;

        default:
            return scanMaybeIdentifier(parser, context);
    }
}
