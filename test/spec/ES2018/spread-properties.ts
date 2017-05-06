import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("ES2018 - Spread Properties", () => {

   it("should throw for exported spread property\"", () => {
        expect(() => { parseScript(`export const foo = 1;
export const { bar: { baz, ...foo } } = qux;`); }).to.throw();
   });

   it("should throw for exported spread property\"", () => {
        expect(() => { parseScript(`export const { foo, ...bar } = baz;
export const bar = 1;`); }).to.throw();
   });

   it("should throw for exported spread property\"", () => {
        expect(() => { parseScript(`export const foo = 1;
export const { bar, ...foo } = baz;`); }).to.throw();
   });

   it("should throw for exported spread property\"", () => {
        expect(() => { parseScript(`export const foo = 1;
export const [bar, { baz, ...foo }] = qux;`); }).to.throw();
   });

   it("should throw for exported spread property\"", () => {
        expect(() => { parseScript(`export const foo = 1;
export const [bar, [{ baz, ...foo }]] = qux;`); }).to.throw();
   });

   it("should parse \"let z = {...x}\"", () => {
        expect(parseScript(`let z = {...x}`)).to.eql({
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
        expect(parseScript(`z = {x, ...y}`)).to.eql({
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
        expect(parseScript(`({x, ...y, a, ...b, c})`)).to.eql({
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
        expect(parseScript(`let { x, y, } = obj;`)).to.eql({
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
        expect(parseScript(`var { ...{ x = 5 } } = {x : 1};`)).to.eql({
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
        expect(parseScript(`var {...{z}} = { z: 1};`)).to.eql({
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
        expect(parseScript(`z = {x, ...y}`)).to.eql({
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
        expect(parseScript(`let aa = { x: 1, y: 2, ...a };`)).to.eql({
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
        expect(parseScript(`
let xy = { ...x, ...y };`)).to.eql({
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
        expect(parseScript(`x = { ...y, ...{ get z() {} } };`)).to.eql({
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
        expect(parseScript(`x = { ...undefined, ...null };`)).to.eql({
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
        expect(parseScript(`x = { ...y, z: 1};`)).to.eql({
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
