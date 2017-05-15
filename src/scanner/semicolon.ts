import {Chars} from "../chars";
import {Parser, Context} from "../common";
import * as Errors from "../errors";
import {tokenDesc} from "../token";
import {hasNext, nextChar, advanceOne} from "./common";
import {Seek, seek} from "./seek";
import {scan} from "./scan";

// This only inserts semicolons before quotes (which could mean more directives), because the parser
// is reset anyways.
/**
 * Attempt to consume a semicolon for directive preparsing.
 *
 * @return `true` if and only if a semicolon was consumed or inserted.
 */
export function consumeDirectiveSemicolon(parser: Parser, context: Context): boolean {
    const result = seek(parser, context);

    if (!hasNext(parser)) return false;
    switch (nextChar(parser)) {
        case Chars.Semicolon:
            advanceOne(parser);
            return true;

        case Chars.SingleQuote: case Chars.DoubleQuote:
            return result === Seek.NewLine;

        default:
            return false;
    }
}

/**
 * Consume a semicolon between tokens, optionally inserting it if necessary.
 */
export function consumeSemicolon(parser: Parser, context: Context) {
    const result = seek(parser, context);

    if (!hasNext(parser)) return;
    switch (nextChar(parser)) {
        case Chars.Semicolon: advanceOne(parser); break;
        case Chars.RightBrace: break;
        default:
            if (result === Seek.NewLine) return;
            Errors.report(
                parser.index, parser.line, parser.column,
                Errors.unexpectedToken(tokenDesc(scan(parser, context))),
            );
    }
}
