import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - Functions", () => {
    it("should parse \"function f({ w: [x, y, z] = [4, 5, 6] } = { w: null }) {}\"", () => {
        assert.match<Program>(
            parseScript(`function f({ w: [x, y, z] = [4, 5, 6] } = { w: null }) {}`),
            {
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
                                type: "AssignmentPattern",
                                left: {
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
                                                            value: 4,
                                                        },
                                                        {
                                                            type: "Literal",
                                                            value: 5,
                                                        },
                                                        {
                                                            type: "Literal",
                                                            value: 6,
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
                                right: {
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
            },
        );
    });

    it("should parse \"function f({ x: y } = { x: 23 }) {};\"", () => {
        assert.match<Program>(parseScript(`function f({ x: y } = { x: 23 }) {};`), {
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
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
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
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
                {
                    type: "EmptyStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function f({}) {}\"", () => {
        assert.match<Program>(parseScript(`function f({}) {}`), {
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
                            type: "ObjectPattern",
                            properties: [],
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

    it("should parse \"function f({a, b, ...rest}) {}\"", () => {
        assert.match<Program>(parseScript(`function f({a, b, ...rest}) {}`), {
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
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "rest",
                                    },
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
            ],
            sourceType: "script",
        });
    });

    it("should throw \"function f({ x = thrower() }) {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`function f({ x = thrower() }) {}`); });
    });
});
