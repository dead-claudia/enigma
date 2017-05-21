import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2018 - Spread Properties", () => {
    it("should throw for exported spread property\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`export const foo = 1;
export const { bar: { baz, ...foo } } = qux;`); });
    });

    it("should throw for exported spread property\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`export const { foo, ...bar } = baz;
export const bar = 1;`); });
    });

    it("should throw for exported spread property\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`export const foo = 1;
export const { bar, ...foo } = baz;`); });
    });

    it("should throw for exported spread property\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`export const foo = 1;
export const [bar, { baz, ...foo }] = qux;`); });
    });

    it("should throw for exported spread property\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`export const foo = 1;
export const [bar, [{ baz, ...foo }]] = qux;`); });
    });

    it("should parse \"let z = {...x}\"", () => {
        assert.match<Program>(parseScript(`let z = {...x}`), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "z",
                            },
                            init: {
                                type: "ObjectExpression",
                                properties: [
                                    {
                                        type: "SpreadElement",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
                                        },
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

    it("should parse \"z = {x, ...y}\"", () => {
        assert.match<Program>(parseScript(`z = {x, ...y}`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "z",
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
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: true,
                                },
                                {
                                    type: "SpreadElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({x, ...y, a, ...b, c})\"", () => {
        assert.match<Program>(parseScript(`({x, ...y, a, ...b, c})`), {
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
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
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
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "c",
                                },
                                computed: false,
                                value: {
                                    type: "Identifier",
                                    name: "c",
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let { x, y, } = obj;\"", () => {
        assert.match<Program>(parseScript(`let { x, y, } = obj;`), {
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
                                ],
                            },
                            init: {
                                type: "Identifier",
                                name: "obj",
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var { ...{ x = 5 } } = {x : 1};\"", () => {
        assert.match<Program>(parseScript(`var { ...{ x = 5 } } = {x : 1};`), {
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
                                        type: "RestElement",
                                        argument: {
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
                                                        type: "AssignmentPattern",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "x",
                                                        },
                                                        right: {
                                                            type: "Literal",
                                                            value: 5,
                                                        },
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: true,
                                                },
                                            ],
                                        },
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
                                            value: 1,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var {...{z}} = { z: 1};\"", () => {
        assert.match<Program>(parseScript(`var {...{z}} = { z: 1};`), {
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
                                        type: "RestElement",
                                        argument: {
                                            type: "ObjectPattern",
                                            properties: [
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
                                            name: "z",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"z = {x, ...y}\"", () => {
        assert.match<Program>(parseScript(`z = {x, ...y}`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "z",
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
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: true,
                                },
                                {
                                    type: "SpreadElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse default properties", () => {
        assert.match<Program>(parseScript(`let aa = { x: 1, y: 2, ...a };`), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "aa",
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
                                            value: 1,
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
                                            value: 2,
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
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
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse object merging", () => {
        assert.match<Program>(parseScript(`let xy = { ...x, ...y };`), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "xy",
                            },
                            init: {
                                type: "ObjectExpression",
                                properties: [
                                    {
                                        type: "SpreadElement",
                                        argument: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    },
                                    {
                                        type: "SpreadElement",
                                        argument: {
                                            type: "Identifier",
                                            name: "y",
                                        },
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

    it("should parse spread getter", () => {
        assert.match<Program>(parseScript(`x = { ...y, ...{ get z() {} } };`), {
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
                                    type: "SpreadElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                },
                                {
                                    type: "SpreadElement",
                                    argument: {
                                        type: "ObjectExpression",
                                        properties: [
                                            {
                                                type: "Property",
                                                key: {
                                                    type: "Identifier",
                                                    name: "z",
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
                                                method: false,
                                                shorthand: false,
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse spred null undefined", () => {
        assert.match<Program>(parseScript(`x = { ...undefined, ...null };`), {
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
                                    type: "SpreadElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "undefined",
                                    },
                                },
                                {
                                    type: "SpreadElement",
                                    argument: {
                                        type: "Literal",
                                        value: "null",
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
    it("should parse properties overriding", () => {
        assert.match<Program>(parseScript(`x = { ...y, z: 1};`), {
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
                                    type: "SpreadElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "y",
                                    },
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
                                        value: 1,
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
});
