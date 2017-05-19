import * as ESTree from "./estree";
import {Chars} from "./chars";
import * as Errors from "./errors";

/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
    Empty = 0,

    OptionsNext   = 1 << 0,
    OptionsRanges = 1 << 1,
    OptionsJSX    = 1 << 2,
    OptionsRaw    = 1 << 3,

    Strict = 1 << 8,
    Module = 1 << 9,

    ExpressionStart = 1 << 10,
}

/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
    Empty = 0,
}

/**
 * The type of the `onComment` option.
 */
export type OnComment = void | ESTree.Comment[] | (
    (type: string, value: string, start: number, end: number) => any
);

/**
 * The parser interface.
 */
export interface Parser {
    source: string;
    onComment: OnComment;

    flags: Flags;
    index: number;
    line: number;
    column: number;

    tokenValue: any;
    tokenRaw: string;

    // For the scanner to work around lack of multiple return.
    lastChar: number;
}

/**
 * A simple `unimplemented` helper.
 */
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

export function report(parser: Parser, message: string): never {
    return Errors.report(parser.index, parser.line, parser.column, message);
}
