import {Parser, Context, report, unimplemented} from "../common";
import {Token} from "../token";
import {Chars} from "../chars";
import * as Errors from "../errors";
import {
    hasNext, nextChar, nextUnicodeChar,
    advance, advanceOne,
    consumeOpt, rewindOne,
} from "./common";

// Avoid 90% of the ceremony of String.fromCodePoint
function fromCodePoint(code: number): string {
    if (code & 0x10000) {
        return String.fromCharCode(code >>> 10) +
            String.fromCharCode(code & 0x3ff);
    } else {
        return String.fromCharCode(code);
    }
}

function toHex(code: number): number {
    if (code < Chars.Zero) return -1;
    if (code <= Chars.Nine) return code - Chars.Zero;
    if (code < Chars.UpperA) return -1;
    if (code <= Chars.UpperF) return code - Chars.UpperA + 10;
    if (code < Chars.LowerA) return -1;
    if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
    return -1;
}

function storeRaw(parser: Parser, start: number) {
    parser.tokenRaw = parser.source.slice(start, parser.index);
}

/*
 * The string parsing works this way:
 *
 * - Template parts are double-parsed, once string-like for normal and a faster version for raw.
 * - String and template characters (for the initial parse) are handled via common logic.
 * - Raw characters are just a raw source slice, since the revised semantics effectively dictate
 *   ignoring all escapes except for not terminating on '\`' or `\${` (it's a bit obscure due to the
 *   indirection, but that's because the normal and raw values are derived from reading the same
 *   grammar). Way faster and better memory-wise.
 */

// Intentionally negative
const enum Escape {
    Empty = -1,
    Unterminated = -2,
    StrictOctal = -3,
    EightOrNine = -4,
    InvalidHex = -5,
    OutOfRange = -6,
}

// This actually handles all normal string character parsing, including both strings and templates.
// It returns a number to avoid prematurely allocating a string, and so I can return some signaling
// negatives in case of atypical conditions (e.g. errors, escaped line terminators).
//
// This wouldn't be so ugly and monolithic if I had macros.
function scanStringCode(parser: Parser, context: Context): number {
    if (nextChar(parser) !== Chars.Backslash) {
        const ch = nextUnicodeChar(parser);
        advance(parser, ch);
        return ch;
    }

    advanceOne(parser);
    if (!hasNext(parser)) return Escape.Unterminated;
    const ch = nextChar(parser);
    switch (ch) {
        // Magic escapes
        case Chars.LowerB: advanceOne(parser); return Chars.Backspace;
        case Chars.LowerF: advanceOne(parser); return Chars.FormFeed;
        case Chars.LowerR: advanceOne(parser); return Chars.CarriageReturn;
        case Chars.LowerN: advanceOne(parser); return Chars.LineFeed;
        case Chars.LowerT: advanceOne(parser); return Chars.Tab;
        case Chars.LowerV: advanceOne(parser); return Chars.VerticalTab;

        // Line continuations
        case Chars.CarriageReturn:
            advanceOne(parser);
            consumeOpt(parser, Chars.LineFeed);
            return Escape.Empty;
        case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
            advanceOne(parser);
            return Escape.Empty;

        // Null character, octals
        case Chars.Zero:
            if (context & Context.Strict) {
                advanceOne(parser);
                if (!hasNext(parser)) return Escape.Unterminated;
                const ch = nextChar(parser);
                if (ch < Chars.Zero || ch > Chars.Nine) return 0;
                rewindOne(parser);
            }
            // falls through
        case Chars.One: case Chars.Two: case Chars.Three: {
            if (context & Context.Strict) return Escape.StrictOctal;
            let code = ch - Chars.Zero;
            advanceOne(parser);
            if (!hasNext(parser)) return code;

            let next = nextChar(parser);
            if (next < Chars.Zero || next > Chars.Seven) return code;
            code = (code << 3) | (next - Chars.Zero);
            advanceOne(parser);

            if (!hasNext(parser)) return code;
            next = nextChar(parser);
            if (next < Chars.Zero || next > Chars.Seven) return code;
            code = (code << 3) | (next - Chars.Zero);
            advanceOne(parser);

            return code;
        }

        case Chars.Four: case Chars.Five: case Chars.Six: case Chars.Seven: {
            if (context & Context.Strict) return Escape.StrictOctal;
            let code = ch - Chars.Zero;
            advanceOne(parser);
            if (!hasNext(parser)) return code;

            const next = nextChar(parser);
            if (next < Chars.Zero || next > Chars.Seven) return code;
            code = (code << 3) | (next - Chars.Zero);
            advanceOne(parser);

            return code;
        }

        // `8`, `9` (invalid escapes)
        case Chars.Eight: case Chars.Nine:
            return Escape.EightOrNine;

        // ASCII escapes
        case Chars.LowerX: {
            // Get the backslash position.
            const index = parser.index - 1;
            const line = parser.line;
            const column = parser.column - 1;

            advanceOne(parser);
            if (!hasNext(parser)) return Escape.Unterminated;
            const ch1 = nextChar(parser);
            const first = toHex(ch1);
            if (first < 0) return Escape.InvalidHex;

            advanceOne(parser);
            if (!hasNext(parser)) return Escape.Unterminated;
            const ch2 = nextChar(parser);
            const second = toHex(ch2);
            if (second < 0) return Escape.InvalidHex;

            return second << 8 | first;
        }

        // UCS-2/Unicode escapes
        case Chars.LowerU: {
            // Get the backslash position.
            const index = parser.index - 1;
            const line = parser.line;
            const column = parser.column - 1;

            advanceOne(parser);
            if (!hasNext(parser)) return Escape.Unterminated;

            let ch = nextChar(parser);
            if (ch === Chars.LeftBrace) {
                // \u{N}
                advanceOne(parser);
                if (!hasNext(parser)) return Escape.Unterminated;

                // The first digit is required, so handle it *out* of the loop.
                ch = nextChar(parser);
                let code = toHex(ch);
                if (code < 0) return Escape.InvalidHex;
                advanceOne(parser);
                if (!hasNext(parser)) return Escape.Unterminated;

                ch = nextChar(parser);
                while (ch !== Chars.RightBrace) {
                    // Now handle successive digits.
                    ch = toHex(ch);
                    if (ch < 0) return Escape.InvalidHex;
                    code = code << 8 | ch;

                    advanceOne(parser);
                    if (!hasNext(parser)) return Escape.Unterminated;

                    ch = nextChar(parser);
                }

                if (code <= 0x10fff) return code;
                return Escape.OutOfRange;
            } else {
                // \uNNNN
                let code = toHex(ch);
                if (code < 0) return Escape.InvalidHex;

                advanceOne(parser);
                if (!hasNext(parser)) return Escape.Unterminated;

                for (let i = 0; i < 3; i++) {
                    ch = nextChar(parser);
                    const digit = toHex(ch);
                    if (digit < 0) return Escape.InvalidHex;

                    advanceOne(parser);
                    if (!hasNext(parser)) return Escape.Unterminated;
                    code = code << 8 | digit;
                }

                return code;
            }
        }

        // Everything else evaluates to the escaped character.
        default: {
            const ch = nextUnicodeChar(parser);
            advance(parser, ch);
            return ch;
        }
    }
}

function scanString(parser: Parser, context: Context, quote: number): string {
    const start = parser.index;
    let ret = "";

    advanceOne(parser); // Consume the quote
    if (!hasNext(parser)) return report(parser, Errors.unterminatedString());
    while (nextChar(parser) !== quote) {
        const {index, line, column} = parser;
        const ch = scanStringCode(parser, context);

        if (ch >= 0) {
            ret += fromCodePoint(ch);
        } else if (ch === Escape.Empty) {
            // do nothing
        } else if (ch === Escape.Unterminated) {
            return report(parser, Errors.unterminatedString());
        } else {
            let message;
            if (ch === Escape.StrictOctal) message = Errors.strictOctalEscape();
            else if (ch === Escape.EightOrNine) message = Errors.invalidEightAndNine();
            else if (ch === Escape.InvalidHex) message = Errors.invalidStringHex();
            else /* if (ch === Escape.OutOfRange) */ message = Errors.unicodeOutOfRange();
            return Errors.report(index, line, column, message);
        }
    }

    advanceOne(parser); // Consume the quote
    if (context & Context.OptionsRaw) storeRaw(parser, start);
    return ret;
}

function scanTemplateChar(parser: Parser, context: Context): string {
    const ch = scanStringCode(parser, context);

    if (ch >= 0) return fromCodePoint(ch);
    if (ch === Escape.Empty) return "";
    if (ch === Escape.Unterminated) return report(parser, Errors.unterminatedString());
    return "undefined";
}

function scanTemplateStart(parser: Parser, context: Context): boolean {
    // TODO
    return unimplemented();
}

function scanRegExp(parser: Parser, context: Context): RegExp {
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
            parser.tokenValue = scanString(parser, context, Chars.DoubleQuote);
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
            parser.tokenValue = scanString(parser, context, Chars.SingleQuote);
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
                    parser.tokenValue = scanNumeric(parser, context);
                    return Token.NumericLiteral;
                }
            }

            return Token.Period;

        // `/`, `/=`
        case Chars.Slash:
            advanceOne(parser);
            if (context & Context.Expression) {
                parser.tokenValue = scanRegExp(parser, context);
                return Token.RegularExpression;
            } else if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.DivideAssign;
            } else {
                return Token.Divide;
            }

        // `0`-`9`
        case Chars.Zero: case Chars.One: case Chars.Two: case Chars.Three: case Chars.Four:
        case Chars.Five: case Chars.Six: case Chars.Seven: case Chars.Eight: case Chars.Nine:
            parser.tokenValue = scanNumeric(parser, context);
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
            if (scanTemplateStart(parser, context)) {
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
