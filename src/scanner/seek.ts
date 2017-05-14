import {Chars} from "../chars";
import {Parser, Context} from "../common";
import * as Errors from "../errors";
import {
    hasNext, advance, advanceOne, consumeOpt, advanceNewline, nextChar, rewindOne,
} from "./common";
import {isIDStart} from "../unicode-generated";

export const enum Seek {
    None, SameLine, NewLine,
}

// Skip initial BOM and/or shebang.
export function skipMeta(parser: Parser) {
    if (!hasNext(parser)) return;
    if (parser.source.charCodeAt(parser.index) === Chars.ByteOrderMark) parser.index++;
    if (!consumeOpt(parser, Chars.Hash)) return;
    if (!consumeOpt(parser, Chars.Exclamation)) rewindOne(parser);
    else skipToNewline(parser);
}

function skipToNewline(parser: Parser) {
    while (hasNext(parser)) {
        const ch = nextChar(parser);
        switch (ch) {
            case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                advanceNewline(parser, ch);
                return true;

            default:
                advance(parser, ch);
        }
    }

    return false;
}

function skipBlockComment(parser: Parser): boolean {
    let result = false;

    while (hasNext(parser)) {
        const ch = nextChar(parser);
        switch (ch) {
            case Chars.Asterisk:
                advanceOne(parser);
                if (consumeOpt(parser, Chars.Slash)) return result;
                break;

            case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                result = true;
                advanceNewline(parser, ch);
                break;

            default:
                advance(parser, ch);
        }
    }

    return Errors.report(
        parser.index,
        parser.line,
        parser.column,
        Errors.unterminatedComment(),
    );
}

// This is somewhat monolithic, and the main loop handles non-comment whitespace.
// TODO: add HTML comment support (script code only)
export function seek(parser: Parser, context: Context): Seek {
    let result = Seek.None;

    while (hasNext(parser)) {
        const ch = nextChar(parser);
        switch (ch) {
            /* line terminators */
            case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                result = Seek.NewLine;
                advanceNewline(parser, ch);
                break;

            /* general whitespace */
            case Chars.Tab: case Chars.VerticalTab: case Chars.FormFeed: case Chars.Space:
            case Chars.NonBreakingSpace: case Chars.Ogham: case Chars.EnQuad: case Chars.EmQuad:
            case Chars.EnSpace: case Chars.EmSpace: case Chars.ThreePerEmSpace:
            case Chars.FourPerEmSpace: case Chars.SixPerEmSpace: case Chars.FigureSpace:
            case Chars.PunctuationSpace: case Chars.ThinSpace: case Chars.HairSpace:
            case Chars.NarrowNoBreakSpace: case Chars.MathematicalSpace:
            case Chars.IdeographicSpace: case Chars.ZeroWidthNoBreakSpace:
                if (!result) result = Seek.SameLine;
                advanceOne(parser);
                break;

            /* comments */
            case Chars.Slash: {
                if (!result) result = Seek.SameLine;
                advanceOne(parser);
                if (!hasNext(parser)) return result;
                const next = nextChar(parser);
                if (next === Chars.Slash) {
                    advanceOne(parser);
                    if (skipToNewline(parser)) result = Seek.NewLine;
                } else if (next === Chars.Asterisk) {
                    advanceOne(parser);
                    if (skipBlockComment(parser)) result = Seek.NewLine;
                }
                break;
            }

            default:
                return result;
        }
    }

    return result;
}
