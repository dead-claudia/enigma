import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - `class`", () => {

    it("should throw on invalid setter method rest\"", () => {
        expect(() => { parseScript("class X { set f(...y) {} }"); }).to.throw();
    });

    it("should throw on invalid setter method rest\"", () => {
        expect(() => { parseScript("(class {a:0})"); }).to.throw();
    });

    it("should throw on \"(class {a=0})\"\"", () => {
        expect(() => { parseScript("(class {a=0})"); }).to.throw();
    });

    it("should throw on \"(class {3:0})\"", () => {
        expect(() => { parseScript("(class {3:0})"); }).to.throw();
    });

    it("should throw on \"(class {)\"", () => {
        expect(() => { parseScript("(class {)"); }).to.throw();
    });

    it("should throw on \"(class extends a,b {})\"", () => {
        expect(() => { parseScript("(class extends a,b {})"); }).to.throw();
    });

    it("should throw on \"(class extends !a {})\"", () => {
        expect(() => { parseScript("(class extends !a {})"); }).to.throw();
    });

    it("should throw on \"(class [a] {})\"", () => {
        expect(() => { parseScript("(class [a] {})"); }).to.throw();
    });

    it("should throw on \"(class {[a,b](){}})\"", () => {
        expect(() => { parseScript("(class {[a,b](){}})"); }).to.not.throw();
    });

    it("should parse \"class A {;}\"", () => {

        expect(parseScript("class A {;}")).to.eql({
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
        expect(parseScript("class A {a(){}}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
        expect(parseScript("class A {a(){}b(){}}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
                                kind: "method",
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
        expect(parseScript("class A {;a(){};b(){};}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
                                kind: "method",
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
        expect(parseScript("class A {prototype(){}}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
        expect(parseScript("(class A {})")).to.eql({
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
        expect(parseScript("(class extends 0{})")).to.eql({
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
        expect(parseScript("(class A extends 0{})")).to.eql({
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
        expect(parseScript("class A {}")).to.eql({
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
        expect(parseScript("class A {a(eval){}}")).to.eql({
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
                                kind: "method",
                                static: false,
                                type: "MethodDefinition",
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
        expect(parseScript("class A {;a(){};b(){};}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
                                kind: "method",
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
        expect(parseScript("class A {a(){};b(){};}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
                                kind: "method",
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
        expect(parseScript("class A {static(){};}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
        expect(parseScript("class A {get a(){} set b(c){};}")).to.eql({
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
                                    expression: false,
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
                                    expression: false,
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
        expect(parseScript("class A {static[a](){}; static[b](){}}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
        expect(parseScript("class A {static [a](){};}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
        expect(parseScript("class A {static a(){};}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
        expect(parseScript("class A {static static(){};}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
        expect(parseScript("var x = class A extends 0{}")).to.eql({
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
        expect(parseScript("class A {prototype(){}}")).to.eql({
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
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
        expect(parseScript("class A {constructor(){}}")).to.eql({
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
                                    expression: false,
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
        expect(parseScript("class A {\"constructor\"(){} [\"constructor\"](){}}")).to.eql({
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
                                    expression: false,
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
                                    expression: false,
                                    async: false,
                                },
                                kind: "method",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(class A extends 0{})\"", () => {
        expect(parseScript("(class A extends 0{})")).to.eql({
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
        expect(parseScript("class A {a(eval){}}")).to.eql(
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
                                    kind: "method",
                                    static: false,
                                    type: "MethodDefinition",
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
