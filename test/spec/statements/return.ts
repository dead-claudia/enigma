import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `return`", () => {
    it("should parse \"(function(){ return })\"", () => {
        assert.match<Program>(parseScript("(function(){ return })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ReturnStatement",
                                    argument: null,
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(){ return; })\"", () => {
        assert.match<Program>(parseScript("(function(){ return; })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ReturnStatement",
                                    argument: null,
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(){ return x * y })\"", () => {
        assert.match<Program>(parseScript("(function(){ return x * y })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ReturnStatement",
                                    argument: {
                                        type: "BinaryExpression",
                                        operator: "*",
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
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
