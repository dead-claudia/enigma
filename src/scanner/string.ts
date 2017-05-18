import {Parser, Context, report, unimplemented} from "../common";
import {Chars} from "../chars";
import {Token} from "../token";
import * as Errors from "../errors";
import {
    advance, advanceOne,
    fromCodePoint, hasNext,
    nextChar, nextUnicodeChar,
    rewindOne, storeRaw, toHex,
} from "./common";

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
            if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) advanceOne(parser);
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

/**
 * Scan a string token.
 */
export function scanString(parser: Parser, context: Context, quote: number) {
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
    parser.tokenValue = ret;
    return Token.StringLiteral;
}

/**
 * Scan a template section. It can start either from the quote or closing brace.
 */
export function scanTemplate(parser: Parser, context: Context): Token {
    const start = parser.index;
    let token = Token.TemplateTail;
    let ret = "";

    advanceOne(parser); // Consume the quote or closing brace
    if (!hasNext(parser)) return report(parser, Errors.unterminatedString());
    let ch = nextChar(parser);
    while (ch !== Chars.Backtick) {
        // Check for a literal `${` (thus the dedicated code path).
        if (ch === Chars.Dollar) {
            advanceOne(parser);
            if (!hasNext(parser)) return report(parser, Errors.unterminatedString());
            ch = nextChar(parser);
            if (ch === Chars.LeftBrace) { token = Token.TemplateCont; break; }
            ret += "$";
        } else {
            ch = scanStringCode(parser, context);

            if (ch >= 0) {
                ret += fromCodePoint(ch);
            } else if (ch === Escape.Empty) {
                // do nothing
            } else if (ch === Escape.Unterminated) {
                return report(parser, Errors.unterminatedString());
            } else {
                ret += "undefined";
            }

            ch = nextChar(parser);
        }
    }

    advanceOne(parser); // Consume the quote or opening brace
    parser.tokenValue = ret;
    storeRaw(parser, start);
    return token;
}
