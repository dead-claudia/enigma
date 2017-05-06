import {parseScript, parseModule} from "../../src";
import {expect} from "chai";

describe.skip("Comments", () => {
    it("should parse \"a/*\n*/b\"", () => {
        expect(parseScript("\"a/*\n*/b\"")).to.eql({
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"/* block comment */ 42\"", () => {
        expect(parseScript(" /**\n\r\r\n**/")).to.eql({
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \" \t /* block comment */ \"", () => {
        expect(parseScript(" \t /* block comment */ ")).to.eql({
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"/* block comment */ 42\"", () => {
        expect(parseScript(`/* block comment */ 42`)).to.eql({
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
        expect(parseScript(`/* block comment */ 42`)).to.eql({
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
        expect(parseScript(`42 /* block comment 1 */ /* block comment 2 */`)).to.eql({
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
        expect(parseScript(`42 // line comment`)).to.eql({
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
        expect(parseScript(`/* multiline\ncomment\nshould\nbe\nignored */ 42`)).to.eql({
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
        expect(parseScript(`/*a\nb*/ 42`)).to.eql({
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
        expect(parseScript(`/*42*/`)).to.eql({
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"/*42*/\"", () => {
        expect(parseScript(`/*42*/`)).to.eql({
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"// \"", () => {
        expect(parseScript(`// `)).to.eql({
            type: "Program",
            body: [],
            sourceType: "script",
        });
    });

    it("should parse \"/**/42\"", () => {
        expect(parseScript(`/**/42`)).to.eql({
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
        expect(parseScript(`(a + /* assignment */b ) * c`)).to.eql({
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
