import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - Unicode Escapes", () => {

    it("should fail", () => {
        expect(() => { parseScript("x\\"); }).to.throw();
        expect(() => { parseScript("x\\u005c"); }).to.throw();
        expect(() => { parseScript("x\\u002a"); }).to.throw();
        expect(() => { parseScript("var x = /[a-z]/\\ux"); }).to.throw();
        expect(() => { parseScript("/test"); }).to.throw();
        expect(() => { parseScript("\uD83B\uDE00"); }).to.throw();
    });

    it("should parse \"\u{1EE00}\"", () => {

        expect(parseScript("\u{1EE00}")).to.eql({
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

        expect(parseScript("var 𞸀")).to.eql({
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

        expect(parseScript("var \u{41};")).to.eql({
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

        expect(parseScript("\"\u{20BB7}\u{10FFFF}\u{1}\";")).to.eql({
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

        expect(parseScript("\"y\uD83D\uDE80x\"")).to.eql({
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

        expect(parseScript("\"x\uD83D\uDE80y\"")).to.eql({
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

        expect(parseScript("\"/\u{1D306}/u\"")).to.eql({
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

        expect(parseScript("\"/\u{1D306}/u\"")).to.eql({
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

        expect(parseScript("\"\uD842\uDFB7\"")).to.eql({
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

        expect(parseScript("var source = \"\u{714E}\u{8336}\";")).to.eql({
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

        expect(parseScript("var source = \"\u{20BB7}\u{91CE}\u{5BB6}\";")).to.eql({
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

        expect(parseScript("var source = \"\u{00000000034}\";")).to.eql({
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
