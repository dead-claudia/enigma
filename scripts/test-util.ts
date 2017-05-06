import * as ESTree from "../src/estree";

export function n<T extends ESTree.Node | ESTree.Comment>(
    type: T["type"],
    opts?: Partial<T>,
): T {
    if (opts == null) return {type} as T;
    opts.type = type;
    return opts as T;
}
