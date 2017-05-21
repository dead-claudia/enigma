import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Primary", () => {
    describe("Array", () => {
        it("should parse x = []", () => {
            assert.match<Program>(parseScript("x = []"), {
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
                                type: "ArrayExpression",
                                elements: [],
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse x = [ ]", () => {
            assert.match<Program>(parseScript("x = [ ]"), {
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
                                type: "ArrayExpression",
                                elements: [],
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse x = [ 42 ]", () => {
            assert.match<Program>(parseScript("x = [ 42 ]"), {
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
                                type: "ArrayExpression",
                                elements: [
                                    {
                                        type: "Literal",
                                        value: 42,
                                    },
                                ],
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse x = [ ,, 42 ]", () => {
            assert.match<Program>(parseScript("x = [ ,, 42 ]"), {
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
                                type: "ArrayExpression",
                                elements: [
                                    null,
                                    null,
                                    {
                                        type: "Literal",
                                        value: 42,
                                    },
                                ],
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse 日本語 = []", () => {
            assert.match<Program>(parseScript("日本語 = []"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "Identifier",
                                name: "日本語",
                            },
                            right: {
                                type: "ArrayExpression",
                                elements: [],
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var source = T\u203F = []", () => {
            assert.match<Program>(parseScript("var source = \"T\u203F = []\";"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "source",
                                },
                                init: {
                                    type: "Literal",
                                    value: "T‿ = []",
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

    });
    describe("Keywords", () => {
        it("should parse ++x", () => {
            assert.match<Program>(parseScript("++x"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "UpdateExpression",
                            operator: "++",
                            argument: {
                                type: "Identifier",
                                name: "x",
                            },
                            prefix: true,
                        },
                    },
                ],
                sourceType: "script",
            });
        });
    });
    describe("Literal", () => {
        describe("string", () => {
            it("should parse \"Hello\"", () => {
                assert.match<Program>(parseScript("\"Hello\""), {
                    type: "Program",
                    body: [
                        {

                            type: "ExpressionStatement",
                            expression: {
                                type: "Literal",
                                value: "Hello",

                            },
                        },
                    ],
                    sourceType: "script",
                });
            });

            it("should parse \"Hello\\\\nWorld\"", () => {
                assert.match<Program>(parseScript(`"Hello\nworld"`), {
                    type: "Program",
                    body: [
                        {
                            type: "ExpressionStatement",

                            expression: {
                                type: "Literal",
                                value: "Helloworld",
                            },
                        },
                    ],
                    sourceType: "script",
                });
            });
        });

        describe("Numeric", () => {
            it("should parse 0", () => {
                assert.match<Program>(parseScript("0"), {
                    type: "Program",
                    body: [
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "Literal",
                                value:  0,
                            },
                        },
                    ],
                    sourceType: "script",
                });
            });

            it("should parse 42", () => {
                assert.match<Program>(parseScript("42"), {
                    type: "Program",
                    body: [
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "Literal",
                                value: 42,
                            },
                        },
                    ],
                    sourceType: "script",
                });
            });

            it("should parse 1.492417830e-10", () => {
                assert.match<Program>(parseScript("1.492417830e-10"), {
                    type: "Program",
                    body: [
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "Literal",
                                value: 1.49241783e-10,
                            },
                        },
                    ],
                    sourceType: "script",
                });
            });

            it("should parse .14", () => {
                assert.match<Program>(parseScript(".14"), {
                    type: "Program",
                    body: [
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "Literal",
                                value: 0.14,
                            },
                        },
                    ],
                    sourceType: "script",
                });
            });
        });
    });
});
