import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Computed Members", () => {

it("should parse \"a[b, c]\"", () => {
        expect(parseScript("a[b, c]")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                computed: true,
                object: {
                    type: "Identifier",
                    name: "a",
                },
                property: {
                    type: "SequenceExpression",
                    expressions: [
                        {
                            type: "Identifier",
                            name: "b",
                        },
                        {
                            type: "Identifier",
                            name: "c",
                        },
                    ],
                },
            },
        },
    ],
    sourceType: "script",
});
    });

it("should parse \"a[b]", () => {
        expect(parseScript("a[b]")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "MemberExpression",
                computed: true,
                object: {
                    type: "Identifier",
                    name: "a",
                },
                property: {
                    type: "Identifier",
                    name: "b",
                },
            },
        },
    ],
    sourceType: "script",
});
    });

it("should parse \"a[b] = b", () => {
        expect(parseScript("a[b] = b")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "MemberExpression",
                    computed: true,
                    object: {
                        type: "Identifier",
                        name: "a",
                    },
                    property: {
                        type: "Identifier",
                        name: "b",
                    },
                },
                right: {
                    type: "Identifier",
                    name: "b",
                },
            },
        },
    ],
    sourceType: "script",
});
    });

it("should parse \"(a[b]||(c[d]=e))", () => {
        expect(parseScript("(a[b]||(c[d]=e))")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                operator: "||",
                left: {
                    type: "MemberExpression",
                    computed: true,
                    object: {
                        type: "Identifier",
                        name: "a",
                    },
                    property: {
                        type: "Identifier",
                        name: "b",
                    },
                },
                right: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: {
                        type: "MemberExpression",
                        computed: true,
                        object: {
                            type: "Identifier",
                            name: "c",
                        },
                        property: {
                            type: "Identifier",
                            name: "d",
                        },
                    },
                    right: {
                        type: "Identifier",
                        name: "e",
                    },
                },
            },
        },
    ],
    sourceType: "script",
});
    });

it("should parse \"a&&(b=c)&&(d=e)\"", () => {
        expect(parseScript("a&&(b=c)&&(d=e)")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                operator: "&&",
                left: {
                    type: "LogicalExpression",
                    operator: "&&",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "b",
                        },
                        right: {
                            type: "Identifier",
                            name: "c",
                        },
                    },
                },
                right: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: {
                        type: "Identifier",
                        name: "d",
                    },
                    right: {
                        type: "Identifier",
                        name: "e",
                    },
                },
            },
        },
    ],
    sourceType: "script",
});
    });

});
