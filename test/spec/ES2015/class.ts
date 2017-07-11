import {parseScript} from "../../../src";
import * as ESTree from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - `class`", () => {
    it("should throw on invalid setter method rest\"", () => {
        assert.throws(SyntaxError, () => { parseScript("class X { set f(...y) {} }"); });
    });

    it("should throw on invalid setter method rest\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(class {a:0})"); });
    });

    it("should throw on \"(class {a=0})\"\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(class {a=0})"); });
    });

    it("should throw on \"(class {3:0})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(class {3:0})"); });
    });

    it("should throw on \"(class {)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(class {)"); });
    });

    it("should throw on \"(class extends a,b {})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(class extends a,b {})"); });
    });

    it("should throw on \"(class extends !a {})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(class extends !a {})"); });
    });

    it("should throw on \"(class [a] {})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(class [a] {})"); });
    });

    it("should not throw on \"(class {[a,b](){}})\"", () => {
        parseScript("(class {[a,b](){}})");
    });

    it("should parse \"class A {;}\"", () => {
        assert.match<ESTree.Program>(parseScript("class A {;}"), {
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
                        body: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {a(){}}\"", () => {
        assert.match<any>(parseScript("class A {a(){}}"), {
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

    it("should parse \"class A {a(){}b(){}}\"", () => {
        assert.match<any>(parseScript("class A {a(){}b(){}}"), {
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
                                    async: false,
                                },
                                kind: "init",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {;a(){};b(){};}\"", () => {
        assert.match<any>(parseScript("class A {;a(){};b(){};}"), {
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
                                    async: false,
                                },
                                kind: "init",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {prototype(){}}\"", () => {
        assert.match<any>(parseScript("class A {prototype(){}}"), {
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

    it("should parse \"(class A {})\"", () => {
        assert.match<ESTree.Program>(parseScript("(class A {})"), {
            type: "Program",
            body: [
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
                            body: [],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(class extends 0{})\"", () => {
        assert.match<ESTree.Program>(parseScript("(class extends 0{})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ClassExpression",
                        id: null,
                        superClass: {
                            type: "Literal",
                            value: 0,
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

    it("should parse \"(class A extends 0{})\"", () => {
        assert.match<ESTree.Program>(parseScript("(class A extends 0{})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ClassExpression",
                        id: {
                            type: "Identifier",
                            name: "A",
                        },
                        superClass: {
                            type: "Literal",
                            value: 0,
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

    it("should parse \"class A {}\"", () => {
        assert.match<ESTree.Program>(parseScript("class A {}"), {
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
                        body: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {a(eval){}}\"", () => {
        assert.match<any>(parseScript("class A {a(eval){}}"), {
            body: [
                {
                    body: {
                        body: [
                            {
                                computed: false,
                                key: {
                                    name: "a",
                                    type: "Identifier",
                                },
                                kind: "init",
                                static: false,
                                type: "MethodDefinition",
                                value: {
                                    async: false,
                                    body: {
                                        body: [],
                                        type: "BlockStatement",
                                    },
                                    generator: false,
                                    id: null,
                                    params: [
                                        {
                                            name: "eval",
                                            type: "Identifier",
                                        },
                                    ],
                                    type: "FunctionExpression",
                                },
                            },
                        ],
                        type: "ClassBody",
                    },
                    id: {
                        name: "A",
                        type: "Identifier",
                    },
                    superClass: null,
                    type: "ClassDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"class A {;a(){};b(){};}\"", () => {
        assert.match<any>(parseScript("class A {;a(){};b(){};}"), {
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
                                    async: false,
                                },
                                kind: "init",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {a(){};b(){};}\"", () => {
        assert.match<any>(parseScript("class A {a(){};b(){};}"), {
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
                                    async: false,
                                },
                                kind: "init",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {static(){};}\"", () => {
        assert.match<any>(parseScript("class A {static(){};}"), {
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
                                    name: "static",
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

    it("should parse \"class A {get a(){} set b(c){};}\"", () => {
        assert.match<any>(parseScript("class A {get a(){} set b(c){};}"), {
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
                                    async: false,
                                },
                                kind: "get",
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
                                    async: false,
                                },
                                kind: "set",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {static[a](){}; static[b](){}}\"", () => {
        assert.match<any>(parseScript("class A {static[a](){}; static[b](){}}"), {
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
                                    name: "a",
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
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {static [a](){};}\"", () => {
        assert.match<any>(parseScript("class A {static [a](){};}"), {
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
                                    name: "a",
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

    it("should parse \"class A {static a(){};}\"", () => {
        assert.match<any>(parseScript("class A {static a(){};}"), {
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

    it("should parse \"class A {static static(){};}\"", () => {
        assert.match<any>(parseScript("class A {static static(){};}"), {
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
                                    name: "static",
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

    it("should parse \"var x = class A extends 0{}\"", () => {
        assert.match<ESTree.Program>(parseScript("var x = class A extends 0{}"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "x",
                            },
                            init: {
                                type: "ClassExpression",
                                id: {
                                    type: "Identifier",
                                    name: "A",
                                },
                                superClass: {
                                    type: "Literal",
                                    value: 0,
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

    it("should parse \"class A {prototype(){}}\"", () => {
        assert.match<any>(parseScript("class A {prototype(){}}"), {
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

    it("should parse \"class A {constructor(){}}\"", () => {
        assert.match<any>(parseScript("class A {constructor(){}}"), {
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
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A {\"constructor\"(){} [\"constructor\"](){}}\"", () => {
        assert.match<any>(
            parseScript("class A {\"constructor\"(){} [\"constructor\"](){}}"),
            {
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
                                        type: "Literal",
                                        value: "constructor",
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
            },
        );
    });

    it("should parse \"(class A extends 0{})\"", () => {
        assert.match<any>(parseScript("(class A extends 0{})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ClassExpression",
                        id: {
                            type: "Identifier",
                            name: "A",
                        },
                        superClass: {
                            type: "Literal",
                            value: 0,
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

    it("should parse \"class A {a(eval){}}\"", () => {
        assert.match<any>(
            parseScript("class A {a(eval){}}"),
            {
                body: [
                    {
                        body: {
                            body: [
                                {
                                    computed: false,
                                    key: {
                                        name: "a",
                                        type: "Identifier",
                                    },
                                    kind: "init",
                                    static: false,
                                    type: "MethodDefinition",
                                    value: {
                                        async: false,
                                        body: {
                                            body: [],
                                            type: "BlockStatement",
                                        },
                                        generator: false,
                                        id: null,
                                        params: [
                                            {
                                                name: "eval",
                                                type: "Identifier",
                                            },
                                        ],
                                        type: "FunctionExpression",
                                    },
                                },
                            ],
                            type: "ClassBody",
                        },
                        id: {
                            name: "A",
                            type: "Identifier",
                        },
                        superClass: null,
                        type: "ClassDeclaration",
                    },
                ],
                sourceType: "script",
                type: "Program",
            });
    });

});
