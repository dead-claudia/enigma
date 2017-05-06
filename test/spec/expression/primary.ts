import { parseScript } from "../../../src";
import {expect} from "chai";
describe.skip("Expressions - Primary", () => {
    describe("Array", () => {
        it("should parse x = []", () => {
            expect(parseScript("x = []")).to.eql({
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
            expect(parseScript("x = [ ]")).to.eql({
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
            expect(parseScript("x = [ 42 ]")).to.eql({
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
            expect(parseScript("x = [ ,, 42 ]")).to.eql({
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
            expect(parseScript("日本語 = []")).to.eql({
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
            expect(parseScript("var source = \"T\u203F = []\";")).to.eql({
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
            expect(parseScript("++x")).to.eql({
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
                expect(parseScript("\"Hello\"")).to.eql({
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
            it("should parse \"HelloWorld\"", () => {
                expect(parseScript(`"Hello\
world"`)).to.eql({
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
                expect(parseScript("0")).to.eql({
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
                expect(parseScript("42")).to.eql({
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
                expect(parseScript("1.492417830e-10")).to.eql({
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
                expect(parseScript(".14")).to.eql({
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
