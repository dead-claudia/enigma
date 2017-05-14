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
    if (ch & 0x10000) advanceOne(parser);
}

// This also converts Unicode pairs
export function nextChar(parser: Parser) {
    const hi = parser.source.charCodeAt(parser.index);

    if (hi < 0xd800 || hi > 0xdbff) return hi;
    const succ = parser.index + 1;
    if (succ === parser.source.length) return hi;
    const lo = parser.source.charCodeAt(succ);

    if (lo < 0xdc00 || lo > 0xdfff) return hi;
    return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
}

export function consumeOpt(parser: Parser, code: number) {
    let {index} = parser;
    const hi = parser.source.charCodeAt(index++);

    if (hi >= 0xd800 && hi <= 0xdbff && index < parser.source.length) {
        const lo = parser.source.charCodeAt(index++);

        if (lo >= 0xdc00 && lo <= 0xdfff) {
            const codePoint = (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;

            if (codePoint !== code) return false;
            parser.index = index;
            parser.column += 2;
            return true;
        }
    }

    if (hi !== code) return false;
    parser.index = index;
    parser.column++;
    return true;
}

export function advanceNewline(parser: Parser, ch: number) {
    parser.index++;
    parser.column = 0;
    parser.line++;
    if (ch === Chars.CarriageReturn && hasNext(parser) &&
            parser.source.charCodeAt(parser.index) === Chars.LineFeed) {
        parser.index++;
    }
}

export function rewindOne(parser: Parser) {
    parser.index--;
    parser.column--;
}

export function rewind(parser: Parser, ch: number) {
    rewindOne(parser);
    if (ch & 0x10000) rewindOne(parser);
}
