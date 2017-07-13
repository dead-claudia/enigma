import {Parser, Context, report, unreachable, unimplemented} from "../common";
import {Chars} from "../chars";
import {Token} from "../token";
import * as Errors from "../errors";
import {
    advance, advanceOne,
    consumeAny, consumeOpt,
    fromCodePoint, hasNext,
    nextChar, nextUnicodeChar,
    storeRaw, toHex,
} from "./common";

// TODO:
// 1. Investigate using slices instead of `String.fromCharCode`

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
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex = -4,
    OutOfRange = -5,
}

// This actually handles all normal string character parsing, including both strings and templates.
// It returns a number to avoid prematurely allocating a string, and so I can return some signaling
// negatives in case of atypical conditions (e.g. errors, escaped line terminators), since templates
// should only error in the cases of unterminated strings.

function unterminated(parser: Parser): never {
    return report(parser, Errors.unterminatedString());
}

function readNext(parser: Parser, prev: number): number {
    advance(parser, prev);
    if (!hasNext(parser)) return unterminated(parser);
    return nextUnicodeChar(parser);
}

const enum Constants {
    Size = 128,
}

// By default, consuming escapes defaults to returning the character.
type Callback = (parser: Parser, context: Context, first: number) => number;
const table = new Array<Callback>(Constants.Size).fill(nextUnicodeChar);

// Magic escapes
table[Chars.LowerB] = () => Chars.Backspace;
table[Chars.LowerF] = () => Chars.FormFeed;
table[Chars.LowerR] = () => Chars.CarriageReturn;
table[Chars.LowerN] = () => Chars.LineFeed;
table[Chars.LowerT] = () => Chars.Tab;
table[Chars.LowerV] = () => Chars.VerticalTab;

// Line continuations
table[Chars.CarriageReturn] = parser => {
    parser.column = -1;
    parser.line++;

    const {index} = parser;

    if (index < parser.source.length) {
        const ch = parser.source.charCodeAt(index);

        if (ch === Chars.LineFeed) {
            parser.lastChar = ch;
            parser.index = index + 1;
        }
    }

    return Escape.Empty;
};

table[Chars.LineFeed] =
table[Chars.LineSeparator] =
table[Chars.ParagraphSeparator] = parser => {
    parser.column = -1;
    parser.line++;
    return Escape.Empty;
};

// Null character, octals
table[Chars.Zero] =
table[Chars.One] =
table[Chars.Two] =
table[Chars.Three] = (parser, context, first) => {
    let code = first - Chars.Zero;
    let index = parser.index + 1;
    let column = parser.column + 1;

    if (index < parser.source.length) {
        const next = parser.source.charCodeAt(index);

        if (next < Chars.Zero || next > Chars.Seven) {
            // Verify that it's `\0` if we're in strict mode.
            if (code !== 0 && context & Context.Strict) return Escape.StrictOctal;
        } else if (context & Context.Strict) {
            // This happens in cases like `\00` in strict mode.
            return Escape.StrictOctal;
        } else {
            parser.lastChar = next;
            code = (code << 3) | (next - Chars.Zero);
            index++; column++;

            if (index < parser.source.length) {
                const next = parser.source.charCodeAt(index);

                if (next >= Chars.Zero && next <= Chars.Seven) {
                    parser.lastChar = next;
                    code = (code << 3) | (next - Chars.Zero);
                    index++; column++;
                }
            }

            parser.index = index - 1;
            parser.column = column - 1;
        }
    }

    return code;
};

table[Chars.Four] =
table[Chars.Five] =
table[Chars.Six] =
table[Chars.Seven] = (parser, context, first) => {
    if (context & Context.Strict) return Escape.StrictOctal;
    let code = first - Chars.Zero;
    const index = parser.index + 1;
    const column = parser.column + 1;

    if (index < parser.source.length) {
        const next = parser.source.charCodeAt(index);

        if (next >= Chars.Zero && next <= Chars.Seven) {
            code = (code << 3) | (next - Chars.Zero);
            parser.lastChar = next;
            parser.index = index;
            parser.column = column;
        }
    }

    return code;
};

// `8`, `9` (invalid escapes)
table[Chars.Eight] = table[Chars.Nine] = () => Escape.EightOrNine;

// ASCII escapes
table[Chars.LowerX] = (parser, _, first) => {
    const ch1 = parser.lastChar = readNext(parser, first);
    const hi = toHex(ch1);
    if (hi < 0) return Escape.InvalidHex;
    const ch2 = parser.lastChar = readNext(parser, ch1);
    const lo = toHex(ch2);
    if (lo < 0) return Escape.InvalidHex;

    return hi << 4 | lo;
};

// UCS-2/Unicode escapes
table[Chars.LowerU] = (parser, _, prev) => {
    let ch = parser.lastChar = readNext(parser, prev);
    if (ch === Chars.LeftBrace) {
        // \u{N}
        // The first digit is required, so handle it *out* of the loop.
        ch = parser.lastChar = readNext(parser, ch);
        let code = toHex(ch);
        if (code < 0) return Escape.InvalidHex;

        ch = parser.lastChar = readNext(parser, ch);
        while (ch !== Chars.RightBrace) {
            const digit = toHex(ch);
            if (digit < 0) return Escape.InvalidHex;
            code = code << 4 | digit;

            // Check this early to avoid `code` wrapping to a negative on overflow (which is
            // reserved for abnormal conditions).
            if (code > Chars.LastUnicodeChar) return Escape.OutOfRange;
            ch = parser.lastChar = readNext(parser, ch);
        }

        return code;
    } else {
        // \uNNNN
        let code = toHex(ch);
        if (code < 0) return Escape.InvalidHex;

        for (let i = 0; i < 3; i++) {
            ch = parser.lastChar = readNext(parser, ch);
            const digit = toHex(ch);
            if (digit < 0) return Escape.InvalidHex;
            code = code << 4 | digit;
        }

        return code;
    }
};

function handleStringError(
    parser: Parser,
    code: Escape,
    index: number,
    line: number,
    column: number,
): void {
    switch (code) {
        case Escape.Empty:
            return;

        case Escape.StrictOctal:
            return Errors.report(index, line, column, Errors.strictOctalEscape());

        case Escape.EightOrNine:
            return Errors.report(index, line, column, Errors.invalidEightAndNine());

        case Escape.InvalidHex:
            return Errors.report(index, line, column, Errors.invalidStringHex());

        case Escape.OutOfRange:
            return Errors.report(index, line, column, Errors.invalidStringHex());

        default:
            return unreachable(code);
    }
}

/**
 * Scan a string token.
 */
export function scanString(parser: Parser, context: Context, quote: number): Token {
    const {index: start, lastChar} = parser;
    let ret = "";

    let ch = readNext(parser, quote);
    while (ch !== quote) {
        const {index, line, column} = parser;
        switch (ch) {
            case Chars.CarriageReturn: case Chars.LineFeed:
            case Chars.LineSeparator: case Chars.ParagraphSeparator:
                return unterminated(parser);

            case Chars.Backslash:
                ch = readNext(parser, ch);

                if (ch >= Constants.Size) {
                    ret += fromCodePoint(ch);
                } else {
                    parser.lastChar = ch;
                    const code = table[ch](parser, context, ch);

                    if (code >= 0) ret += fromCodePoint(code);
                    else handleStringError(parser, code as Escape, index, line, column);
                    ch = parser.lastChar;
                }
                break;

            default:
                ret += fromCodePoint(ch);
        }

        ch = readNext(parser, ch);
    }

    advance(parser, ch); // Consume the quote
    if (context & Context.OptionsRaw) storeRaw(parser, start);
    parser.tokenValue = ret;
    parser.lastChar = lastChar;
    return Token.StringLiteral;
}

// Fallback for looser template segment validation (no actual parsing).
// It returns `ch` as negative iff the segment ends with `${`
function scanBadTemplate(parser: Parser, ch: number): number {
    while (ch !== Chars.Backtick) {
        // Break after a literal `${` (thus the dedicated code path).
        switch (ch) {
            case Chars.Dollar: {
                const index = parser.index + 1;
                if (index < parser.source.length &&
                        parser.source.charCodeAt(index) === Chars.LeftBrace) {
                    parser.index = index;
                    parser.column++;
                    return -ch;
                }
                break;
            }

            case Chars.Backslash:
                ch = readNext(parser, ch);
                break;

            case Chars.CarriageReturn:
                if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) {
                    ch = nextChar(parser);
                    parser.index++;
                }
                // falls through

            case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                parser.column = -1;
                parser.line++;
                // falls through

            default:
                // do nothing
        }

        ch = readNext(parser, ch);
    }

    return ch;
}

/**
 * Scan a template section. It can start either from the quote or closing brace.
 */
export function scanTemplate(parser: Parser, context: Context, first: number): Token {
    const {index: start, lastChar} = parser;
    let tail = true;
    let ret: string | void = "";

    let ch = readNext(parser, first);

    loop:
    while (ch !== Chars.Backtick) {
        const {index, line, column} = parser;
        switch (ch) {
            // Break after a literal `${` (thus the dedicated code path).
            case Chars.Dollar: {
                const index = parser.index + 1;
                if (index < parser.source.length &&
                        parser.source.charCodeAt(index) === Chars.LeftBrace) {
                    parser.index = index;
                    parser.column++;
                    tail = false;
                    break loop;
                }
                ret += "$";
                break;
            }

            case Chars.Backslash:
                ch = readNext(parser, ch);

                if (ch >= Constants.Size) {
                    ret += fromCodePoint(ch);
                } else {
                    parser.lastChar = ch;
                    const code = table[ch](parser, context, ch);

                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                        ret = undefined;
                        ch = scanBadTemplate(parser, parser.lastChar);
                        if (ch < 0) { ch = -ch; tail = false; }
                        break loop;
                    } else {
                        handleStringError(parser, code as Escape, index, line, column);
                    }
                    ch = parser.lastChar;
                }

                break;

            case Chars.CarriageReturn:
                if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) {
                    if (ret != null) ret += fromCodePoint(ch);
                    ch = nextChar(parser);
                    parser.index++;
                }
                // falls through

            case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                parser.column = -1;
                parser.line++;
                // falls through

            default:
                if (ret != null) ret += fromCodePoint(ch);
        }

        ch = readNext(parser, ch);
    }

    advance(parser, ch); // Consume the quote or opening brace
    parser.tokenValue = ret;
    parser.lastChar = lastChar;
    if (tail) {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 1);
        return Token.TemplateTail;
    } else {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 2);
        return Token.TemplateCont;
    }
}
