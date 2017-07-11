import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2017 - Trailing Commas", () => {
    it("should parse \"f(x,);\"", () => {
        assert.match<Program>(parseScript("f(x,);"), {
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
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class X { constructor(a,) {} }\"", () => {
        assert.match<any>(parseScript("class X { constructor(a,) {} }"), {
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
                                    name: "constructor",
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

    it("should parse \"class P { f(a,b,) { } }\"", () => {
        assert.match<any>(parseScript("class P { f(a,b,) { } }"), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "P",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
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

    it("should parse \"new f(x,);\"", () => {
        assert.match<Program>(parseScript("new f(x,);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
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
            sourceType: "script",
        });
    });

    it("should parse \"f(...a,);\"", () => {
        assert.match<Program>(parseScript("f(...a,);"), {
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
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function foo(a,) { }\"", () => {
        assert.match<Program>(parseScript("function foo(a,) { }"), {
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

    it("should parse \"(function(a,) { })\"", () => {
        assert.match<Program>(parseScript("(function(a,) { })"), {
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

    it("should parse \"(a,) => a\"", () => {
        assert.match<Program>(parseScript("(a,) => a"), {
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
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {foo(a,) {}}\"", () => {
        assert.match<any>(parseScript("class A {foo(a,) {}}"), {
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

    it("should parse \"class A {static foo(a,) {}}\"", () => {
        assert.match<any>(parseScript("class A {static foo(a,) {}}"), {
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

    it("should parse \"(class {foo(a,) {}})\"", () => {
        assert.match<any>(parseScript("(class {foo(a,) {}})"), {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(class {static foo(a,) {}})\"", () => {
        assert.match<any>(parseScript("(class {static foo(a,) {}})"), {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"foo(a,)\"", () => {
        assert.match<Program>(parseScript("foo(a,)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
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
            sourceType: "script",
        });
    });

    it("should parse \"foo(...a,)\"", () => {
        assert.match<Program>(parseScript("foo(...a,)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"new foo(...a,)\"", () => {
        assert.match<Program>(parseScript("new foo(...a,)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({foo(a,) {}})\"", () => {
        assert.match<any>(parseScript("({foo(a,) {}})"), {
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
                                        body: [],
                                    },
                                    generator: false,
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

    it("should parse \"let f = (x,y,) => x;\"", () => {
        assert.match<Program>(parseScript("let f = (x,y,) => x;"), {
            type: "Program",
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
                            init: {
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
                                async: false,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should throw \"function foo(...a,) { }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function foo(...a,) { }"); });
    });

    it("should throw \"(function(...a,) { })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(function(...a,) { })"); });
    });

    it("should throw \"(...a,) => a\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(...a,) => a"); });
    });

    it("should throw \"({foo(...a,) {}})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({foo(...a,) {}})"); });
    });

    it("should throw \"class A {foo(...a,) {}}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("class A {foo(...a,) {}}"); });
    });

    it("should throw \"class A {static foo(...a,) {}}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("class A {static foo(...a,) {}}"); });
    });

    it("should throw function foo(...a,) { }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function foo(...a,) { }"); });
    });

    it("should throw \"(function(,) { })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(function(,) { })"); });
    });

    it("should throw \"(,) => a\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(,) => a"); });
    });

    it("should throw \"(class {foo(,) {}})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(class {foo(,) {}})"); });
    });

    it("should throw \"function foo(,) { }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function foo(,) { }"); });
    });

    it("should throw \"(a,)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(function(,) { })"); });
    });

    it("should throw \"function foo(,) { }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function foo(,) { }"); });
    });

    it("should throw \"function f(...a,) {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function f(...a,) {}"); });
    });

    it("should throw \"class A { f(,){} }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("class A { f(,){} }"); });
    });

    it("should throw \"class A { constructor(,) {} }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("class A { constructor(,) {} }"); });
    });

    it("should throw \"class A { get x(,) { return 42 } }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("class A { get x(,) { return 42 } }"); });
    });

    it("should throw \"(x,y,);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(x,y,);"); });
    });

    it("should throw \"f(x,);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("f(x,);"); });
    });
});
