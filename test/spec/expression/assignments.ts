import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Assignments", () => {

    it("should parse \"x = 0\"", () => {
        expect(parseScript("x = 0")).to.eql({
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
        expect(parseScript("(a)=(0);")).to.eql({
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
        expect(parseScript("x = 0")).to.eql({
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
        expect(parseScript("x %= 0")).to.eql({
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
        expect(parseScript("x **= 0")).to.eql({
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
        expect(parseScript("x <<= 0")).to.eql({
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
        expect(parseScript("x &= 0")).to.eql({
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
        expect(parseScript("x ^= 0")).to.eql({
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
        expect(parseScript("x |= 0")).to.eql({
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
        expect(parseScript("((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0"))
        /* tslint:enable max-line-length */
        .to.eql({
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

    it("should parse \"a.a\"", () => {
        expect(parseScript("a.a")).to.eql({
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
        expect(parseScript("((((((((((((((((((((((((((((((((((((((((a.a)))))))))))))))))))))))))))))))))))))))) = 0"))
        /* tslint:enable max-line-length */
        .to.eql({
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
        });
    });

    it("should parse \"[0].length = 0\"", () => {
        expect(parseScript("[0].length = 0")).to.eql({
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
        expect(parseScript("([0].length) = 0")).to.eql({
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
        expect(parseScript("(a**b).c=0")).to.eql({
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
        expect(parseScript("x = 42")).to.eql({
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
        expect(parseScript("eval = 42")).to.eql({
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
        expect(parseScript("arguments = 42")).to.eql({
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
        expect(parseScript("x *= 42")).to.eql({
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
        expect(parseScript("x /= 42")).to.eql({
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
        expect(parseScript("x %= 42")).to.eql({
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
        expect(parseScript("x += 42")).to.eql({
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
        expect(parseScript("x -= 42")).to.eql({
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
        expect(parseScript("x <<= 42")).to.eql({
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
        expect(parseScript("x >>= 42")).to.eql({
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
        expect(parseScript("x >>>= 42")).to.eql({
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
        expect(parseScript("x &= 42")).to.eql({
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
        expect(parseScript("x ^= 42")).to.eql({
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
        expect(parseScript("x |= 42")).to.eql({
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
