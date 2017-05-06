import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Regular Expressions", () => {

    it("should parse \"/a/i\"", () => {
        expect(parseScript(`/a/i`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /a/i,
                        regex: {
                            pattern: "a",
                            flags: "i",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[--]/\"", () => {
        expect(parseScript(`/[--]/`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /[--]/,
                        regex: {
                            pattern: "[--]",
                            flags: "",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/\\uD834\\uDF06\\u{1d306}/u\"", () => {
        expect(parseScript(`/\\uD834\\uDF06\\u{1d306}/u`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /\uD834\uDF06\u{1d306}/u,
                        regex: {
                            pattern: "\\uD834\\uDF06\\u{1d306}",
                            flags: "u",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/((((((((((((.))))))))))))\\12/;\"", () => {
        expect(parseScript(`/((((((((((((.))))))))))))\\12/;`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /((((((((((((.))))))))))))\12/,
                        regex: {
                            pattern: "((((((((((((.))))))))))))\\12",
                            flags: "",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/foo\\/bar/\"", () => {
        expect(parseScript(`/foo\\/bar/`)).to.eql({
            body: [
                {
                    expression: {
                        regex: {
                            flags: "",
                            pattern: "foo\\/bar",
                        },
                        type: "Literal",
                        value: /foo\/bar/,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/[P QR]/i\"", () => {
        expect(parseScript(`/[P QR]/i`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /[P QR]/i,
                        regex: {
                            pattern: "[P QR]",
                            flags: "i",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[a-c]/i\"", () => {
        expect(parseScript(`/[a-c]/i`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /[a-c]/i,
                        regex: {
                            pattern: "[a-c]",
                            flags: "i",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[a-z]/i\"", () => {
        expect(parseScript(`/[a-z]/i`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /[a-z]/i,
                        regex: {
                            pattern: "[a-z]",
                            flags: "i",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/a/i;\"", () => {
        expect(parseScript(`/a/i;`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /a/i,
                        regex: {
                            pattern: "a",
                            flags: "i",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/\\1/u\"", () => {
        expect(parseScript(`/\\1/u`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: null,
                        regex: {
                            pattern: "\\1",
                            flags: "u",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var x = /[x-z]/i\"", () => {
        expect(parseScript(`var x = /[x-z]/i`)).to.eql({
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
                            init: {
                                type: "Literal",
                                value: /ar x = \/[x-z]/i,
                                regex: {
                                    pattern: "ar x = /[x-z]",
                                    flags: "i",
                                },
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/(?!.){0,}?/u\"", () => {
        expect(parseScript(`/\\uD834/u`)).to.eql({
            body: [
                {
                    expression: {
                        regex: {
                            flags: "u",
                            pattern: "\\uD834",
                        },
                        type: "Literal",
                        value: /\uD834/u,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/[a-z]/i\"", () => {
        expect(parseScript(`/[a-z]/i`)).to.eql({
            body: [
                {
                    expression: {
                        regex: {
                            flags: "i",
                            pattern: "[a-z]",
                        },
                        type: "Literal",
                        value: /[a-z]/i,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/[\\]/]/\"", () => {
        expect(parseScript(`/[\\]/]/`)).to.eql({
            body: [
                {
                    expression: {
                        regex: {
                            flags: "",
                            pattern: "[\\]/]",
                        },
                        type: "Literal",
                        value: /[\]\/]/,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/(()(?:\\2)((\\4)))/;\"", () => {
        expect(parseScript(`/(()(?:\\2)((\\4)))/;`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /(()(?:\2)((\4)))/,
                        regex: {
                            pattern: "(()(?:\\2)((\\4)))",
                            flags: "",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[-a-]/\"", () => {
        expect(parseScript(`/[-a-]/`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /[-a-]/,
                        regex: {
                            pattern: "[-a-]",
                            flags: "",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/{/;\"", () => {
        expect(parseScript(`/{/;`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /{/,
                        regex: {
                            pattern: "{",
                            flags: "",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/}/\"", () => {
        expect(parseScript(`/}/`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /}/,
                        regex: {
                            pattern: "}",
                            flags: "",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/.{.}/;\"", () => {
        expect(parseScript(`/.{.}/;`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /.{.}/,
                        regex: {
                            pattern: ".{.}",
                            flags: "",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[\\w-\\s]/;\"", () => {
        expect(parseScript(`/[\\w-\\s]/;`)).to.eql({
            body: [
                {
                    expression: {
                        regex: {
                            flags: "",
                            pattern: "[\\w-\\s]",
                        },
                        type: "Literal",
                        value: /[\w-\s]/,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/(?!.){0,}?/;\"", () => {
        expect(parseScript(`/(?!.){0,}?/;`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: /(?!.){0,}?/,
                        regex: {
                            pattern: "(?!.){0,}?",
                            flags: "",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
