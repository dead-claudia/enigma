import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Objects", () => {
    it("should parse \"x + y\"", () => {
        assert.match<Program>(parseScript("({})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"+{}\"", () => {
        assert.match<Program>(parseScript("+{}"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "+",
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

    it("should parse \"+{ }\"", () => {
        assert.match<Program>(parseScript("+{ }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "+",
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

    it("should parse \"({ answer: 0 })\"", () => {
        assert.match<Program>(parseScript("({ answer: 0 })"), {
            type: "Program",
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
                                    name: "answer",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 0,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ if: 0 })\"", () => {
        assert.match<Program>(parseScript("({ if: 0 })"), {
            type: "Program",
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
                                    name: "if",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 0,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ true: 0 })\"", () => {
        assert.match<Program>(parseScript("({ true: 0 })"), {
            type: "Program",
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
                                    name: "true",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 0,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ false: 0 })\"", () => {
        assert.match<Program>(parseScript("({ false: 0 })"), {
            type: "Program",
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
                                    name: "false",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 0,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ \"answer\": 0 })\"", () => {
        assert.match<Program>(parseScript("({ \"answer\": 0 })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Literal",
                                    value: "answer",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 0,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ x: 1, x: 2 })\"", () => {
        assert.match<Program>(parseScript("({ x: 1, x: 2 })"), {
            type: "Program",
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
                                    name: "x",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 1,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 2,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ get width() { return m_width } })\"", () => {
        assert.match<Program>(parseScript("({ get width() { return m_width } })"), {
            type: "Program",
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
                                    name: "width",
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
                                                type: "ReturnStatement",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "m_width",
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "get",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ get undef() {} })\"", () => {
        assert.match<Program>(parseScript("({ get undef() {} })"), {
            type: "Program",
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
                                    name: "undef",
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
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "get",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ get true() {} })\"", () => {
        assert.match<Program>(parseScript("({ get true() {} })"), {
            type: "Program",
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
                                    name: "true",
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
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "get",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ get 10() {} })\"", () => {
        assert.match<Program>(parseScript("({ get 10() {} })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Literal",
                                    value: 10,
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
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "get",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ set width(w) { w } })\"", () => {
        assert.match<Program>(parseScript("({ set width(w) { w } })"), {
            type: "Program",
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
                                    name: "width",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                    ],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "Identifier",
                                                    name: "w",
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
            sourceType: "script",
        });
    });

    it("should parse \"({ set true(w) { w } })\"", () => {
        assert.match<Program>(parseScript("({ set true(w) { w } })"), {
            type: "Program",
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
                                    name: "true",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                    ],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "Identifier",
                                                    name: "w",
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
            sourceType: "script",
        });
    });

    it("should parse \"({ set \"null\"(w) { w } })\"", () => {
        assert.match<Program>(parseScript("({ set \"null\"(w) { w } })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Literal",
                                    value: "null",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                    ],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "Identifier",
                                                    name: "w",
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
            sourceType: "script",
        });
    });

    it("should parse \"({ set 10(w) { w } })\"", () => {
        assert.match<Program>(parseScript("({ set 10(w) { w } })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Literal",
                                    value: 10,
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                    ],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "Identifier",
                                                    name: "w",
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
            sourceType: "script",
        });
    });

    it("should parse \"({ get: 2 })\"", () => {
        assert.match<Program>(parseScript("({ get: 2 })"), {
            type: "Program",
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
                                    name: "get",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 2,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ set: 2 })\"", () => {
        assert.match<Program>(parseScript("({ set: 2 })"), {
            type: "Program",
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
                                    name: "set",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 2,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ __proto__: 2 })\"", () => {
        assert.match<Program>(parseScript("({ __proto__: 2 })"), {
            type: "Program",
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
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 2,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({\"__proto__\": 2 })\"", () => {
        assert.match<Program>(parseScript("({\"__proto__\": 2 })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Literal",
                                    value: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 2,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    /* tslint:disable max-line-length */
    it("should parse \"({ get width() { return width }, set width(width) { return width; } })\"", () => {
        /* tslint:enable max-line-length */
        assert.match<Program>(
            parseScript("({ get width() { return width }, set width(width) { return width; } })"),
            {
                type: "Program",
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
                                        name: "width",
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
                                                    type: "ReturnStatement",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "width",
                                                    },
                                                },
                                            ],
                                        },
                                        generator: false,
                                        expression: false,
                                        async: false,
                                    },
                                    kind: "get",
                                    method: false,
                                    shorthand: false,
                                },
                                {
                                    type: "Property",
                                    key: {
                                        type: "Identifier",
                                        name: "width",
                                    },
                                    computed: false,
                                    value: {
                                        type: "FunctionExpression",
                                        id: null,
                                        params: [
                                            {
                                                type: "Identifier",
                                                name: "width",
                                            },
                                        ],
                                        body: {
                                            type: "BlockStatement",
                                            body: [
                                                {
                                                    type: "ReturnStatement",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "width",
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
                sourceType: "script",
            },
        );
    });

    it("should parse \"({a})\"", () => {
        assert.match<Program>(parseScript("({a})"), {
            type: "Program",
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a, b: 0, c})\"", () => {
        assert.match<Program>(parseScript("({a, b: 0, c})"), {
            type: "Program",
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
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 0,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "c",
                                },
                                computed: false,
                                value: {
                                    type: "Identifier",
                                    name: "c",
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a, b})\"", () => {
        assert.match<Program>(parseScript("({a, b})"), {
            type: "Program",
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
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                computed: false,
                                value: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a(){}})\"", () => {
        assert.match<Program>(parseScript("({a(){}})"), {
            type: "Program",
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
                                    name: "a",
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
            sourceType: "script",
        });
    });

    it("should parse \"({a(){let a;}})\"", () => {
        assert.match<Program>(parseScript("({a(){let a;}})"), {
            type: "Program",
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
                                    name: "a",
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
                                                type: "VariableDeclaration",
                                                declarations: [
                                                    {
                                                        type: "VariableDeclarator",
                                                        id: {
                                                            type: "Identifier",
                                                            name: "a",
                                                        },
                                                        init: null,
                                                    },
                                                ],
                                                kind: "let",
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
            sourceType: "script",
        });
    });
    it("should parse \"({a(b){}})\"", () => {
        assert.match<Program>(parseScript("({a(b){}})"), {
            type: "Program",
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
                                    name: "a",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "b",
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
                                method: true,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a(b,c){}})\"", () => {
        assert.match<Program>(parseScript("({a(b,c){}})"), {
            type: "Program",
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
                                    name: "a",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "c",
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
                                method: true,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({set a(eval){}})\"", () => {
        assert.match<Program>(parseScript("({set a(eval){}})"), {
            type: "Program",
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
                                    name: "a",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "eval",
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
                                kind: "set",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ set a([{b = 0}]){}, })\"", () => {
        assert.match<Program>(parseScript("({ set a([{b = 0}]){}, })"), {
            type: "Program",
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
                                    name: "a",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "ArrayPattern",
                                            elements: [
                                                {
                                                    type: "ObjectPattern",
                                                    properties: [
                                                        {
                                                            type: "Property",
                                                            key: {
                                                                type: "Identifier",
                                                                name: "b",
                                                            },
                                                            computed: false,
                                                            value: {
                                                                type: "AssignmentPattern",
                                                                left: {
                                                                    type: "Identifier",
                                                                    name: "b",
                                                                },
                                                                right: {
                                                                    type: "Literal",
                                                                    value: 0,
                                                                },
                                                            },
                                                            kind: "init",
                                                            method: false,
                                                            shorthand: true,
                                                        },
                                                    ],
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
                                kind: "set",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ __proto__: null, get __proto__(){} })\"", () => {
        assert.match<Program>(parseScript("({ __proto__: null, get __proto__(){} })"), {
            type: "Program",
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
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
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
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "get",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ __proto__: null, __proto__(){}, })\"", () => {
        assert.match<Program>(parseScript("({ __proto__: null, __proto__(){}, })"), {
            type: "Program",
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
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
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
            sourceType: "script",
        });
    });

    it("should parse \"({ \"__proto__\": null, set __proto__(x){} })\"", () => {
        assert.match<Program>(parseScript("({ \"__proto__\": null, set __proto__(x){} })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Literal",
                                    value: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "x",
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
                                kind: "set",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ __proto__, \"__proto__\": null })\"", () => {
        assert.match<Program>(parseScript("({ __proto__, \"__proto__\": null })"), {
            type: "Program",
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
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Literal",
                                    value: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x = { y, z }\"", () => {
        assert.match<Program>(parseScript("x = { y, z }"), {
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
                                        name: "y",
                                    },
                                    computed: false,
                                    value: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: true,
                                },
                                {
                                    type: "Property",
                                    key: {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                    computed: false,
                                    value: {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: true,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
