import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Conditionals", () => {
    it("should parse \"a?b:c", () => {
        assert.match<Program>(parseScript("a?b:c"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ConditionalExpression",
                        test: {
                            type: "Identifier",
                            name: "a",
                        },
                        consequent: {
                            type: "Identifier",
                            name: "b",
                        },
                        alternate: {
                            type: "Identifier",
                            name: "c",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"y ? 1 : 2\"", () => {
        assert.match<Program>(parseScript("y  ? 1 : 2"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ConditionalExpression",
                        test: {
                            type: "Identifier",
                            name: "y",
                        },
                        consequent: {
                            type: "Literal",
                            value: 1,
                        },
                        alternate: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x && y\"", () => {
        assert.match<Program>(parseScript("x && y"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "LogicalExpression",
                        operator: "&&",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Identifier",
                            name: "y",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x = (0) ? 1 : 2\"", () => {
        assert.match<Program>(parseScript("x = (0) ? 1 : 2"), {
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
                            type: "ConditionalExpression",
                            test: {
                                type: "Literal",
                                value: 0,
                            },
                            consequent: {
                                type: "Literal",
                                value: 1,
                            },
                            alternate: {
                                type: "Literal",
                                value:  2,
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
