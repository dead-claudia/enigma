import {Chars} from "../chars";
import {Parser, Context} from "../common";
import * as Errors from "../errors";
import {
    advanceNewline, advanceOne,
    consumeAny, consumeLineFeed, consumeOpt,
    hasNext, nextChar, rewindOne,
} from "./common";
import {isIDStart} from "../unicode-generated";

// Skip initial BOM and/or shebang.
export function skipMeta(parser: Parser) {
    if (!hasNext(parser)) return;
    if (parser.source.charCodeAt(parser.index) === Chars.ByteOrderMark) parser.index++;
    if (!consumeOpt(parser, Chars.Hash)) return;
    if (!consumeOpt(parser, Chars.Exclamation)) rewindOne(parser);
    else skipToNewline(parser);
}

/*
 * The token seeking mechanism is structured as a series of linked optimized finite state machines,
 * one for single line comments, one for block comments, and one for whitespace. It is designed that
 * way to ensure speed and maximize branch prediction.
 *
 * `seek()` is called between literally every token, so it must be fast.
 */

/**
 * The result of seeking, whether it skipped anything and whether it skipped whitespace.
 */
export const enum Seek {
    None, SameLine, NewLine,
}

const enum SeekState {
    None = 0,
    NewLine = 1 << 0,
    SameLine = 1 << 1,
    LastIsCR = 1 << 2,
}

function skipToNewline(parser: Parser): SeekState {
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.CarriageReturn:
                advanceNewline(parser);
                if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) parser.index++;
                return SeekState.NewLine;

            case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                advanceNewline(parser);
                return SeekState.NewLine;

            default:
                consumeAny(parser);
        }
    }

    return SeekState.None;
}

function skipBlockComment(parser: Parser): SeekState {
    let state = SeekState.None;

    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.Asterisk:
                advanceOne(parser);
                state &= SeekState.NewLine;
                if (consumeOpt(parser, Chars.Slash)) return state & SeekState.NewLine;
                break;

            case Chars.CarriageReturn:
                state |= SeekState.NewLine | SeekState.LastIsCR;
                advanceNewline(parser);
                break;

            case Chars.LineFeed:
                consumeLineFeed(parser, (state & SeekState.LastIsCR) !== 0);
                state = state & SeekState.SameLine | SeekState.NewLine;
                break;

            case Chars.LineSeparator: case Chars.ParagraphSeparator:
                state = SeekState.NewLine;
                advanceNewline(parser);
                break;

            default:
                state &= SeekState.NewLine;
                consumeAny(parser);
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
/**
 * Seek past whitespace and comments to the next token start or the end of file, whichever comes
 * first.
 */
export function seek(parser: Parser, context: Context): Seek {
    let state = SeekState.None;

    loop:
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            /* line terminators */
            case Chars.CarriageReturn:
                state |= SeekState.NewLine | SeekState.LastIsCR;
                advanceNewline(parser);
                break;

            case Chars.LineFeed:
                consumeLineFeed(parser, (state & SeekState.LastIsCR) !== 0);
                state = state & SeekState.SameLine | SeekState.NewLine;
                break;

            case Chars.LineSeparator: case Chars.ParagraphSeparator:
                state = state & SeekState.SameLine | SeekState.NewLine;
                advanceNewline(parser);
                break;

            /* general whitespace */
            case Chars.Tab: case Chars.VerticalTab: case Chars.FormFeed: case Chars.Space:
            case Chars.NonBreakingSpace: case Chars.Ogham: case Chars.EnQuad: case Chars.EmQuad:
            case Chars.EnSpace: case Chars.EmSpace: case Chars.ThreePerEmSpace:
            case Chars.FourPerEmSpace: case Chars.SixPerEmSpace: case Chars.FigureSpace:
            case Chars.PunctuationSpace: case Chars.ThinSpace: case Chars.HairSpace:
            case Chars.NarrowNoBreakSpace: case Chars.MathematicalSpace:
            case Chars.IdeographicSpace: case Chars.ZeroWidthNoBreakSpace:
                state |= SeekState.SameLine;
                advanceOne(parser);
                break;

            /* comments */
            case Chars.Slash: {
                state |= SeekState.SameLine;
                advanceOne(parser);
                if (!hasNext(parser)) break loop;
                const next = nextChar(parser);
                if (next === Chars.Slash) {
                    advanceOne(parser);
                    state |= skipToNewline(parser);
                } else if (next === Chars.Asterisk) {
                    advanceOne(parser);
                    state |= skipBlockComment(parser);
                }
                break;
            }

            default: break loop;
        }
    }

    if (state & SeekState.NewLine) return Seek.NewLine;
    if (state & SeekState.SameLine) return Seek.SameLine;
    return Seek.None;
}
