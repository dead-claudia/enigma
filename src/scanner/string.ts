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
    if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) parser.index++;
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
function parseLegacyOctal3(parser: Parser, context: Context, first: number): number {
    if (context & Context.Strict) return Escape.StrictOctal;
    let code = first - Chars.Zero;

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

table[Chars.Zero] = (parser, context, first) => {
    // Do the lookahead without having to rewind.
    const index = parser.index + 1;
    if (index === parser.source.length) return unterminated(parser);
    const ch = parser.source.charCodeAt(index);
    if (ch < Chars.Zero || ch > Chars.Nine) return 0;
    return parseLegacyOctal3(parser, context, first);
};

table[Chars.One] = table[Chars.Two] = table[Chars.Three] = parseLegacyOctal3;

table[Chars.Four] =
table[Chars.Five] =
table[Chars.Six] =
table[Chars.Seven] = (parser, context, first) => {
    if (context & Context.Strict) return Escape.StrictOctal;
    let code = first - Chars.Zero;
    advanceOne(parser);
    if (!hasNext(parser)) return code;

    const next = nextChar(parser);
    if (next < Chars.Zero || next > Chars.Seven) return code;
    code = (code << 3) | (next - Chars.Zero);
    advanceOne(parser);

    return code;
};

// `8`, `9` (invalid escapes)
table[Chars.Eight] = table[Chars.Nine] = () => Escape.EightOrNine;

// ASCII escapes
table[Chars.LowerX] = parser => {
    // Get the backslash position.
    const index = parser.index - 1;
    const line = parser.line;
    const column = parser.column - 1;

    advanceOne(parser);
    if (!hasNext(parser)) return unterminated(parser);
    const ch1 = nextChar(parser);
    const first = toHex(ch1);
    if (first < 0) return Escape.InvalidHex;

    advanceOne(parser);
    if (!hasNext(parser)) return unterminated(parser);
    const ch2 = nextChar(parser);
    const second = toHex(ch2);
    if (second < 0) return Escape.InvalidHex;

    return first << 4 | second;
};

// UCS-2/Unicode escapes
table[Chars.LowerU] = (parser, _, prev) => {
    let ch = readNext(parser, prev);
    if (ch === Chars.LeftBrace) {
        // \u{N}
        // The first digit is required, so handle it *out* of the loop.
        ch = readNext(parser, ch);
        let code = toHex(ch);
        if (code < 0) return Escape.InvalidHex;

        ch = readNext(parser, ch);
        while (ch !== Chars.RightBrace) {
            const digit = toHex(ch);
            if (digit < 0) return Escape.InvalidHex;
            code = code << 4 | digit;
            ch = readNext(parser, ch);
        }

        if (code > 0x10fff) return Escape.OutOfRange;
        return code;
    } else {
        // \uNNNN
        let code = toHex(ch);
        if (code < 0) return Escape.InvalidHex;

        for (let i = 0; i < 3; i++) {
            ch = readNext(parser, ch);
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
    const start = parser.index;
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
                    const code = table[ch](parser, context, ch);

                    if (code >= 0) ret += fromCodePoint(code);
                    else handleStringError(parser, code as Escape, index, line, column);
                    ch = nextUnicodeChar(parser);
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
    return Token.StringLiteral;
}

/**
 * Scan a template section. It can start either from the quote or closing brace.
 */
export function scanTemplate(parser: Parser, context: Context): Token {
    const start = parser.index;
    let token = Token.TemplateTail;
    let ret = "";

    let ch = readNext(parser, Chars.Backtick);
    while (ch !== Chars.Backtick) {
        // Check for a literal `${` (thus the dedicated code path).
        if (ch === Chars.Dollar) {
            if (consumeOpt(parser, Chars.LeftBrace)) { token = Token.TemplateCont; break; }
            ret += "$";
        } else if (ch === Chars.Backslash) {
            ch = readNext(parser, ch);

            if (ch >= Constants.Size) {
                ret += fromCodePoint(ch);
            } else {
                const code = table[ch](parser, context, ch);

                if (code >= 0) ret += fromCodePoint(code);
                else if (code !== Escape.Empty) ret += "undefined";
                ch = nextUnicodeChar(parser);
            }
        } else {
            ret += fromCodePoint(ch);
        }

        ch = readNext(parser, ch);
    }

    advance(parser, ch); // Consume the quote or opening brace
    parser.tokenValue = ret;
    storeRaw(parser, start);
    return token;
}
