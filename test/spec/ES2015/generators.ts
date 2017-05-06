import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - Generators", () => {

 it("should parse \"function* f([x, y, z]) {}\"", () => {
        expect(parseScript("function* f([x, y, z]) {}")).to.eql({
    type: "Program",
    sourceType: "script",
    body: [
        {
            type: "FunctionDeclaration",
            params: [
                {
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
                        {
                            type: "Identifier",
                            name: "z",
                        },
                    ],
                },
            ],
            body: {
                type: "BlockStatement",
                body: [],
            },
            async: false,
            generator: true,
            expression: false,
            id: {
                type: "Identifier",
                name: "f",
            },
        },
    ],
});
 });

 it("should parse \"function* f([[...x] = function() {  }()]) {}\"", () => {
        expect(parseScript("function* f([[...x] = function() {  }()]) {}")).to.eql({
    type: "Program",
    sourceType: "script",
    body: [
        {
            type: "FunctionDeclaration",
            params: [
                {
                    type: "ArrayPattern",
                    elements: [
                        {
                            type: "AssignmentPattern",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "RestElement",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    },
                                ],
                            },
                            right: {
                                type: "CallExpression",
                                arguments: [],
                                callee: {
                                    type: "FunctionExpression",
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [],
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                },
                            },
                        },
                    ],
                },
            ],
            body: {
                type: "BlockStatement",
                body: [],
            },
            async: false,
            generator: true,
            expression: false,
            id: {
                type: "Identifier",
                name: "f",
            },
        },
    ],
});
 });

 it("should parse \"function* f([x]) {}\"", () => {
        expect(parseScript("function* f([x]) {}")).to.eql({
    type: "Program",
    sourceType: "script",
    body: [
        {
            type: "FunctionDeclaration",
            params: [
                {
                    type: "ArrayPattern",
                    elements: [
                        {
                            type: "Identifier",
                            name: "x",
                        },
                    ],
                },
            ],
            body: {
                type: "BlockStatement",
                body: [],
            },
            async: false,
            generator: true,
            expression: false,
            id: {
                type: "Identifier",
                name: "f",
            },
        },
    ],
});
 });

 it("should parse \"function* f([x, y, z] = [1, 2, 3]) {}\"", () => {
        expect(parseScript("function* f([x, y, z] = [1, 2, 3]) {}")).to.eql({
    type: "Program",
    sourceType: "script",
    body: [
        {
            type: "FunctionDeclaration",
            params: [
                {
                    type: "AssignmentPattern",
                    left: {
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
                            {
                                type: "Identifier",
                                name: "z",
                            },
                        ],
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
                            {
                                type: "Literal",
                                value: 3,
                            },
                        ],
                    },
                },
            ],
            body: {
                type: "BlockStatement",
                body: [],
            },
            async: false,
            generator: true,
            expression: false,
            id: {
                type: "Identifier",
                name: "f",
            },
        },
    ],
});
 });

 it("should parse \"function* f([fn = function () {}, xFn = function x() {}] = []) {}\"", () => {
        /* tslint:disable max-line-length */
        expect(parseScript("function* f([fn = function () {}, xFn = function x() {}] = []) {}"))
        /* tslint:enable max-line-length */
        .to.eql({
    type: "Program",
    sourceType: "script",
    body: [
        {
            type: "FunctionDeclaration",
            params: [
                {
                    type: "AssignmentPattern",
                    left: {
                        type: "ArrayPattern",
                        elements: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "fn",
                                },
                                right: {
                                    type: "FunctionExpression",
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [],
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                },
                            },
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "xFn",
                                },
                                right: {
                                    type: "FunctionExpression",
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [],
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                },
                            },
                        ],
                    },
                    right: {
                        type: "ArrayExpression",
                        elements: [],
                    },
                },
            ],
            body: {
                type: "BlockStatement",
                body: [],
            },
            async: false,
            generator: true,
            expression: false,
            id: {
                type: "Identifier",
                name: "f",
            },
        },
    ],
});
 });

 it("should parse \"function* a(){}\"", () => {
        expect(parseScript("function* a(){}")).to.eql({
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
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

 it("should parse generator method with params", () => {
        expect(parseScript("function* a(){({[yield]:a}=0)}")).to.eql({
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
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "ObjectPattern",
                                        properties: [
                                            {
                                                type: "Property",
                                                key: {
                                                    type: "YieldExpression",
                                                    argument: null,
                                                    delegate: false,
                                                },
                                                computed: true,
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
                                        value: 0,
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

 it("should parse \"function* a() {} function a() {}\"", () => {
        expect(parseScript("function* a() {} function a() {}")).to.eql({
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
                    generator: true,
                    expression: false,
                    async: false,
                },
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
            ],
            sourceType: "script",
        });
    });

 it("should parse \"function a() { function* a() {} function a() {} }\"", () => {
        expect(parseScript("function a() { function* a() {} function a() {} }")).to.eql({
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
                                generator: true,
                                expression: false,
                                async: false,
                            },
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

 it("should parse generator method with params", () => {
        expect(parseScript("({ *foo(x, y, z) {} })")).to.eql({
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
                                            name: "x",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "z",
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

 it("should parse generator declaration with params", () => {
        expect(parseScript("({ *foo() { yield 3; } })")).to.eql({
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
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "YieldExpression",
                                                    argument: {
                                                        type: "Literal",
                                                        value: 3,
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

 it("should parse generator declaration with params", () => {
        expect(parseScript("({ *foo() { yield; } })")).to.eql({
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

 it("should parse static generator method", () => {
        expect(parseScript("class Foo { static *foo() {} }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "Foo",
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
                                    generator: true,
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
 it("should parse generator declaration with params", () => {
        expect(parseScript("function *foo(x, y, z) {}")).to.eql({
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
                            name: "x",
                        },
                        {
                            type: "Identifier",
                            name: "y",
                        },
                        {
                            type: "Identifier",
                            name: "z",
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

 it("should parse generator declaration with yield delegate", () => {
        expect(parseScript("function *foo() { yield* 3; }")).to.eql({
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
                                    type: "YieldExpression",
                                    argument: {
                                        type: "Literal",
                                        value: 3,
                                    },
                                    delegate: true,
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

 it("should parse generator declaration", () => {
        expect(parseScript("function *foo() {}")).to.eql({
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
                    generator: true,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

 it("should parse generator expression rest param", () => {
        expect(parseScript("(function*(...x) {})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
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
                },
            ],
            sourceType: "script",
        });
    });

 it("should parse generator expression with params", () => {
        expect(parseScript("(function*(x, y, z) {})")).to.eql({
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
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
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
                },
            ],
            sourceType: "script",
        });
    });

 it("should parse generator expression", () => {
        expect(parseScript("(function*() {})")).to.eql({
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

 it("should throw on \"function*g() { var yield; }\"", () => {
        expect(() => { parseScript("function*g() { var yield; }"); }).to.throw();
    });

 it("should throw on \"function*g() { let yield; }\"", () => {
        expect(() => { parseScript("function*g() { let yield; }"); }).to.throw();
    });

 it("should throw on \"function*g() { try {} catch (yield) {} }\"", () => {
        expect(() => { parseScript("function*g() { try {} catch (yield) {} }"); }).to.throw();
    });

 it("should throw on \"function*g() { ({yield}); }\"", () => {
        expect(() => { parseScript("function*g() { ({yield}); }"); }).to.throw();
    });

 it("should throw on \"function*g() { ({yield} = 0); }\"", () => {
        expect(() => { parseScript("function*g() { ({yield} = 0); }"); }).to.throw();
    });

 it("should throw on \"function*g() { var {yield} = 0; }\"", () => {
        expect(() => { parseScript("function*g() { var {yield} = 0; }"); }).to.throw();
    });

 it("should throw on \"function*g() { var {yield = 0} = 0; }\"", () => {
        expect(() => { parseScript("function*g() { var {yield = 0} = 0; }"); }).to.throw();
    });
 it("should throw on \"function* f(...x = []) {}\"", () => {
        expect(() => { parseScript("function* f(...x = []) {}"); }).to.throw();
    });
 it("should throw on \"function* f([...[ x ] = []]) {}\"", () => {
        expect(() => { parseScript("function* f([...[ x ] = []]) {}"); }).to.throw();
    });

});
