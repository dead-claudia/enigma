import * as ESTree from "./estree";
import {Chars} from "./chars";
import {Context, Flags, Parser, OnComment, unimplemented, finishNode} from "./common";
import {
    hasNext, seek,
    scanDirective, Directive,
    consumeDirectiveSemicolon, consumeSemicolon,
} from "./scanner";
import * as Errors from "./errors";

export function create(source: string, onComment: OnComment): Parser {
    return {
        source, onComment,
        flags: Flags.Empty,
        index: 0,
        line: 1,
        column: 0,
        tokenValue: undefined,
    };
}

function parseStatementListItem(parser: Parser, context: Context): ESTree.Statement {
    // TODO
    return unimplemented();
}

export function parseBody(parser: Parser, context: Context): ESTree.Statement[] {
    seek(parser, context);
    if (!hasNext(parser)) return [];
    const {index, line, column} = parser;

    // Preparse for directives, so we can set strict mode while still verifying
    // the other directives are still valid.
    let directive = scanDirective(parser, context);

    if (directive === Directive.Strict) {
        context |= Context.Strict;
    } else if (directive === Directive.Other) {
        while (consumeDirectiveSemicolon(parser, context) && hasNext(parser)) {
            directive = scanDirective(parser, context);

            if (directive === Directive.None) break;
            if (directive === Directive.Strict) {
                context |= Context.Strict;
                break;
            }
        }
    }

    parser.index = index;
    parser.line = line;
    parser.column = column;
    const statements: ESTree.Statement[] = [];

    while (hasNext(parser)) {
        statements.push(parseStatementListItem(parser, context));
    }

    return statements;
}
