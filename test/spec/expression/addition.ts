import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Addition", () => {
    it("should parse \"1+2\"", () => {
        assert.match<Program>(parseScript("1+2"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "Literal",
                            value: 1,
                        },
                        right: {
                            type: "Literal",
                            value:  2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"-1\"", () => {
        assert.match<Program>(parseScript("-1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "-",
                        argument: {
                            type: "Literal",
                            value: 1,
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x - y\"", () => {
        assert.match<Program>(parseScript("x - y"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "-",
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
});
