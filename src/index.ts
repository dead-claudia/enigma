import * as Parser from "./parser";
import * as ESTree from "./estree";
import {OnComment, Context} from "./common";
import {Chars} from "./chars";
import {skipMeta} from "./scanner";

export interface Options {
    onComment?: OnComment;
    next?: boolean;
    ranges?: boolean;
    jsx?: boolean;
}

function parseRoot(source: string, options: Options | void, context: Context) {
    let onComment: OnComment;

    if (options != null) {
        if (options.next) context |= Context.OptionsNext;
        if (options.jsx) context |= Context.OptionsJSX;
        if (options.ranges) context |= Context.OptionsRanges;
        if (options.onComment != null) onComment = options.onComment;
    }

    const parser = Parser.create(source, onComment);
    const statements: ESTree.Statement[] = [];

    skipMeta(parser);

    const node: ESTree.Program = {
        type: "Program",
        sourceType: "script",
        body: Parser.parseBody(parser, context),
    };

    if (context & Context.OptionsRanges) {
        node.start = 0;
        node.end = source.length;
    }

    return node;
}

export function parseScript(source: string, options?: Options) {
    return parseRoot(source, options, Context.Empty);
}

export function parseModule(source: string, options?: Options) {
    return parseRoot(source, options, Context.Strict | Context.Module);
}
