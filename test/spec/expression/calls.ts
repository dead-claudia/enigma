import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Calls", () => {
    it("should parse \"a(b,c)\"", () => {
        assert.match<Program>(parseScript("a(b,c)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
                        },
                        arguments: [
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"foo(bar, baz)\"", () => {
        assert.match<Program>(parseScript("foo(bar, baz)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "bar",
                            },
                            {
                                type: "Identifier",
                                name: "baz",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(    foo  )()\"", () => {
        assert.match<Program>(parseScript("(    foo  )()"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(...a)\"", () => {
        assert.match<Program>(parseScript("f(...a)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(...a = b)\"", () => {
        assert.match<Program>(parseScript("f(...a = b)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(...a, ...b)\"", () => {
        assert.match<Program>(parseScript("f(...a, ...b)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(a, ...b, c)\"", () => {
        assert.match<Program>(parseScript("f(a, ...b, c)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            {
                                type: "Identifier",
                                name: "c",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(...a, b, ...c)\"", () => {
        assert.match<Program>(parseScript("f(...a, b, ...c)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "c",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(....0)\"", () => {
        assert.match<Program>(parseScript("f(....0)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(.0)\"", () => {
        assert.match<Program>(parseScript("f(.0)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: 0,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(..a)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("f(..a)"); });
    });

    it("should parse \"f(....a)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("f(....a)"); });
    });

    it("should parse \"f(... ... a)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("f(... ... a)"); });
    });
});
