import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Destructing - Binding Patterns", () => {
    describe("Object", () => {

        it("should parse \"try {} catch ({e: x.a}) {}\"", () => {
            parseScript("try {} catch ({e: x.a}) {}");
        });

        it("should parse \"var {a: b.c} = 0;\"", () => {
            parseScript("var {a: b.c} = 0;");
        });

        it("should parse \"function* a({e: a.b}) {}\"", () => {
            parseScript("function* a({e: a.b}) {}");
        });

        it("should parse \"({e: a.b}) => 0\"", () => {
            parseScript("({e: a.b}) => 0");
        });

        it("should parse \"(function* ({e: a.b}) {})\"", () => {
            parseScript("(function* ({e: a.b}) {})");
        });

        it("should parse \"({a({e: a.b}){}})\"", () => {
            parseScript("({a({e: a.b}){}})");
        });

        it("should parse \"let {a:{}} = 0\"", () => {
            assert.match<Program>(parseScript("let {a:{}} = 0"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
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
                                                type: "ObjectPattern",
                                                properties: [],
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"for (let {x: y = let};;) {}\"", () => {
            assert.match<Program>(parseScript("for (let {x: y = let};;) {}"), {
                type: "Program",
                body: [
                    {
                        type: "ForStatement",
                        init: {
                            type: "VariableDeclaration",
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    id: {
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
                                                        name: "let",
                                                    },
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: false,
                                            },
                                        ],
                                    },
                                    init: null,
                                },
                            ],
                            kind: "let",
                        },
                        test: null,
                        update: null,
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"function a({}) {}\"", () => {
            assert.match<Program>(parseScript("function a({}) {}"), {
                type: "Program",
                body: [
                    {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "a",
                        },
                        params: [
                            {
                                type: "ObjectPattern",
                                properties: [],
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

        it("should parse \"let {} = 0\"", () => {
            assert.match<Program>(parseScript("let {} = 0"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ObjectPattern",
                                    properties: [],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"for (let {} in 0);\"", () => {
            assert.match<Program>(parseScript("for (let {} in 0);"), {
                type: "Program",
                body: [
                    {
                        type: "ForInStatement",
                        left: {
                            type: "VariableDeclaration",
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "ObjectPattern",
                                        properties: [],
                                    },
                                    init: null,
                                },
                            ],
                            kind: "let",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                        body: {
                            type: "EmptyStatement",
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"let {a,} = 0\"", () => {
            assert.match<Program>(parseScript("let {a,} = 0"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
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
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"try { } catch ({}) {}\"", () => {
            assert.match<Program>(parseScript("try { } catch ({}) {}"), {
                type: "Program",
                body: [
                    {
                        type: "TryStatement",
                        block: {
                            type: "BlockStatement",
                            body: [],
                        },
                        handler: {
                            type: "CatchClause",
                            param: {
                                type: "ObjectPattern",
                                properties: [],
                            },
                            body: {
                                type: "BlockStatement",
                                body: [],
                            },
                        },
                        finalizer: null,
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"for (let {} in 0);\"", () => {
            assert.match<Program>(parseScript("for (let {} in 0);"), {
                type: "Program",
                body: [
                    {
                        type: "ForInStatement",
                        left: {
                            type: "VariableDeclaration",
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "ObjectPattern",
                                        properties: [],
                                    },
                                    init: null,
                                },
                            ],
                            kind: "let",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                        body: {
                            type: "EmptyStatement",
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"for (var {x, y} in z);\"", () => {
            assert.match<Program>(parseScript("for (var {x, y} in z);"), {
                type: "Program",
                body: [
                    {
                        type: "ForInStatement",
                        left: {
                            type: "VariableDeclaration",
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    id: {
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
                                                    type: "Identifier",
                                                    name: "x",
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
                                                    type: "Identifier",
                                                    name: "y",
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: true,
                                            },
                                        ],
                                    },
                                    init: null,
                                },
                            ],
                            kind: "var",
                        },
                        right: {
                            type: "Identifier",
                            name: "z",
                        },
                        body: {
                            type: "EmptyStatement",
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var [{a = 0}] = 0;\"", () => {
            assert.match<Program>(parseScript("var [{a = 0}] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
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
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var [{__proto__:a, __proto__:b}] = 0;\"", () => {
            assert.match<Program>(parseScript("var [{__proto__:a, __proto__:b}] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "ObjectPattern",
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
                                                        name: "a",
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
                                                        type: "Identifier",
                                                        name: "b",
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: false,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var {a, x: {y: a}} = 0;\"", () => {
            assert.match<Program>(parseScript("var {a, x: {y: a}} = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
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
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            computed: false,
                                            value: {
                                                type: "ObjectPattern",
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
                                                            name: "a",
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: false,
                                                    },
                                                ],
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var a, {x: {y: a}} = 0;\"", () => {
            assert.match<Program>(parseScript("var a, {x: {y: a}} = 0;"), {
                type: "Program",
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
                            {
                                type: "VariableDeclarator",
                                id: {
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
                                                type: "ObjectPattern",
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
                                                            name: "a",
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: false,
                                                    },
                                                ],
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var {let, yield} = 0;\"", () => {
            assert.match<Program>(parseScript("var {let, yield} = 0;"), {
                body: [
                    {
                        declarations: [
                            {
                                id: {
                                    properties: [
                                        {
                                            computed: false,
                                            key: {
                                                name: "let",
                                                type: "Identifier",
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                            type: "Property",
                                            value: {
                                                name: "let",
                                                type: "Identifier",
                                            },
                                        },
                                        {
                                            computed: false,
                                            key: {
                                                name: "yield",
                                                type: "Identifier",
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                            type: "Property",
                                            value: {
                                                name: "yield",
                                                type: "Identifier",
                                            },
                                        },
                                    ],
                                    type: "ObjectPattern",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                                type: "VariableDeclarator",
                            },
                        ],
                        kind: "var",
                        type: "VariableDeclaration",
                    },
                ],
                sourceType: "script",
                type: "Program",
            });
        });

        it("should parse \"try {} catch ({e}) {}\"", () => {
            assert.match<Program>(parseScript("try {} catch ({e}) {}"), {
                type: "Program",
                body: [
                    {
                        type: "TryStatement",
                        block: {
                            type: "BlockStatement",
                            body: [],
                        },
                        handler: {
                            type: "CatchClause",
                            param: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "e",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "e",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            body: {
                                type: "BlockStatement",
                                body: [],
                            },
                        },
                        finalizer: null,
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"try {} catch ({e = 0}) {}\"", () => {
            assert.match<Program>(parseScript("try {} catch ({e = 0}) {}"), {
                type: "Program",
                body: [
                    {
                        type: "TryStatement",
                        block: {
                            type: "BlockStatement",
                            body: [],
                        },
                        handler: {
                            type: "CatchClause",
                            param: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "e",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "e",
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
                            body: {
                                type: "BlockStatement",
                                body: [],
                            },
                        },
                        finalizer: null,
                    },
                ],
                sourceType: "script",
            });
        });

    });

    describe("Array", () => {

        it("should throw on invalid \"const x, y = 12;\"", () => {
            assert.throws(SyntaxError, () => {
                parseModule(`const x, y = 12;`);
            });
        });

        it("should throw on invalid \"try { } catch ([a] = []) { }\"", () => {
            assert.throws(SyntaxError, () => {
                parseModule(`try { } catch ([a] = []) { }`);
            });
        });

        it("should throw on invalid \"let [...a] = 0;\"", () => {
            parseModule(`let [...a] = 0;`);
        });

        it("should throw on invalid \"let [...a] = 0;\"", () => {
            parseModule(`let [...a] = 0;`);
        });

        it("should throw on invalid \"var ([x]) = 0\"", () => {
            assert.throws(SyntaxError, () => {
                parseModule(`var ([x]) = 0`);
            });
        });

        it("should throw on invalid \"var [a.b] = 0\"", () => {
            assert.throws(SyntaxError, () => {
                parseModule(`var [a.b] = 0`);
            });
        });

        it("should parse \"let [a,,]=0\"", () => {
            assert.match<Program>(parseScript("let [a,,]=0"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        null,
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var [,a] = 0;\"", () => {
            assert.match<Program>(parseScript("var [,a] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        null,
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"let [a,,b]=0\"", () => {
            assert.match<Program>(parseScript("let [a,,b]=0"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        null,
                                        {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"let [...a] = 0;\"", () => {
            assert.match<Program>(parseScript("let [...a] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "RestElement",
                                            argument: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var [let] = answer;\"", () => {
            assert.match<Program>(parseScript("var [let] = answer;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "let",
                                        },
                                    ],
                                },
                                init: {
                                    type: "Identifier",
                                    name: "answer",
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"let [...[x]] = y\"", () => {
            assert.match<Program>(parseScript("let [...[x]] = y"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "RestElement",
                                            argument: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "Identifier",
                                                        name: "x",
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                },
                                init: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"let [[]]=0\"", () => {
            assert.match<Program>(parseScript("let [[]]=0"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "ArrayPattern",
                                            elements: [],
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"let [] = [];\"", () => {
            assert.match<Program>(parseScript("let [] = [];"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                                init: {
                                    type: "ArrayExpression",
                                    elements: [],
                                },
                            },
                        ],
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var [] = 0;\"", () => {
            assert.match<Program>(parseScript("var [] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"[a] = 0;\"", () => {
            assert.match<Program>(parseScript("[a] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"[...a[0]] = 0;\"", () => {
            assert.match<Program>(parseScript("[...a[0]] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "RestElement",
                                        argument: {
                                            type: "MemberExpression",
                                            computed: true,
                                            object: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                            property: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                        },
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"[a,a,,...a]=0;\"", () => {
            assert.match<Program>(parseScript("[a,a,,...a]=0;"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    null,
                                    {
                                        type: "RestElement",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"[,,]=0\"", () => {
            assert.match<Program>(parseScript("[,,]=0"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    null,
                                    null,
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var [a]=[1];\"", () => {
            assert.match<Program>(parseScript("var [a]=[1];"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    ],
                                },
                                init: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "Literal",
                                            value: 1,
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

        it("should parse \"var [[a]]=0;\"", () => {
            assert.match<Program>(parseScript("var [[a]]=0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
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
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var a, [a] = 0;\"", () => {
            assert.match<Program>(parseScript("var a, [a] = 0;"), {
                type: "Program",
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
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var [a, a] = 0;\"", () => {
            assert.match<Program>(parseScript("var [a, a] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"var [a, ...a] = 0;\"", () => {
            assert.match<Program>(parseScript("var [a, ...a] = 0;"), {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        {
                                            type: "RestElement",
                                            argument: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"try {} catch ([e]) {}\"", () => {
            assert.match<Program>(parseScript("try {} catch ([e]) {}"), {
                type: "Program",
                body: [
                    {
                        type: "TryStatement",
                        block: {
                            type: "BlockStatement",
                            body: [],
                        },
                        handler: {
                            type: "CatchClause",
                            param: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "e",
                                    },
                                ],
                            },
                            body: {
                                type: "BlockStatement",
                                body: [],
                            },
                        },
                        finalizer: null,
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"try {} catch ([e, ...a]) {}\"", () => {
            assert.match<Program>(parseScript("try {} catch ([e, ...a]) {}"), {
                type: "Program",
                body: [
                    {
                        type: "TryStatement",
                        block: {
                            type: "BlockStatement",
                            body: [],
                        },
                        handler: {
                            type: "CatchClause",
                            param: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "e",
                                    },
                                    {
                                        type: "RestElement",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                ],
                            },
                            body: {
                                type: "BlockStatement",
                                body: [],
                            },
                        },
                        finalizer: null,
                    },
                ],
                sourceType: "script",
            });
        });

        it("should throw \"function* y({yield}) {}", () => {
            assert.throws(SyntaxError, () => { parseScript("function* y({yield}) {}"); });
        });

        it("should throw \"var { this };", () => {
            assert.throws(SyntaxError, () => { parseScript("var { this };"); });
        });

        it("should throw \"([a += a] = a)", () => {
            assert.throws(SyntaxError, () => { parseScript("([a += a] = a)"); });
        });

        it("should throw \"try {} catch ({e: x.a}) {}\"", () => {
            parseScript("try {} catch ({e: x.a}) {}");
        });

        it("should throw \"({set a([a.b]){}})\"", () => {
            assert.throws(SyntaxError, () => { parseScript("({set a([a.b]){}})"); });
        });

        it("should throw \"({set a([a.b]){}})\"", () => {
            assert.throws(SyntaxError, () => { parseScript("({set a([a.b]){}})"); });
        });

        it("should throw \"function* a([a.b]) {}\"", () => {
            assert.throws(SyntaxError, () => { parseScript("function* a([a.b]) {}"); });
        });

    });
});
