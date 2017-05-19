import * as ESTree from "./estree";
import {Chars} from "./chars";
import {Context, finishNode, Flags, OnComment, Parser, unimplemented} from "./common";
import {
    consumeDirectiveSemicolon,
    Directive, hasNext, scanDirective, seek,
} from "./scanner";

/**
 * Create a new parser instance.
 */
export function create(source: string, onComment: OnComment): Parser {
    return {
        source, onComment,
        flags: Flags.Empty,
        index: 0,
        line: 1,
        column: 0,
        tokenValue: undefined,
        tokenRaw: "",
        lastChar: 0,
    };
}

function parseStatementListItem(parser: Parser, context: Context): ESTree.Statement {
    // TODO
    return unimplemented();
}

/**
 * Parse a module body, function body, script body, etc.
 */
export function parseBody(parser: Parser, context: Context): ESTree.Statement[] {
    // Capture here so we can backtrack and accept HTML comments before the initial `"use strict"`.
    const {index, line, column} = parser;
    seek(parser, context);
    if (!hasNext(parser)) return [];

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
        seek(parser, context);
        statements.push(parseStatementListItem(parser, context));
    }

    return statements;
}
