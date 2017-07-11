import {
    T_Node, CommentType, Comment, AssignmentProperty, Property,
    Literal, RegExpLiteral,
} from "../src/estree";

// Overloads to avoid a bunch of annoying casts
export function n(type: "Property", opts: Partial<AssignmentProperty>): AssignmentProperty;
export function n(type: "Property", opts: Partial<Property>): Property;
export function n(type: "Literal", opts: Partial<RegExpLiteral>): RegExpLiteral;
export function n(type: "Literal", opts: Partial<Literal>): Literal;

export function n(type: CommentType, opts: Partial<Comment>): Comment;
export function n<T extends keyof T_Node>(type: T, opts?: Partial<T_Node[T]>): T_Node[T];

export function n(type: string, opts?: any): any {
    if (opts == null) return {type};
    opts.type = type;
    return opts;
}
