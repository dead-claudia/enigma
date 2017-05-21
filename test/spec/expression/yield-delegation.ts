import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - `yield` Delegation", () => {
    it("should parse \"function a(){yield*a}\"", () => {
        assert.match<Program>(parseScript("function a(){yield*a}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "BinaryExpression",
                                    operator: "*",
                                    left: {
                                        type: "Identifier",
                                        name: "yield",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function*a(){yield*a}\"", () => {
        assert.match<Program>(parseScript("function*a(){yield*a}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "YieldExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    delegate: true,
                                },
                            },
                        ],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });
});
