import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Identifiers", () => {
    it("should parse \"x", () => {
        assert.match<Program>(parseScript("x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "x",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x;\"", () => {
        assert.match<Program>(parseScript("x;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "x",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"await\"", () => {
        assert.match<Program>(parseScript("await"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "await",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let\"", () => {
        assert.match<Program>(parseScript("let"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "let",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let()\"", () => {
        assert.match<Program>(parseScript("let()"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "let",
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(let[let])\"", () => {
        assert.match<Program>(parseScript("(let[let])"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: true,
                        object: {
                            type: "Identifier",
                            name: "let",
                        },
                        property: {
                            type: "Identifier",
                            name: "let",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"let.let\"", () => {
        assert.match<Program>(parseScript("let.let"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "let",
                        },
                        property: {
                            type: "Identifier",
                            name: "let",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(let;;);\"", () => {
        assert.match<Program>(parseScript("日本語"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "日本語",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\uD800\uDC00\"", () => {
        assert.match<Program>(parseScript("T\u203F"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "T‿",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"T\u200C\"", () => {
        assert.match<Program>(parseScript("T\u200C"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "T‌",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"T\u200D\"", () => {
        assert.match<Program>(parseScript("T\u200D"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "T‍",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\u2163\u2161\u200A\"", () => {
        assert.match<Program>(parseScript("\u2163\u2161\u200A"), {
            body: [
                {
                    expression: {
                        name: "ⅣⅡ",
                        type: "Identifier",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });
});
