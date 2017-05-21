import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - Unicode Escapes", () => {

    it("should fail", () => {
        assert.throws(SyntaxError, () => { parseScript("x\\"); });
        assert.throws(SyntaxError, () => { parseScript("x\\u005c"); });
        assert.throws(SyntaxError, () => { parseScript("x\\u002a"); });
        assert.throws(SyntaxError, () => { parseScript("var x = /[a-z]/\\ux"); });
        assert.throws(SyntaxError, () => { parseScript("/test"); });
        assert.throws(SyntaxError, () => { parseScript("\uD83B\uDE00"); });
    });

    it("should parse \"\u{1EE00}\"", () => {

        assert.match<Program>(parseScript("\u{1EE00}"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "𞸀",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var 𞸀\"", () => {

        assert.match<Program>(parseScript("var 𞸀"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "𞸀",
                            },
                            init: null,
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should pass", () => {

        assert.match<Program>(parseScript("var \u{41};"), {
            body: [
                {
                    declarations: [
                        {
                            id: {
                                name: "A",
                                type: "Identifier",
                            },
                            init: null,
                            type: "VariableDeclarator",
                        },
                    ],
                    kind: "var",
                    type: "VariableDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("\"\u{20BB7}\u{10FFFF}\u{1}\";"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "𠮷􏿿\u0001",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("\"y\uD83D\uDE80x\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "y🚀x",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"x\uD83D\uDE80y\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "x🚀y",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"/\u{1D306}/u\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "/𝌆/u",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"/\u{1D306}/u\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "/𝌆/u",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"\uD842\uDFB7\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "𠮷",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("var source = \"\u{714E}\u{8336}\";"), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "source",
                            },
                            init: {
                                type: "Literal",
                                value: "煎茶",
                            },
                        },
                    ],
                    type: "VariableDeclaration",
                    kind: "var",
                },
            ],
        });

        assert.match<Program>(parseScript("var source = \"\u{20BB7}\u{91CE}\u{5BB6}\";"), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "source",
                            },
                            init: {
                                type: "Literal",
                                value: "𠮷野家",
                            },
                        },
                    ],
                    type: "VariableDeclaration",
                    kind: "var",
                },
            ],
        });

        assert.match<Program>(parseScript("var source = \"\u{00000000034}\";"), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "source",
                            },
                            init: {
                                type: "Literal",
                                value: "4",
                            },
                        },
                    ],
                    type: "VariableDeclaration",
                    kind: "var",
                },
            ],
        });

    });
});
