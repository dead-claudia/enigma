import {parseScript, parseModule} from "../../src";
import {Program} from "../../src/estree";
import * as assert from "clean-assert";

describe.skip("Comments", () => {
    it("should parse \"a/*\n*/b\"", () => {
        assert.match<Program>(parseScript("\"a/*\n*/b\""), {
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"/* block comment */ 42\"", () => {
        assert.match<Program>(parseScript(" /**\n\r\r\n**/"), {
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \" \t /* block comment */ \"", () => {
        assert.match<Program>(parseScript(" \t /* block comment */ "), {
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"/* block comment */ 42\"", () => {
        assert.match<Program>(parseScript(`/* block comment */ 42`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 42,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/* block comment */ 42\"", () => {
        assert.match<Program>(parseScript(`/* block comment */ 42`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 42,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"42 /* block comment 1 */ /* block comment 2 */\"", () => {
        assert.match<Program>(parseScript(`42 /* block comment 1 */ /* block comment 2 */`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 42,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"42 // line comment\"", () => {
        assert.match<Program>(parseScript(`42 // line comment`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 42,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"42 /*the*/ /*answer*/\"", () => {
        assert.match<Program>(parseScript(`/* multiline\ncomment\nshould\nbe\nignored */ 42`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 42,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"42 /*the*/ /*answer*/\"", () => {
        assert.match<Program>(parseScript(`/*a\nb*/ 42`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 42,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"/*42*/\"", () => {
        assert.match<Program>(parseScript(`/*42*/`), {
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"/*42*/\"", () => {
        assert.match<Program>(parseScript(`/*42*/`), {
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"// \"", () => {
        assert.match<Program>(parseScript(`// `), {
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"/**/42\"", () => {
        assert.match<Program>(parseScript(`/**/42`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 42,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a + /* assignment */b ) * c\"", () => {
        assert.match<Program>(parseScript(`(a + /* assignment */b ) * c`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "*",
                        left: {
                            type: "BinaryExpression",
                            operator: "+",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        right: {
                            type: "Identifier",
                            name: "c",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
