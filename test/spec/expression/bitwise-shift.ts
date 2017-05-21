import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Bitwise Shift", () => {
    it("should parse \"x | (x = 1)\"", () => {
        assert.match<Program>(parseScript("x | (x = 1)"), {
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
        assert.match<Program>(parseScript("({} | {})"), {
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
        assert.match<Program>(parseScript("( 1 | 1)"), {
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
        assert.match<Program>(parseScript("(true | null) === 1"), {
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
                                value:  "null",
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
