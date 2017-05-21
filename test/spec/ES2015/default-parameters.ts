import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - Default Parameters", () => {

it("should parse \"function f(a = 1) {}\"", () => {
        assert.match<Program>(parseScript("function f(a = 1) {}"), {
    type: "Program",
    body: [
        {
            type: "FunctionDeclaration",
            id: {
                type: "Identifier",
                name: "f",
            },
            params: [
                {
                    type: "AssignmentPattern",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "Literal",
                        value: 1,
                    },
                },
            ],
            body: {
                type: "BlockStatement",
                body: [],
            },
            generator: false,
            expression: false,
            async: false,
        },
    ],
    sourceType: "script",
});
});

it("should parse \"x = { f: function(a=1) {} }\"", () => {
        assert.match<Program>(parseScript("x = { f: function(a=1) {} }"), {
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
                    type: "ObjectExpression",
                    properties: [
                        {
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "f",
                            },
                            computed: false,
                            value: {
                                type: "FunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        right: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                    },
                                ],
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                generator: false,
                                expression: false,
                                async: false,
                            },
                            kind: "init",
                            method: false,
                            shorthand: false,
                        },
                    ],
                },
            },
        },
    ],
    sourceType: "script",
});
});

it("should parse \"x = function(y = 1) {}\"", () => {
        assert.match<Program>(parseScript("x = function(y = 1) {}"), {
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
                    type: "FunctionExpression",
                    id: null,
                    params: [
                        {
                            type: "AssignmentPattern",
                            left: {
                                type: "Identifier",
                                name: "y",
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            },
        },
    ],
    sourceType: "script",
});
});
});
