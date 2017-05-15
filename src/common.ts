import * as ESTree from "./estree";
import {Chars} from "./chars";
import * as Errors from "./errors";

export const enum Context {
    Empty = 0,

    OptionsNext   = 1 << 0,
    OptionsRanges = 1 << 1,
    OptionsJSX    = 1 << 2,

    Strict = 1 << 3,
    Module = 1 << 4,

    Expression = 1 << 5,
}

export const enum Flags {
    Empty = 0,
}

export type OnComment = void | ESTree.Comment[] | (
    (type: string, value: string, start: number, end: number) => any
);

export interface Parser {
    source: string;
    onComment: OnComment;

    flags: Flags;
    index: number;
    line: number;
    column: number;

    tokenValue: any;
}

export function unimplemented(): never {
    throw new Error("unimplemented");
}

// Note: this is intentionally ambient, since it should never be called. (It should be a guaranteed
// runtime error.)
export declare function unreachable(...values: never[]): never;

export function finishNode<T extends ESTree.Node>(
    context: Context,
    start: number,
    end: number,
    node: T,
): T {
    if (context & Context.OptionsRanges) {
        node.start = start;
        node.end = end;
    }

    return node;
}
