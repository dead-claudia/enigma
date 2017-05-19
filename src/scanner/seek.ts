import {Chars} from "../chars";
import {Parser, Context} from "../common";
import * as Errors from "../errors";
import {
    advanceNewline, advanceOne,
    consumeAny, consumeLineFeed, consumeOpt,
    hasNext, nextChar,
} from "./common";
import {isIDStart} from "../unicode-generated";

// Skip initial BOM and/or shebang.
export function skipMeta(parser: Parser) {
    let index = parser.index;
    if (index === parser.source.length) return;
    if (parser.source.charCodeAt(index) === Chars.ByteOrderMark) {
        index++;
        parser.index = index;
    }

    if (index < parser.source.length &&
            parser.source.charCodeAt(index) === Chars.Hash) {
        index++;
        if (index < parser.source.length &&
                parser.source.charCodeAt(index) === Chars.Exclamation) {
            parser.index = index + 1;
            skipToNewline(parser, SeekState.None);
        }
    }
}

/*
 * The token seeking mechanism is structured as a large finite state machine with three main groups,
 * one for single line comments, one for block comments, and one for HTML and general whitespace.
 * It is designed that way to ensure speed and maximize branch prediction.
 *
 * `seek()` is called between literally every token, so it must be fast.
 */

/**
 * The result of seeking, whether it skipped anything and whether it skipped whitespace.
 */
export const enum Seek {
    None, SameLine, NewLine,
}

/**
 * A set of flags for maintaining the internal state machine.
 */
const enum SeekState {
    None = 0,
    NewLine = 1 << 0,
    SameLine = 1 << 1,
    LastIsCR = 1 << 2,
}

function skipToNewline(parser: Parser, state: SeekState): SeekState {
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.CarriageReturn:
                advanceNewline(parser);
                if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) parser.index++;
                return state | SeekState.NewLine;

            case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                advanceNewline(parser);
                return state | SeekState.NewLine;

            default:
                consumeAny(parser);
        }
    }

    return state;
}

function skipBlockComment(parser: Parser, state: SeekState): SeekState {
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.Asterisk:
                advanceOne(parser);
                state &= ~SeekState.LastIsCR;
                if (consumeOpt(parser, Chars.Slash)) return state;
                break;

            case Chars.CarriageReturn:
                state |= SeekState.NewLine | SeekState.LastIsCR;
                advanceNewline(parser);
                break;

            case Chars.LineFeed:
                consumeLineFeed(parser, (state & SeekState.LastIsCR) !== 0);
                state = state & ~SeekState.LastIsCR | SeekState.NewLine;
                break;

            case Chars.LineSeparator: case Chars.ParagraphSeparator:
                state = state & ~SeekState.LastIsCR | SeekState.NewLine;
                advanceNewline(parser);
                break;

            default:
                state &= ~SeekState.LastIsCR;
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
                state = state & ~SeekState.LastIsCR | SeekState.NewLine;
                break;

            case Chars.LineSeparator: case Chars.ParagraphSeparator:
                state = state & ~SeekState.LastIsCR | SeekState.NewLine;
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

            /* normal comments */
            case Chars.Slash: {
                state |= SeekState.SameLine;
                advanceOne(parser);
                if (!hasNext(parser)) break loop;
                const next = nextChar(parser);
                if (next === Chars.Slash) {
                    advanceOne(parser);
                    state = skipToNewline(parser, state);
                } else if (next === Chars.Asterisk) {
                    advanceOne(parser);
                    state = skipBlockComment(parser, state);
                }
                break;
            }

            /* HTML single line comment */
            case Chars.LessThan: {
                if (context & Context.Module) break loop;
                const {index} = parser;
                advanceOne(parser); // skip `<`
                if (consumeOpt(parser, Chars.Exclamation) &&
                        consumeOpt(parser, Chars.Hyphen) &&
                        consumeOpt(parser, Chars.Hyphen)) {
                    state = skipToNewline(parser, state);
                    break;
                }
                parser.index = index;
                break loop;
            }

            /* HTML close */
            case Chars.Hyphen: {
                if (context & Context.Module || !(state & SeekState.NewLine)) break loop;
                const {index} = parser;
                advanceOne(parser); // skip `-`
                if (consumeOpt(parser, Chars.Hyphen) &&
                        consumeOpt(parser, Chars.GreaterThan)) {
                    state = skipToNewline(parser, state);
                    break;
                } else {
                    parser.index = index;
                    break loop;
                }
            }

            default: break loop;
        }
    }

    if (state & SeekState.NewLine) return Seek.NewLine;
    if (state & SeekState.SameLine) return Seek.SameLine;
    return Seek.None;
}
