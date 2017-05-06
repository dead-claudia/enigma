import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - Unicode", () => {
    it("should pass", () => {

        expect(parseScript("\"I \u2661 JavaScript!\"")).to.eql({
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

        expect(parseScript("\"\u0041\u0042\u0043\"")).to.eql({
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

        expect(parseScript("\"\u{41}\u{42}\u{43}\"")).to.eql({
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

        expect(parseScript("\"\uD83D\uDCA9\"")).to.eql({
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

        expect(parseScript("\"\u0041\"")).to.eql({
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

        expect(parseScript("\"\uD835\uDC00\"")).to.eql({
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

        expect(parseScript("\"\x41\x42\x43\"")).to.eql({
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

        expect(parseScript("\"/[\uD83D\uDCA9-\uD83D\uDCAB]/\"")).to.eql({
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

        expect(parseScript("\"\u{1F4AA}\"")).to.eql({
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
        expect(parseScript("\x41\x42\x43")).to.eql({
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

        expect(parseScript("日本語 = []")).to.eql({
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

        expect(parseScript("T\u203F = []")).to.eql({
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

        expect(parseScript("\u2163\u2161\u200A=\u2009[]")).to.eql({
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

        expect(parseScript("日本語 = []")).to.eql({
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

        expect(parseScript("\x7A")).to.eql({
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

        expect(parseScript("\u{7A}")).to.eql({
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

        expect(parseScript("\u007A")).to.eql({
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

        expect(parseScript("\"hell\u{6F}\"")).to.eql({
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

        expect(parseScript("\"\uD83D\uDE80\"")).to.eql({
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
