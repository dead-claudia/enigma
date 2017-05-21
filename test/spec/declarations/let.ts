import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Declarations - `let`", () => {
    it("should parse \"let [x, y, z] = [1, 2, 3];\"", () => {
        assert.match<Program>(parseScript(`let [x, y, z] = [1, 2, 3];`), {
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
        assert.match<Program>(parseScript(`let [[x]] = [null];`), {
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
        assert.match<Program>(
            parseScript("let [cover = (function () {}), xCover = (0, function() {})] = [];"),
            {
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
            },
        );
    });

    /* tslint:disable max-line-length */
    it("should parse \"let [w = counter(), x = counter(), y = counter(), z = counter()] = [null, 0, false, ];\"", () => {
        assert.match<Program>(
            parseScript(`let [w = counter(), x = counter(), y = counter(), z = counter()] = [null, 0, false, ''];`),
        /* tslint:enable max-line-length */
            {
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
            },
        );
    });

    /* tslint:disable max-line-length */
    it("should parse \"let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];\"", () => {
        /* tslint:enable max-line-length */
        assert.match<Program>(
            parseScript("let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];"),
            {
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
            },
        );
    });

    it("should parse \"let [...[]] = iter;\"", () => {
        assert.match<Program>(parseScript(`let [...[]] = iter;`), {
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
        assert.match<Program>(parseScript(`let { x, } = { x: 23 };`), {
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
        assert.match<Program>(parseScript(`let { x: y } = { x: 23 };`), {
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
        assert.match<Program>(parseScript(`let xGen = function* x() {};`), {
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
        assert.match<Program>(
            parseScript(`let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`),
            /* tslint:enable max-line-length */
            {
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
            },
        );
    });

    it("should throw on \"(function() { use strict; { let f; var f; } })", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function() { 'use strict'; { let f; var f; } })`);
        });
    });

    it("should throw on \"let x = x + 1;", () => {
        assert.throws(SyntaxError, () => parseScript(`let x = x + 1;`));
    });

    /* tslint:disable max-line-length */
    // Reference: https://github.com/tc39/test262/blob/master/test/language/statements/let/dstr-obj-ptrn-prop-eval-err.js
    /* tslint:enable max-line-length */
    it("let { [thrower()]: x } = {};", () => {
        assert.throws(SyntaxError, () => parseScript(`let { [thrower()]: x } = {};`));
    });

    /* tslint:disable max-line-length */
    // https://github.com/tc39/test262/blob/master/test/language/statements/let/dstr-obj-ptrn-list-err.js
    /* tslint:enable max-line-length */
    it("let { a, b = thrower(), c = ++initCount } = {};", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`let { a, b = thrower(), c = ++initCount } = {};`);
        });
    });

    it("should throw on \"let {} = undefined;", () => {
        assert.throws(SyntaxError, () => parseScript(`let {} = undefined;`));
    });

    it("should throw on \"let argument = 123, b = 124;\" in strict mode", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`let argument = 123, b = 124;" in strict mode`);
        });
    });

    it("should throw on \"let a = 123, eval = 124;\" in strict mode", () => {
        assert.throws(SyntaxError, () => parseModule(`let a = 123, eval = 124;" in strict mode`));
    });

    it("should throw on \"let eval = 123, b = 124;\" in strict mode", () => {
        assert.throws(SyntaxError, () => parseModule(`let eval = 123, b = 124;" in strict mode`));
    });

    it("should parse \"let eval = 123, b = 124;", () => {
        assert.match<Program>(parseScript("let eval = 123, b = 124;"), {
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
        assert.throws(SyntaxError, () => parseModule(`let yield;" in strict mode`));
    });

    it("should parse \"let yield;\"", () => {
        assert.match<Program>(parseScript("let yield;"), {
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
        assert.match<Program>(parseScript(`let x`), {
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
        assert.match<Program>(parseScript("{ let x }"), {
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
        assert.match<Program>(parseScript(`(let[a])`), {
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
        assert.match<Program>(parseScript(`{ let x }`), {
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
        assert.match<Program>(parseScript("let;"), {
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
        assert.match<Program>(parseScript("let = 42;"), {
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
        assert.match<Program>(parseScript("let.let = foo"), {
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
        assert.match<Program>(parseScript(`let;
assert.match<Program> = 1;`), {
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
        assert.match<Program>(parseModule("let x"), {
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
        assert.match<Program>(parseScript("let x"), {
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
        assert.match<Program>(parseScript("let a, b;"), {
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
        assert.match<Program>(parseScript(`let a`), {
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
        assert.match<Program>(parseScript(`{ let a; }`), {
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
        assert.match<Program>(parseScript(`{ let x = 42 }`), {
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
        assert.match<Program>(parseScript(`{ let x = 14, y = 3, z = 1977 }`), {
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

    it("should not throw on invalid \"let\"", () => {
        assert.match<Program>(parseModule(`let`), {
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

    it("should throw on \"a: let a\"", () => {
        assert.throws(SyntaxError, () => parseScript(`a: let a`));
    });

    it("should throw on \"while(true) let a\"", () => {
        assert.throws(SyntaxError, () => parseScript(`with(true) let a`));
    });

    it("should throw on \"let let\"", () => {
        assert.throws(SyntaxError, () => parseModule(`let let`));
    });

    it("should throw on \"let []\" in strict mode", () => {
        assert.throws(SyntaxError, () => parseModule(`let []`));
    });

    it("should throw on \"let []\"", () => {
        assert.throws(SyntaxError, () => parseScript(`let []`));
    });

    it("should throw on \"let x,\"", () => {
        assert.throws(SyntaxError, () => parseModule(`let x,`));
    });
});
