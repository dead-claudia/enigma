import * as ESTree from "./estree";
import {Chars} from "./chars";
import {Context, Flags, Parser, OnComment, unimplemented, finishNode} from "./common";
import * as Scanner from "./scanner";
import * as Errors from "./errors";

export function create(source: string, onComment: OnComment): Parser {
    return {
        source, onComment,
        flags: Flags.Empty,
        end: source.length,
        index: 0,
        line: 1,
        column: 0,
        tokenValue: undefined,
    };
}

export function skipShebang(parser: Parser) {
    if (parser.source.length < 3 ||
            parser.source.charCodeAt(0) !== Chars.Hash ||
            parser.source.charCodeAt(1) !== Chars.Exclamation) {
        return;
    }

    let index = 2;
    let ch = parser.source.charCodeAt(index++);

    while (index < parser.source.length &&
            ch !== Chars.CarriageReturn &&
            ch !== Chars.LineFeed &&
            ch !== Chars.ParagraphSeparator &&
            ch !== Chars.LineSeparator) {
        ch = parser.source.charCodeAt(index++);
    }

    if (ch === Chars.CarriageReturn &&
            parser.source.charCodeAt(index) === Chars.LineFeed) {
        index++;
    }

    parser.line++;
    parser.index = index;
}

function parseStatementListItem(parser: Parser, context: Context): ESTree.Statement {
    // TODO
    return unimplemented();
}

export function parseBody(parser: Parser, context: Context): ESTree.Statement[] {
    Scanner.seek(parser);
    const {index, line, column} = parser;

    // Preparse for directives, so we can set strict mode while still verifying
    // the other directives are still valid.
    while (index < parser.source.length) {
        const isStrict = Scanner.scanDirective(parser);

        if (isStrict == null) break;
        if (isStrict) {
            context |= Context.Strict;
            break;
        }
        Scanner.seek(parser);
    }

    parser.index = index;
    parser.line = line;
    parser.column = column;
    const statements: ESTree.Statement[] = [];

    while (parser.index < parser.source.length) {
        statements.push(parseStatementListItem(parser, context));
        Scanner.seek(parser);
    }

    return statements;
}
