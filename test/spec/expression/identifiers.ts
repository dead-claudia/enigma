import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Identifiers", () => {

    it("should parse \"x", () => {
        expect(parseScript("x")).to.eql({
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
        expect(parseScript("x;")).to.eql({
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
        expect(parseScript("await")).to.eql({
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
        expect(parseScript("let")).to.eql({
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
        expect(parseScript("let()")).to.eql({
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
        expect(parseScript("(let[let])")).to.eql({
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
        expect(parseScript("let.let")).to.eql({
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
        expect(parseScript("日本語")).to.eql({
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
        expect(parseScript("T\u203F")).to.eql({
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
        expect(parseScript("T\u200C")).to.eql({
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
        expect(parseScript("T\u200D")).to.eql({
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
        expect(parseScript("\u2163\u2161\u200A")).to.eql({
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
