import {Parser, Context, unreachable} from "../common";
import {Chars} from "../chars";
import * as Errors from "../errors";
import {seek} from "./seek";
import {
    hasNext, nextChar,
    advanceOne, advanceNewline,
    consumeAny, consumeLineFeed,
} from "./common";

/*
 * Note:
 *
 * The directive preparser is structured as an optimized finite state machine. There is no concern
 * of nested productions because I'm only validating strings (not even parsing them), aborting with
 * everything else.
 */

const enum Escape {
    None, Any,
    LegacyOctal0,
    LegacyOctal1,
    Hex0, Hex1, Hex2, Hex3,
    UnicodeInit,
    UnicodeSucc,
}

const enum Bail {
    HexFail = Escape.UnicodeSucc + 1,
    OctalFail,
    Unterminated,
    Return,

    // Must be 1 less than the first flag member.
    Mask = 0xf,

    // Must be the first power of 2 above the last non-flag member.
    LastIsCR = 1 << 4,
}

export const enum Directive {
    None, Other, Strict,
}

function invalidHex(start: number, line: number, column: number): never {
    return Errors.report(start, line, column, Errors.invalidStringHex());
}

function isEscape(escape: Escape | Bail): escape is Escape {
    return (escape & Bail.Mask) < Bail.HexFail;
}

// Note: the lookup table is so it's just a single cache load rather than hard-to-predict
// branching.
const enum TableStart {
    // This must be kept in sync with the last Escape state.
    SegmentLength = Escape.UnicodeSucc + 1,

    LineTerminator = SegmentLength * 0,
    LowOctal       = SegmentLength * 1,
    HighOctal      = SegmentLength * 2,
    DecimalHex     = SegmentLength * 3,
    Backslash      = SegmentLength * 4,
    X              = SegmentLength * 5,
    U              = SegmentLength * 6,
    LeftBrace      = SegmentLength * 7,
    RightBrace     = SegmentLength * 8,
    Other          = SegmentLength * 9,
}

const Table = [
    /* TableStart.LineTerminator */
    Bail.Unterminated,
    Escape.None,
    Bail.OctalFail,
    Bail.OctalFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,

    /* TableStart.LowOctal */
    Escape.None,
    Escape.LegacyOctal1,
    Escape.None,
    Escape.LegacyOctal0,
    Escape.None,
    Escape.Hex0,
    Escape.Hex1,
    Escape.Hex2,
    Escape.UnicodeSucc,
    Escape.UnicodeSucc,

    /* TableStart.HighOctal */
    Escape.None,
    Escape.LegacyOctal0,
    Escape.None,
    Escape.LegacyOctal0,
    Escape.None,
    Escape.Hex0,
    Escape.Hex1,
    Escape.Hex2,
    Escape.UnicodeSucc,
    Escape.UnicodeSucc,

    /* TableStart.DecimalHex */
    Escape.None,
    Escape.None,
    Escape.None,
    Escape.None,
    Escape.None,
    Escape.Hex0,
    Escape.Hex1,
    Escape.Hex2,
    Escape.UnicodeSucc,
    Escape.UnicodeSucc,

    /* TableStart.Backslash */
    Escape.Any,
    Escape.None,
    Escape.Any,
    Escape.Any,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,

    /* TableStart.X */
    Escape.None,
    Escape.Hex1,
    Escape.None,
    Escape.None,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,

    /* TableStart.U */
    Escape.None,
    Escape.Hex3,
    Escape.None,
    Escape.None,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,

    /* TableStart.LeftBrace */
    Escape.None,
    Escape.None,
    Escape.None,
    Escape.None,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Escape.UnicodeInit,
    Bail.HexFail,
    Bail.HexFail,

    /* TableStart.RightBrace */
    Escape.None,
    Escape.None,
    Escape.None,
    Escape.None,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Escape.None,

    /* TableStart.Other */
    Escape.None,
    Escape.None,
    Escape.None,
    Escape.None,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
    Bail.HexFail,
];

// This is also intentionally monolithic, since it's quickly preparsing for a "use strict"
// directive.
export function scanDirective(parser: Parser, context: Context): Directive {
    seek(parser, context);
    const {index: start, line, column} = parser;
    let index = start;

    if (index === parser.source.length) return Directive.None;
    const quote = parser.source.charCodeAt(index++);
    if (quote !== Chars.SingleQuote && quote !== Chars.DoubleQuote) return Directive.None;

    if (index + 11 <= parser.source.length &&
            parser.source.charCodeAt(index++) === Chars.LowerU &&
            parser.source.charCodeAt(index++) === Chars.LowerS &&
            parser.source.charCodeAt(index++) === Chars.LowerE &&
            parser.source.charCodeAt(index++) === Chars.Space &&
            parser.source.charCodeAt(index++) === Chars.LowerS &&
            parser.source.charCodeAt(index++) === Chars.LowerT &&
            parser.source.charCodeAt(index++) === Chars.LowerR &&
            parser.source.charCodeAt(index++) === Chars.LowerI &&
            parser.source.charCodeAt(index++) === Chars.LowerC &&
            parser.source.charCodeAt(index++) === Chars.LowerT &&
            parser.source.charCodeAt(index++) === quote) {
        parser.index = index;
        parser.column += 12; // length of decl
        return Directive.Strict;
    } else {
        // We need to skip the quote now.
        advanceOne(parser);

        // Doing it via finite state machine is easiest here - we're only validating syntax.
        let escape = Escape.None as Escape | Bail;

        while (isEscape(escape) && hasNext(parser)) {
            const ch = nextChar(parser);

            /* line terminators */
            if (ch === Chars.CarriageReturn) {
                advanceNewline(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.LineTerminator] | Bail.LastIsCR;
            } else if (ch === Chars.LineFeed) {
                consumeLineFeed(parser, (escape & Bail.LastIsCR) !== 0);
                escape = Table[(escape & Bail.Mask) + TableStart.LineTerminator];
            } else if (ch === Chars.LineSeparator || ch === Chars.ParagraphSeparator) {
                advanceNewline(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.LineTerminator];
            } else if (ch >= Chars.Zero && ch <= Chars.Three) {
                /* low octal numbers */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.LowOctal];
            } else if (ch >= Chars.Four && ch <= Chars.Seven) {
                /* high octal numbers */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.LowOctal];
            } else if (
                ch === Chars.Eight || ch === Chars.Nine ||
                ch >= Chars.UpperA && ch <= Chars.UpperF ||
                ch >= Chars.LowerA && ch <= Chars.LowerF
            ) {
                /* decimal/hex numbers */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.DecimalHex];
            } else if (ch === Chars.Backslash) {
                /* escape start */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.Backslash];
            } else if (ch === Chars.UpperX || ch === Chars.LowerX) {
                /* ASCII escape start */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.X];
            } else if (ch === Chars.UpperU || ch === Chars.LowerU) {
                /* Unicode escape start */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.U];
            } else if (ch === Chars.LeftBrace) {
                /* Unicode variadic escape start */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.LeftBrace];
            } else if (ch === Chars.RightBrace) {
                /* Unicode variadic escape end */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.RightBrace];
            } else if (ch & 0x10000) {
                /* Anything else */
                consumeAny(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.Other];
            } else {
                /* Anything else */
                advanceOne(parser);
                escape = Table[(escape & Bail.Mask) + TableStart.Other];
                if (ch === quote && escape === Escape.None) return Directive.Other;
            }
        }

        switch (escape) {
            case Bail.HexFail:
                return Errors.report(start, line, column, Errors.invalidStringHex());

            case Bail.OctalFail:
                return Errors.report(start, line, column, Errors.invalidStringOctal());

            default:
                return Errors.report(start, line, column, Errors.unterminatedTokenString());
        }
    }
}
