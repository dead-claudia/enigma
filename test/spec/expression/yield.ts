import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - `yield`", () => {
    it("should parse \"yield\"", () => {
        assert.match<Program>(parseScript("yield"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "yield",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function *a(){yield null}\"", () => {
        assert.match<Program>(parseScript("function *a(){yield null}"), {
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
                                        type: "Literal",
                                        value: "null",
                                    },
                                    delegate: false,
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

    it("should parse \"function *a(){yield void 0}\"", () => {
        assert.match<Program>(parseScript("function *a(){yield void 0}"), {
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
                                        type: "UnaryExpression",
                                        operator: "void",
                                        argument: {
                                            type: "Literal",
                                            value: 0,
                                        },
                                        prefix: true,
                                    },
                                    delegate: false,
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

    it("should parse \"function *a(){yield ~0}\"", () => {
        assert.match<Program>(parseScript("function *a(){yield ~0}"), {
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
                                        type: "UnaryExpression",
                                        operator: "~",
                                        argument: {
                                            type: "Literal",
                                            value: 0,
                                        },
                                        prefix: true,
                                    },
                                    delegate: false,
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

    it("should parse \"function *a(){yield 2e308}\"", () => {
        assert.match<Program>(parseScript("function *a(){yield 2e308}"), {
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
                                        type: "Literal",
                                        value: Infinity,
                                    },
                                    delegate: false,
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

    it("should parse \"function *a(){yield class{}}\"", () => {
        assert.match<Program>(parseScript("function *a(){yield class{}}"), {
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
                                        type: "ClassExpression",
                                        id: null,
                                        superClass: null,
                                        body: {
                                            type: "ClassBody",
                                            body: [],
                                        },
                                    },
                                    delegate: false,
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

    it("should parse \"function *a(){yield ++a;}\"", () => {
        assert.match<Program>(parseScript("function *a(){yield ++a;}"), {
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
                                        type: "UpdateExpression",
                                        operator: "++",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        prefix: true,
                                    },
                                    delegate: false,
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

    // This fails because we are not in a 'yield' context
    it("should parse \"function *a(){({set b(c){yield}})}\"", () => {
        assert.match<Program>(parseScript("function *a(){({set b(c){yield}})}"), {
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
                                    type: "ObjectExpression",
                                    properties: [
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "b",
                                            },
                                            computed: false,
                                            value: {
                                                type: "FunctionExpression",
                                                id: null,
                                                params: [
                                                    {
                                                        type: "Identifier",
                                                        name: "c",
                                                    },
                                                ],
                                                body: {
                                                    type: "BlockStatement",
                                                    body: [
                                                        {
                                                            type: "ExpressionStatement",
                                                            expression: {
                                                                type: "YieldExpression",
                                                                argument: null,
                                                                delegate: false,
                                                            },
                                                        },
                                                    ],
                                                },
                                                generator: false,
                                                expression: false,
                                                async: false,
                                            },
                                            kind: "set",
                                            method: false,
                                            shorthand: false,
                                        },
                                    ],
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

    // This fails because we are not in a 'yield' context
    it("should parse \"function *a(){({b(){yield}})}\"", () => {
        assert.match<Program>(parseScript("function *a(){({b(){yield}})}"), {
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
                                    type: "ObjectExpression",
                                    properties: [
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "b",
                                            },
                                            computed: false,
                                            value: {
                                                type: "FunctionExpression",
                                                id: null,
                                                params: [],
                                                body: {
                                                    type: "BlockStatement",
                                                    body: [
                                                        {
                                                            type: "ExpressionStatement",
                                                            expression: {
                                                                type: "YieldExpression",
                                                                argument: null,
                                                                delegate: false,
                                                            },
                                                        },
                                                    ],
                                                },
                                                generator: false,
                                                expression: false,
                                                async: false,
                                            },
                                            kind: "init",
                                            method: true,
                                            shorthand: false,
                                        },
                                    ],
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

    it("should parse \"function a(){({*[yield](){}})}\"", () => {
        assert.match<Program>(parseScript("function a(){({*[yield](){}})}"), {
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
                                    type: "ObjectExpression",
                                    properties: [
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "yield",
                                            },
                                            computed: false,
                                            value: {
                                                type: "FunctionExpression",
                                                id: null,
                                                params: [],
                                                body: {
                                                    type: "BlockStatement",
                                                    body: [],
                                                },
                                                generator: true,
                                                expression: false,
                                                async: false,
                                            },
                                            kind: "init",
                                            method: true,
                                            shorthand: false,
                                        },
                                    ],
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

    it("should parse \"function *a(){({set b(yield){}})}\"", () => {
        assert.match<Program>(parseScript("function *a(){({set b(yield){}})}"), {
            body: [
                {
                    async: false,
                    body: {
                        body: [
                            {
                                expression: {
                                    properties: [
                                        {
                                            computed: false,
                                            key: {
                                                name: "b",
                                                type: "Identifier",
                                            },
                                            kind: "set",
                                            method: false,
                                            shorthand: false,
                                            type: "Property",
                                            value: {
                                                async: false,
                                                body: {
                                                    body: [],
                                                    type: "BlockStatement",
                                                },
                                                expression: false,
                                                generator: false,
                                                id: null,
                                                params: [
                                                    {
                                                        name: "yield",
                                                        type: "Identifier",
                                                    },
                                                ],
                                                type: "FunctionExpression",
                                            },
                                        },
                                    ],
                                    type: "ObjectExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "a",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"function *a(){yield typeof 0}\"", () => {
        assert.match<Program>(parseScript("function *a(){yield typeof 0}"), {
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
                                        type: "UnaryExpression",
                                        operator: "typeof",
                                        argument: {
                                            type: "Literal",
                                            value: 0,
                                        },
                                        prefix: true,
                                    },
                                    delegate: false,
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

    it("should parse \"function*a(){yield\na}\"", () => {
        assert.match<Program>(parseScript("function *g() { yield {x} }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "g",
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
                                        type: "ObjectExpression",
                                        properties: [
                                            {
                                                type: "Property",
                                                key: {
                                                    type: "Identifier",
                                                    name: "x",
                                                },
                                                computed: false,
                                                value: {
                                                    type: "Identifier",
                                                    name: "x",
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: true,
                                            },
                                        ],
                                    },
                                    delegate: false,
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

    it("should parse \"function*a(){yield\na}\"", () => {
        assert.match<Program>(parseScript("function*a(){yield\na}"), {
            body: [
                {
                    body: {
                        body: [
                            {
                                expression: {
                                    argument: null,
                                    delegate: false,
                                    type: "YieldExpression",
                                },
                                type: "ExpressionStatement",
                            },
                            {
                                expression: {
                                    name: "a",
                                    type: "Identifier",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    async: false,
                    expression: false,
                    generator: true,
                    id: {
                        name: "a",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });
});
