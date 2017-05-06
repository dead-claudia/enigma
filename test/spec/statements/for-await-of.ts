import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `for await ... of`", () => {
    it("should parse \";\"", () => {
        expect(parseScript(`async function fn() {
  for await (const {} of [obj]) {
  }
}`, { next: true})).to.eql({
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                await: true,
                                body: {
                                    body: [],
                                    type: "BlockStatement",
                                },
                                left: {
                                    declarations: [
                                        {
                                            id: {
                                                properties: [],
                                                type: "ObjectPattern",
                                            },
                                            init: null,
                                            type: "VariableDeclarator",
                                        },
                                    ],
                                    kind: "const",
                                    type: "VariableDeclaration",
                                },
                                right: {
                                    elements: [
                                        {
                                            name: "obj",
                                            type: "Identifier",
                                        },
                                    ],
                                    type: "ArrayExpression",
                                },
                                type: "ForOfStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "fn",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function fn() {
  for await (const { gen = function* () {}, xGen = function* x() {} } of [{}]) {
  }
}`, { next: true})).to.eql({
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                await: true,
                                body: {
                                    body: [],
                                    type: "BlockStatement",
                                },
                                left: {
                                    declarations: [
                                        {
                                            id: {
                                                properties: [
                                                    {
                                                        computed: false,
                                                        key: {
                                                            name: "gen",
                                                            type: "Identifier",
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: true,
                                                        type: "Property",
                                                        value: {
                                                            left: {
                                                                name: "gen",
                                                                type: "Identifier",
                                                            },
                                                            right: {
                                                                async: false,
                                                                body: {
                                                                    body: [],
                                                                    type: "BlockStatement",
                                                                },
                                                                expression: false,
                                                                generator: true,
                                                                id: null,
                                                                params: [],
                                                                type: "FunctionExpression",
                                                            },
                                                            type: "AssignmentPattern",
                                                        },
                                                    },
                                                    {
                                                        computed: false,
                                                        key: {
                                                            name: "xGen",
                                                            type: "Identifier",
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: true,
                                                        type: "Property",
                                                        value: {
                                                            left: {
                                                                name: "xGen",
                                                                type: "Identifier",
                                                            },
                                                            right: {
                                                                async: false,
                                                                body: {
                                                                    body: [],
                                                                    type: "BlockStatement",
                                                                },
                                                                expression: false,
                                                                generator: true,
                                                                id: {
                                                                    name: "x",
                                                                    type: "Identifier",
                                                                },
                                                                params: [],
                                                                type: "FunctionExpression",
                                                            },
                                                            type: "AssignmentPattern",
                                                        },
                                                    },
                                                ],
                                                type: "ObjectPattern",
                                            },
                                            init: null,
                                            type: "VariableDeclarator",
                                        },
                                    ],
                                    kind: "const",
                                    type: "VariableDeclaration",
                                },
                                right: {
                                    elements: [
                                        {
                                            properties: [],
                                            type: "ObjectExpression",
                                        },
                                    ],
                                    type: "ArrayExpression",
                                },
                                type: "ForOfStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "fn",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function fn() {
  for await (const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: { x: undefined, z: 7 } }]) {
  }
}`, { next: true})).to.eql({
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                await: true,
                                body: {
                                    body: [],
                                    type: "BlockStatement",
                                },
                                left: {
                                    declarations: [
                                        {
                                            id: {
                                                properties: [
                                                    {
                                                        computed: false,
                                                        key: {
                                                            name: "w",
                                                            type: "Identifier",
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: false,
                                                        type: "Property",
                                                        value: {
                                                            left: {
                                                                properties: [
                                                                    {
                                                                        computed: false,
                                                                        key: {
                                                                            name: "x",
                                                                            type: "Identifier",
                                                                        },
                                                                        kind: "init",
                                                                        method: false,
                                                                        shorthand: true,
                                                                        type: "Property",
                                                                        value: {
                                                                            name: "x",
                                                                            type: "Identifier",
                                                                        },
                                                                    },
                                                                    {
                                                                        computed: false,
                                                                        key: {
                                                                            name: "y",
                                                                            type: "Identifier",
                                                                        },
                                                                        kind: "init",
                                                                        method: false,
                                                                        shorthand: true,
                                                                        type: "Property",
                                                                        value: {
                                                                            name: "y",
                                                                            type: "Identifier",
                                                                        },
                                                                    },
                                                                    {
                                                                        computed: false,
                                                                        key: {
                                                                            name: "z",
                                                                            type: "Identifier",
                                                                        },
                                                                        kind: "init",
                                                                        method: false,
                                                                        shorthand: true,
                                                                        type: "Property",
                                                                        value: {
                                                                            name: "z",
                                                                            type: "Identifier",
                                                                        },
                                                                    },
                                                                ],
                                                                type: "ObjectPattern",
                                                            },
                                                            right: {
                                                                properties: [
                                                                    {
                                                                        computed: false,
                                                                        key: {
                                                                            name: "x",
                                                                            type: "Identifier",
                                                                        },
                                                                        kind: "init",
                                                                        method: false,
                                                                        shorthand: false,
                                                                        type: "Property",
                                                                        value: {
                                                                            type: "Literal",
                                                                            value: 4,
                                                                        },
                                                                    },
                                                                    {
                                                                        computed: false,
                                                                        key: {
                                                                            name: "y",
                                                                            type: "Identifier",
                                                                        },
                                                                        kind: "init",
                                                                        method: false,
                                                                        shorthand: false,
                                                                        type: "Property",
                                                                        value: {
                                                                            type: "Literal",
                                                                            value: 5,
                                                                        },
                                                                    },
                                                                    {
                                                                        computed: false,
                                                                        key: {
                                                                            name: "z",
                                                                            type: "Identifier",
                                                                        },
                                                                        kind: "init",
                                                                        method: false,
                                                                        shorthand: false,
                                                                        type: "Property",
                                                                        value: {
                                                                            type: "Literal",
                                                                            value: 6,
                                                                        },
                                                                    },
                                                                ],
                                                                type: "ObjectExpression",
                                                            },
                                                            type: "AssignmentPattern",
                                                        },
                                                    },
                                                ],
                                                type: "ObjectPattern",
                                            },
                                            init: null,
                                            type: "VariableDeclarator",
                                        },
                                    ],
                                    kind: "const",
                                    type: "VariableDeclaration",
                                },
                                right: {
                                    elements: [
                                        {
                                            properties: [
                                                {
                                                    computed: false,
                                                    key: {
                                                        name: "w",
                                                        type: "Identifier",
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: false,
                                                    type: "Property",
                                                    value: {
                                                        properties: [
                                                            {
                                                                computed: false,
                                                                key: {
                                                                    name: "x",
                                                                    type: "Identifier",
                                                                },
                                                                kind: "init",
                                                                method: false,
                                                                shorthand: false,
                                                                type: "Property",
                                                                value: {
                                                                    name: "undefined",
                                                                    type: "Identifier",
                                                                },
                                                            },
                                                            {
                                                                computed: false,
                                                                key: {
                                                                    name: "z",
                                                                    type: "Identifier",
                                                                },
                                                                kind: "init",
                                                                method: false,
                                                                shorthand: false,
                                                                type: "Property",
                                                                value: {
                                                                    type: "Literal",
                                                                    value: 7,
                                                                },
                                                            },
                                                        ],
                                                        type: "ObjectExpression",
                                                    },
                                                },
                                            ],
                                            type: "ObjectExpression",
                                        },
                                    ],
                                    type: "ArrayExpression",
                                },
                                type: "ForOfStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "fn",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function fn() {
  for await (let [...x, y] of [[1, 2, 3]]) {
  }
}`, { next: true})).to.eql({
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                await: true,
                                body: {
                                    body: [],
                                    type: "BlockStatement",
                                },
                                left: {
                                    declarations: [
                                        {
                                            id: {
                                                elements: [
                                                    {
                                                        argument: {
                                                            name: "x",
                                                            type: "Identifier",
                                                        },
                                                        type: "RestElement",
                                                    },
                                                    {
                                                        name: "y",
                                                        type: "Identifier",
                                                    },
                                                ],
                                                type: "ArrayPattern",
                                            },
                                            init: null,
                                            type: "VariableDeclarator",
                                        },
                                    ],
                                    kind: "let",
                                    type: "VariableDeclaration",
                                },
                                right: {
                                    elements: [
                                        {
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
                                            type: "ArrayExpression",
                                        },
                                    ],
                                    type: "ArrayExpression",
                                },
                                type: "ForOfStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "fn",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse var with hole", () => {
        expect(parseScript(`async function fn() {
  for await (var [x = 23] of [[,]]) {
  }
}`, { next: true})).to.eql({
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                await: true,
                                body: {
                                    body: [],
                                    type: "BlockStatement",
                                },
                                left: {
                                    declarations: [
                                        {
                                            id: {
                                                elements: [
                                                    {
                                                        left: {
                                                            name: "x",
                                                            type: "Identifier",
                                                        },
                                                        right: {
                                                            type: "Literal",
                                                            value: 23,
                                                        },
                                                        type: "AssignmentPattern",
                                                    },
                                                ],
                                                type: "ArrayPattern",
                                            },
                                            init: null,
                                            type: "VariableDeclarator",
                                        },
                                    ],
                                    kind: "var",
                                    type: "VariableDeclaration",
                                },
                                right: {
                                    elements: [
                                        {
                                            elements: [
                                                null,
                                            ],
                                            type: "ArrayExpression",
                                        },
                                    ],
                                    type: "ArrayExpression",
                                },
                                type: "ForOfStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "fn",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (let [] of [iter]) {


  }
}`, { next: true})).to.eql({
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                await: true,
                                body: {
                                    body: [],
                                    type: "BlockStatement",
                                },
                                left: {
                                    declarations: [
                                        {
                                            id: {
                                                elements: [],
                                                type: "ArrayPattern",
                                            },
                                            init: null,
                                            type: "VariableDeclarator",
                                        },
                                    ],
                                    kind: "let",
                                    type: "VariableDeclaration",
                                },
                                right: {
                                    elements: [
                                        {
                                            name: "iter",
                                            type: "Identifier",
                                        },
                                    ],
                                    type: "ArrayExpression",
                                },
                                type: "ForOfStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "fn",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (var [] of [iter]) {

  }
}`, { next: true})).to.eql(
            {
                body: [
                    {
                        async: true,
                        body: {
                            body: [
                                {
                                    await: true,
                                    body: {
                                        body: [],
                                        type: "BlockStatement",
                                    },
                                    left: {
                                        declarations: [
                                            {
                                                id: {
                                                    elements: [],
                                                    type: "ArrayPattern",
                                                },
                                                init: null,
                                                type: "VariableDeclarator",
                                            },
                                        ],
                                        kind: "var",
                                        type: "VariableDeclaration",
                                    },
                                    right: {
                                        elements: [
                                            {
                                                name: "iter",
                                                type: "Identifier",
                                            },
                                        ],
                                        type: "ArrayExpression",
                                    },
                                    type: "ForOfStatement",
                                },
                            ],
                            type: "BlockStatement",
                        },
                        expression: false,
                        generator: true,
                        id: {
                            name: "fn",
                            type: "Identifier",
                        },
                        params: [],
                        type: "FunctionDeclaration",
                    },
                ],
                sourceType: "script",
                type: "Program",
            });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (var { fn = function () {}, xFn = function x() {} } of [{}]) {
  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ObjectPattern",
                                                properties: [
                                                    {
                                                        type: "Property",
                                                        kind: "init",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "fn",
                                                        },
                                                        computed: false,
                                                        value: {
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
                                                        method: false,
                                                        shorthand: true,
                                                    },
                                                    {
                                                        type: "Property",
                                                        kind: "init",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "xFn",
                                                        },
                                                        computed: false,
                                                        value: {
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
                                                        method: false,
                                                        shorthand: true,
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "var",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "ObjectExpression",
                                            properties: [],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (var { x: y } of [{ x: 23 }]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ObjectPattern",
                                                properties: [
                                                    {
                                                        type: "Property",
                                                        kind: "init",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "x",
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: "Identifier",
                                                            name: "y",
                                                        },
                                                        method: false,
                                                        shorthand: false,
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "var",
                                },
                                right: {
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
                                                    kind: "init",
                                                    value: {
                                                        type: "Literal",
                                                        value: 23,
                                                    },
                                                    method: false,
                                                    shorthand: false,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (var [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
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
                                                                    kind: "init",
                                                                    key: {
                                                                        type: "Identifier",
                                                                        name: "x",
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: "Identifier",
                                                                        name: "x",
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                },
                                                                {
                                                                    type: "Property",
                                                                    kind: "init",
                                                                    key: {
                                                                        type: "Identifier",
                                                                        name: "y",
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: "Identifier",
                                                                        name: "y",
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                },
                                                                {
                                                                    type: "Property",
                                                                    kind: "init",
                                                                    key: {
                                                                        type: "Identifier",
                                                                        name: "z",
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: "Identifier",
                                                                        name: "z",
                                                                    },
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
                                                                    kind: "init",
                                                                    value: {
                                                                        type: "Literal",
                                                                        value: 44,
                                                                    },
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
                                                                    kind: "init",
                                                                    value: {
                                                                        type: "Literal",
                                                                        value: 55,
                                                                    },
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
                                                                    kind: "init",
                                                                    value: {
                                                                        type: "Literal",
                                                                        value: 66,
                                                                    },
                                                                    method: false,
                                                                    shorthand: false,
                                                                },
                                                            ],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "var",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "ArrayExpression",
                                            elements: [],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (let {...x} of [{ get v() { count++; return 2; } }]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ObjectPattern",
                                                properties: [
                                                    {
                                                        type: "RestElement",
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
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "ObjectExpression",
                                            properties: [
                                                {
                                                    type: "Property",
                                                    key: {
                                                        type: "Identifier",
                                                        name: "v",
                                                    },
                                                    computed: false,
                                                    kind: "get",
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
                                                                        type: "UpdateExpression",
                                                                        argument: {
                                                                            type: "Identifier",
                                                                            name: "count",
                                                                        },
                                                                        operator: "++",
                                                                        prefix: false,
                                                                    },
                                                                },
                                                                {
                                                                    type: "ReturnStatement",
                                                                    argument: {
                                                                        type: "Literal",
                                                                        value: 2,
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                        generator: false,
                                                        async: false,
                                                        expression: false,
                                                    },
                                                    method: false,
                                                    shorthand: false,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (let { x: y = 33 } of [{ }]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ObjectPattern",
                                                properties: [
                                                    {
                                                        type: "Property",
                                                        kind: "init",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "x",
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: "AssignmentPattern",
                                                            left: {
                                                                type: "Identifier",
                                                                name: "y",
                                                            },
                                                            right: {
                                                                type: "Literal",
                                                                value: 33,
                                                            },
                                                        },
                                                        method: false,
                                                        shorthand: false,
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "let",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "ObjectExpression",
                                            properties: [],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (let { fn = function () {}, xFn = function x() {} } of [{}]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ObjectPattern",
                                                properties: [
                                                    {
                                                        type: "Property",
                                                        kind: "init",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "fn",
                                                        },
                                                        computed: false,
                                                        value: {
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
                                                        method: false,
                                                        shorthand: true,
                                                    },
                                                    {
                                                        type: "Property",
                                                        kind: "init",
                                                        key: {
                                                            type: "Identifier",
                                                            name: "xFn",
                                                        },
                                                        computed: false,
                                                        value: {
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
                                                        method: false,
                                                        shorthand: true,
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "let",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "ObjectExpression",
                                            properties: [],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (let [...x, y] of [[1, 2, 3]]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "RestElement",
                                                        argument: {
                                                            type: "Identifier",
                                                            name: "x",
                                                        },
                                                    },
                                                    {
                                                        type: "Identifier",
                                                        name: "y",
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "let",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
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
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (const [...{ x }, y] of [[1, 2, 3]]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "RestElement",
                                                        argument: {
                                                            type: "ObjectPattern",
                                                            properties: [
                                                                {
                                                                    type: "Property",
                                                                    kind: "init",
                                                                    key: {
                                                                        type: "Identifier",
                                                                        name: "x",
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: "Identifier",
                                                                        name: "x",
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                },
                                                            ],
                                                        },
                                                    },
                                                    {
                                                        type: "Identifier",
                                                        name: "y",
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "const",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
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
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (const [, , ...x] of [[1, 2]]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    null,
                                                    null,
                                                    {
                                                        type: "RestElement",
                                                        argument: {
                                                            type: "Identifier",
                                                            name: "x",
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "const",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
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
                                            ],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (const [x, y, z] of [[1, 2, 3]]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
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
                                        },
                                    ],
                                    kind: "const",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
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
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (const [x = 23] of [[,]]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "AssignmentPattern",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "x",
                                                        },
                                                        right: {
                                                            type: "Literal",
                                                            value: 23,
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "const",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "ArrayExpression",
                                            elements: [
                                                null,
                                            ],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function *fn() {
  for await (const [arrow = () => {}] of [[]]) {

  }
}
`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "AssignmentPattern",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "arrow",
                                                        },
                                                        right: {
                                                            type: "ArrowFunctionExpression",
                                                            body: {
                                                                type: "BlockStatement",
                                                                body: [],
                                                            },
                                                            expression: false,
                                                            generator: false,
                                                            id: null,
                                                            params: [],
                                                            async: false,
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "const",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "ArrayExpression",
                                            elements: [],
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });

    it("should parse \";\"", () => {
        expect(parseScript(`async function fn() {
  for await (var [ , , ...x] of [values]) {

  }
}`, { next: true})).to.eql({
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "FunctionDeclaration",
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ForOfStatement",
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                left: {
                                    type: "VariableDeclaration",
                                    declarations: [
                                        {
                                            type: "VariableDeclarator",
                                            init: null,
                                            id: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    null,
                                                    null,
                                                    {
                                                        type: "RestElement",
                                                        argument: {
                                                            type: "Identifier",
                                                            name: "x",
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    kind: "var",
                                },
                                right: {
                                    type: "ArrayExpression",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "values",
                                        },
                                    ],
                                },
                                await: true,
                            },
                        ],
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: "Identifier",
                        name: "fn",
                    },
                },
            ],
        });
    });
});
