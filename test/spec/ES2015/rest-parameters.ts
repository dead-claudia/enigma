import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - Rest Parameters", () => {

    it("should parse function expression\"", () => {
        expect(parseScript(`f = function(a, ...b) {}`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "f",
                        },
                        right: {
                            type: "FunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "a",
                                },
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
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse object method\"", () => {
        expect(parseScript(`
o = { f: function(a, ...b) {} }`)).to.eql({
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

    it("should parse rest paramater object\"", () => {
        expect(parseScript(`function f(...{a}) {}`)).to.eql({
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

    it("should parse arrow rest parameter array\"", () => {
        expect(parseScript(`(a, ...[b]) => c`)).to.eql({
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
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "b",
                                        },
                                    ],
                                },
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "c",
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

    it("should parse function declaration\"", () => {
        expect(parseScript(`function f(a, ...b) {}`)).to.eql({
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
                            type: "Identifier",
                            name: "a",
                        },
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

    it("should parse rest paramater array\"", () => {
        expect(parseScript(`function f(...[a]) {}`)).to.eql({
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
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function f(...[a]) {}\"", () => {
        expect(parseScript(`function f(...[a]) {}`)).to.eql({
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
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x = { method(...test) { } }\"", () => {
        expect(parseScript(`x = { method(...test) { } }`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "ObjectExpression",
                            properties: [
                                {
                                    type: "Property",
                                    key: {
                                        type: "Identifier",
                                        name: "method",
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
                                                    name: "test",
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

    it("should parse \"f = function(a, ...b) {}\"", () => {
        expect(parseScript(`f = function(a, ...b) {}`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "f",
                        },
                        right: {
                            type: "FunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "a",
                                },
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
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a, ...{b}) => c\"", () => {
        expect(parseScript(`(a, ...{b}) => c`)).to.eql({
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
                        body: {
                            type: "Identifier",
                            name: "c",
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

});
