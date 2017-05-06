import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Objects", () => {

    it("should parse \"x + y\"", () => {

        expect(parseScript("({})")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "ObjectExpression",
                properties: [],
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"+{}\"", () => {
        expect(parseScript("+{}")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "+",
                argument: {
                    type: "ObjectExpression",
                    properties: [],
                },
                prefix: true,
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"+{ }\"", () => {
        expect(parseScript("+{ }")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "UnaryExpression",
                operator: "+",
                argument: {
                    type: "ObjectExpression",
                    properties: [],
                },
                prefix: true,
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ answer: 0 })\"", () => {
        expect(parseScript("({ answer: 0 })")).to.eql({
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
                            name: "answer",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: 0,
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ if: 0 })\"", () => {
        expect(parseScript("({ if: 0 })")).to.eql({
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
                            name: "if",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: 0,
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ true: 0 })\"", () => {
        expect(parseScript("({ true: 0 })")).to.eql({
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
                            name: "true",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: 0,
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ false: 0 })\"", () => {
        expect(parseScript("({ false: 0 })")).to.eql({
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
                            name: "false",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: 0,
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ \"answer\": 0 })\"", () => {
        expect(parseScript("({ \"answer\": 0 })")).to.eql({
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
                            type: "Literal",
                            value: "answer",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: 0,
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ x: 1, x: 2 })\"", () => {
        expect(parseScript("({ x: 1, x: 2 })")).to.eql({
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
                            name: "x",
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
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ get width() { return m_width } })\"", () => {
        expect(parseScript("({ get width() { return m_width } })")).to.eql({
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
                            name: "width",
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
                                        type: "ReturnStatement",
                                        argument: {
                                            type: "Identifier",
                                            name: "m_width",
                                        },
                                    },
                                ],
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
    sourceType: "script",
});
     });

    it("should parse \"({ get undef() {} })\"", () => {
        expect(parseScript("({ get undef() {} })")).to.eql({
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
                            name: "undef",
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
    sourceType: "script",
});
     });

    it("should parse \"({ get true() {} })\"", () => {
        expect(parseScript("({ get true() {} })")).to.eql({
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
                            name: "true",
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
    sourceType: "script",
});
     });

    it("should parse \"({ get 10() {} })\"", () => {
        expect(parseScript("({ get 10() {} })")).to.eql({
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
                            type: "Literal",
                            value: 10,
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
    sourceType: "script",
});
     });

    it("should parse \"({ set width(w) { w } })\"", () => {
        expect(parseScript("({ set width(w) { w } })")).to.eql({
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
                            name: "width",
                        },
                        computed: false,
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "w",
                                },
                            ],
                            body: {
                                type: "BlockStatement",
                                body: [
                                    {
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                    },
                                ],
                            },
                            generator: false,
                            expression: false,
                            async: false,
                        },
                        kind: "set",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ set true(w) { w } })\"", () => {
        expect(parseScript("({ set true(w) { w } })")).to.eql({
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
                            name: "true",
                        },
                        computed: false,
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "w",
                                },
                            ],
                            body: {
                                type: "BlockStatement",
                                body: [
                                    {
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                    },
                                ],
                            },
                            generator: false,
                            expression: false,
                            async: false,
                        },
                        kind: "set",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ set \"null\"(w) { w } })\"", () => {
        expect(parseScript("({ set \"null\"(w) { w } })")).to.eql({
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
                            type: "Literal",
                            value: "null",
                        },
                        computed: false,
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "w",
                                },
                            ],
                            body: {
                                type: "BlockStatement",
                                body: [
                                    {
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                    },
                                ],
                            },
                            generator: false,
                            expression: false,
                            async: false,
                        },
                        kind: "set",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ set 10(w) { w } })\"", () => {
        expect(parseScript("({ set 10(w) { w } })")).to.eql({
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
                            type: "Literal",
                            value: 10,
                        },
                        computed: false,
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "w",
                                },
                            ],
                            body: {
                                type: "BlockStatement",
                                body: [
                                    {
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "Identifier",
                                            name: "w",
                                        },
                                    },
                                ],
                            },
                            generator: false,
                            expression: false,
                            async: false,
                        },
                        kind: "set",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ get: 2 })\"", () => {
        expect(parseScript("({ get: 2 })")).to.eql({
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
                            name: "get",
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
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ set: 2 })\"", () => {
        expect(parseScript("({ set: 2 })")).to.eql({
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
                            name: "set",
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
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ __proto__: 2 })\"", () => {
        expect(parseScript("({ __proto__: 2 })")).to.eql({
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
                            name: "__proto__",
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
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({\"__proto__\": 2 })\"", () => {
        expect(parseScript("({\"__proto__\": 2 })")).to.eql({
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
                            type: "Literal",
                            value: "__proto__",
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
                ],
            },
        },
    ],
    sourceType: "script",
});
    });

    /* tslint:disable max-line-length */
    it("should parse \"({ get width() { return width }, set width(width) { return width; } })\"", () => {
        expect(parseScript("({ get width() { return width }, set width(width) { return width; } })"))
        /* tslint:enable max-line-length */
        .to.eql({
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
                                    name: "width",
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
                                                type: "ReturnStatement",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "width",
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "get",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "width",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "width",
                                        },
                                    ],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ReturnStatement",
                                                argument: {
                                                    type: "Identifier",
                                                    name: "width",
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "set",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({a})\"", () => {
        expect(parseScript("({a})")).to.eql({
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
    sourceType: "script",
});
     });

    it("should parse \"({a, b: 0, c})\"", () => {
        expect(parseScript("({a, b: 0, c})")).to.eql({
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
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "b",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: 0,
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
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

    it("should parse \"({a, b})\"", () => {
        expect(parseScript("({a, b})")).to.eql({
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
    sourceType: "script",
});
     });

    it("should parse \"({a(){}})\"", () => {
        expect(parseScript("({a(){}})")).to.eql({
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

    it("should parse \"({a(){let a;}})\"", () => {
        expect(parseScript("({a(){let a;}})")).to.eql({
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
                            name: "a",
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
    it("should parse \"({a(b){}})\"", () => {
        expect(parseScript("({a(b){}})")).to.eql({
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

    it("should parse \"({a(b,c){}})\"", () => {
        expect(parseScript("({a(b,c){}})")).to.eql({
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

    it("should parse \"({set a(eval){}})\"", () => {
        expect(parseScript("({set a(eval){}})")).to.eql({
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
                            name: "a",
                        },
                        computed: false,
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "eval",
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
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ set a([{b = 0}]){}, })\"", () => {
        expect(parseScript("({ set a([{b = 0}]){}, })")).to.eql({
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
                            name: "a",
                        },
                        computed: false,
                        value: {
                            type: "FunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
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
                                                        type: "AssignmentPattern",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "b",
                                                        },
                                                        right: {
                                                            type: "Literal",
                                                            value: 0,
                                                        },
                                                    },
                                                    kind: "init",
                                                    method: false,
                                                    shorthand: true,
                                                },
                                            ],
                                        },
                                    ],
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
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ __proto__: null, get __proto__(){} })\"", () => {
        expect(parseScript("({ __proto__: null, get __proto__(){} })")).to.eql({
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
                            name: "__proto__",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: "null",
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                    {
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "__proto__",
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
    sourceType: "script",
});
     });

    it("should parse \"({ __proto__: null, __proto__(){}, })\"", () => {
        expect(parseScript("({ __proto__: null, __proto__(){}, })")).to.eql({
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
                            name: "__proto__",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: "null",
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                    {
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "__proto__",
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

    it("should parse \"({ \"__proto__\": null, set __proto__(x){} })\"", () => {
        expect(parseScript("({ \"__proto__\": null, set __proto__(x){} })")).to.eql({
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
                            type: "Literal",
                            value: "__proto__",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: "null",
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                    {
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "__proto__",
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
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"({ __proto__, \"__proto__\": null })\"", () => {
        expect(parseScript("({ __proto__, \"__proto__\": null })")).to.eql({
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
                            name: "__proto__",
                        },
                        computed: false,
                        value: {
                            type: "Identifier",
                            name: "__proto__",
                        },
                        kind: "init",
                        method: false,
                        shorthand: true,
                    },
                    {
                        type: "Property",
                        key: {
                            type: "Literal",
                            value: "__proto__",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: "null",
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should parse \"x = { y, z }\"", () => {
        expect(parseScript("x = { y, z }")).to.eql({
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
            },
        },
    ],
    sourceType: "script",
});
     });
});
