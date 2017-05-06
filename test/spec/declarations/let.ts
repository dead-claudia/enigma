import {parseScript, parseModule} from "../../../src";
import {expect} from "chai";

describe.skip("Declarations - `let`", () => {
    it("should parse \"let [x, y, z] = [1, 2, 3];\"", () => {
        expect(parseScript(`let [x, y, z] = [1, 2, 3];`)).to.eql({
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
                            init: {
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
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let [[x]] = [null];\"", () => {
        expect(parseScript(`let [[x]] = [null];`)).to.eql({
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
                                        elements: [
                                            {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                        ],
                                    },
                                ],
                            },
                            init: {
                                type: "ArrayExpression",
                                elements: [
                                    {
                                        type: "Literal",
                                        value: "null",
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let [cover = (function () {}), xCover = (0, function() {})] = [];\"", () => {
        expect(parseScript("let [cover = (function () {}), xCover = (0, function() {})] = [];"))
        .to.eql({
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
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "cover",
                                        },
                                        right: {
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
                                    },
                                    {
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "xCover",
                                        },
                                        right: {
                                            type: "SequenceExpression",
                                            expressions: [
                                                {
                                                    type: "Literal",
                                                    value: 0,
                                                },
                                                {
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
                                            ],
                                        },
                                    },
                                ],
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

    /* tslint:disable max-line-length */
    it("should parse \"let [w = counter(), x = counter(), y = counter(), z = counter()] = [null, 0, false, ];\"", () => {
        expect(parseScript(`let [w = counter(), x = counter(), y = counter(), z = counter()] = [null, 0, false, ''];`))
        /* tslint:enable max-line-length */
        .to.eql({
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
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                        right: {
                                            type: "CallExpression",
                                            callee: {
                                                type: "Identifier",
                                                name: "counter",
                                            },
                                            arguments: [],
                                        },
                                    },
                                    {
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        right: {
                                            type: "CallExpression",
                                            callee: {
                                                type: "Identifier",
                                                name: "counter",
                                            },
                                            arguments: [],
                                        },
                                    },
                                    {
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        right: {
                                            type: "CallExpression",
                                            callee: {
                                                type: "Identifier",
                                                name: "counter",
                                            },
                                            arguments: [],
                                        },
                                    },
                                    {
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "z",
                                        },
                                        right: {
                                            type: "CallExpression",
                                            callee: {
                                                type: "Identifier",
                                                name: "counter",
                                            },
                                            arguments: [],
                                        },
                                    },
                                ],
                            },
                            init: {
                                type: "ArrayExpression",
                                elements: [
                                    {
                                        type: "Literal",
                                        value: "null",
                                    },
                                    {
                                        type: "Literal",
                                        value: 0,
                                    },
                                    {
                                        type: "Literal",
                                        value: false,
                                    },
                                    {
                                        type: "Literal",
                                        value: "",
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    /* tslint:disable max-line-length */
    it("should parse \"let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];\"", () => {
        expect(parseScript("let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];"))
        /* tslint:enable max-line-length */
        .to.eql({
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
                                        type: "AssignmentPattern",
                                        left: {
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
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "z",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "Identifier",
                                                        name: "z",
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: true,
                                                },
                                            ],
                                        },
                                        right: {
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
                                                        type: "Literal",
                                                        value: 44,
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: false,
                                                },
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "y",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "Literal",
                                                        value: 55,
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: false,
                                                },
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "z",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "Literal",
                                                        value: 66,
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: false,
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                            init: {
                                type: "ArrayExpression",
                                elements: [
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
                                                    type: "Literal",
                                                    value: 11,
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: false,
                                            },
                                            {
                                                type: "Property",
                                                key: {
                                                    type: "Identifier",
                                                    name: "y",
                                                },
                                                computed: false,
                                                value: {
                                                    type: "Literal",
                                                    value: 22,
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: false,
                                            },
                                            {
                                                type: "Property",
                                                key: {
                                                    type: "Identifier",
                                                    name: "z",
                                                },
                                                computed: false,
                                                value: {
                                                    type: "Literal",
                                                    value: 33,
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
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let [...[]] = iter;\"", () => {
        expect(parseScript(`let [...[]] = iter;`)).to.eql({
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
                                            elements: [],
                                        },
                                    },
                                ],
                            },
                            init: {
                                type: "Identifier",
                                name: "iter",
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let { x, } = { x: 23 };\"", () => {
        expect(parseScript(`let { x, } = { x: 23 };`)).to.eql({
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
                                            name: "x",
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
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Literal",
                                            value: 23,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let { x: y } = { x: 23 };\"", () => {
        expect(parseScript(`let { x: y } = { x: 23 };`)).to.eql({
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
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
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
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Literal",
                                            value: 23,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let xGen = function* x() {};\"", () => {
        expect(parseScript(`let xGen = function* x() {};`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "xGen",
                            },
                            init: {
                                type: "FunctionExpression",
                                id: {
                                    type: "Identifier",
                                    name: "x",
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
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    /* tslint:disable max-line-length */
    it("should parse \"let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };\"", () => {
        expect(parseScript(`let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`))
        /* tslint:enable max-line-length */
        .to.eql({
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
                                            name: "w",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
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
                                                    {
                                                        type: "Property",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "z",
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: "Identifier",
                                                            name: "z",
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: true,
                                                    },
                                                ],
                                            },
                                            right: {
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
                                                            type: "Literal",
                                                            value: 4,
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: false,
                                                    },
                                                    {
                                                        type: "Property",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "y",
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: "Literal",
                                                            value: 5,
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: false,
                                                    },
                                                    {
                                                        type: "Property",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "z",
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: "Literal",
                                                            value: 6,
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: false,
                                                    },
                                                ],
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
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
                                            name: "w",
                                        },
                                        computed: false,
                                        value: {
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
                                                        name: "undefined",
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: false,
                                                },
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "z",
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: "Literal",
                                                        value: 7,
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
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should throw on \"(function() { use strict; { let f; var f; } })", () => {
        expect(() => parseScript(`(function() { 'use strict'; { let f; var f; } })`)).to.throw();
    });

    it("should throw on \"let x = x + 1;", () => {
        expect(() => parseScript(`let x = x + 1;`)).to.throw();
    });

    /* tslint:disable max-line-length */
    // Reference: https://github.com/tc39/test262/blob/master/test/language/statements/let/dstr-obj-ptrn-prop-eval-err.js
    /* tslint:enable max-line-length */
    it("let { [thrower()]: x } = {};", () => {
        expect(() => parseScript(`let { [thrower()]: x } = {};`)).to.throw();
    });

    /* tslint:disable max-line-length */
    // https://github.com/tc39/test262/blob/master/test/language/statements/let/dstr-obj-ptrn-list-err.js
    /* tslint:enable max-line-length */
    it("let { a, b = thrower(), c = ++initCount } = {};", () => {
        expect(() => parseScript(`let { a, b = thrower(), c = ++initCount } = {};`)).to.throw();
    });

    it("should throw on \"let {} = undefined;", () => {
        expect(() => parseScript(`let {} = undefined;`)).to.throw();
    });

    it("should throw on \"let argument = 123, b = 124;\" in strict mode", () => {
        expect(() => parseModule(`let argument = 123, b = 124;" in strict mode`)).to.throw();
    });

    it("should throw on \"let a = 123, eval = 124;\" in strict mode", () => {
        expect(() => parseModule(`let a = 123, eval = 124;" in strict mode`)).to.throw();
    });

    it("should throw on \"let eval = 123, b = 124;\" in strict mode", () => {
        expect(() => parseModule(`let eval = 123, b = 124;" in strict mode`)).to.throw();
    });

    it("should parse \"let eval = 123, b = 124;", () => {
        expect(parseScript("let eval = 123, b = 124;")).to.eql({
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "eval",
                            },
                            init: {
                                type: "Literal",
                                value: 123,
                            },
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "b",
                            },
                            init: {
                                type: "Literal",
                                value: 124,
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should throw on \"let yield;\" in strict mode", () => {
        expect(() => parseModule(`let yield;" in strict mode`)).to.throw();
    });

    it("should parse \"let yield;\"", () => {
        expect(parseScript("let yield;")).to.eql({
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
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let x\"", () => {
        expect(parseScript(`let x`)).to.eql({
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
                            init: null,
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ let x }\"", () => {
        expect(parseScript("{ let x }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
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
                                    init: null,
                                },
                            ],
                            kind: "let",
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(let[a])\"", () => {
        expect(parseScript(`(let[a])`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: true,
                        object: {
                            type: "Identifier",
                            name: "let",
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
    it("should parse \"{ let x }\"", () => {
        expect(parseScript(`{ let x }`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
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
                                    init: null,
                                },
                            ],
                            kind: "let",
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse let identifier", () => {
        expect(parseScript("let;")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "let",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse let assign", () => {
        expect(parseScript("let = 42;")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "let",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let.let = foo\"", () => {
        expect(parseScript("let.let = foo")).to.eql({
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
                                type: "Identifier",
                                name: "let",
                            },
                            property: {
                                type: "Identifier",
                                name: "let",
                            },
                        },
                        right: {
                            type: "Identifier",
                            name: "foo",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let foo = 1", () => {
        expect(parseScript(`let;
foo = 1;`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "let",
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "foo",
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

    it("should parse \"let x\" in strict mode", () => {
        expect(parseModule("let x")).to.eql({
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
                            init: null,
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"let x\"", () => {
        expect(parseScript("let x")).to.eql({
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
                            init: null,
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let a, b;\"", () => {
        expect(parseScript("let a, b;")).to.eql({
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
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let a\"", () => {
        expect(parseScript(`let a`)).to.eql({
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
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ let a; }\"", () => {
        expect(parseScript(`{ let a; }`)).to.eql({
            type: "Program",
            body: [
                {
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ let x = 42 }\"", () => {
        expect(parseScript(`{ let x = 42 }`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
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
                                        type: "Literal",
                                        value: 42,
                                    },
                                },
                            ],
                            kind: "let",
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ let x = 14, y = 3, z = 1977 }\"", () => {
        expect(parseScript(`{ let x = 14, y = 3, z = 1977 }`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
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
                                        type: "Literal",
                                        value: 14,
                                    },
                                },
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                    init: {
                                        type: "Literal",
                                        value: 3,
                                    },
                                },
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                    init: {
                                        type: "Literal",
                                        value: 1977,
                                    },
                                },
                            ],
                            kind: "let",
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should throw on invalid \"let\"", () => {
        expect(() => parseModule(`let`)).to.not.throw();
    });

    it("should throw on \"a: let a\"", () => {
        expect(() => parseScript(`a: let a`)).to.throw();
    });

    it("should throw on \"while(true) let a\"", () => {
        expect(() => parseScript(`with(true) let a`)).to.throw();
    });

    it("should throw on \"let let\"", () => {
        expect(() => parseModule(`let let`)).to.throw();
    });

    it("should throw on \"let []\" in strict mode", () => {
        expect(() => parseModule(`let []`)).to.throw();
    });

    it("should throw on \"let []\"", () => {
        expect(() => parseScript(`let []`)).to.throw();
    });

    it("should throw on \"let x,\"", () => {
        expect(() => parseModule(`let x,`)).to.throw();
    });
});
