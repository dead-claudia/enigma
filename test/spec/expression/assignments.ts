import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Assignments", () => {
    it("should parse \"x = 0\"", () => {
        assert.match<Program>(parseScript("x = 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a)=(0);\"", () => {
        assert.match<Program>(parseScript("(a)=(0);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x = 0\"", () => {
        assert.match<Program>(parseScript("x = 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x %= 0\"", () => {
        assert.match<Program>(parseScript("x %= 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "%=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x **= 0\"", () => {
        assert.match<Program>(parseScript("x **= 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "**=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x <<= 0\"", () => {
        assert.match<Program>(parseScript("x <<= 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "<<=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x &= 0\"", () => {
        assert.match<Program>(parseScript("x &= 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "&=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x ^= 0\"", () => {
        assert.match<Program>(parseScript("x ^= 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "^=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x |= 0\"", () => {
        assert.match<Program>(parseScript("x |= 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "|=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    /* tslint:disable max-line-length */
    it("should parse \"((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0\"", () => {
        assert.match<Program>(
            parseScript("((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0"),
            /* tslint:enable max-line-length */
            {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"a.a\"", () => {
        assert.match<Program>(parseScript("a.a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "a",
                        },
                        property: {
                            type: "Identifier",
                            name: "a",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    /* tslint:disable max-line-length */
    it("should parse \"((((((((((((((((((((((((((((((((((((((((a.a)))))))))))))))))))))))))))))))))))))))) = 0\"", () => {
        assert.match<Program>(
            parseScript("((((((((((((((((((((((((((((((((((((((((a.a)))))))))))))))))))))))))))))))))))))))) = 0"),
            /* tslint:enable max-line-length */
            {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"[0].length = 0\"", () => {
        assert.match<Program>(parseScript("[0].length = 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "ArrayExpression",
                                elements: [
                                    {
                                        type: "Literal",
                                        value: 0,
                                    },
                                ],
                            },
                            property: {
                                type: "Identifier",
                                name: "length",
                            },
                        },
                        right: {
                            type: "Literal",
                            value:  0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"([0].length) = 0\"", () => {
        assert.match<Program>(parseScript("([0].length) = 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "ArrayExpression",
                                elements: [
                                    {
                                        type: "Literal",
                                        value: 0,
                                    },
                                ],
                            },
                            property: {
                                type: "Identifier",
                                name: "length",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a**b).c=0\"", () => {
        assert.match<Program>(parseScript("(a**b).c=0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "BinaryExpression",
                                operator: "**",
                                left: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            property: {
                                type: "Identifier",
                                name: "c",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x = 42\"", () => {
        assert.match<Program>(parseScript("x = 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"eval = 42\"", () => {
        assert.match<Program>(parseScript("eval = 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "eval",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"arguments = 42\"", () => {
        assert.match<Program>(parseScript("arguments = 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "arguments",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x *= 42\"", () => {
        assert.match<Program>(parseScript("x *= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "*=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x /= 42\"", () => {
        assert.match<Program>(parseScript("x /= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "/=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x %= 42\"", () => {
        assert.match<Program>(parseScript("x %= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "%=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x += 42\"", () => {
        assert.match<Program>(parseScript("x += 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "+=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x -= 42\"", () => {
        assert.match<Program>(parseScript("x -= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "-=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x <<= 42\"", () => {
        assert.match<Program>(parseScript("x <<= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "<<=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x >>= 42\"", () => {
        assert.match<Program>(parseScript("x >>= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: ">>=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x >>>= 42\"", () => {
        assert.match<Program>(parseScript("x >>>= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: ">>>=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x &= 42\"", () => {
        assert.match<Program>(parseScript("x &= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "&=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value:  42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x ^= 42\"", () => {
        assert.match<Program>(parseScript("x ^= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "^=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x |= 42\"", () => {
        assert.match<Program>(parseScript("x |= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "|=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value:  42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
