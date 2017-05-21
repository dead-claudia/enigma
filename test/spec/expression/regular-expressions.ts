import {parseScript, parseModule} from "../../../src";
import {Program, RegExpLiteral} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Regular Expressions", () => {
    it("should parse \"/a/i\"", () => {
        assert.match<Program>(parseScript(`/a/i`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[--]/\"", () => {
        assert.match<Program>(parseScript(`/[--]/`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/\\uD834\\uDF06\\u{1d306}/u\"", () => {
        assert.match<Program>(parseScript(`/\\uD834\\uDF06\\u{1d306}/u`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/((((((((((((.))))))))))))\\12/;\"", () => {
        assert.match<Program>(parseScript(`/((((((((((((.))))))))))))\\12/;`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/foo\\/bar/\"", () => {
        assert.match<Program>(parseScript(`/foo\\/bar/`), {
            body: [
                {
                    expression: {
                        regex: {
                            flags: "",
                            pattern: "foo\\/bar",
                        },
                        type: "Literal",
                        value: /foo\/bar/,
                    } as RegExpLiteral,
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/[P QR]/i\"", () => {
        assert.match<Program>(parseScript(`/[P QR]/i`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[a-c]/i\"", () => {
        assert.match<Program>(parseScript(`/[a-c]/i`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[a-z]/i\"", () => {
        assert.match<Program>(parseScript(`/[a-z]/i`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/a/i;\"", () => {
        assert.match<Program>(parseScript(`/a/i;`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/\\1/u\"", () => {
        assert.match<Program>(parseScript(`/\\1/u`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var x = /[x-z]/i\"", () => {
        assert.match<Program>(parseScript(`var x = /[x-z]/i`), {
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
                            } as RegExpLiteral,
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/(?!.){0,}?/u\"", () => {
        assert.match<Program>(parseScript(`/\\uD834/u`), {
            body: [
                {
                    expression: {
                        regex: {
                            flags: "u",
                            pattern: "\\uD834",
                        },
                        type: "Literal",
                        value: /\uD834/u,
                    } as RegExpLiteral,
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/[a-z]/i\"", () => {
        assert.match<Program>(parseScript(`/[a-z]/i`), {
            body: [
                {
                    expression: {
                        regex: {
                            flags: "i",
                            pattern: "[a-z]",
                        },
                        type: "Literal",
                        value: /[a-z]/i,
                    } as RegExpLiteral,
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/[\\]/]/\"", () => {
        assert.match<Program>(parseScript(`/[\\]/]/`), {
            body: [
                {
                    expression: {
                        regex: {
                            flags: "",
                            pattern: "[\\]/]",
                        },
                        type: "Literal",
                        value: /[\]\/]/,
                    } as RegExpLiteral,
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/(()(?:\\2)((\\4)))/;\"", () => {
        assert.match<Program>(parseScript(`/(()(?:\\2)((\\4)))/;`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[-a-]/\"", () => {
        assert.match<Program>(parseScript(`/[-a-]/`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/{/;\"", () => {
        assert.match<Program>(parseScript(`/{/;`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/}/\"", () => {
        assert.match<Program>(parseScript(`/}/`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/.{.}/;\"", () => {
        assert.match<Program>(parseScript(`/.{.}/;`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/[\\w-\\s]/;\"", () => {
        assert.match<Program>(parseScript(`/[\\w-\\s]/;`), {
            body: [
                {
                    expression: {
                        regex: {
                            flags: "",
                            pattern: "[\\w-\\s]",
                        },
                        type: "Literal",
                        value: /[\w-\s]/,
                    } as RegExpLiteral,
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"/(?!.){0,}?/;\"", () => {
        assert.match<Program>(parseScript(`/(?!.){0,}?/;`), {
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
                    } as RegExpLiteral,
                },
            ],
            sourceType: "script",
        });
    });
});
