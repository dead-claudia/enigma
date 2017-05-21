import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - `yield`", () => {
    it("should parse yield arg super", () => {
        assert.match<Program>(parseScript("class A { *b() { yield super.c(); } }"), {
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
                                                    argument: {
                                                        type: "CallExpression",
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
                                                    delegate: false,
                                                },
                                            },
                                        ],
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

    it("should parse yield arg this", () => {
        assert.match<Program>(parseScript("function *g() { yield this }"), {
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
                                        type: "ThisExpression",
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

    it("should parse yield arg typeof", () => {
        assert.match<Program>(parseScript("function *g() { yield typeof x }"), {
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
                                        type: "UnaryExpression",
                                        operator: "typeof",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        prefix: true,
                                    },
                                    delegate: false,
                                },
                            },
                        ],
                    },
                    generator: true,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse yield arrow parameter default", () => {
        assert.match<Program>(parseScript("(x = yield) => {}"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                right: {
                                    type: "Identifier",
                                    name: "yield",
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

    it("should parse yield binding pattern", () => {
        assert.match<Program>(parseScript("var { x: yield } = foo;"), {
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
                                            name: "x",
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
                            init: {
                                type: "Identifier",
                                name: "foo",
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse yield binding property", () => {
        assert.match<Program>(parseScript("var { yield: x } = foo;"), {
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
                                            name: "yield",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            init: {
                                type: "Identifier",
                                name: "foo",
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse yield catch param", () => {
        assert.match<Program>(parseScript("try {} catch (yield) {}"), {
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
                            name: "yield",
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

    it("should parse yield generator default parameter", () => {
        assert.match<Program>(parseScript("function *g(x = yield){}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "g",
                    },
                    params: [
                        {
                            type: "AssignmentPattern",
                            left: {
                                type: "Identifier",
                                name: "x",
                            },
                            right: {
                                type: "Identifier",
                                name: "yield",
                            },
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse yield generator method", () => {
        assert.match<Program>(parseScript("({ *yield() {} })"), {
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

    it("should parse yield lexical declaration", () => {
        assert.match<Program>(parseScript("let yield = 42;"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "yield",
                            },
                            init: {
                                type: "Literal",
                                value: 42,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse yield super property", () => {
        assert.match<Program>(parseScript("class A extends B { X() { super.yield } }"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "B",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "X",
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
                                                    type: "MemberExpression",
                                                    computed: false,
                                                    object: {
                                                        type: "Super",
                                                    },
                                                    property: {
                                                        type: "Identifier",
                                                        name: "yield",
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

    it("should parse yield yield expression", () => {
        assert.match<Program>(parseScript("let yield = 42;"), {
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
                                        type: "YieldExpression",
                                        argument: null,
                                        delegate: false,
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

    it("should parse yield strict method", () => {
        assert.match<Program>(parseScript("\"use strict\"; ({ yield() {} })"), {
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

    it("should parse yield generator declaration", () => {
        assert.match<Program>(parseScript("function *yield(){}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "yield",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse yield generator arrow function body", () => {
        assert.match<Program>(parseScript("function *g() { (z) => { yield + z }; }"), {
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
                                    type: "ArrowFunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "z",
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
                                                        name: "z",
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
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse ternary yield", () => {
        assert.match<Program>(parseScript("function* g(){ x ? yield : y }"), {
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
                                    type: "ConditionalExpression",
                                    test: {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    consequent: {
                                        type: "YieldExpression",
                                        argument: null,
                                        delegate: false,
                                    },
                                    alternate: {
                                        type: "Identifier",
                                        name: "y",
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

    it("should parse yield arg array", () => {
        assert.match<Program>(parseScript("function *g() { yield [x] }"), {
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
                                        type: "ArrayExpression",
                                        elements: [
                                            {
                                                type: "Identifier",
                                                name: "x",
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

    it("should parse yield arg bitnot", () => {
        assert.match<Program>(parseScript("function *g() { yield ~x }"), {
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
                                        type: "UnaryExpression",
                                        operator: "~",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
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

    it("should parse yield arg delete", () => {
        assert.match<Program>(parseScript("function *g() { yield delete x }"), {
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
                                        type: "UnaryExpression",
                                        operator: "delete",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
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

    it("should parse yield arg let", () => {
        assert.match<Program>(parseScript("function *g() { yield let }"), {
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
                                        type: "Identifier",
                                        name: "let",
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

    it("should parse yield arg minus", () => {
        assert.match<Program>(parseScript("function *g() { yield -x }"), {
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
                                        type: "UnaryExpression",
                                        operator: "-",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
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

    it("should parse yield arg not", () => {
        assert.match<Program>(parseScript("function *g() { yield !x }"), {
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
                                        type: "UnaryExpression",
                                        operator: "!",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
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

    it("should parse yield arg this", () => {
        assert.match<Program>(parseScript("function *g() { yield this }"), {
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
                                        type: "ThisExpression",
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

    it("should parse yield arg void", () => {
        assert.match<Program>(parseScript("function *g() { yield void x }"), {
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
                                        type: "UnaryExpression",
                                        operator: "void",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
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

    it("should parse yield function declaration", () => {
        assert.match<Program>(parseScript("function yield(){}"), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "yield",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse yield expression precedence", () => {
        assert.match<Program>(parseScript("function *g() { yield a=b, yield* c=d, e }"), {
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
                                    type: "SequenceExpression",
                                    expressions: [
                                        {
                                            type: "YieldExpression",
                                            argument: {
                                                type: "AssignmentExpression",
                                                operator: "=",
                                                left: {
                                                    type: "Identifier",
                                                    name: "a",
                                                },
                                                right: {
                                                    type: "Identifier",
                                                    name: "b",
                                                },
                                            },
                                            delegate: false,
                                        },
                                        {
                                            type: "YieldExpression",
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
                                            delegate: true,
                                        },
                                        {
                                            type: "Identifier",
                                            name: "e",
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

    it("should parse yield generator arrow default", () => {
        assert.match<Program>(parseScript("function *g() { (x = yield) => {} }"), {
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
                                    type: "ArrowFunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            right: {
                                                type: "Identifier",
                                                name: "yield",
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
                    },
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse yield generator function expression", () => {
        assert.match<Program>(parseScript("function *g(){ var y = function yield(){}; }"), {
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
                                type: "VariableDeclaration",
                                declarations: [
                                    {
                                        type: "VariableDeclarator",
                                        id: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        init: {
                                            type: "FunctionExpression",
                                            id: {
                                                type: "Identifier",
                                                name: "yield",
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
                                kind: "var",
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

    it("should parse yield lexical declaration", () => {
        assert.match<Program>(parseScript("let yield = 42;"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "yield",
                            },
                            init: {
                                type: "Literal",
                                value: 42,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse yield arg not", () => {
        assert.match<Program>(parseScript("function *g() { yield yield }"), {
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
                                        type: "YieldExpression",
                                        argument: null,
                                        delegate: false,
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

    it("should parse yield variable expression", () => {
        assert.match<Program>(parseScript("var yield;"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "yield",
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

    it("should parse yield rest parameter", () => {
        assert.match<Program>(parseScript("function f(...yield) {}"), {
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
                            type: "RestElement",
                            argument: {
                                type: "Identifier",
                                name: "yield",
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

    it("should throw if generator parameters contain yield expression", () => {
        /* tslint:disable max-line-length */
        assert.match(parseScript("\"use strict\"; function *g(){ var y = function yield(){}; }"), {});
        /* tslint:enable max-line-length */
    });

    it("should throw if generator parameters contain yield expression", () => {
        /* tslint:disable max-line-length */
        assert.match(parseScript("\"use strict\"; function *g() { var z = function(yield) {} }"), {});
        /* tslint:enable max-line-length */
    });

    it("should throw if generator parameters contain yield expression", () => {
        assert.throws(SyntaxError, () => { parseScript("function *g(x = yield){}"); });
    });
});
