import {Chars} from "../chars";
import {Parser, Context} from "../common";
import * as Errors from "../errors";
import {tokenDesc} from "../token";
import {hasNext, nextChar, advance} from "./common";
import {Seek, seek} from "./seek";
import {scan} from "./scan";

// This only inserts semicolons before quotes (which could mean more directives), because the parser
// is reset anyways.
export function consumeDirectiveSemicolon(parser: Parser, context: Context): boolean {
    const result = seek(parser);

    if (!hasNext(parser)) return false;
    const ch = nextChar(parser);
    switch (ch) {
        case Chars.Semicolon:
            advance(parser, ch);
            return true;

        case Chars.SingleQuote: case Chars.DoubleQuote:
            if (result & Seek.NewLine) return true;
            // falls through

        default:
            return false;
    }
}

export function consumeSemicolon(parser: Parser, context: Context) {
    const result = seek(parser);

    if (!hasNext(parser)) return;
    const ch = nextChar(parser);

    if (ch === Chars.Semicolon || ch === Chars.RightBrace) {
        advance(parser, ch);
    } else if (!(result & Seek.NewLine)) {
        Errors.report(
            parser.index, parser.line, parser.column,
            Errors.unexpectedToken(tokenDesc(scan(parser, context))),
        );
    }
}
