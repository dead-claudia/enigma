import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Bitwise Or", () => {

    it("should parse \"x | (x = 1)\"", () => {
        expect(parseScript("x | (x = 1)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "|",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "Identifier",
                                name: "x",
                            },
                            right: {
                                type: "Literal",
                                value:  1,
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({} | {})\"", () => {
        expect(parseScript("({} | {})")).to.eql({
            body: [
                {
                    expression: {
                        left: {
                            properties: [],
                            type: "ObjectExpression",
                        },
                        operator: "|",
                        right: {
                            properties: [],
                            type: "ObjectExpression",
                        },
                        type: "BinaryExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"( 1 | 1)\"", () => {
        expect(parseScript("( 1 | 1)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "|",
                        left: {
                            type: "Literal",
                            value:  1,
                        },
                        right: {
                            type: "Literal",
                            value:  1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(true | null) === 1\"", () => {
        expect(parseScript("(true | null) === 1")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "===",
                        left: {
                            type: "BinaryExpression",
                            operator: "|",
                            left: {
                                type: "Literal",
                                value: true,
                            },
                            right: {
                                type: "Literal",
                                value: "null",
                            },
                        },
                        right: {
                            type: "Literal",
                            value:  1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
