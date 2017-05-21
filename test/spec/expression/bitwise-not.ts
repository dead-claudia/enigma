import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Bitwise Not", () => {
    it("should parse \"~2147483647\"", () => {
        assert.match<Program>(parseScript("~2147483647"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "~",
                        argument: {
                            type: "Literal",
                            value: 2147483647,
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"~4294967295\"", () => {
        assert.match<Program>(parseScript("~4294967295"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "~",
                        argument: {
                            type: "Literal",
                            value: 4294967295,
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"~(function(){return 1}) === -1\"", () => {
        assert.match<Program>(parseScript("~(function(){return 1}) === -1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "===",
                        left: {
                            type: "UnaryExpression",
                            operator: "~",
                            argument: {
                                type: "FunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ReturnStatement",
                                            argument: {
                                                type: "Literal",
                                                value: 1,
                                            },
                                        },
                                    ],
                                },
                                generator: false,
                                expression: false,
                                async: false,
                            },
                            prefix: true,
                        },
                        right: {
                            type: "UnaryExpression",
                            operator: "-",
                            argument: {
                                type: "Literal",
                                value: 1,
                            },
                            prefix: true,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"~1.2345\"", () => {
        assert.match<Program>(parseScript("~1.2345"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "~",
                        argument: {
                            type: "Literal",
                            value:  1.2345,
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"~-5.4321\"", () => {
        assert.match<Program>(parseScript("~-5.4321"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "~",
                        argument: {
                            type: "UnaryExpression",
                            operator: "-",
                            argument: {
                                type: "Literal",
                                value:  5.4321,
                            },
                            prefix: true,
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"~({})\"", () => {
        assert.match<Program>(parseScript("~({})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "~",
                        argument: {
                            type: "ObjectExpression",
                            properties: [],
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

});
