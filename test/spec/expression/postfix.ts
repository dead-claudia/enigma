import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Postfix", () => {
    it("should parse \"a++\"", () => {
        assert.match<Program>(parseScript("a++"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "a",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x--\"", () => {
        assert.match<Program>(parseScript("x--"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "--",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"eval++\"", () => {
        assert.match<Program>(parseScript("eval++"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "eval",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"eval--\"", () => {
        assert.match<Program>(parseScript("eval--"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "--",
                        argument: {
                            type: "Identifier",
                            name: "eval",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"arguments++\"", () => {
        assert.match<Program>(parseScript("arguments++"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "arguments",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"arguments--\"", () => {
        assert.match<Program>(parseScript("arguments--"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "--",
                        argument: {
                            type: "Identifier",
                            name: "arguments",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
