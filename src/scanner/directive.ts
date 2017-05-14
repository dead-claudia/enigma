import {Parser} from "../common";
import {Chars} from "../chars";
import * as Errors from "../errors";
import {
    hasNext, nextChar,
    advanceOne, advanceCR, advanceNewline,
    consumeAny,
} from "./common";

const enum Escape {
    None, Any,
    LegacyOctal0,
    LegacyOctal1,
    Hex0, Hex1, Hex2, Hex3,
    Unicode,
}

// This is also intentionally monolithic, since it's quickly preparsing for a "use strict"
// directive.
// TODO: skip Unicode/ASCII escapes in strings
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
        // We need to skip the quote now.
        advanceOne(parser);

        // Doing it via finite state machine is easiest here - we're only validating syntax.
        let escape = Escape.None;

        loop:
        while (hasNext(parser)) {
            const ch = nextChar(parser);
            switch (ch) {
                case Chars.CarriageReturn:
                    if (escape !== Escape.LegacyOctal0 && escape !== Escape.Any) break loop;
                    escape = Escape.None;
                    advanceCR(parser);
                    break;
                case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
                    if (escape !== Escape.LegacyOctal0 && escape !== Escape.Any) break loop;
                    escape = Escape.None;
                    advanceNewline(parser);
                    break;

                case Chars.Zero: case Chars.One: case Chars.Two: case Chars.Three:
                    switch (escape) {
                        case Escape.Any: escape = Escape.LegacyOctal1; break;
                        case Escape.LegacyOctal1: escape = Escape.LegacyOctal0; break;
                        case Escape.LegacyOctal0: escape = Escape.None; break;
                        case Escape.Hex3: escape = Escape.Hex2; break;
                        case Escape.Hex2: escape = Escape.Hex1; break;
                        case Escape.Hex1: escape = Escape.Hex0; break;
                        case Escape.Hex0: escape = Escape.None; break;
                        default: // ignore
                    }

                    advanceOne(parser);
                    break;

                case Chars.Four: case Chars.Five: case Chars.Six: case Chars.Seven:
                    switch (escape) {
                        case Escape.Any: case Escape.LegacyOctal1:
                            escape = Escape.LegacyOctal0; break;
                        case Escape.LegacyOctal0: escape = Escape.None; break;
                        case Escape.Hex3: escape = Escape.Hex2; break;
                        case Escape.Hex2: escape = Escape.Hex1; break;
                        case Escape.Hex1: escape = Escape.Hex0; break;
                        case Escape.Hex0: escape = Escape.None; break;
                        default: // ignore
                    }
                    advanceOne(parser);
                    break;

                case Chars.Eight: case Chars.Nine:
                case Chars.UpperA: case Chars.UpperB: case Chars.UpperC:
                case Chars.UpperD: case Chars.UpperE: case Chars.UpperF:
                case Chars.LowerA: case Chars.LowerB: case Chars.LowerC:
                case Chars.LowerD: case Chars.LowerE: case Chars.LowerF:
                    switch (escape) {
                        case Escape.Any: case Escape.LegacyOctal1: case Escape.LegacyOctal0:
                            escape = Escape.None; break;
                        case Escape.Hex3: escape = Escape.Hex2; break;
                        case Escape.Hex2: escape = Escape.Hex1; break;
                        case Escape.Hex1: escape = Escape.Hex0; break;
                        case Escape.Hex0: escape = Escape.None; break;
                        case Escape.LegacyOctal0: escape = Escape.None; break;
                        default: // ignore
                    }
                    advanceOne(parser);
                    break;

                case Chars.Backslash:
                    // TODO: file a TS bug - this cast should be unnecessary.
                    escape = (escape as Escape) === Escape.Any ? Escape.None : Escape.Any;
                    advanceOne(parser);
                    break;

                case Chars.UpperX: case Chars.LowerX:
                    if (escape === Escape.Any) escape = Escape.Hex1;
                    advanceOne(parser);
                    break;

                case Chars.UpperU: case Chars.LowerU:
                    if (escape === Escape.Any) escape = Escape.Hex3;
                    advanceOne(parser);
                    break;

                case Chars.LeftBrace:
                    if (escape === Escape.Hex3) escape = Escape.Unicode;
                    else if (escape === Escape.Any) escape = Escape.None;
                    advanceOne(parser);
                    break;

                case Chars.DoubleQuote: case Chars.SingleQuote:
                    if (escape === Escape.None && ch === quote) return false;
                    // falls through

                default:
                    escape = Escape.None;
                    consumeAny(parser);
            }
        }

        return Errors.report(start, line, column, Errors.unterminatedTokenString());
    }
}
