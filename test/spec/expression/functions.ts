import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Functions", () => {
    it("should parse \"(function(){})\"", () => {
        assert.match<Program>(parseScript("(function(){})"), {
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
                            body: [],
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

    it("should parse \"(function x() { y; z() });\"", () => {
        assert.match<Program>(parseScript("(function x() { y; z() });"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "x",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                },
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "z",
                                        },
                                        arguments: [],
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

    it("should parse \"(function eval() { });\"", () => {
        assert.match<Program>(parseScript("(function eval() { });"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "eval",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
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

    it("should parse \"(function arguments() { });\"", () => {
        assert.match<Program>(parseScript("(function arguments() { });"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "arguments",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
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

    it("should parse \"(function x(y, z) { })\"", () => {
        assert.match<Program>(parseScript("(function x(y, z) { })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "x",
                        },
                        params: [
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(a = b){})\"", () => {
        assert.match<Program>(parseScript("(function(a = b){})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
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
                                    type: "Identifier",
                                    name: "b",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(...a){})\"", () => {
        assert.match<Program>(parseScript("(function(...a){})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "a",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(a, ...b){})\"", () => {
        assert.match<Program>(parseScript("(function(a, ...b){})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "b",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function({a}){})\"", () => {
        assert.match<Program>(parseScript("(function({a}){})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function([a]){})\"", () => {
        assert.match<Program>(parseScript("(function([a]){})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                ],
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"label: !function(){ label:; };\"", () => {
        assert.match<Program>(parseScript("label: !function(){ label:; };"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "label",
                    },
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "UnaryExpression",
                            operator: "!",
                            argument: {
                                type: "FunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "LabeledStatement",
                                            label: {
                                                type: "Identifier",
                                                name: "label",
                                            },
                                            body: {
                                                type: "EmptyStatement",
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
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function([]){})\"", () => {
        assert.match<Program>(parseScript("(function([]){})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [],
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(a){\"use strict\"})\"", () => {
        assert.match<Program>(parseScript("(function(a){\"use strict\"})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    expression: {
                                        value: "use strict",
                                        type: "Literal",
                                    },
                                    type: "ExpressionStatement",
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

    it("should parse \"(function([]){\"use strict\"})\"", () => {
        assert.match<Program>(parseScript("(function([]){\"use strict\"})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    expression: {
                                        value: "use strict",
                                        type: "Literal",
                                    },
                                    type: "ExpressionStatement",
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

    it("should not parse \"(function(a){\"use strict\"})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(function(a, ...rest){\"use strict\"})");
        });
    });

    it("should not parse \"(function(a){\"use strict\"})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(function(a, ...[foo]){\"use strict\"})");
        });
    });

    it("should not parse \"(function([]){\"use strict\"})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(function([], ...rest){\"use strict\"})");
        });
    });

    it("should not parse \"(function([]){\"use strict\"})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(function([], ...[foo]){\"use strict\"})");
        });
    });

    it("should parse \"\"use strict\";(function([]){})\"", () => {
        assert.match<Program>(parseScript("\"use strict\";(function([]){})"), {
            type: "Program",
            body: [
                {
                    expression: {
                        value: "use strict",
                        type: "Literal",
                    },
                    type: "ExpressionStatement",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [],
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\"use strict\";(function(a){\"use strict\"})\"", () => {
        assert.match<Program>(parseScript("\"use strict\";(function(a){\"use strict\"})"), {
            type: "Program",
            body: [
                {
                    expression: {
                        value: "use strict",
                        type: "Literal",
                    },
                    type: "ExpressionStatement",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    expression: {
                                        value: "use strict",
                                        type: "Literal",
                                    },
                                    type: "ExpressionStatement",
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

    it("should parse \"\"use strict\";(function([]){\"use strict\"})\"", () => {
        assert.match<Program>(parseScript("\"use strict\";(function([]){\"use strict\"})"), {
            type: "Program",
            body: [
                {
                    expression: {
                        value: "use strict",
                        type: "Literal",
                    },
                    type: "ExpressionStatement",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    expression: {
                                        value: "use strict",
                                        type: "Literal",
                                    },
                                    type: "ExpressionStatement",
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

    it("should not parse \"\"use strict\";(function(a){\"use strict\"})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\"use strict\";(function(a, ...rest){\"use strict\"})");
        });
    });

    it("should not parse \"\"use strict\";(function(a){\"use strict\"})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\"use strict\";(function(a, ...[foo]){\"use strict\"})");
        });
    });

    it("should not parse \"\"use strict\";(function([]){\"use strict\"})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\"use strict\";(function([], ...rest){\"use strict\"})");
        });
    });

    it("should not parse \"\"use strict\";(function([]){\"use strict\"})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\"use strict\";(function([], ...[foo]){\"use strict\"})");
        });
    });
});
