import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2017 - Trailing Commas", () => {

 it("should parse \"f(x,);\"", () => {
      expect(parseScript("f(x,);")).to.eql({
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
      expect(parseScript("class X { constructor(a,) {} }")).to.eql({
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

 it("should parse \"class P { f(a,b,) { } }\"", () => {
      expect(parseScript("class P { f(a,b,) { } }")).to.eql({
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

 it("should parse \"new f(x,);\"", () => {
      expect(parseScript("new f(x,);")).to.eql({
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
      expect(parseScript("f(...a,);")).to.eql({
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
      expect(parseScript("function foo(a,) { }")).to.eql({
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
      expect(parseScript("(function(a,) { })")).to.eql({
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
      expect(parseScript("(a,) => a")).to.eql({
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
      expect(parseScript("class A {foo(a,) {}}")).to.eql({
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

 it("should parse \"class A {static foo(a,) {}}\"", () => {
      expect(parseScript("class A {static foo(a,) {}}")).to.eql({
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

 it("should parse \"(class {foo(a,) {}})\"", () => {
      expect(parseScript("(class {foo(a,) {}})")).to.eql({
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

 it("should parse \"(class {static foo(a,) {}})\"", () => {
      expect(parseScript("(class {static foo(a,) {}})")).to.eql({
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

 it("should parse \"foo(a,)\"", () => {
      expect(parseScript("foo(a,)")).to.eql({
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
      expect(parseScript("foo(...a,)")).to.eql({
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
      expect(parseScript("new foo(...a,)")).to.eql({
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
      expect(parseScript("({foo(a,) {}})")).to.eql({
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

 it("should parse \"let f = (x,y,) => x;\"", () => {
      expect(parseScript("let f = (x,y,) => x;")).to.eql({
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
      expect(() => { parseScript("function foo(...a,) { }"); }).to.throw();
 });

 it("should throw \"(function(...a,) { })\"", () => {
      expect(() => { parseScript("(function(...a,) { })"); }).to.throw();
 });

 it("should throw \"(...a,) => a\"", () => {
      expect(() => { parseScript("(...a,) => a"); }).to.throw();
 });

 it("should throw \"({foo(...a,) {}})\"", () => {
      expect(() => { parseScript("({foo(...a,) {}})"); }).to.throw();
 });

 it("should throw \"class A {foo(...a,) {}}\"", () => {
      expect(() => { parseScript("class A {foo(...a,) {}}"); }).to.throw();
 });

 it("should throw \"class A {static foo(...a,) {}}\"", () => {
      expect(() => { parseScript("class A {static foo(...a,) {}}"); }).to.throw();
 });

 it("should throw function foo(...a,) { }\"", () => {
      expect(() => { parseScript("function foo(...a,) { }"); }).to.throw();
 });

 it("should throw \"(function(,) { })\"", () => {
      expect(() => { parseScript("(function(,) { })"); }).to.throw();
 });

 it("should throw \"(,) => a\"", () => {
      expect(() => { parseScript("(,) => a"); }).to.throw();
 });

 it("should throw \"(class {foo(,) {}})\"", () => {
      expect(() => { parseScript("(class {foo(,) {}})"); }).to.throw();
 });

 it("should throw \"function foo(,) { }\"", () => {
      expect(() => { parseScript("function foo(,) { }"); }).to.throw();
 });

 it("should throw \"(a,)\"", () => {
      expect(() => { parseScript("(function(,) { })"); }).to.throw();
 });

 it("should throw \"function foo(,) { }\"", () => {
      expect(() => { parseScript("function foo(,) { }"); }).to.throw();
 });

 it("should throw \"function f(...a,) {}\"", () => {
      expect(() => { parseScript("function f(...a,) {}"); }).to.throw();
 });

 it("should throw \"class A { f(,){} }\"", () => {
      expect(() => { parseScript("class A { f(,){} }"); }).to.throw();
 });

 it("should throw \"class A { constructor(,) {} }\"", () => {
      expect(() => { parseScript("class A { constructor(,) {} }"); }).to.throw();
 });

 it("should throw \"class A { get x(,) { return 42 } }\"", () => {
      expect(() => { parseScript("class A { get x(,) { return 42 } }"); }).to.throw();
 });

 it("should throw \"(x,y,);\"", () => {
      expect(() => { parseScript("(x,y,);"); }).to.throw();
 });

 it("should throw \"f(x,);\"", () => {
      expect(() => { parseScript("f(x,);"); }).to.throw();
 });

});
