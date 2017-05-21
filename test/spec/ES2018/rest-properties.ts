import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2018 - Rest Properties", () => {
    it("should throw on invalid default rest property", () => {
        assert.throws(SyntaxError, () => { parseScript(`let { ...x = y } = z;`); });
    });

    it("should throw on invalid property after rest", () => {
        assert.throws(SyntaxError, () => { parseScript(`let { ...x = y } = z;`); });
    });

    it("should parse shallow clone", () => {
        assert.match<Program>(parseScript(`let { ...x } = y;`), {
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
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    },
                                ],
                            },
                            init: {
                                type: "Identifier",
                                name: "y",
                            },
                        },
                    ],
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse simple rest property", () => {
        assert.match<Program>(parseScript(`let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };`), {
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
                                        {
                                            type: "RestElement",
                                            argument: {
                                                type: "Identifier",
                                                name: "z",
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
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Literal",
                                                value: 3,
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
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
                                                value: 4,
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

    it("should parse function extension", () => {
        assert.match<Program>(parseScript(`function f({ x, y, ...z }) {}`), {
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
                                    type: "RestElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "z",
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
});
