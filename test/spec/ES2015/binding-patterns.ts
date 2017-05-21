import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - Binding Patterns", () => {
    describe("Object", () => {

        it("should parse empty function", () => {
            assert.match<Program>(parseScript(`function a({}) {}`), {
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

        it("should parse ellison", () => {
            assert.match<Program>(parseScript(`let {a,} = 0`), {
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

        it("should parse empty for let in", () => {
            assert.match<Program>(parseScript(`for (let {} in 0);`), {
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

        it("should parse empty lexical", () => {
            assert.match<Program>(parseScript(`let {} = 0`), {
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

        it("should parse empty function", () => {
            assert.match<Program>(parseScript(`var {} = 0`), {
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
                        kind: "var",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse empty function", () => {
            assert.match<Program>(parseScript(`for (let {x: y = let};;) {}`), {
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

        it("should parse empty function", () => {
            assert.match<Program>(parseScript(`let {a,b=0,c:d,e:f=0,[g]:[h]}=0`), {
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
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Identifier",
                                                name: "d",
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
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
                                                    name: "f",
                                                },
                                                right: {
                                                    type: "Literal",
                                                    value: 0,
                                                },
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "g",
                                            },
                                            computed: true,
                                            value: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "Identifier",
                                                        name: "h",
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
                        kind: "let",
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse empty function", () => {
            assert.match<Program>(parseScript(`for (var {x, y} in z);`), {
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

    });

    describe("Array", () => {

        it("should parse ellison", () => {
            assert.match<Program>(parseScript(`let [a,] = 0;`), {
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

        it("should parse empty pattern function", () => {
            assert.match<Program>(parseScript("function a([]) {}"), {
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
                ],
                sourceType: "script",
            });
        });

        it("should parse empty pattern lexical", () => {
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

        it("should parse empty pattern var", () => {
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

        it("should parse hole", () => {
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

        it("should parse nested pattern", () => {
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

        it("should parse rest element array pattern", () => {
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

        it("should parse rest", () => {
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

        it("should parse var for in ", () => {
            assert.match<Program>(parseScript("for (var [x, y] in z);"), {
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
                                        type: "ArrayPattern",
                                        elements: [
                                            {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            {
                                                type: "Identifier",
                                                name: "y",
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

        it("should parse var let array", () => {
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

        it("should parse with default catch param", () => {
            assert.match<Program>(parseScript("try { } catch ([a = 0]) { }"), {
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

        it("should with default function", () => {
            assert.match<Program>(parseScript("function a([a=0]) {}"), {
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
                                type: "ArrayPattern",
                                elements: [
                                    {
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
                ],
                sourceType: "script",
            });
        });

        it("should parse for let let", () => {
            assert.match<Program>(parseScript("for (let [x = let];;) {}"), {
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
                                        type: "ArrayPattern",
                                        elements: [
                                            {
                                                type: "AssignmentPattern",
                                                left: {
                                                    type: "Identifier",
                                                    name: "x",
                                                },
                                                right: {
                                                    type: "Identifier",
                                                    name: "let",
                                                },
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
    });
});
