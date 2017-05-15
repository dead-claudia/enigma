import {Parser} from "../common";
import {Chars} from "../chars";

export function hasNext(parser: Parser) {
    return parser.index < parser.source.length;
}

export function advanceOne(parser: Parser) {
    parser.index++;
    parser.column++;
}

export function advance(parser: Parser, ch: number) {
    advanceOne(parser);
    if (ch & 0x10000) parser.index++;
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

// It's an optimized equivalent of `advance(parser, nextUnicodeChar(parser))`.
export function consumeAny(parser: Parser) {
    const hi = parser.source.charCodeAt(parser.index++);

    if (hi >= 0xd800 && hi <= 0xdbff && hasNext(parser)) {
        const lo = parser.source.charCodeAt(parser.index);
        if (lo >= 0xdc00 && lo <= 0xdfff) parser.index++;
    }

    parser.column++;
}

export function consumeOpt(parser: Parser, code: number) {
    const hi = parser.source.charCodeAt(parser.index);

    if (hi !== code) return false;
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

export function rewindOne(parser: Parser) {
    parser.index--;
    parser.column--;
}

export function rewind(parser: Parser, ch: number) {
    rewindOne(parser);
    if (ch & 0x10000) rewindOne(parser);
}
