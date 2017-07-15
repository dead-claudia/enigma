import {Parser, Context, report} from "../common";
import {Token} from "../token";
import {Chars} from "../chars";
import {mustEscape} from "../unicode-generated";
import * as Errors from "../errors";
import {
    advanceOne, consumeOpt,
    hasNext, nextChar, nextUnicodeChar,
    fromCodePoint,
} from "./common";
import {scanString, scanTemplate} from "./string";
import {scanRegExp} from "./regexp";
import {scanNumeric} from "./numeric";
import {scanMaybeIdentifier, scanKnownIdentifier} from "./identifier";

const enum Constants {
    Size = 128,
}

// Sanitizes characters for better human readability.
function escapeForPrinting(code: number): string {
    switch (code) {
        case Chars.Null: return "\\0";
        case Chars.Backspace: return "\\b";
        case Chars.Tab: return "\\t";
        case Chars.LineFeed: return "\\n";
        case Chars.VerticalTab: return "\\v";
        case Chars.FormFeed: return "\\f";
        case Chars.CarriageReturn: return "\\r";
        default:
            if (!mustEscape(code)) return fromCodePoint(code);
            if (code < 0x10) return `\\x0${code.toString(16)}`;
            if (code < 0x100) return `\\x${code.toString(16)}`;
            if (code < 0x1000) return `\\u0${code.toString(16)}`;
            if (code < 0x10000) return `\\u${code.toString(16)}`;
            return `\\u{${code.toString(16)}}`;
    }
}

const statics = new Array(Constants.Size).fill(0) as Token[];

statics[Chars.LeftParen] = Token.LeftParen;
statics[Chars.RightParen] = Token.RightParen;
statics[Chars.Comma] = Token.Comma;
statics[Chars.Colon] = Token.Colon;
statics[Chars.Semicolon] = Token.Semicolon;
statics[Chars.QuestionMark] = Token.QuestionMark;
statics[Chars.LeftBracket] = Token.LeftBracket;
statics[Chars.RightBracket] = Token.RightBracket;
statics[Chars.LeftBrace] = Token.LeftBrace;
statics[Chars.RightBrace] = Token.RightBrace;
statics[Chars.Tilde] = Token.Complement;

/**
 * Scan for a single token. You must seek first, because this assumes the current pointer is
 * pointing to either the start of a token or the end of the source.
 */
export function scan(parser: Parser, context: Context): Token {
    if (!hasNext(parser)) return Token.EndOfSource;
    const first = nextChar(parser);
    if (first >= Constants.Size) return scanMaybeIdentifier(parser, context);
    switch (first) {
        // `!`, `!=`, `!==`
        case Chars.Exclamation:
            advanceOne(parser);
            if (!consumeOpt(parser, Chars.EqualSign)) return Token.Negate;
            if (!consumeOpt(parser, Chars.EqualSign)) return Token.LooseNotEqual;
            return Token.StrictNotEqual;

        // `'string'`, `"string"`
        case Chars.SingleQuote:
        case Chars.DoubleQuote:
            return scanString(parser, context, first);

        // `%`, `%=`
        case Chars.Percent:
            advanceOne(parser);
            if (!consumeOpt(parser, Chars.EqualSign)) return Token.Modulo;
            return Token.ModuloAssign;

        // `&`, `&&`, `&=`
        case Chars.Ampersand: {
            advanceOne(parser);
            if (!hasNext(parser)) return Token.BitwiseAnd;
            const next = nextChar(parser);

            if (next === Chars.Ampersand) {
                advanceOne(parser);
                return Token.LogicalAnd;
            }

            if (next === Chars.EqualSign) {
                advanceOne(parser);
                return Token.BitwiseAndAssign;
            }

            return Token.BitwiseAnd;
        }

        // `*`, `**`, `*=`, `**=`
        case Chars.Asterisk: {
            advanceOne(parser);
            if (!hasNext(parser)) return Token.Multiply;
            const next = nextChar(parser);

            if (next === Chars.EqualSign) {
                advanceOne(parser);
                return Token.MultiplyAssign;
            }

            if (next !== Chars.Asterisk) return Token.Multiply;
            advanceOne(parser);
            if (!consumeOpt(parser, Chars.EqualSign)) return Token.Exponentiate;
            return Token.ExponentiateAssign;
        }

        // `+`, `++`, `+=`
        case Chars.Plus: {
            advanceOne(parser);
            if (!hasNext(parser)) return Token.Add;
            const next = nextChar(parser);

            if (next === Chars.Plus) {
                advanceOne(parser);
                return Token.Increment;
            }

            if (next === Chars.EqualSign) {
                advanceOne(parser);
                return Token.AddAssign;
            }

            return Token.Add;
        }

        // `-`, `--`, `-=`
        case Chars.Hyphen: {
            advanceOne(parser);
            if (!hasNext(parser)) return Token.Subtract;
            const next = nextChar(parser);

            if (next === Chars.Hyphen) {
                advanceOne(parser);
                return Token.Decrement;
            }

            if (next === Chars.EqualSign) {
                advanceOne(parser);
                return Token.SubtractAssign;
            }

            return Token.Subtract;
        }

        // `.`, `...`, `.123` (numeric literal)
        case Chars.Period: {
            let index = parser.index + 1;
            if (index < parser.source.length) {
                const next = parser.source.charCodeAt(index);

                if (next === Chars.Period) {
                    index++;
                    if (index < parser.source.length &&
                            parser.source.charCodeAt(index) === Chars.Period) {
                        parser.index = index + 1;
                        parser.column += 3;
                        return Token.Ellipsis;
                    }
                } else if (next >= Chars.Zero && next <= Chars.Nine) {
                    // Rewind the initial token.
                    scanNumeric(parser, context);
                    return Token.NumericLiteral;
                }
            }

            advanceOne(parser);
            return Token.Period;
        }

        // `/`, `/=`, `/>`
        case Chars.Slash: {
            advanceOne(parser);
            if (context & Context.ExpressionStart) {
                return scanRegExp(parser, context);
            }

            if (hasNext(parser)) {
                const ch = nextChar(parser);

                if (ch === Chars.EqualSign) {
                    advanceOne(parser);
                    return Token.DivideAssign;
                } else if (ch === Chars.GreaterThan) {
                    advanceOne(parser);
                    return Token.JSXAutoClose;
                }
            }

            return Token.Divide;
        }

        // `0`...`9`
        case Chars.Zero: case Chars.One: case Chars.Two: case Chars.Three: case Chars.Four:
        case Chars.Five: case Chars.Six: case Chars.Seven: case Chars.Eight: case Chars.Nine:
            return scanNumeric(parser, context);

        // `<`, `<=`, `<<`, `<<=`, `</`
        case Chars.LessThan:
            advanceOne(parser);
            if (!hasNext(parser)) return Token.LessThan;

            switch (nextChar(parser)) {
                case Chars.LessThan:
                    advanceOne(parser);
                    if (consumeOpt(parser, Chars.EqualSign)) {
                        return Token.ShiftLeftAssign;
                    } else {
                        return Token.ShiftLeft;
                    }

                case Chars.EqualSign:
                    advanceOne(parser);
                    return Token.LessThanOrEqual;

                case Chars.Slash: {
                    if (!(context & Context.OptionsJSX)) break;
                    const index = parser.index + 1;

                    // Check that it's not a comment start.
                    if (index < parser.source.length) {
                        const next = parser.source.charCodeAt(index);
                        if (next === Chars.Asterisk || next === Chars.Slash) break;
                    }

                    advanceOne(parser);
                    return Token.JSXClose;
                }

                default: // ignore
                    return Token.LessThan;
            }

        // `=`, `==`, `===`, `=>`
        case Chars.EqualSign: {
            advanceOne(parser);
            if (!hasNext(parser)) return Token.Assign;
            const next = nextChar(parser);

            if (next === Chars.EqualSign) {
                advanceOne(parser);
                if (consumeOpt(parser, Chars.EqualSign)) {
                    return Token.StrictEqual;
                } else {
                    return Token.LooseEqual;
                }
            } else if (next === Chars.GreaterThan) {
                advanceOne(parser);
                return Token.Arrow;
            }

            return Token.Assign;
        }

        // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
        case Chars.GreaterThan: {
            advanceOne(parser);
            if (!hasNext(parser)) return Token.GreaterThan;
            const next = nextChar(parser);

            if (next === Chars.EqualSign) {
                advanceOne(parser);
                return Token.GreaterThanOrEqual;
            }

            if (next !== Chars.GreaterThan) return Token.GreaterThan;
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
        }

        // `\\u{N}var`
        case Chars.Backslash:
            return scanKnownIdentifier(parser, context);

        // `^`, `^=`
        case Chars.Caret:
            advanceOne(parser);
            if (!consumeOpt(parser, Chars.EqualSign)) return Token.BitwiseXor;
            return Token.BitwiseXorAssign;

        // ``string``
        case Chars.Backtick:
            return scanTemplate(parser, context, first);

        // `|`, `||`, `|=`
        case Chars.VerticalBar: {
            advanceOne(parser);
            if (!hasNext(parser)) return Token.BitwiseOr;
            const next = nextChar(parser);

            if (next === Chars.VerticalBar) {
                advanceOne(parser);
                return Token.LogicalOr;
            } else if (next === Chars.EqualSign) {
                advanceOne(parser);
                return Token.BitwiseOrAssign;
            }

            return Token.BitwiseOr;
        }

        // `(`
        case Chars.LeftParen:
            advanceOne(parser);
            return Token.LeftParen;

        // `)`
        case Chars.RightParen:
            advanceOne(parser);
            return Token.RightParen;

        // `,`
        case Chars.Comma:
            advanceOne(parser);
            return Token.Comma;

        // `:`
        case Chars.Colon:
            advanceOne(parser);
            return Token.Colon;

        // `;`
        case Chars.Semicolon:
            advanceOne(parser);
            return Token.Semicolon;

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

        // `{`
        case Chars.LeftBrace:
            advanceOne(parser);
            return Token.LeftBrace;

        // `}`
        case Chars.RightBrace:
            advanceOne(parser);
            return Token.RightBrace;

        // `~`
        case Chars.Tilde:
            advanceOne(parser);
            return Token.Complement;

        // `a`...`z`, `A`...`Z`, `_var`, `$var`
        case Chars.UpperA: case Chars.UpperB: case Chars.UpperC: case Chars.UpperD:
        case Chars.UpperE: case Chars.UpperF: case Chars.UpperG: case Chars.UpperH:
        case Chars.UpperI: case Chars.UpperJ: case Chars.UpperK: case Chars.UpperL:
        case Chars.UpperM: case Chars.UpperN: case Chars.UpperO: case Chars.UpperP:
        case Chars.UpperQ: case Chars.UpperR: case Chars.UpperS: case Chars.UpperT:
        case Chars.UpperU: case Chars.UpperV: case Chars.UpperW: case Chars.UpperX:
        case Chars.UpperY: case Chars.UpperZ: case Chars.Dollar: case Chars.Underscore:
        case Chars.LowerA: case Chars.LowerB: case Chars.LowerC: case Chars.LowerD:
        case Chars.LowerE: case Chars.LowerF: case Chars.LowerG: case Chars.LowerH:
        case Chars.LowerI: case Chars.LowerJ: case Chars.LowerK: case Chars.LowerL:
        case Chars.LowerM: case Chars.LowerN: case Chars.LowerO: case Chars.LowerP:
        case Chars.LowerQ: case Chars.LowerR: case Chars.LowerS: case Chars.LowerT:
        case Chars.LowerU: case Chars.LowerV: case Chars.LowerW: case Chars.LowerX:
        case Chars.LowerY: case Chars.LowerZ:
            return scanKnownIdentifier(parser, context);

        default:
            return report(parser, Errors.unexpectedChar(
                escapeForPrinting(nextUnicodeChar(parser)),
            ));
    }
}

export function scanTemplateNext(parser: Parser, context: Context): Token {
    if (!hasNext(parser)) return report(parser, Errors.unterminatedString());
    // Rewind it so the template parser can consume the closing `}`
    parser.index--;
    parser.column--;
    return scanTemplate(parser, context, Chars.RightBrace);
}
