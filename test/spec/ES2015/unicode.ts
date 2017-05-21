import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - Unicode", () => {
    it("should pass", () => {

        assert.match<Program>(parseScript("\"I \u2661 JavaScript!\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "I ♡ JavaScript!",
                    },
                },
            ],
            sourceType: "script",
        });

        assert.match<Program>(parseScript("\"\u0041\u0042\u0043\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "ABC",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"\u{41}\u{42}\u{43}\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "ABC",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"\uD83D\uDCA9\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "💩",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"\u0041\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "A"                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"\uD835\uDC00\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "𝐀",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"\x41\x42\x43\""), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "ABC",
                    },
                    type: "ExpressionStatement",

                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("\"/[\uD83D\uDCA9-\uD83D\uDCAB]/\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "/[💩-💫]/",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\"\u{1F4AA}\""), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "💪"                    },
                },
            ],
        });
        assert.match<Program>(parseScript("\x41\x42\x43"), {
            body: [
                {
                    expression: {
                        name: "ABC",
                        type: "Identifier",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("日本語 = []"), {
            body: [
                {
                    expression: {
                        left: {
                            name: "日本語",
                            type: "Identifier",
                        },
                        operator: "=",
                        right: {
                            elements: [],
                            type: "ArrayExpression",
                        },
                        type: "AssignmentExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("T\u203F = []"), {
            body: [
                {
                    expression: {
                        left: {
                            name: "T‿",
                            type: "Identifier",
                        },
                        operator: "=",
                        right: {
                            elements: [],
                            type: "ArrayExpression",
                        },
                        type: "AssignmentExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("\u2163\u2161\u200A=\u2009[]"), {
            body: [
                {
                    expression: {
                        left: {
                            name: "ⅣⅡ",
                            type: "Identifier",
                        },
                        operator: "=",
                        right: {
                            elements: [],
                            type: "ArrayExpression",
                        },
                        type: "AssignmentExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("日本語 = []"), {
            body: [
                {
                    expression: {
                        left: {
                            name: "日本語",
                            type: "Identifier",
                        },
                        operator: "=",
                        right: {
                            elements: [],
                            type: "ArrayExpression",
                        },
                        type: "AssignmentExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("\x7A"), {
            body: [
                {
                    expression: {
                        name: "z",
                        type: "Identifier",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("\u{7A}"), {
            type: "Program",
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "z",
                    },
                },
            ],
        });

        assert.match<Program>(parseScript("\u007A"), {
            body: [
                {
                    expression: {
                        name: "z",
                        type: "Identifier",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("\"hell\u{6F}\""), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "hello",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        assert.match<Program>(parseScript("\"\uD83D\uDE80\""), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "🚀",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });
});
