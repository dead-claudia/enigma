import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("TC39 - Pass Explicit", () => {
    it("should parse \"o = { async 1(){} \"", () => {
        assert.match<Program>(parseScript(`o = { foo: async function(){} }`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "o",
                        },
                        right: {
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

    it("should parse \"var l = { __proto__: 12, __proto__ }\"", () => {
        assert.match<Program>(parseScript(`var l = { __proto__: 12, __proto__ }`), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "l",
                            },
                            init: {
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
                                            value: 12,
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
                                            name: "__proto__",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
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

    it("should parse \"({ x(...[ a, b ]){} })\"", () => {
        assert.match<Program>(parseScript(`({ x(...[ a, b ]){} })`), {
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
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "RestElement",
                                            argument: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "Identifier",
                                                        name: "a",
                                                    },
                                                    {
                                                        type: "Identifier",
                                                        name: "b",
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

    it("should parse \"[a = (b = c)] = (0);\"", () => {
        assert.match<Program>(parseScript(`[a = (b = c)] = (0);`), {
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
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    right: {
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

    it("should parse \"[a = (0)];\"", () => {
        assert.match<Program>(parseScript(`[a = (0)];`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
                            {
                                type: "AssignmentExpression",
                                operator: "=",
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a: b} = (0));\"", () => {
        assert.match<Program>(parseScript(`({a: b} = (0));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                        name: "b",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
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

    it("should parse \"({a: b = (0)} = (1));\"", () => {
        assert.match<Program>(parseScript(`({a: b = (0)} = (1));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                            name: "b",
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
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a: b.c} = (0));\"", () => {
        assert.match<Program>(parseScript(`({a: b.c} = (0));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                        type: "MemberExpression",
                                        computed: false,
                                        object: {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                        property: {
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

    it("should parse \"({a: b = (0)});\"", () => {
        assert.match<Program>(parseScript(`({a: b = (0)});`), {
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
                                    type: "AssignmentExpression",
                                    operator: "=",
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
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function a(...b) {}\"", () => {
        assert.match<Program>(parseScript(`function a(...b) {}`), {
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function a(...[]) {}\"", () => {
        assert.match<Program>(parseScript(`function a(...[]) {}`), {
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
                            type: "RestElement",
                            argument: {
                                type: "ArrayPattern",
                                elements: [],
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

    it("should parse \"(...a) => (0);\"", () => {
        assert.match<Program>(parseScript(`(...a) => (0);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                            type: "Literal",
                            value: 0,
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

    it("should parse \"(...[]) => (0);\"", () => {
        assert.match<Program>(parseScript(`(...[]) => (0);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "RestElement",
                                argument: {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 0,
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

    it("should parse \"(a, ...[]) => (0);\"", () => {
        assert.match<Program>(parseScript(`(a, ...[]) => (0);`), {
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
                                type: "RestElement",
                                argument: {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 0,
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

    it("should parse \"(class extends (yield) {})\" inside generator", () => {
        assert.match<Program>(parseScript(`function* a() {
    (class extends (yield) {});
}`), {
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
                                    type: "ClassExpression",
                                    id: null,
                                    superClass: {
                                        type: "YieldExpression",
                                        argument: null,
                                        delegate: false,
                                    },
                                    body: {
                                        type: "ClassBody",
                                        body: [],
                                    },
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

    it("should parse \"[a = (b = c)] = 0\"", () => {
        assert.match<Program>(parseScript(`[a = (b = c)] = 0`), {
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
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    right: {
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

    it("should parse \"[(a.b)] = 0\"", () => {
        assert.match<Program>(parseScript(`[(a.b)] = 0`), {
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
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "b",
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

    it("should parse \"function a(...[]) { }\"", () => {
        assert.match<Program>(parseScript(`function a(...[]) { }`), {
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
                            type: "RestElement",
                            argument: {
                                type: "ArrayPattern",
                                elements: [],
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

    it("should parse \"(...a) => 0\"", () => {
        assert.match<Program>(parseScript(`(...a) => 0`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                            type: "Literal",
                            value: 0,
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

    it("should parse \"(...[]) => 0\"", () => {
        assert.match<Program>(parseScript(`(...[]) => 0`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "RestElement",
                                argument: {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 0,
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

    it("should parse \"(a, ...[]) => 0\"", () => {
        assert.match<Program>(parseScript(`(a, ...[]) => 0`), {
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
                                type: "RestElement",
                                argument: {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 0,
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

    it("should parse \"9;\"", () => {
        assert.match<Program>(parseScript(`9;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 9,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"18;\"", () => {
        assert.match<Program>(parseScript(`18;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 18,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a < b) < c;\"", () => {
        assert.match<Program>(parseScript(`(a < b) < c;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "<",
                        left: {
                            type: "BinaryExpression",
                            operator: "<",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        right: {
                            type: "Identifier",
                            name: "c",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let [a, , ] = (1);\"", () => {
        assert.match<Program>(parseScript(`let [a, , ] = (1);`), {
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
                                value: 1,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [let] = (a);\"", () => {
        assert.match<Program>(parseScript(`var [let] = (a);`), {
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
                                name: "a",
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var [a, b] in c) ;\"", () => {
        assert.match<Program>(parseScript(`for (var [a, b] in c) ;`), {
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
                                            name: "a",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "b",
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
                        name: "c",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"try {} catch ([a = 1]) {}\"", () => {
        assert.match<Program>(parseScript(`try {} catch ([a = 1]) {}`), {
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
                                        value: 1,
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

    it("should parse \"function a([a = 1]) {}\"", () => {
        assert.match<Program>(parseScript(`function a([a = 1]) {}`), {
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
                                        value: 1,
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

    it("should parse \"let [{a}] = (1);\"", () => {
        assert.match<Program>(parseScript(`let [{a}] = (1);`), {
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
                            },
                            init: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let {a} = (1);\"", () => {
        assert.match<Program>(parseScript(`let {a} = (1);`), {
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
                                value: 1,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"try {} catch ({}) {}\"", () => {
        assert.match<Program>(parseScript(`try {} catch ({}) {}`), {
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

    it("should parse \"function a({}) {}\"", () => {
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

    it("should parse \"for (let {} in 1) ;\"", () => {
        assert.match<Program>(parseScript(`for (let {} in 1) ;`), {
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
                        value: 1,
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a == b;\"", () => {
        assert.match<Program>(parseScript(`a == b;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "==",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var {} = (1);\"", () => {
        assert.match<Program>(parseScript(`var {} = (1);`), {
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
                                value: 1,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let {} = (1);\"", () => {
        assert.match<Program>(parseScript(`let {} = (1);`), {
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
                                value: 1,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let {a: {}} = (1);\"", () => {
        assert.match<Program>(parseScript(`let {a: {}} = (1);`), {
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
                                value: 1,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var {a, b} in c) ;\"", () => {
        assert.match<Program>(parseScript(`for (var {a, b} in c) ;`), {
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
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "c",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class a {}\"", () => {
        assert.match<Program>(parseScript(`class a {}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class a extends (1) {}\"", () => {
        assert.match<Program>(parseScript(`class a extends (1) {}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: {
                        type: "Literal",
                        value: 1,
                    },
                    body: {
                        type: "ClassBody",
                        body: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class a {}\"", () => {
        assert.match<Program>(parseScript(`class a {}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a === b;\"", () => {
        assert.match<Program>(parseScript(`a === b;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "===",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse computed `static` class members", () => {
        assert.match<Program>(parseScript(`class a {
    static [b]() {}
    static [c]() {}
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                computed: true,
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
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "c",
                                },
                                computed: true,
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

    it("should parse \"var a = (class b extends (1) {});\"", () => {
        assert.match<Program>(parseScript(`var a = (class b extends (1) {});`), {
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
                            init: {
                                type: "ClassExpression",
                                id: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                superClass: {
                                    type: "Literal",
                                    value: 1,
                                },
                                body: {
                                    type: "ClassBody",
                                    body: [],
                                },
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"prototype()\" as an instance method", () => {
        assert.match<Program>(parseScript(`class a {
    prototype() {}
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "prototype",
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

    it("should parse a dynamic \"constructor\" method name", () => {
        assert.match<Program>(parseScript(`class a {
    constructor() {}
    ["constructor"]() {}
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
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
                                kind: "constructor",
                                static: false,
                            },
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Literal",
                                    value: "constructor",
                                },
                                computed: true,
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

    it("should parse duplicate \"static constructor() {}\"", () => {
        assert.match<Program>(parseScript(`class a {
    static constructor() {}
    static constructor() {}
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
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
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
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

    it("should parse dynamic static \"prototype\" method", () => {
        assert.match<Program>(parseScript(`class a {
    static ["prototype"]() {}
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Literal",
                                    value: "prototype",
                                },
                                computed: true,
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

    it("should parse \"(class extends (1) {});\"", () => {
        assert.match<Program>(parseScript(`(class extends (1) {});`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ClassExpression",
                        id: null,
                        superClass: {
                            type: "Literal",
                            value: 1,
                        },
                        body: {
                            type: "ClassBody",
                            body: [],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[a, a, , ...a] = (1);\"", () => {
        assert.match<Program>(parseScript(`[a, a, , ...a] = (1);`), {
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
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[, , ] = (1);\"", () => {
        assert.match<Program>(parseScript(`[, , ] = (1);`), {
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
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[...a[1]] = (2);\"", () => {
        assert.match<Program>(parseScript(`[...a[1]] = (2);`), {
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
                                            value:  1,
                                        },
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[a, b = 1, [c, ...a[2]] = {}] = (3);\"", () => {
        assert.match<Program>(parseScript(`[a, b = 1, [c, ...a[2]] = {}] = (3);`), {
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
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                },
                                {
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "ArrayPattern",
                                        elements: [
                                            {
                                                type: "Identifier",
                                                name: "c",
                                            },
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
                                                        value: 2,
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    right: {
                                        type: "ObjectExpression",
                                        properties: [],
                                    },
                                },
                            ],
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

    it("should parse \"[{a = b} = (1)];\"", () => {
        assert.match<Program>(parseScript(`[{a = b} = (1)];`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
                            {
                                type: "AssignmentExpression",
                                operator: "=",
                                left: {
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
                                right: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[a] = (1);\"", () => {
        assert.match<Program>(parseScript(`[a] = (1);`), {
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
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[[[[[[[[[[[[[[[[[[[[{a = b[1]}]]]]]]]]]]]]]]]]]]]] = (2);\"", () => {
        /* tslint:disable max-line-length */
        assert.match<Program>(parseScript(`[[[[[[[[[[[[[[[[[[[[{a = b[1]}]]]]]]]]]]]]]]]]]]]] = (2);`), {
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
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "ArrayPattern",
                                            elements: [
                                                {
                                                    type: "ArrayPattern",
                                                    elements: [
                                                        {
                                                            type: "ArrayPattern",
                                                            elements: [
                                                                {
                                                                    type: "ArrayPattern",
                                                                    elements: [
                                                                        {
                                                                            type: "ArrayPattern",
                                                                            elements: [
                                                                                {
                                                                                    type: "ArrayPattern",
                                                                                    elements: [
                                                                                        {
                                                                                            type: "ArrayPattern",
                                                                                            elements: [
                                                                                                {
                                                                                                    type: "ArrayPattern",
                                                                                                    elements: [
                                                                                                        {
                                                                                                            type: "ArrayPattern",
                                                                                                            elements: [
                                                                                                                {
                                                                                                                    type: "ArrayPattern",
                                                                                                                    elements: [
                                                                                                                        {
                                                                                                                            type: "ArrayPattern",
                                                                                                                            elements: [
                                                                                                                                {
                                                                                                                                    type: "ArrayPattern",
                                                                                                                                    elements: [
                                                                                                                                        {
                                                                                                                                            type: "ArrayPattern",
                                                                                                                                            elements: [
                                                                                                                                                {
                                                                                                                                                    type: "ArrayPattern",
                                                                                                                                                    elements: [
                                                                                                                                                        {
                                                                                                                                                            type: "ArrayPattern",
                                                                                                                                                            elements: [
                                                                                                                                                                {
                                                                                                                                                                    type: "ArrayPattern",
                                                                                                                                                                    elements: [
                                                                                                                                                                        {
                                                                                                                                                                            type: "ArrayPattern",
                                                                                                                                                                            elements: [
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
                                                                                                                                                                                                            type: "MemberExpression",
                                                                                                                                                                                                            computed: true,
                                                                                                                                                                                                            object: {
                                                                                                                                                                                                                type: "Identifier",
                                                                                                                                                                                                                name: "b",
                                                                                                                                                                                                            },
                                                                                                                                                                                                            property: {
                                                                                                                                                                                                                type: "Literal",
                                                                                                                                                                                                                value: 1,
                                                                                                                                                                                                            },
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
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                                },
                                                                                                                                                            ],
                                                                                                                                                        },
                                                                                                                                                    ],
                                                                                                                                                },
                                                                                                                                            ],
                                                                                                                                        },
                                                                                                                                    ],
                                                                                                                                },
                                                                                                                            ],
                                                                                                                        },
                                                                                                                    ],
                                                                                                                },
                                                                                                            ],
                                                                                                        },
                                                                                                    ],
                                                                                                },
                                                                                            ],
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
        /* tslint:enable max-line-length */
    });

    it("should parse \"a & b;\"", () => {
        assert.match<Program>(parseScript(`a & b;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "&",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (const {a, b} of c) ;\"", () => {
        assert.match<Program>(parseScript(`for (const {a, b} of c) ;`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
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
                                init: null,
                            },
                        ],
                        kind: "const",
                    },
                    right: {
                        type: "Identifier",
                        name: "c",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var a of b) ;\"", () => {
        assert.match<Program>(parseScript(`for (var a of b) ;`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
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
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function* () {});\"", () => {
        assert.match<Program>(parseScript(`(function* () {});`), {
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
                        generator: true,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse shorthand generators", () => {
        assert.match<Program>(parseScript(`({*a() {
    yield;
}});`), {
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
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "YieldExpression",
                                                    argument: null,
                                                    delegate: false,
                                                },
                                            },
                                        ],
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
            sourceType: "script",
        });
    });

    it("should parse \"({*a() {}});\"", () => {
        assert.match<Program>(parseScript(`({*a() {}});`), {
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
            sourceType: "script",
        });
    });

    it("should parse static generators", () => {
        assert.match<Program>(parseScript(`class a {
    static *b() {}
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
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

    it("should parse Unicode identifiers", () => {
        assert.match<Program>(parseScript(`゛ + ゜;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "Identifier",
                            name: "゛",
                        },
                        right: {
                            type: "Identifier",
                            name: "゜",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
    /*
    it('should parse "var 𞸆_$;"', () => {
        assert.match<Program>(parseScript(`var 𞸆_$;`), {
            "type": "Program",
            "body": [
                {
                "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "𞸆_$"
                            },
                            "init": null
                        }
                    ],
                    "kind": "var"
                }
            ],
            "sourceType": "script"
        });
    });*/

    it("should parse \"var ABC;\"", () => {
        assert.match<Program>(parseScript(`var ABC;`), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "ABC",
                            },
                            init: null,
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"new (new.target)\" within a function declaration", () => {
        assert.match<Program>(parseScript(`function a() { new (new.target); }`), {
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
                                    type: "NewExpression",
                                    callee: {
                                        type: "MetaProperty",
                                        meta: {
                                            type: "Identifier",
                                            name: "new",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "target",
                                        },
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"new.target\" within a function declaration", () => {
        assert.match<Program>(parseScript(`function a() { new.target; }`), {
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
                                    type: "MetaProperty",
                                    meta: {
                                        type: "Identifier",
                                        name: "new",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "target",
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

    it("should parse \"new.target\" within anonymous functions", () => {
        assert.match<Program>(parseScript(`var a = (function () { new.target; });`), {
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
                            init: {
                                type: "FunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "MetaProperty",
                                                meta: {
                                                    type: "Identifier",
                                                    name: "new",
                                                },
                                                property: {
                                                    type: "Identifier",
                                                    name: "target",
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
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a(...b, ...c, ...d);\"", () => {
        assert.match<Program>(parseScript(`a(...b, ...c, ...d);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "c",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "d",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a = ({b(...c) {}});\"", () => {
        assert.match<Program>(parseScript(`a = ({b(...c) {}});`), {
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
                                                type: "RestElement",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "c",
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
                                    method: true,
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

    it("should parse \"a(...b, ...c, ...d);\"", () => {
        assert.match<Program>(parseScript(`a(...b, ...c, ...d);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "c",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "d",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a(b, ...(c = d));\"", () => {
        assert.match<Program>(parseScript(`a(b, ...(c = d));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "b",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a(...b, c, d);\"", () => {
        assert.match<Program>(parseScript(`a(...b, c, d);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            {
                                type: "Identifier",
                                name: "c",
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

    it("should parse super methods in subclasses", () => {
        assert.match<Program>(parseScript(`class a extends b {
            c() {
                return super.d;
            }
        }`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "c",
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
                                                    type: "MemberExpression",
                                                    computed: false,
                                                    object: {
                                                        type: "Super",
                                                    },
                                                    property: {
                                                        type: "Identifier",
                                                        name: "d",
                                                    },
                                                },
                                            },
                                        ],
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

    it("should parse \"\"\u{00000000034}\";\"", () => {
        assert.match<Program>(parseScript(`"\u{00000000034}";`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "4",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[yield] = a;\"", () => {
        assert.match<Program>(parseScript(`[yield] = a;`), {
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
                                    name: "yield",
                                },
                            ],
                        },
                        right: {
                            type: "Identifier",
                            name: "a",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"yield\" within sloppy arrow functions", () => {
        assert.match<Program>(parseScript(`a => {
            yield + a;
        };`), {
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
                                        type: "BinaryExpression",
                                        operator: "+",
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function a(yield) {}\"", () => {
        assert.match<Program>(parseScript(`function a(yield) {}`), {
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
                            type: "Identifier",
                            name: "yield",
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

    it("should parse \"({yield() {}});\"", () => {
        assert.match<Program>(parseScript(`({yield() {}});`), {
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

    it("should parse \"function a({yield: b}) {}\"", () => {
        assert.match<Program>(parseScript(`function a({yield: b}) {}`), {
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
                            properties: [
                                {
                                    type: "Property",
                                    key: {
                                        type: "Identifier",
                                        name: "yield",
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

    it("should parse \"((1) + (2)) + (3);\"", () => {
        assert.match<Program>(parseScript(`((1) + (2)) + (3);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "BinaryExpression",
                            operator: "+",
                            left: {
                                type: "Literal",
                                value: 1,
                            },
                            right: {
                                type: "Literal",
                                value: 2,
                            },
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

    it("should parse \"0;\"", () => {
        assert.match<Program>(parseScript(`0;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a: b} = (1));\"", () => {
        assert.match<Program>(parseScript(`({a: b} = (1));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                        name: "b",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({0: a} = (1));\"", () => {
        assert.match<Program>(parseScript(`({0: a} = (1));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ObjectPattern",
                            properties: [
                                {
                                    type: "Property",
                                    key: {
                                        type: "Literal",
                                        value: 0,
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
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({0: a, 1: a} = (1));\"", () => {
        assert.match<Program>(parseScript(`({0: a, 1: a} = (1));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ObjectPattern",
                            properties: [
                                {
                                    type: "Property",
                                    key: {
                                        type: "Literal",
                                        value: 0,
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
                                        type: "Literal",
                                        value: 1,
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
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a: b = 1} = (2));\"", () => {
        assert.match<Program>(parseScript(`({a: b = 1} = (2));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                            name: "b",
                                        },
                                        right: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a: b = c = (1)} = (2));\"", () => {
        assert.match<Program>(parseScript(`({a: b = c = (1)} = (2));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                            name: "b",
                                        },
                                        right: {
                                            type: "AssignmentExpression",
                                            operator: "=",
                                            left: {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 1,
                                            },
                                        },
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a: [b] = 1} = (2));\"", () => {
        assert.match<Program>(parseScript(`({a: [b] = 1} = (2));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                            type: "ArrayPattern",
                                            elements: [
                                                {
                                                    type: "Identifier",
                                                    name: "b",
                                                },
                                            ],
                                        },
                                        right: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a: let} = (1));\"", () => {
        assert.match<Program>(parseScript(`({a: let} = (1));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                        name: "let",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a: yield} = (1));\"", () => {
        assert.match<Program>(parseScript(`({a: yield} = (1));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                        name: "yield",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[...{a = yield}] = (1)\"", () => {
        assert.match<Program>(parseScript(`(function* () {
            [...{a = yield}] = (1);
        });`), {
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
                                                                        type: "YieldExpression",
                                                                        argument: null,
                                                                        delegate: false,
                                                                    },
                                                                },
                                                                kind: "init",
                                                                method: false,
                                                                shorthand: true,
                                                            },
                                                        ],
                                                    },
                                                },
                                            ],
                                        },
                                        right: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                    },
                                },
                            ],
                        },
                        generator: true,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [, a] = (1);\"", () => {
        assert.match<Program>(parseScript(`var [, a] = (1);`), {
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
                                value: 1,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [a] = ([1]);\"", () => {
        assert.match<Program>(parseScript(`var [a] = ([1]);`), {
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

    it("should parse \"var a, [a] = (1);\"", () => {
        assert.match<Program>(parseScript(`var a, [a] = (1);`), {
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
                                value: 1,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var a, {b: {c: a}} = (1);\"", () => {
        assert.match<Program>(parseScript(`var a, {b: {c: a}} = (1);`), {
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
                                            name: "b",
                                        },
                                        computed: false,
                                        value: {
                                            type: "ObjectPattern",
                                            properties: [
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "c",
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
                                value: 1,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"use strict\" within anonymous functions", () => {
        assert.match<Program>(parseScript(`(function () {
            "use strict";
            return 1;
        });`), {
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
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "Literal",
                                        value: "use strict",
                                    },
                                },
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"use strict\" within named functions", () => {
        assert.match<Program>(parseScript(`function a() {
            "use strict";
            return 1;
        }
        ;`), {
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
                                    type: "Literal",
                                    value: "use strict",
                                },
                            },
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
                {
                    type: "EmptyStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[1];\"", () => {
        assert.match<Program>(parseScript(`[1];`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
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
            sourceType: "script",
        });
    });

    it("should parse \"(a, b, [c]) => (1);\"", () => {
        assert.match<Program>(parseScript(`(a, b, [c]) => (1);`), {
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
                            {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                ],
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 1,
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

    it("should parse \"try {} catch ({a = 1}) {}\"", () => {
        assert.match<Program>(parseScript(`try {} catch ({a = 1}) {}`), {
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
                                            value: 1,
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

    it("should parse \"with\" with \"use\\x20strict\"", () => {
        assert.match<Program>(parseScript(`(function () {
            "use\\x20strict";
            with (a) ;
        });`), {
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
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "Literal",
                                        value: "use strict",
                                    },
                                },
                                {
                                    type: "WithStatement",
                                    object: {
                                        type: "Identifier",
                                        name: "a",
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a}) => (1);\"", () => {
        assert.match<Program>(parseScript(`({a}) => (1);`), {
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
                            type: "Literal",
                            value: 1,
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

    it("should parse \"() => (() => (1));\"", () => {
        assert.match<Program>(parseScript(`() => (() => (1));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "Literal",
                                value: 1,
                            },
                            generator: false,
                            expression: true,
                            async: false,
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

    it("should parse \"(() => (1)), (2);\"", () => {
        assert.match<Program>(parseScript(`(() => (1)), (2);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "SequenceExpression",
                        expressions: [
                            {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "Literal",
                                    value: 1,
                                },
                                generator: false,
                                expression: true,
                                async: false,
                            },
                            {
                                type: "Literal",
                                value: 2,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"use strict\" in arrow functions", () => {
        assert.match<Program>(parseScript(`a => {
            "use strict";
        };`), {
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
                                        type: "Literal",
                                        value: "use strict",
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

    it("should parse \"eval => (\"use strict\");\"", () => {
        assert.match<Program>(parseScript(`eval => ("use strict");`), {
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
                                name: "eval",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: "use strict",
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

    it("should parse \"([a = 1], []) => (2);\"", () => {
        assert.match<Program>(parseScript(`([a = 1], []) => (2);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
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
                                            value: 1,
                                        },
                                    },
                                ],
                            },
                            {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 2,
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

    it("should parse \"(a, {b = 1}) => (2);\"", () => {
        assert.match<Program>(parseScript(`(a, {b = 1}) => (2);`), {
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
                                                value: 1,
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
                            type: "Literal",
                            value: 2,
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

    it("should parse \"({a = 1}, {b = 2}, {c = 3}) => (4);\"", () => {
        assert.match<Program>(parseScript(`({a = 1}, {b = 2}, {c = 3}) => (4);`), {
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
                                                type: "Literal",
                                                value: 1,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
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
                                                value: 2,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "c",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 3,
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
                            type: "Literal",
                            value: 4,
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

    it("should parse \"yield => (1);\"", () => {
        assert.match<Program>(parseScript(`yield => (1);`), {
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
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a = (1);\"", () => {
        assert.match<Program>(parseScript(`a = (1);`), {
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
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse new expressions with normal expressions", () => {
        assert.match<Program>(parseScript(`var a;
if (b()) {
    new a(1);
} else {
    a(2);
}`), {
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
                    ],
                    kind: "var",
                },
                {
                    type: "IfStatement",
                    test: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "b",
                        },
                        arguments: [],
                    },
                    consequent: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "NewExpression",
                                    callee: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    arguments: [
                                        {
                                            type: "Literal",
                                            value: 1,
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    alternate: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    arguments: [
                                        {
                                            type: "Literal",
                                            value: 2,
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse called member expressions", () => {
        assert.match<Program>(parseScript(`var a = ({});
a.b = (1);
a.c = (2);
(d.e)(a.c);`), {
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
                            init: {
                                type: "ObjectExpression",
                                properties: [],
                            },
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
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Identifier",
                                name: "c",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "Identifier",
                                name: "d",
                            },
                            property: {
                                type: "Identifier",
                                name: "e",
                            },
                        },
                        arguments: [
                            {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "c",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var a = ((((((!a) || (!b)) || (!c)) || (!d)) || (!e)) || (!f));\"", () => {
        assert.match<Program>(
            parseScript(`var a = ((((((!a) || (!b)) || (!c)) || (!d)) || (!e)) || (!f));`),
            {
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
                                init: {
                                    type: "LogicalExpression",
                                    operator: "||",
                                    left: {
                                        type: "LogicalExpression",
                                        operator: "||",
                                        left: {
                                            type: "LogicalExpression",
                                            operator: "||",
                                            left: {
                                                type: "LogicalExpression",
                                                operator: "||",
                                                left: {
                                                    type: "LogicalExpression",
                                                    operator: "||",
                                                    left: {
                                                        type: "UnaryExpression",
                                                        operator: "!",
                                                        argument: {
                                                            type: "Identifier",
                                                            name: "a",
                                                        },
                                                        prefix: true,
                                                    },
                                                    right: {
                                                        type: "UnaryExpression",
                                                        operator: "!",
                                                        argument: {
                                                            type: "Identifier",
                                                            name: "b",
                                                        },
                                                        prefix: true,
                                                    },
                                                },
                                                right: {
                                                    type: "UnaryExpression",
                                                    operator: "!",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "c",
                                                    },
                                                    prefix: true,
                                                },
                                            },
                                            right: {
                                                type: "UnaryExpression",
                                                operator: "!",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "d",
                                                },
                                                prefix: true,
                                            },
                                        },
                                        right: {
                                            type: "UnaryExpression",
                                            operator: "!",
                                            argument: {
                                                type: "Identifier",
                                                name: "e",
                                            },
                                            prefix: true,
                                        },
                                    },
                                    right: {
                                        type: "UnaryExpression",
                                        operator: "!",
                                        argument: {
                                            type: "Identifier",
                                            name: "f",
                                        },
                                        prefix: true,
                                    },
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"var a = ((((!b) && ((!c) || d)) && ((!e) || f)) && (g()));\"", () => {
        assert.match<Program>(
            parseScript(`var a = ((((!b) && ((!c) || d)) && ((!e) || f)) && (g()));`),
            {
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
                                init: {
                                    type: "LogicalExpression",
                                    operator: "&&",
                                    left: {
                                        type: "LogicalExpression",
                                        operator: "&&",
                                        left: {
                                            type: "LogicalExpression",
                                            operator: "&&",
                                            left: {
                                                type: "UnaryExpression",
                                                operator: "!",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "b",
                                                },
                                                prefix: true,
                                            },
                                            right: {
                                                type: "LogicalExpression",
                                                operator: "||",
                                                left: {
                                                    type: "UnaryExpression",
                                                    operator: "!",
                                                    argument: {
                                                        type: "Identifier",
                                                        name: "c",
                                                    },
                                                    prefix: true,
                                                },
                                                right: {
                                                    type: "Identifier",
                                                    name: "d",
                                                },
                                            },
                                        },
                                        right: {
                                            type: "LogicalExpression",
                                            operator: "||",
                                            left: {
                                                type: "UnaryExpression",
                                                operator: "!",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "e",
                                                },
                                                prefix: true,
                                            },
                                            right: {
                                                type: "Identifier",
                                                name: "f",
                                            },
                                        },
                                    },
                                    right: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "g",
                                        },
                                        arguments: [],
                                    },
                                },
                            },
                        ],
                        kind: "var",
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse nested sequences in callees", () => {
        assert.match<Program>(parseScript(`(((1), (2)), a)(); (((3), (4)), (b.a))();`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "SequenceExpression",
                            expressions: [
                                {
                                    type: "SequenceExpression",
                                    expressions: [
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
                                    name: "a",
                                },
                            ],
                        },
                        arguments: [],
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "SequenceExpression",
                            expressions: [
                                {
                                    type: "SequenceExpression",
                                    expressions: [
                                        {
                                            type: "Literal",
                                            value: 3,
                                        },
                                        {
                                            type: "Literal",
                                            value: 4,
                                        },
                                    ],
                                },
                                {
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                },
                            ],
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a = ({set b (c) {}});\"", () => {
        assert.match<Program>(parseScript(`a = ({set b (c) {}});`), {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a = ({get b() {}});\"", () => {
        assert.match<Program>(parseScript(`a = ({get b() {}});`), {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse multiple classes", () => {
        assert.match<Program>(parseScript(`class a {
    constructor() {}
    b() {}
}
;
class c {
    constructor(...d) {}
    b() {}
}
;
class e extends a {}
;
var f = (class g {});
var h = (class {});`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
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
                                kind: "constructor",
                                static: false,
                            },
                            {
                                type: "MethodDefinition",
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
                                        body: [],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "init",
                                static: false,
                            },
                        ],
                    },
                },
                {
                    type: "EmptyStatement",
                },
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "c",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "RestElement",
                                            argument: {
                                                type: "Identifier",
                                                name: "d",
                                            },
                                        },
                                    ],
                                    body: {
                                        type: "BlockStatement",
                                        body: [],
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "constructor",
                                static: false,
                            },
                            {
                                type: "MethodDefinition",
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
                {
                    type: "EmptyStatement",
                },
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "e",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "a",
                    },
                    body: {
                        type: "ClassBody",
                        body: [],
                    },
                },
                {
                    type: "EmptyStatement",
                },
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "f",
                            },
                            init: {
                                type: "ClassExpression",
                                id: {
                                    type: "Identifier",
                                    name: "g",
                                },
                                superClass: null,
                                body: {
                                    type: "ClassBody",
                                    body: [],
                                },
                            },
                        },
                    ],
                    kind: "var",
                },
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "h",
                            },
                            init: {
                                type: "ClassExpression",
                                id: null,
                                superClass: null,
                                body: {
                                    type: "ClassBody",
                                    body: [],
                                },
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse parenthesized objects an object arguments", () => {
        assert.match<Program>(parseScript(`var a = ({a: 1}); a({a: 2});`), {
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
                            init: {
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
                                            type: "Literal",
                                            value: 1,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "var",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
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
                                            type: "Literal",
                                            value: 2,
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

    it("should parse labeled call expressions", () => {
        assert.match<Program>(parseScript(`function a() {}
var b = ("is a valid variable name");
b = ({b: "is ok"});
c.b;
b: d();`), {
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
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "b",
                            },
                            init: {
                                type: "Literal",
                                value: "is a valid variable name",
                            },
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
                            name: "b",
                        },
                        right: {
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
                                        type: "Literal",
                                        value: "is ok",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        },
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "c",
                        },
                        property: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                },
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "d",
                            },
                            arguments: [],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(() => (null))();\"", () => {
        assert.match<Program>(parseScript(`(() => (null))();`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "Literal",
                                value: "null",
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse parenthesized arrow functions", () => {
        assert.match<Program>(parseScript(`a = (b => (false)); a = (() => (false));`), {
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
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "b",
                                },
                            ],
                            body: {
                                type: "Literal",
                                value: false,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                },
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
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "Literal",
                                value: false,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a({[(\"b\") + (\"b\")]: 1});\"", () => {
        assert.match<Program>(parseScript(`a({[("b") + ("b")]: 1});`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
                        },
                        arguments: [
                            {
                                type: "ObjectExpression",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "BinaryExpression",
                                            operator: "+",
                                            left: {
                                                type: "Literal",
                                                value: "b",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: "b",
                                            },
                                        },
                                        computed: true,
                                        value: {
                                            type: "Literal",
                                            value: 1,
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

    it("should parse functions with many parameters", () => {
        assert.match<Program>(parseScript(`function a(b, c, d, e, f) { return b + c; }`), {
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
                            type: "Identifier",
                            name: "b",
                        },
                        {
                            type: "Identifier",
                            name: "c",
                        },
                        {
                            type: "Identifier",
                            name: "d",
                        },
                        {
                            type: "Identifier",
                            name: "e",
                        },
                        {
                            type: "Identifier",
                            name: "f",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ReturnStatement",
                                argument: {
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "c",
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

    it("should parse parenthesized member expression callees", () => {
        assert.match<Program>(parseScript(`(a.b)("c"); ((a.b).d)(a, arguments);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: "c",
                            },
                        ],
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            property: {
                                type: "Identifier",
                                name: "d",
                            },
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "arguments",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `var` destructuring inside `for`", () => {
        assert.match<Program>(parseScript(`for (var [a, b] in c) ;
for (var [d] = (1);;) ;
for (var {e} of f) ;`), {
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
                                            name: "a",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "b",
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
                        name: "c",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
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
                                            type: "Identifier",
                                            name: "d",
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
                {
                    type: "ForOfStatement",
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
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "f",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse object shorthand inside expressions", () => {
        assert.match<Program>(parseScript(`({a, b}); [{a}]; a({x});`), {
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
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
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
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
                        },
                        arguments: [
                            {
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
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [{a}, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`var [{a}, b] = (c);`), {
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
                                                    type: "Identifier",
                                                    name: "a",
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: true,
                                            },
                                        ],
                                    },
                                    {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                ],
                            },
                            init: {
                                type: "Identifier",
                                name: "c",
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse unreachable statements after \"return\"", () => {
        assert.match<Program>(parseScript(`function a() {
    b();
    c();
    d = (1);
    return;
    if (d) {
        e();
    }
}`), {
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
                                    type: "CallExpression",
                                    callee: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    arguments: [],
                                },
                            },
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    arguments: [],
                                },
                            },
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                },
                            },
                            {
                                type: "ReturnStatement",
                                argument: null,
                            },
                            {
                                type: "IfStatement",
                                test: {
                                    type: "Identifier",
                                    name: "d",
                                },
                                consequent: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "CallExpression",
                                                callee: {
                                                    type: "Identifier",
                                                    name: "e",
                                                },
                                                arguments: [],
                                            },
                                        },
                                    ],
                                },
                                alternate: null,
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

    it("should parse unreachable statements after \"throw\"", () => {
        assert.match<Program>(parseScript(`function a() {
    b();
    c = (1);
    throw "d";
    if (c) {
        e();
        var c;
        function b() {}
        ;
        ((function () {
            var f;
            function e() {}
            ;
        })());
    }
}`), {
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
                                    type: "CallExpression",
                                    callee: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    arguments: [],
                                },
                            },
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                },
                            },
                            {
                                type: "ThrowStatement",
                                argument: {
                                    type: "Literal",
                                    value: "d",
                                },
                            },
                            {
                                type: "IfStatement",
                                test: {
                                    type: "Identifier",
                                    name: "c",
                                },
                                consequent: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "CallExpression",
                                                callee: {
                                                    type: "Identifier",
                                                    name: "e",
                                                },
                                                arguments: [],
                                            },
                                        },
                                        {
                                            type: "VariableDeclaration",
                                            declarations: [
                                                {
                                                    type: "VariableDeclarator",
                                                    id: {
                                                        type: "Identifier",
                                                        name: "c",
                                                    },
                                                    init: null,
                                                },
                                            ],
                                            kind: "var",
                                        },
                                        {
                                            type: "FunctionDeclaration",
                                            id: {
                                                type: "Identifier",
                                                name: "b",
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
                                        {
                                            type: "EmptyStatement",
                                        },
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "CallExpression",
                                                callee: {
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
                                                                            name: "f",
                                                                        },
                                                                        init: null,
                                                                    },
                                                                ],
                                                                kind: "var",
                                                            },
                                                            {
                                                                type: "FunctionDeclaration",
                                                                id: {
                                                                    type: "Identifier",
                                                                    name: "e",
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
                                                            {
                                                                type: "EmptyStatement",
                                                            },
                                                        ],
                                                    },
                                                    generator: false,
                                                    expression: false,
                                                    async: false,
                                                },
                                                arguments: [],
                                            },
                                        },
                                    ],
                                },
                                alternate: null,
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

    it("should parse highly parenthesized expressions", () => {
        assert.match<Program>(parseScript(`var a;
a = ((true) && b);
a = ((1) && ((c.d)("a")));
a = (((2) * (3)) && ((4) * b));
a = (((5) == (6)) && (b + (7)));
a = (("e") && ((8) - b));
a = (((9) + ("")) && (b / (10)));
a = ((-(4.5)) && ((11) << b));
a = ((12) && (13));
a = ((false) && b);
a = (NaN && ((c.d)("f")));
a = ((14) && ((c.d)("g")));
a = (h && ((15) * b));
a = ((null) && (b + (16)));
a = ((((17) * (18)) - (19)) && ((20) - b));
a = (((21) == (22)) && (b / (23)));
a = ((!("e")) && ((24) % b));
a = ((25) && (26));
a = (b && (true));
a = (((c.d)("a")) && (27));
a = (((28) - b) && ("e"));
a = (((29) << b) && (-(4.5)));
a = (b && (false));
a = (((c.d)("f")) && NaN);
a = (((c.d)("g")) && (30));
a = (((31) * b) && h);
a = ((b + (32)) && (null))`), {
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
                            name: "a",
                        },
                        right: {
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Literal",
                                value: true,
                            },
                            right: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Literal",
                                value: 1,
                            },
                            right: {
                                type: "CallExpression",
                                callee: {
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "a",
                                    },
                                ],
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "*",
                                left: {
                                    type: "Literal",
                                    value: 2,
                                },
                                right: {
                                    type: "Literal",
                                    value: 3,
                                },
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "*",
                                left: {
                                    type: "Literal",
                                    value: 4,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "==",
                                left: {
                                    type: "Literal",
                                    value: 5,
                                },
                                right: {
                                    type: "Literal",
                                    value: 6,
                                },
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "+",
                                left: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                right: {
                                    type: "Literal",
                                    value: 7,
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Literal",
                                value: "e",
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "-",
                                left: {
                                    type: "Literal",
                                    value: 8,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "+",
                                left: {
                                    type: "Literal",
                                    value: 9,
                                },
                                right: {
                                    type: "Literal",
                                    value: "",
                                },
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "/",
                                left: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                right: {
                                    type: "Literal",
                                    value: 10,
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "UnaryExpression",
                                operator: "-",
                                argument: {
                                    type: "Literal",
                                    value: 4.5,
                                },
                                prefix: true,
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "<<",
                                left: {
                                    type: "Literal",
                                    value: 11,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Literal",
                                value: 12,
                            },
                            right: {
                                type: "Literal",
                                value: 13,
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Literal",
                                value: false,
                            },
                            right: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Identifier",
                                name: "NaN",
                            },
                            right: {
                                type: "CallExpression",
                                callee: {
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "f",
                                    },
                                ],
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Literal",
                                value: 14,
                            },
                            right: {
                                type: "CallExpression",
                                callee: {
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "g",
                                    },
                                ],
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Identifier",
                                name: "h",
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "*",
                                left: {
                                    type: "Literal",
                                    value: 15,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Literal",
                                value: "null",
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "+",
                                left: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                right: {
                                    type: "Literal",
                                    value: 16,
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "-",
                                left: {
                                    type: "BinaryExpression",
                                    operator: "*",
                                    left: {
                                        type: "Literal",
                                        value: 17,
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 18,
                                    },
                                },
                                right: {
                                    type: "Literal",
                                    value: 19,
                                },
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "-",
                                left: {
                                    type: "Literal",
                                    value: 20,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "==",
                                left: {
                                    type: "Literal",
                                    value: 21,
                                },
                                right: {
                                    type: "Literal",
                                    value: 22,
                                },
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "/",
                                left: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                right: {
                                    type: "Literal",
                                    value: 23,
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "UnaryExpression",
                                operator: "!",
                                argument: {
                                    type: "Literal",
                                    value: "e",
                                },
                                prefix: true,
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "%",
                                left: {
                                    type: "Literal",
                                    value: 24,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Literal",
                                value: 25,
                            },
                            right: {
                                type: "Literal",
                                value: 26,
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Identifier",
                                name: "b",
                            },
                            right: {
                                type: "Literal",
                                value: true,
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "CallExpression",
                                callee: {
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "a",
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 27,
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "-",
                                left: {
                                    type: "Literal",
                                    value: 28,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            right: {
                                type: "Literal",
                                value: "e",
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "<<",
                                left: {
                                    type: "Literal",
                                    value: 29,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            right: {
                                type: "UnaryExpression",
                                operator: "-",
                                argument: {
                                    type: "Literal",
                                    value: 4.5,
                                },
                                prefix: true,
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Identifier",
                                name: "b",
                            },
                            right: {
                                type: "Literal",
                                value: false,
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "CallExpression",
                                callee: {
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "f",
                                    },
                                ],
                            },
                            right: {
                                type: "Identifier",
                                name: "NaN",
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "CallExpression",
                                callee: {
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "g",
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 30,
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "*",
                                left: {
                                    type: "Literal",
                                    value: 31,
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            right: {
                                type: "Identifier",
                                name: "h",
                            },
                        },
                    },
                },
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
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "+",
                                left: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                right: {
                                    type: "Literal",
                                    value: 32,
                                },
                            },
                            right: {
                                type: "Literal",
                                value: "null",
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse member expressions with parenthesized objects", () => {
        assert.match<Program>(parseScript(`if (a && b) {
    (((c(a))[1]).b).d = (e());
} else (((c(a))[2]).b).d = (f());`), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "LogicalExpression",
                        operator: "&&",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                    consequent: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "MemberExpression",
                                        computed: false,
                                        object: {
                                            type: "MemberExpression",
                                            computed: false,
                                            object: {
                                                type: "MemberExpression",
                                                computed: true,
                                                object: {
                                                    type: "CallExpression",
                                                    callee: {
                                                        type: "Identifier",
                                                        name: "c",
                                                    },
                                                    arguments: [
                                                        {
                                                            type: "Identifier",
                                                            name: "a",
                                                        },
                                                    ],
                                                },
                                                property: {
                                                    type: "Literal",
                                                    value: 1,
                                                },
                                            },
                                            property: {
                                                type: "Identifier",
                                                name: "b",
                                            },
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "d",
                                        },
                                    },
                                    right: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "e",
                                        },
                                        arguments: [],
                                    },
                                },
                            },
                        ],
                    },
                    alternate: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "MemberExpression",
                                    computed: false,
                                    object: {
                                        type: "MemberExpression",
                                        computed: true,
                                        object: {
                                            type: "CallExpression",
                                            callee: {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                            arguments: [
                                                {
                                                    type: "Identifier",
                                                    name: "a",
                                                },
                                            ],
                                        },
                                        property: {
                                            type: "Literal",
                                            value: 2,
                                        },
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                },
                                property: {
                                    type: "Identifier",
                                    name: "d",
                                },
                            },
                            right: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "f",
                                },
                                arguments: [],
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"with (1) ;\"", () => {
        assert.match<Program>(parseScript(`with (1) ;`), {
            type: "Program",
            body: [
                {
                    type: "WithStatement",
                    object: {
                        type: "Literal",
                        value: 1,
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse basic `try`-`catch`-`finally`", () => {
        assert.match<Program>(parseScript(`try {} catch (a) {} finally {}`), {
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
                            type: "Identifier",
                            name: "a",
                        },
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                    },
                    finalizer: {
                        type: "BlockStatement",
                        body: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse labeled `while` with unused label", () => {
        assert.match<Program>(parseScript(`b: while (1) { continue; a; }`), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "WhileStatement",
                        test: {
                            type: "Literal",
                            value: 1,
                        },
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ContinueStatement",
                                    label: null,
                                },
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({[(1) * (2)]: 3});\"", () => {
        assert.match<Program>(parseScript(`({[(1) * (2)]: 3});`), {
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
                                    type: "BinaryExpression",
                                    operator: "*",
                                    left: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 2,
                                    },
                                },
                                computed: true,
                                value: {
                                    type: "Literal",
                                    value: 3,
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

    it("should parse \"({[(\"a\") + (1)]: \"b\"});\"", () => {
        assert.match<Program>(parseScript(`({[("a") + (1)]: "b"});`), {
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
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "Literal",
                                        value: "a",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                },
                                computed: true,
                                value: {
                                    type: "Literal",
                                    value: "b",
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

    it("should parse \"(0).a;\"", () => {
        assert.match<Program>(parseScript(`(0).a;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Literal",
                            value: 0,
                        },
                        property: {
                            type: "Identifier",
                            name: "a",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"((new a).b)();\"", () => {
        assert.match<Program>(parseScript(`((new a).b)();`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "NewExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                arguments: [],
                            },
                            property: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var a of [1, 2]) 3;\"", () => {
        assert.match<Program>(parseScript(`for (var a of [1, 2]) 3;`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
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
                        kind: "var",
                    },
                    right: {
                        type: "ArrayExpression",
                        elements: [
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
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Literal",
                            value: 3,
                        },
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse parenthesized `yield` argument", () => {
        assert.match<Program>(parseScript(`function* a() { yield ("a"); }`), {
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
                                        value: "a",
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

    it("should parse `super` within arrow functions inside constructors", () => {
        assert.match<Program>(parseScript(`class a extends b {
    constructor() {
        () => { super(); };
    }
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
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
                                                    type: "ArrowFunctionExpression",
                                                    id: null,
                                                    params: [],
                                                    body: {
                                                        type: "BlockStatement",
                                                        body: [
                                                            {
                                                                type: "ExpressionStatement",
                                                                expression: {
                                                                    type: "CallExpression",
                                                                    callee: {
                                                                        type: "Super",
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
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "constructor",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a, b});\"", () => {
        assert.match<Program>(parseScript(`({a, b});`), {
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

    it("should parse \"export const a = (1);\"", () => {
        assert.match<Program>(parseModule(`export const a = (1);`), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                        kind: "const",
                    },
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default (1) + (2);\"", () => {
        assert.match<Program>(parseModule(`export default (1) + (2);`), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "Literal",
                            value: 1,
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse\"export var a = (function () {});\"", () => {
        assert.match<Program>(parseModule(`export var a = (function () {});`), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [],
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export var a = (1);\"", () => {
        assert.match<Program>(parseModule(`export var a = (1);`), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"import {default as a} from \"foo\";\"", () => {
        assert.match<Program>(parseModule(`import {default as a} from "foo";`), {
            type: "Program",
            body: [
                {
                    type: "ImportDeclaration",
                    specifiers: [
                        {
                            type: "ImportSpecifier",
                            local: {
                                type: "Identifier",
                                name: "a",
                            },
                            imported: {
                                type: "Identifier",
                                name: "default",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "foo",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseModule(`import  * as a from "foo";`), {
            type: "Program",
            body: [
                {
                    type: "ImportDeclaration",
                    specifiers: [
                        {
                            type: "ImportNamespaceSpecifier",
                            local: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "foo",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseModule(`export default function a() {}
let b;
export {b as a};
`), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "a",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        async: false,
                        generator: false,
                        expression: false,
                    },
                },
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "b",
                            },
                            init: null,
                        },
                    ],
                    kind: "let",
                },
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "a",
                            },
                            local: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                    ],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`function* a() { yield (typeof (0)); }`), {
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

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`function* a() { yield (~(0)); }`), {
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

    it("should parse \"(a ** b).c = (0);\"", () => {
        assert.match<Program>(parseScript(`(a ** b).c = (0);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "BinaryExpression",
                                operator: "**",
                                left: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            property: {
                                type: "Identifier",
                                name: "c",
                            },
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

    it("should parse \"({a: b} = (0));\"", () => {
        assert.match<Program>(parseScript(`({a: b} = (0));`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                                        name: "b",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
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

    it("should parse \"[a = (0)];", () => {
        assert.match<Program>(parseScript(`[a = (0)];`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
                            {
                                type: "AssignmentExpression",
                                operator: "=",
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[a = (b = c)] = (0);\"", () => {
        assert.match<Program>(parseScript(`[a = (b = c)] = (0);`), {
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
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    right: {
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

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`var a, b, c, d; a = ((b, c), d);`), {
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
                                type: "Identifier",
                                name: "b",
                            },
                            init: null,
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "c",
                            },
                            init: null,
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "d",
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
                            name: "a",
                        },
                        right: {
                            type: "SequenceExpression",
                            expressions: [
                                {
                                    type: "SequenceExpression",
                                    expressions: [
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
                                {
                                    type: "Identifier",
                                    name: "d",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`var a, b, c, d;
a = ((((b()), (c())), (d())) ? (1) : (2));
`), {
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
                                type: "Identifier",
                                name: "b",
                            },
                            init: null,
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "c",
                            },
                            init: null,
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "d",
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
                            name: "a",
                        },
                        right: {
                            type: "ConditionalExpression",
                            test: {
                                type: "SequenceExpression",
                                expressions: [
                                    {
                                        type: "SequenceExpression",
                                        expressions: [
                                            {
                                                type: "CallExpression",
                                                callee: {
                                                    type: "Identifier",
                                                    name: "b",
                                                },
                                                arguments: [],
                                            },
                                            {
                                                type: "CallExpression",
                                                callee: {
                                                    type: "Identifier",
                                                    name: "c",
                                                },
                                                arguments: [],
                                            },
                                        ],
                                    },
                                    {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "d",
                                        },
                                        arguments: [],
                                    },
                                ],
                            },
                            consequent: {
                                type: "Literal",
                                value: 1,
                            },
                            alternate: {
                                type: "Literal",
                                value: 2,
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a[\"b\"] = (\"c\");\"", () => {
        assert.match<Program>(parseScript(`a["b"] = ("c");`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: true,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Literal",
                                value: "b",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: "c",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`a["b"] = ("c");
a["if"] = ("if");
a["*"] = ("d");
a["ຳ"] = ("e");
a[""] = ("f");
a["1_1"] = ("b");
`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: true,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Literal",
                                value: "b",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: "c",
                        },
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: true,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Literal",
                                value: "if",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: "if",
                        },
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: true,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Literal",
                                value: "*",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: "d",
                        },
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: true,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Literal",
                                value: "ຳ",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: "e",
                        },
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: true,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Literal",
                                value: "",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: "f",
                        },
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "MemberExpression",
                            computed: true,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Literal",
                                value: "1_1",
                            },
                        },
                        right: {
                            type: "Literal",
                            value: "b",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`while (a) {
            if (b) break;
            (c.d)("a");
        }
        e: while (a) {
            if (b) break e;
            (c.d)("a");
        }
        `), {
            type: "Program",
            body: [
                {
                    type: "WhileStatement",
                    test: {
                        type: "Identifier",
                        name: "a",
                    },
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "IfStatement",
                                test: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                consequent: {
                                    type: "BreakStatement",
                                    label: null,
                                },
                                alternate: null,
                            },
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "MemberExpression",
                                        computed: false,
                                        object: {
                                            type: "Identifier",
                                            name: "c",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "d",
                                        },
                                    },
                                    arguments: [
                                        {
                                            type: "Literal",
                                            value: "a",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "e",
                    },
                    body: {
                        type: "WhileStatement",
                        test: {
                            type: "Identifier",
                            name: "a",
                        },
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "IfStatement",
                                    test: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    consequent: {
                                        type: "BreakStatement",
                                        label: {
                                            type: "Identifier",
                                            name: "e",
                                        },
                                    },
                                    alternate: null,
                                },
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "MemberExpression",
                                            computed: false,
                                            object: {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                            property: {
                                                type: "Identifier",
                                                name: "d",
                                            },
                                        },
                                        arguments: [
                                            {
                                                type: "Literal",
                                                value: "a",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`b: for (var a = (1); a < (2); ++a) {
            if (a < (3)) continue b;
            (c.d)(a);
        }
        `), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "ForStatement",
                        init: {
                            type: "VariableDeclaration",
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    init: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                },
                            ],
                            kind: "var",
                        },
                        test: {
                            type: "BinaryExpression",
                            operator: "<",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "Literal",
                                value: 2,
                            },
                        },
                        update: {
                            type: "UpdateExpression",
                            operator: "++",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                            prefix: true,
                        },
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "IfStatement",
                                    test: {
                                        type: "BinaryExpression",
                                        operator: "<",
                                        left: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        right: {
                                            type: "Literal",
                                            value: 3,
                                        },
                                    },
                                    consequent: {
                                        type: "ContinueStatement",
                                        label: {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                    },
                                    alternate: null,
                                },
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "MemberExpression",
                                            computed: false,
                                            object: {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                            property: {
                                                type: "Identifier",
                                                name: "d",
                                            },
                                        },
                                        arguments: [
                                            {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`function a(b, c) {
            return (b--) >>> c;
        }
        `), {
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
                        body: [
                            {
                                type: "ReturnStatement",
                                argument: {
                                    type: "BinaryExpression",
                                    operator: ">>>",
                                    left: {
                                        type: "UpdateExpression",
                                        operator: "--",
                                        argument: {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                        prefix: false,
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "c",
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

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`function a(b, c) {
            return (b--) >> c;
        }
        `), {
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
                        body: [
                            {
                                type: "ReturnStatement",
                                argument: {
                                    type: "BinaryExpression",
                                    operator: ">>",
                                    left: {
                                        type: "UpdateExpression",
                                        operator: "--",
                                        argument: {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                        prefix: false,
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "c",
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

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`9; 9; 9; 9;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 9,
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 9,
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 9,
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 9,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`function a() {
            (class b {});
            class c {}
            ;
        }`), {
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
                                    type: "ClassExpression",
                                    id: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    superClass: null,
                                    body: {
                                        type: "ClassBody",
                                        body: [],
                                    },
                                },
                            },
                            {
                                type: "ClassDeclaration",
                                id: {
                                    type: "Identifier",
                                    name: "c",
                                },
                                superClass: null,
                                body: {
                                    type: "ClassBody",
                                    body: [],
                                },
                            },
                            {
                                type: "EmptyStatement",
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

    it("should parse \"import  * as a from \"foo\";\"", () => {
        assert.match<Program>(parseScript(`function a() {
            try {
                a();
            } catch (b) {
                var c = (1);
            }
            return c;
        }
        `), {
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
                                type: "TryStatement",
                                block: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "CallExpression",
                                                callee: {
                                                    type: "Identifier",
                                                    name: "a",
                                                },
                                                arguments: [],
                                            },
                                        },
                                    ],
                                },
                                handler: {
                                    type: "CatchClause",
                                    param: {
                                        type: "Identifier",
                                        name: "b",
                                    },
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
                                                            name: "c",
                                                        },
                                                        init: {
                                                            type: "Literal",
                                                            value: 1,
                                                        },
                                                    },
                                                ],
                                                kind: "var",
                                            },
                                        ],
                                    },
                                },
                                finalizer: null,
                            },
                            {
                                type: "ReturnStatement",
                                argument: {
                                    type: "Identifier",
                                    name: "c",
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

    it("should parse \"var {a, b} = ({a: 1, b: 2});\"", () => {
        assert.match<Program>(parseScript(`var {a, b} = ({a: 1, b: 2});`), {
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
                                            type: "Identifier",
                                            name: "b",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            init: {
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
                                            name: "b",
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
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`var [a, b] = (c);`), {
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
                                        name: "b",
                                    },
                                ],
                            },
                            init: {
                                type: "Identifier",
                                name: "c",
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(\"1\");\"", () => {
        assert.match<Program>(parseScript(`("1");`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "1",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(\")11\");\"", () => {
        assert.match<Program>(parseScript(`(")11");`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: ")11",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(\"a\");\"", () => {
        assert.match<Program>(parseScript(`("a");`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "\u0005a",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a ^= (1);\"", () => {
        assert.match<Program>(parseScript(`a ^= (1);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "^=",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    /*
    it("should parse \"function a(b = new.target) {}\"", () => {
        assert.match<Program>(parseScript(`function a(b = new.target) {}`), {});
    });
    */

    it("should parse \"({set a (b = new.target) {}});\"", () => {
        assert.match<Program>(parseScript(`({set a (b = new.target) {}});`), {
            body: [
                {
                    expression: {
                        properties: [
                            {
                                computed: false,
                                key: {
                                    name: "a",
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
                                            left: {
                                                name: "b",
                                                type: "Identifier",
                                            },
                                            right: {
                                                meta: {
                                                    name: "new",
                                                    type: "Identifier",
                                                },
                                                property: {
                                                    name: "target",
                                                    type: "Identifier",
                                                },
                                                type: "MetaProperty",
                                            },
                                            type: "AssignmentPattern",
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
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`({get a() { new.target; }});`), {
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
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "MetaProperty",
                                                    meta: {
                                                        type: "Identifier",
                                                        name: "new",
                                                    },
                                                    property: {
                                                        type: "Identifier",
                                                        name: "target",
                                                    },
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`function a() { new (new.target); }`), {
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
                                    type: "NewExpression",
                                    callee: {
                                        type: "MetaProperty",
                                        meta: {
                                            type: "Identifier",
                                            name: "new",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "target",
                                        },
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`function a() { new (["b"]); }`), {
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
                                    type: "NewExpression",
                                    callee: {
                                        type: "ArrayExpression",
                                        elements: [
                                            {
                                                type: "Literal",
                                                value: "b",
                                            },
                                        ],
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({if: 1});\"", () => {
        assert.match<Program>(parseScript(`({if: 1});`), {
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
                                    value: 1,
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

    it("should parse \"({null: 1});\"", () => {
        assert.match<Program>(parseScript(`({null: 1});`), {
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
                                    name: "null",
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
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({get 10() {}});\"", () => {
        assert.match<Program>(parseScript(`({get 10() {}});`), {
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`{ a(); b(); }`), {
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                arguments: [],
                            },
                        },
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                arguments: [],
                            },
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({get: 1});\"", () => {
        assert.match<Program>(parseScript(`({get: 1});`), {
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
                                    value: 1,
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

    it("should parse \"({set: 1});\"", () => {
        assert.match<Program>(parseScript(`({set: 1});`), {
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
                                    value: 1,
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

    it("should parse \"({__proto__: 1});\"", () => {
        assert.match<Program>(parseScript(`({__proto__: 1});`), {
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
                                    value: 1,
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`({a() { let a; }});`), {
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

    it("should parse \"({a() {}});\"", () => {
        assert.match<Program>(parseScript(`({a() {}});`), {
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

    it("should parse \"((a.$).b).c;\"", () => {
        assert.match<Program>(parseScript(`((a.$).b).c;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "$",
                                },
                            },
                            property: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        property: {
                            type: "Identifier",
                            name: "c",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`(class extends a {
    constructor() { super(); }
});`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ClassExpression",
                        id: null,
                        superClass: {
                            type: "Identifier",
                            name: "a",
                        },
                        body: {
                            type: "ClassBody",
                            body: [
                                {
                                    type: "MethodDefinition",
                                    key: {
                                        type: "Identifier",
                                        name: "constructor",
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
                                                        type: "CallExpression",
                                                        callee: {
                                                            type: "Super",
                                                        },
                                                        arguments: [],
                                                    },
                                                },
                                            ],
                                        },
                                        generator: false,
                                        async: false,
                                    },
                                    kind: "constructor",
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`({a() { (super.b)(); }});`), {
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
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "CallExpression",
                                                    callee: {
                                                        type: "MemberExpression",
                                                        computed: false,
                                                        object: {
                                                            type: "Super",
                                                        },
                                                        property: {
                                                            type: "Identifier",
                                                            name: "b",
                                                        },
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`({*a() { super.b = (1); }});`), {
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
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "AssignmentExpression",
                                                    operator: "=",
                                                    left: {
                                                        type: "MemberExpression",
                                                        computed: false,
                                                        object: {
                                                            type: "Super",
                                                        },
                                                        property: {
                                                            type: "Identifier",
                                                            name: "b",
                                                        },
                                                    },
                                                    right: {
                                                        type: "Literal",
                                                        value: 1,
                                                    },
                                                },
                                            },
                                        ],
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
            sourceType: "script",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`class a {
    b() { new (super.c); }
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
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
                                                    type: "NewExpression",
                                                    callee: {
                                                        type: "MemberExpression",
                                                        computed: false,
                                                        object: {
                                                            type: "Super",
                                                        },
                                                        property: {
                                                            type: "Identifier",
                                                            name: "c",
                                                        },
                                                    },
                                                    arguments: [],
                                                },
                                            },
                                        ],
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`try {} catch (a) { var a = (1); }`), {
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
                            type: "Identifier",
                            name: "a",
                        },
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
                                            init: {
                                                type: "Literal",
                                                value: 1,
                                            },
                                        },
                                    ],
                                    kind: "var",
                                },
                            ],
                        },
                    },
                    finalizer: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a.b)(b, c);\"", () => {
        assert.match<Program>(parseScript(`(a.b)(b, c);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        arguments: [
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"((new a).b)();\"", () => {
        assert.match<Program>(parseScript(`((new a).b)();`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "NewExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                arguments: [],
                            },
                            property: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"((a.b).c)(1);\"", () => {
        assert.match<Program>(parseScript(`((a.b).c)(1);`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            property: {
                                type: "Identifier",
                                name: "c",
                            },
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: 1,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`; a;`), {
            type: "Program",
            body: [
                {
                    type: "EmptyStatement",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "a",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a + b) * c;\"", () => {
        assert.match<Program>(parseScript(`(a + b) * c;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "*",
                        left: {
                            type: "BinaryExpression",
                            operator: "+",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        right: {
                            type: "Identifier",
                            name: "c",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`class a extends b {
    c() { [super.d] = e; }
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "c",
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
                                                    type: "AssignmentExpression",
                                                    operator: "=",
                                                    left: {
                                                        type: "ArrayPattern",
                                                        elements: [
                                                            {
                                                                type: "MemberExpression",
                                                                computed: false,
                                                                object: {
                                                                    type: "Super",
                                                                },
                                                                property: {
                                                                    type: "Identifier",
                                                                    name: "d",
                                                                },
                                                            },
                                                        ],
                                                    },
                                                    right: {
                                                        type: "Identifier",
                                                        name: "e",
                                                    },
                                                },
                                            },
                                        ],
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`class a extends b {
    c() { ({d: super[e]} = f); }
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "a",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "c",
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
                                                    type: "AssignmentExpression",
                                                    operator: "=",
                                                    left: {
                                                        type: "ObjectPattern",
                                                        properties: [
                                                            {
                                                                type: "Property",
                                                                key: {
                                                                    type: "Identifier",
                                                                    name: "d",
                                                                },
                                                                computed: false,
                                                                value: {
                                                                    type: "MemberExpression",
                                                                    computed: true,
                                                                    object: {
                                                                        type: "Super",
                                                                    },
                                                                    property: {
                                                                        type: "Identifier",
                                                                        name: "e",
                                                                    },
                                                                },
                                                                kind: "init",
                                                                method: false,
                                                                shorthand: false,
                                                            },
                                                        ],
                                                    },
                                                    right: {
                                                        type: "Identifier",
                                                        name: "f",
                                                    },
                                                },
                                            },
                                        ],
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`while (true) { break; }`), {
            type: "Program",
            body: [
                {
                    type: "WhileStatement",
                    test: {
                        type: "Literal",
                        value: true,
                    },
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "BreakStatement",
                                label: null,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`function a() { return; }`), {
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
                                type: "ReturnStatement",
                                argument: null,
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

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`function* a() { yield; }`), {
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
                                    argument: null,
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

    it("should parse \"export {};\"", () => {
        assert.match<Program>(parseModule(`export {};`), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export var a;\"", () => {
        assert.match<Program>(parseModule(`export var a;`), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
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
                        kind: "var",
                    },
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
    assert.match<Program>(parseModule(`export {}; 1;`), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [],
                    source: null,
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 1,
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"({Infinity: 1});\"", () => {
        assert.match<Program>(parseScript(`({Infinity: 1});`), {
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
                                    name: "Infinity",
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
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({set a (b) {}});\"", () => {
        assert.match<Program>(parseScript(`({set a (b) {}});`), {
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

    it("should parse \"v({set __proto__ (a) {}});\"", () => {
        assert.match<Program>(parseScript(`({set __proto__ (a) {}});`), {
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

    it("should parse \"({[(\"a\") + (1)]: \"b\"});\"", () => {
        assert.match<Program>(parseScript(`({[("a") + (1)]: "b"});`), {
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
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "Literal",
                                        value: "a",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                },
                                computed: true,
                                value: {
                                    type: "Literal",
                                    value: "b",
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

    it("should parse \"({get [(1) + (2)]() {}, set [(3) / (4)] (a) {}});\"", () => {
        assert.match<Program>(parseScript(`({get [(1) + (2)]() {}, set [(3) / (4)] (a) {}});`), {
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
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 2,
                                    },
                                },
                                computed: true,
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
                            {
                                type: "Property",
                                key: {
                                    type: "BinaryExpression",
                                    operator: "/",
                                    left: {
                                        type: "Literal",
                                        value: 3,
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 4,
                                    },
                                },
                                computed: true,
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

    it("should parse \"({[(1) + (2)]() {}});\"", () => {
        assert.match<Program>(parseScript(`({[(1) + (2)]() {}});`), {
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
                                    type: "BinaryExpression",
                                    operator: "+",
                                    left: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 2,
                                    },
                                },
                                computed: true,
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

    it("should parse \"({a() {}});\"", () => {
        assert.match<Program>(parseScript(`({a() {}});`), {
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

    it("should parse \"({a(b, c, d) {}});\"", () => {
        assert.match<Program>(parseScript(`({a(b, c, d) {}});`), {
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
                                        {
                                            type: "Identifier",
                                            name: "d",
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

    it("should parse \"a: do continue a; while (1);\"", () => {
        assert.match<Program>(parseScript(`a: do continue a; while (1);`), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "a",
                    },
                    body: {
                        type: "DoWhileStatement",
                        body: {
                            type: "ContinueStatement",
                            label: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                        test: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for ({a = 1} in b) ;\"", () => {
        assert.match<Program>(parseScript(`for ({a = 1} in b)`), {
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
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
                                        value: 1,
                                    },
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                        ],
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var a; b; c) ;\"", () => {
        assert.match<Program>(parseScript(`for (var a; b; c) ;`), {
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
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    test: {
                        type: "Identifier",
                        name: "b",
                    },
                    update: {
                        type: "Identifier",
                        name: "c",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var a = (1); b; c) ;\"", () => {
        assert.match<Program>(parseScript(`for (var a = (1); b; c) ;`), {
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
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    test: {
                        type: "Identifier",
                        name: "b",
                    },
                    update: {
                        type: "Identifier",
                        name: "c",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var [a, b] = (c);\"", () => {
        assert.match<Program>(parseScript(`for (var a = (1);;) { let a; }`), {
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
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    test: null,
                    update: null,
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"if (a) b;\"", () => {
        assert.match<Program>(parseScript(`if (a) b;;`), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "a",
                    },
                    consequent: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"try {} catch (a) {}\"", () => {
        assert.match<Program>(parseScript(`try {} catch (a) {}`), {
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
                            type: "Identifier",
                            name: "a",
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

    it("should parse \"for (let x of list) process(x);\"", () => {
        assert.match<Program>(parseScript(`for (let x of list) process(x);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: null,
                            },
                        ],
                        kind: "let",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    await: false,
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "process",
                            },
                            arguments: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\"use strict\"; (class A {constructor() { super() }})\"", () => {
        assert.match<Program>(parseScript(`"use strict"; (class A {constructor() { super() }})`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "use strict",
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ClassExpression",
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
                                        name: "constructor",
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
                                                        type: "CallExpression",
                                                        callee: {
                                                            type: "Super",
                                                        },
                                                        arguments: [],
                                                    },
                                                },
                                            ],
                                        },
                                        generator: false,
                                        async: false,
                                    },
                                    kind: "constructor",
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

    it("should parse \"var {propName: localVar = defaultValue} = obj\"", () => {
        assert.match<Program>(parseScript(`var {propName: localVar = defaultValue} = obj`), {
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
                                            name: "propName",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "localVar",
                                            },
                                            right: {
                                                type: "Identifier",
                                                name: "defaultValue",
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            init: {
                                type: "Identifier",
                                name: "obj",
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });
});
