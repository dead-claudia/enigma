import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2017 - `async`", () => {
    it("should parse assigned async arrow", () => {
        assert.match<Program>(parseScript("f(a, async b => await b)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                ],
                                body: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                },
                                generator: false,
                                expression: true,
                                async: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow as parameter", () => {
        assert.match<Program>(parseScript("f(a, async (b, c) => await [b, c], d)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "ArrowFunctionExpression",
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
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "ArrayExpression",
                                        elements: [
                                            {
                                                type: "Identifier",
                                                name: "b",
                                            },
                                            {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                        ],
                                    },
                                },
                                generator: false,
                                expression: true,
                                async: true,
                            },
                            {
                                type: "Identifier",
                                name: "d",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow multi await", () => {
        assert.match<Program>(parseScript("async (a, b) => { await a }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse assigned async arrow", () => {
        assert.match<Program>(parseScript("async (a, b) => await a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                        ],
                        body: {
                            type: "AwaitExpression",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow multi args concise", () => {
        assert.match<Program>(parseScript("async (x, y) => y"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "y",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow multi args", () => {
        assert.match<Program>(parseScript("async (x, y) => { x * y }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                        ],
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
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow no args", () => {
        assert.match<Program>(parseScript("async () => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "Literal",
                            value: 42,
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow object pattern", () => {
        assert.match<Program>(parseScript("async ({x: y = z}) => x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "y",
                                            },
                                            right: {
                                                type: "Identifier",
                                                name: "z",
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "x",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow one arg await", () => {
        assert.match<Program>(parseScript("async a => { await a }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow one arg concise", () => {
        assert.match<Program>(parseScript("async a => await a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "AwaitExpression",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow one arg", () => {
        assert.match<Program>(parseScript("async x => { x * x }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
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
                                            name: "x",
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript("async (yield) => 1;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "yield",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 1,
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized", () => {
        assert.match<Program>(parseScript("async (x) => { x * x }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
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
                                            name: "x",
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow pattern parameter", () => {
        assert.match<Program>(parseScript("async ({x = y}) => z"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            right: {
                                                type: "Identifier",
                                                name: "y",
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "z",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow rest", () => {
        assert.match<Program>(parseScript("async (x, ...y) => x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "x",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow trailing comma", () => {
        assert.match<Program>(parseScript("async (x,y,) => x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "x",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow yield", () => {
        assert.match<Program>(parseScript("async yield => 0;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "yield",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 0,
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized await", () => {
        assert.match<Program>(parseScript("async (a) => { await a }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse assigned async arrow", () => {
        assert.match<Program>(parseScript("id = async x => x, square = async (y) => { y * y }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "SequenceExpression",
                        expressions: [
                            {
                                type: "AssignmentExpression",
                                operator: "=",
                                left: {
                                    type: "Identifier",
                                    name: "id",
                                },
                                right: {
                                    type: "ArrowFunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    ],
                                    body: {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    generator: false,
                                    expression: true,
                                    async: true,
                                },
                            },
                            {
                                type: "AssignmentExpression",
                                operator: "=",
                                left: {
                                    type: "Identifier",
                                    name: "square",
                                },
                                right: {
                                    type: "ArrowFunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                    ],
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
                                                        name: "y",
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
                                    async: true,
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse argument async call", () => {
        assert.match<Program>(parseScript("f(x, async(y, z))"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "async",
                                },
                                arguments: [
                                    {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript("async => 42;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "async",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 42,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript("const answer = async => 42;"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "answer",
                            },
                            init: {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "Identifier",
                                        name: "async",
                                    },
                                ],
                                body: {
                                    type: "Literal",
                                    value: 42,
                                },
                                generator: false,
                                expression: true,
                                async: false,
                            },
                        },
                    ],
                    kind: "const",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse await function name", () => {
        assert.match<Program>(parseScript("async function await() {}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "await",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<any>(parseScript("class X { static async await(){} }"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "X",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "await",
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
                                    async: true,
                                },
                                kind: "init",
                                static: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript("a = async(await);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "async",
                            },
                            arguments: [
                                {
                                    type: "Identifier",
                                    name: "await",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript("x = async(y);"), {
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
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "async",
                            },
                            arguments: [
                                {
                                    type: "Identifier",
                                    name: "y",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse label async", () => {
        assert.match<Program>(parseScript("async: function f() {}"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "async",
                    },
                    body: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "f",
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

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript(`async
x => x`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "async",
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "x",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<any>(parseScript("class X { async() {} }"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "X",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "async",
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
                                    async: false,
                                },
                                kind: "init",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript("x = { async: false }"), {
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
                                        name: "async",
                                    },
                                    computed: false,
                                    value: {
                                        type: "Literal",
                                        value: false,
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

    it("should parse async arrow parenthesized yield", () => {
        assert.match<any>(parseScript("class X { static *async() {} }"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "X",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "async",
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
                                    async: false,
                                },
                                kind: "init",
                                static: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<any>(parseScript("class X { static async() {} }"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "X",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "async",
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
                                    async: false,
                                },
                                kind: "init",
                                static: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async function expression", () => {
        assert.match<Program>(parseScript("f(async function(x) { await x })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
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
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "AwaitExpression",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "x",
                                                },
                                            },
                                        },
                                    ],
                                },
                                generator: false,
                                expression: false,
                                async: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse function async declaration", () => {
        assert.match<Program>(parseScript("async function f(a) { await a }"), {
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
                            type: "Identifier",
                            name: "a",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async function declaration", () => {
        assert.match<Program>(parseScript("async function f() {}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async function expression await", () => {
        assert.match<Program>(parseScript("f(b, async function(b) { await b }, c)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "b",
                            },
                            {
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
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "AwaitExpression",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "b",
                                                },
                                            },
                                        },
                                    ],
                                },
                                generator: false,
                                expression: false,
                                async: true,
                            },
                            {
                                type: "Identifier",
                                name: "c",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async function expression await", () => {
        assert.match<Program>(parseScript("x = async function(a) { await a }"), {
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
                                    type: "Identifier",
                                    name: "a",
                                },
                            ],
                            body: {
                                type: "BlockStatement",
                                body: [
                                    {
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "AwaitExpression",
                                            argument: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                        },
                                    },
                                ],
                            },
                            generator: false,
                            expression: false,
                            async: true,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async function expression named await", () => {
        assert.match<Program>(parseScript("x = async function f(a) { await a }"), {
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
                            id: {
                                type: "Identifier",
                                name: "f",
                            },
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
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "AwaitExpression",
                                            argument: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                        },
                                    },
                                ],
                            },
                            generator: false,
                            expression: false,
                            async: true,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async function expression", () => {
        assert.match<Program>(parseScript("a = async function() {}"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "FunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                            },
                            generator: false,
                            expression: false,
                            async: true,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async if await", () => {
        assert.match<Program>(parseScript("if (x) async function f(a) { await a }"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "x",
                    },
                    consequent: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "f",
                        },
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
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript("var async; async = 3;"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "async",
                            },
                            init: null,
                        },
                    ],
                    kind: "var",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "async",
                        },
                        right: {
                            type: "Literal",
                            value: 3,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async if", () => {
        assert.match<Program>(parseScript("if (x) async function f() {}"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "x",
                    },
                    consequent: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "f",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse inner function async", () => {
        assert.match<Program>(parseScript("(function(x) { async function inner() { await x } })"), {
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
                                name: "x",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "FunctionDeclaration",
                                    id: {
                                        type: "Identifier",
                                        name: "inner",
                                    },
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "x",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
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

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(parseScript("({ async f(a) { await a } })"), {
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
                                    name: "f",
                                },
                                computed: false,
                                value: {
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
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "a",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
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

    it("should parse async arrow rest\"", () => {
        assert.match<Program>(parseScript("async (x, ...y) => x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "x",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow yield\"", () => {
        assert.match<Program>(parseScript("async yield => 0;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "yield",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 0,
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async function foo() { }\"", () => {
        assert.match<Program>(parseScript("async function foo() { }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse arrow last param\"", () => {
        assert.match<Program>(parseScript("f(a, async b => await b)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                ],
                                body: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                },
                                generator: false,
                                expression: true,
                                async: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var ok = async(x)\"", () => {
        assert.match<Program>(parseScript("var ok = async(x)"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "ok",
                            },
                            init: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "async",
                                },
                                arguments: [
                                    {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(a, async(1, 2), b)\"", () => {
        assert.match<Program>(parseScript("f(a, async(1, 2), b)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "async",
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: 1,
                                    },
                                    {
                                        type: "Literal",
                                        value: 2,
                                    },
                                ],
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function() { var async; async = 10 })\"", () => {

        assert.match<Program>(parseScript("var foo = async function(promise) { await promise; }"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "foo",
                            },
                            init: {
                                type: "FunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "Identifier",
                                        name: "promise",
                                    },
                                ],
                                body: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "AwaitExpression",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "promise",
                                                },
                                            },
                                        },
                                    ],
                                },
                                generator: false,
                                expression: false,
                                async: true,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"f(a, async promise => await promise)\"", () => {

        assert.match<Program>(parseScript("f(a, async promise => await promise)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "Identifier",
                                        name: "promise",
                                    },
                                ],
                                body: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "promise",
                                    },
                                },
                                generator: false,
                                expression: true,
                                async: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var foo = async function(promise) { await promise; }\"", () => {

        assert.match<Program>(parseScript("var foo = async function(promise) { await promise; }"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "foo",
                            },
                            init: {
                                type: "FunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "Identifier",
                                        name: "promise",
                                    },
                                ],
                                body: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "AwaitExpression",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "promise",
                                                },
                                            },
                                        },
                                    ],
                                },
                                generator: false,
                                expression: false,
                                async: true,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(x) { async function inner() { await x } })\"", () => {

        assert.match<Program>(parseScript("(function(x) { async function inner() { await x } })"), {
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
                                name: "x",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "FunctionDeclaration",
                                    id: {
                                        type: "Identifier",
                                        name: "inner",
                                    },
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "x",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
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

    it("should parse \"async x => x\"", () => {

        assert.match<Program>(parseScript("async x => x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "x",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async function foo(promise) { await promise; }\"", () => {
        assert.match<Program>(parseScript("async function foo(promise) { await promise; }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "promise",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "promise",
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(x) { async function inner() { await x } })\"", () => {

        assert.match<Program>(parseScript("(function(x) { async function inner() { await x } })"), {
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
                                name: "x",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "FunctionDeclaration",
                                    id: {
                                        type: "Identifier",
                                        name: "inner",
                                    },
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "x",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
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

    it("should parse \"async\\nfunction foo() { }\"", () => {
        assert.match<Program>(parseScript("async\nfunction foo() { }"), {
            body: [
                {
                    async: true,
                    body: {
                        body: [],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "foo",
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

    it("should parse \"async function await() { }\"", () => {
        assert.match<Program>(parseScript("async function await() { }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "await",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse arrow parenthesized", () => {
        assert.match<Program>(parseScript("async (x) => { x * x }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
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
                                            name: "x",
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow one arg\"", () => {
        assert.match<Program>(parseScript("async x => { x * x }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
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
                                            name: "x",
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse parenthesized await", () => {
        assert.match<Program>(parseScript("async (a) => { await a }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse arrow parenthesized concise\"", () => {
        assert.match<Program>(parseScript("async (y) => y"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "y",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "y",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse arrow parenthesized yield\"", () => {
        assert.match<Program>(parseScript("async (yield) => 1;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "yield",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 1,
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse async arrow yield\"", () => {
        assert.match<Program>(parseScript("async yield => 0;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "yield",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 0,
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(async function foo() { })\"", () => {
        assert.match<Program>(parseScript("(async function foo() { })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "foo",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async a => a\"", () => {
        assert.match<Program>(parseScript("async a => a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "a",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async () => a\"", () => {
        assert.match<Program>(parseScript("async () => a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "Identifier",
                            name: "a",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async (a, b) => a\"", () => {
        assert.match<Program>(parseScript("async (a, b) => a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "a",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async (await)\"", () => {
        assert.match<Program>(parseScript("async (await)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "async",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "await",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async yield => 1\"", () => {
        assert.match<Program>(parseScript("async yield => 1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "yield",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 1,
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async function foo(a, b) { await a + await b }\"", () => {
        assert.match<Program>(parseScript("async function foo(a, b) { await a + await b }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "a",
                        },
                        {
                            type: "Identifier",
                            name: "b",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                    right: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function foo() { await + 1 }\"", () => {
        assert.match<Program>(parseScript("function foo() { await + 1 }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "Identifier",
                                        name: "await",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 1,
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

    it("should parse \"async function foo() { await + 1 }\"", () => {
        assert.match<Program>(parseScript("async function foo() { await + 1 }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "UnaryExpression",
                                        operator: "+",
                                        argument: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                        prefix: true,
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async function foo(a = async function foo() { await b }) {}\"", () => {
        assert.match<Program>(
            parseScript("async function foo(a = async function foo() { await b }) {}"),
            {
                type: "Program",
                body: [
                    {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "foo",
                        },
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                right: {
                                    type: "FunctionExpression",
                                    id: {
                                        type: "Identifier",
                                        name: "foo",
                                    },
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "b",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
                                },
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"async function foo(a = async () => await b) {}\"", () => {
        assert.match<Program>(parseScript("async function foo(a = async () => await b) {}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "AssignmentPattern",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                },
                                generator: false,
                                expression: true,
                                async: true,
                            },
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"if (x) async function f() {}\"", () => {
        assert.match<Program>(parseScript("if (x) async function f() {}"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "x",
                    },
                    consequent: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "f",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(x) { async function inner() { await x } })\"", () => {

        assert.match<Program>(parseScript("(function(x) { async function inner() { await x } })"), {
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
                                name: "x",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "FunctionDeclaration",
                                    id: {
                                        type: "Identifier",
                                        name: "inner",
                                    },
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "x",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
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

    it("should parse \"async ({a = b}) => a\"", () => {
        assert.match<Program>(parseScript("async ({a = b}) => a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "a",
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    // TODO! This has no body and should fail, not pass!!
    it("should parse \"async ({a: b = c}) =>\"", () => {
        assert.match<Program>(parseScript("async ({a: b = c}) =>"), {
            body: [
                {
                    expression: {
                        async: true,
                        body: {
                            name: "c",
                            type: "Identifier",
                        },
                        expression: true,
                        generator: false,
                        id: null,
                        params: [
                            {
                                properties: [
                                    {
                                        computed: false,
                                        key: {
                                            name: "a",
                                            type: "Identifier",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                        type: "Property",
                                        value: {
                                            left: {
                                                name: "b",
                                                type: "Identifier",
                                            },
                                            right: {
                                                name: "c",
                                                type: "Identifier",
                                            },
                                            type: "AssignmentPattern",
                                        },
                                    },
                                ],
                                type: "ObjectPattern",
                            },
                        ],
                        type: "ArrowFunctionExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"async ({a: b = c})\"", () => {
        assert.match<Program>(parseScript("async ({a: b = c})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "async",
                        },
                        arguments: [
                            {
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
                                            type: "AssignmentExpression",
                                            operator: "=",
                                            left: {
                                                type: "Identifier",
                                                name: "b",
                                            },
                                            right: {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async\na => a\"", () => {
        assert.match<Program>(parseScript("async\na => a"), {
            body: [
                {
                    expression: {
                        name: "async",
                        type: "Identifier",
                    },
                    type: "ExpressionStatement",
                },
                {
                    expression: {
                        async: false,
                        body: {
                            name: "a",
                            type: "Identifier",
                        },
                        expression: true,
                        generator: false,
                        id: null,
                        params: [
                            {
                                name: "a",
                                type: "Identifier",
                            },
                        ],
                        type: "ArrowFunctionExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"({async foo() { }})\"", () => {
        assert.match<Program>(parseScript("({async foo() { }})"), {
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
                                    name: "foo",
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
                                    async: true,
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

    it("should parse \"({async() { }})\"", () => {
        assert.match<Program>(parseScript("({async() { }})"), {
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
                                    name: "async",
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

    it("should parse \"({async await() { }})\"", () => {
        assert.match<Program>(parseScript("({async await() { }})"), {
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
                                    name: "await",
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
                                    async: true,
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

    it("should parse \"class A {async foo() { }}\"", () => {
        assert.match<any>(parseScript("class A {async foo() { }}"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "foo",
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
                                    async: true,
                                },
                                kind: "init",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {static async() { }}\"", () => {
        assert.match<any>(parseScript("class A {static async() { }}"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "async",
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
                                    async: false,
                                },
                                kind: "init",
                                static: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {*async() { }}\"", () => {
        assert.match<any>(parseScript("class A {*async() { }}"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "async",
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
                                    async: false,
                                },
                                kind: "init",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {async await() { }}\"", () => {
        assert.match<any>(parseScript("class A {async await() { }}"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "await",
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
                                    async: true,
                                },
                                kind: "init",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"await\"", () => {
        assert.match<Program>(parseScript("await"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "await",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\"async function foo(a, b) { await a }\"", () => {
        assert.match<Program>(parseScript("async function foo(a, b) { await a }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "a",
                        },
                        {
                            type: "Identifier",
                            name: "b",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async function foo(a) { await a })\"", () => {
        assert.match<Program>(parseScript("async function foo(a) { await a })"), {
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                expression: {
                                    argument: {
                                        name: "a",
                                        type: "Identifier",
                                    },
                                    type: "AwaitExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "foo",
                        type: "Identifier",
                    },
                    params: [
                        {
                            name: "a",
                            type: "Identifier",
                        },
                    ],
                    type: "FunctionDeclaration",
                },
                {
                    expression: {
                        name: "a",
                        type: "Identifier",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"(async (a) => await a)\"", () => {
        assert.match<Program>(parseScript("(async (a) => await a)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "AwaitExpression",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                        generator: false,
                        expression: true,
                        async: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({async foo(a) { await a }})\"", () => {
        assert.match<Program>(parseScript("({async foo(a) { await a }})"), {
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
                                    name: "foo",
                                },
                                computed: false,
                                value: {
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
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "a",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
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

    it("should parse \"async function foo(a, b) { await a + await b }\"", () => {
        assert.match<Program>(parseScript("async function foo(a, b) { await a + await b }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "a",
                        },
                        {
                            type: "Identifier",
                            name: "b",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                    right: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\"", () => {
        assert.match<Program>(parseScript("function foo() { await + 1 }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "Identifier",
                                        name: "await",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 1,
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

    it("should parse \"async function foo() { await + 1 }\"", () => {
        assert.match<Program>(parseScript("async function foo() { await + 1 }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "UnaryExpression",
                                        operator: "+",
                                        argument: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                        prefix: true,
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async function foo(a = async function foo() { await b }) {}\"", () => {
        assert.match<Program>(
            parseScript("async function foo(a = async function foo() { await b }) {}"),
            {
                type: "Program",
                body: [
                    {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "foo",
                        },
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                right: {
                                    type: "FunctionExpression",
                                    id: {
                                        type: "Identifier",
                                        name: "foo",
                                    },
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "b",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
                                },
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"async function foo(a = async () => await b) {}\"", () => {
        assert.match<Program>(parseScript("async function foo(a = async () => await b) {}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "AssignmentPattern",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                },
                                generator: false,
                                expression: true,
                                async: true,
                            },
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async function foo(a = {async bar() { await b }}) {}\"", () => {
        assert.match<Program>(parseScript("async function foo(a = {async bar() { await b }}) {}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "AssignmentPattern",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "ObjectExpression",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "bar",
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
                                                            type: "AwaitExpression",
                                                            argument: {
                                                                type: "Identifier",
                                                                name: "b",
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                            generator: false,
                                            expression: false,
                                            async: true,
                                        },
                                        kind: "init",
                                        method: true,
                                        shorthand: false,
                                    },
                                ],
                            },
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"async function foo(a = class {async bar() { await b }}) {}\"", () => {
        assert.match<any>(
            parseScript("async function foo(a = class {async bar() { await b }}) {}"),
            {
                type: "Program",
                body: [
                    {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "foo",
                        },
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                right: {
                                    type: "ClassExpression",
                                    id: null,
                                    superClass: null,
                                    body: {
                                        type: "ClassBody",
                                        body: [
                                            {
                                                type: "MethodDefinition",
                                                key: {
                                                    type: "Identifier",
                                                    name: "bar",
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
                                                                    type: "AwaitExpression",
                                                                    argument: {
                                                                        type: "Identifier",
                                                                        name: "b",
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    generator: false,
                                                    async: true,
                                                },
                                                kind: "init",
                                                static: false,
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"async function wrap() {\n(a = await b)\n}\"", () => {
        assert.match<Program>(parseScript("async function wrap() {\n(a = await b)\n}"), {
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                expression: {
                                    left: {
                                        name: "a",
                                        type: "Identifier",
                                    },
                                    operator: "=",
                                    right: {
                                        argument: {
                                            name: "b",
                                            type: "Identifier",
                                        },
                                        type: "AwaitExpression",
                                    },
                                    type: "AssignmentExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "wrap",
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

    it("should parse \"async function wrap() {\n({a = await b} = obj)\n}\"", () => {
        assert.match<Program>(parseScript("async function wrap() {\n({a = await b} = obj)\n}"), {
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                expression: {
                                    left: {
                                        properties: [
                                            {
                                                computed: false,
                                                key: {
                                                    name: "a",
                                                    type: "Identifier",
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: true,
                                                type: "Property",
                                                value: {
                                                    left: {
                                                        name: "a",
                                                        type: "Identifier",
                                                    },
                                                    right: {
                                                        argument: {
                                                            name: "b",
                                                            type: "Identifier",
                                                        },
                                                        type: "AwaitExpression",
                                                    },
                                                    type: "AssignmentPattern",
                                                },
                                            },
                                        ],
                                        type: "ObjectPattern",
                                    },
                                    operator: "=",
                                    right: {
                                        name: "obj",
                                        type: "Identifier",
                                    },
                                    type: "AssignmentExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "wrap",
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

    it("should parse async arrow parenthesized yield", () => {
        assert.match<Program>(
            /* tslint:disable max-line-length */
            parseScript(`f = ({ w = counter(), x = counter(), y = counter(), z = counter() } = { w: null, x: 0, y: false, z: '' }) => {}`),
            /* tslint:enable max-line-length */
            {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "Identifier",
                                name: "f",
                            },
                            right: {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "ObjectPattern",
                                            properties: [
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "w",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "AssignmentPattern",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "w",
                                                        },
                                                        right: {
                                                            type: "CallExpression",
                                                            callee: {
                                                                type: "Identifier",
                                                                name: "counter",
                                                            },
                                                            arguments: [],
                                                        },
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: true,
                                                },
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "x",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "AssignmentPattern",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "x",
                                                        },
                                                        right: {
                                                            type: "CallExpression",
                                                            callee: {
                                                                type: "Identifier",
                                                                name: "counter",
                                                            },
                                                            arguments: [],
                                                        },
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: true,
                                                },
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "y",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "AssignmentPattern",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "y",
                                                        },
                                                        right: {
                                                            type: "CallExpression",
                                                            callee: {
                                                                type: "Identifier",
                                                                name: "counter",
                                                            },
                                                            arguments: [],
                                                        },
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
                                                        type: "AssignmentPattern",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "z",
                                                        },
                                                        right: {
                                                            type: "CallExpression",
                                                            callee: {
                                                                type: "Identifier",
                                                                name: "counter",
                                                            },
                                                            arguments: [],
                                                        },
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: true,
                                                },
                                            ],
                                        },
                                        right: {
                                            type: "ObjectExpression",
                                            properties: [
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "w",
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
                                                        name: "x",
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
                                                        name: "y",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "Literal",
                                                        value: false,
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: false,
                                                },
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "z",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "Literal",
                                                        value: "",
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: false,
                                                },
                                            ],
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
            },
        );
    });

    it("should parse \"class X { async get(){} }\"", () => {
        assert.match(parseScript("class X { async get(){} }"), {});
    });

    it("should parse \"class X { static async get() {} }\"", () => {
        assert.match(parseScript("class X { static async get() {} }"), {});
    });

    it("should parse \"({async foo(a) { await a }})\"", () => {
        assert.match<Program>(parseScript("({async foo(a) { await a }})"), {
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
                                    name: "foo",
                                },
                                computed: false,
                                value: {
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
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AwaitExpression",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "a",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: true,
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

    it("should parse \"(class {async foo(a) { await a }})\"", () => {
        assert.match<any>(parseScript("(class {async foo(a) { await a }})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ClassExpression",
                        id: null,
                        superClass: null,
                        body: {
                            type: "ClassBody",
                            body: [
                                {
                                    type: "MethodDefinition",
                                    key: {
                                        type: "Identifier",
                                        name: "foo",
                                    },
                                    computed: false,
                                    value: {
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
                                                    type: "ExpressionStatement",
                                                    expression: {
                                                        type: "AwaitExpression",
                                                        argument: {
                                                            type: "Identifier",
                                                            name: "a",
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                        generator: false,
                                        async: true,
                                    },
                                    kind: "init",
                                    static: false,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function foo() { await + 1 }\"", () => {
        assert.match<Program>(parseScript("function foo() { await + 1 }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "Identifier",
                                        name: "await",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 1,
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

    it("should parse \"async function foo(a, b) { await a }\"", () => {
        assert.match<Program>(parseScript("async function foo(a, b) { await a }"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "foo",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "a",
                        },
                        {
                            type: "Identifier",
                            name: "b",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AwaitExpression",
                                    argument: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: true,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({ async: true })\"", () => {
        assert.match<Program>(parseScript("({ async: true })"), {
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
                                    name: "async",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: true,
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

    it("should throw \"async ({a = b})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("async ({a = b})");
        });
    });

    it("should throw \"(async function foo() { return {await} })\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(async function foo() { return {await} })");
        });
    });

    it("should throw \"async await => 1\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("async await => 1");
        });
    });

    it("should throw \"async ({a: await}) => 1\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("async ({a: await}) => 1");
        });
    });

    it("should throw \"async ([await]) => 1\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("async ([await]) => 1");
        });
    });

    it("should throw \"async (a = await b) => {} \"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("async (a = await b) => {} ");
        });
    });

    it("should throw \"({async foo(a = await b) {}})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("({async foo(a = await b) {}})");
        });
    });

    it("should throw \"({async foo(a = await b) {}})\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("({async foo(a = await b) {}})");
        });
    });

    it("should throw \"async function foo(a = class extends (await b) {}) {}\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("async function foo(a = class extends (await b) {}) {}");
        });
    });

    // FIXME: infinite loop
    it("should throw \"async(x = await) => {  }\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("async(x = await) => {  }");
        });
    });

    it("should throw if not subject to annex B", () => {
        assert.throws(SyntaxError, () => {
            parseScript("if (false) L: async function l() {}");
        });
    });
});
