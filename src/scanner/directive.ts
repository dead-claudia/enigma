import {Parser} from "../common";
import {Chars} from "../chars";
import * as Errors from "../errors";
import {hasNext, nextChar, advance, advanceNewline} from "./common";

const enum DirectiveEscapeState {
    None, Any,
    LegacyOctal0,
    LegacyOctal1,
    Hex0,
    Hex1,
    Hex2,
    Hex3,
    UCS2,
    Unicode,
}

// This is also intentionally monolithic, since it's quickly preparsing for a "use strict"
// directive.
// TODO: skip Unicode/ASCII escapes
export function scanDirective(parser: Parser): boolean | void {
    const {index: start, line, column} = parser;
    let index = start;
    const raw = "";

    if (index === parser.source.length) return false;
    const quote = parser.source.charCodeAt(index++);
    if (quote !== Chars.SingleQuote && quote !== Chars.DoubleQuote) return false;

    if (index + 11 < parser.source.length &&
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
        return true;
    } else {
        let escape = DirectiveEscapeState.None;

        loop:
        while (hasNext(parser)) {
            const ch = nextChar(parser);
            switch (ch) {
                case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    if (escape !== DirectiveEscapeState.LegacyOctal0 &&
                            escape !== DirectiveEscapeState.Any) {
                        break loop;
                    }
                    escape = DirectiveEscapeState.None;
                    advanceNewline(parser, ch);
                    break;

                case Chars.Zero: case Chars.One: case Chars.Two: case Chars.Three:
                    advance(parser, ch);
                    if (escape === DirectiveEscapeState.Any) {
                        escape = DirectiveEscapeState.LegacyOctal1;
                    } else if (escape === DirectiveEscapeState.LegacyOctal1) {
                        escape = DirectiveEscapeState.LegacyOctal0;
                    } else if (escape === DirectiveEscapeState.LegacyOctal0) {
                        escape = DirectiveEscapeState.None;
                    }
                    break;

                case Chars.Four: case Chars.Five: case Chars.Six: case Chars.Seven:
                    advance(parser, ch);
                    if (escape === DirectiveEscapeState.Any) {
                        escape = DirectiveEscapeState.LegacyOctal0;
                    } else if (escape === DirectiveEscapeState.LegacyOctal0) {
                        escape = DirectiveEscapeState.None;
                    }
                    break;

                case Chars.DoubleQuote: case Chars.SingleQuote:
                    if (escape !== DirectiveEscapeState.None && ch === quote) return false;
                    escape = DirectiveEscapeState.None;
                    advance(parser, ch);
                    break;

                case Chars.Backslash:
                    advance(parser, ch);
                    if (escape === DirectiveEscapeState.Any) {
                        escape = DirectiveEscapeState.None;
                    } else {
                        escape = DirectiveEscapeState.Any;
                    }
                    break;

                case Chars.UpperX: case Chars.LowerX:
                    // TODO

                default:
                    escape = DirectiveEscapeState.None;
                    advance(parser, ch);
            }
        }

        return Errors.report(start, line, column, Errors.unterminatedTokenString());
    }
}
