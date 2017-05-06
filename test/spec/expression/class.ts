import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - `class`", () => {

    it("should parse \"(class {})\"", () => {

        expect(parseScript("(class {})")).to.eql({
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
                    body: [],
                },
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"(class A{})\"", () => {
        expect(parseScript("(class A{})")).to.eql({
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
    it("should parse \"(class extends A {})\"", () => {
        expect(parseScript("(class extends A {})")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "ClassExpression",
                id: null,
                superClass: {
                    type: "Identifier",
                    name: "A",
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

    it("should parse \"(class A extends A {})\"", () => {
        expect(parseScript("(class A extends A {})")).to.eql({
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
                    type: "Identifier",
                    name: "A",
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

    it("should parse \"(class {set a(b) {}})\"", () => {
        expect(parseScript("(class {set a(b) {}})")).to.eql({
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

    it("should parse \"(class {get a() {}})\"", () => {
        expect(parseScript("(class {get a() {}})")).to.eql({
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
                    ],
                },
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"(class {prototype() {}})\"", () => {
        expect(parseScript("(class {prototype() {}})")).to.eql({
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
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"(class {a() {}})\"", () => {
        expect(parseScript("(class {a() {}})")).to.eql({
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
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"(class {3() {}})\"", () => {
        expect(parseScript("(class {3() {}})")).to.eql({
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
                                type: "Literal",
                                value: 3,
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
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"(class{[3+5](){}})\"", () => {
        expect(parseScript("(class{[3+5](){}})")).to.eql({
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
                                type: "BinaryExpression",
                                operator: "+",
                                left: {
                                    type: "Literal",
                                    value: 3,
                                },
                                right: {
                                    type: "Literal",
                                    value: 5,
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
                            kind: "method",
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

    it("should parse \"(class extends (a,b) {})\"", () => {
        expect(parseScript("(class extends (a,b) {})")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "ClassExpression",
                id: null,
                superClass: {
                    type: "SequenceExpression",
                    expressions: [
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

    it("should parse \"var x = class extends (a,b) {};\"", () => {
        expect(parseScript("var x = class extends (a,b) {};")).to.eql({
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
                        id: null,
                        superClass: {
                            type: "SequenceExpression",
                            expressions: [
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

    it("should parse \"(class {static(){}})\"", () => {
        expect(parseScript("(class {static(){}})")).to.eql({
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
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"(class {static constructor(){}})\"", () => {
        expect(parseScript("(class {static constructor(){}})")).to.eql({
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
                            kind: "method",
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

});
