import {Parser, report, unimplemented} from "../common";
import {Chars} from "../chars";
import * as Errors from "../errors";

export function hasNext(parser: Parser) {
    return parser.index < parser.source.length;
}

export function advanceOne(parser: Parser) {
    parser.index++;
    parser.column++;
}

export function advance(parser: Parser, ch: number) {
    advanceOne(parser);
    if (ch > 0xffff) parser.index++;
}

export function nextChar(parser: Parser) {
    return parser.source.charCodeAt(parser.index);
}

export function nextUnicodeChar(parser: Parser) {
    let {index} = parser;
    const hi = parser.source.charCodeAt(index++);

    if (hi < 0xd800 || hi > 0xdbff) return hi;
    if (index === parser.source.length) return hi;
    const lo = parser.source.charCodeAt(index);

    if (lo < 0xdc00 || lo > 0xdfff) return hi;
    return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
}

// This tags its result if it's an escaped identifier.
//
// It does everything raw since it's pure lookahead. It does store some metadata in the returned
// character to speed up the advance mechanism.
export function nextIdentifierChar(parser: Parser) {
    let {index} = parser;
    const hi = parser.source.charCodeAt(index++);

    if (hi < 0xd800 || hi > 0xdbff) {
        if (hi !== Chars.Backslash) return hi;
        if (index === parser.source.length) return Chars.UnterminatedEscape;
        let ch = parser.source.charCodeAt(index++);

        if (ch !== Chars.LeftBrace) return Chars.InvalidUnicodeEscape;
        if (ch === Chars.LeftBrace) {
            if (index === parser.source.length) return Chars.UnterminatedEscape;
            // \u{N}
            // The first digit is required, so handle it *out* of the loop.
            ch = parser.source.charCodeAt(index++);
            let code = toHex(ch);
            if (code < 0) return Chars.InvalidHex;
            if (index === parser.source.length) return Chars.UnterminatedEscape;

            ch = parser.source.charCodeAt(index++);
            let digits = 1;

            while (ch !== Chars.RightBrace) {
                const digit = toHex(ch);
                if (digit < 0) return Chars.InvalidHex;
                code = code << 4 | digit;

                // Check this early to avoid `code` wrapping to a negative on overflow (which is
                // reserved for abnormal conditions).
                if (code > Chars.LastUnicodeChar) break;
                if (index === parser.source.length) return Chars.UnterminatedEscape;
                ch = parser.source.charCodeAt(index++);
                digits++;
            }

            if (digits > 15) digits = 0;
            return code | Chars.UnicodeEscapeTag | digits << 24;
        } else {
            // \uNNNN
            let code = toHex(ch);
            if (code < 0) return Chars.InvalidHex;

            for (let i = 0; i < 3; i++) {
                if (index === parser.source.length) return Chars.UnterminatedEscape;
                ch = parser.source.charCodeAt(index++);
                const digit = toHex(ch);
                if (digit < 0) return Chars.InvalidHex;
                code = code << 4 | digit;
            }

            return code | Chars.UnicodeEscapeTag | 5 << 24;
        }
    }

    if (index === parser.source.length) return hi;
    const lo = parser.source.charCodeAt(index);

    if (lo < 0xdc00 || lo > 0xdfff) return hi;
    return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
}

export function advanceIdentifier(parser: Parser, prev: number) {
    if (prev & Chars.UnicodeEscapeTag) {
        const skip = prev >> 24;

        if (skip & 0x0f) {
            // Chars.UnicodeEscapeTag is conveniently set up to skip what it needs to.
            parser.index += skip;
            parser.column += skip;
        } else {
            while (parser.index < parser.source.length) {
                const ch = parser.source.charCodeAt(parser.index);

                parser.index++;
                parser.column++;
                if (ch === Chars.RightBrace) break;
            }
        }
    } else {
        parser.index++;
        parser.column++;
        if (prev > 0xffff0) parser.index++;
    }
}

/**
 * An optimized equivalent of `advance(parser, nextUnicodeChar(parser))` that returns its result.
 */
export function consumeAny(parser: Parser) {
    const hi = parser.source.charCodeAt(parser.index++);
    let code = hi;

    if (hi >= 0xd800 && hi <= 0xdbff && hasNext(parser)) {
        const lo = parser.source.charCodeAt(parser.index);
        if (lo >= 0xdc00 && lo <= 0xdfff) {
            code = (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
            parser.index++;
        }
    }

    parser.column++;
    return code;
}

export function consumeOpt(parser: Parser, code: number) {
    if (parser.source.charCodeAt(parser.index) !== code) return false;
    parser.index++;
    parser.column++;
    return true;
}

// Note: currently unused.
export function consumeOptAstral(parser: Parser, code: number) {
    let {index} = parser;
    const hi = parser.source.charCodeAt(index++);
    if (hi < 0xd800 || hi > 0xdbff) return false;
    if (index === parser.source.length) return false;

    const lo = parser.source.charCodeAt(index++);
    if (lo < 0xdc00 || lo > 0xdfff) return false;

    const codePoint = (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
    if (codePoint !== code) return false;

    parser.index = index;
    parser.column++;
    return true;
}

/**
 * Use to consume a line feed instead of `advanceNewline`.
 */
export function consumeLineFeed(parser: Parser, lastIsCR: boolean) {
    parser.index++;
    if (!lastIsCR) {
        parser.column = 0;
        parser.line++;
    }
}

export function advanceNewline(parser: Parser) {
    parser.index++;
    parser.column = 0;
    parser.line++;
}

// Avoid 90% of the ceremony of String.fromCodePoint
export function fromCodePoint(code: number): string {
    if (code > 0xffff) {
        return String.fromCharCode(code >>> 10) +
            String.fromCharCode(code & 0x3ff);
    } else {
        return String.fromCharCode(code);
    }
}

export function toHex(code: number): number {
    if (code < Chars.Zero) return -1;
    if (code <= Chars.Nine) return code - Chars.Zero;
    if (code < Chars.UpperA) return -1;
    if (code <= Chars.UpperF) return code - Chars.UpperA + 10;
    if (code < Chars.LowerA) return -1;
    if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
    return -1;
}

export function storeRaw(parser: Parser, start: number) {
    parser.tokenRaw = parser.source.slice(start, parser.index);
}
