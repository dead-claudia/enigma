import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Numbers", () => {
    it("should parse \"\n    0\n\n\"", () => {
        assert.match<Program>(parseScript("\n    0\n\n"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"0012\"", () => {
        assert.match<Program>(parseScript("0012"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 10,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0b0\"", () => {
        assert.match<Program>(parseScript("0b0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0b1\"", () => {
        assert.match<Program>(parseScript("0b1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 1,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0b10\"", () => {
        assert.match<Program>(parseScript("0b10"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 2,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0B0\"", () => {
        assert.match<Program>(parseScript("0B0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0b0\"", () => {
        assert.match<Program>(parseScript("'use strict'; 0b0"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "use strict",
                    },
                    type: "ExpressionStatement",
                },
                {
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"(0o0)\"", () => {
        assert.match<Program>(parseScript("(0o0)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0o1\"", () => {
        assert.match<Program>(parseScript("0o1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 1,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0o10\"", () => {
        assert.match<Program>(parseScript("0o10"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 8,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"09\"", () => {
        assert.match<Program>(parseScript("09"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 9,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"018\"", () => {
        assert.match<Program>(parseScript("018"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 18,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0b0\"", () => {
        assert.match<Program>(parseScript("'use strict'; 0o0"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "use strict",
                    },
                    type: "ExpressionStatement",
                },
                {
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"0X1A\"", () => {
        assert.match<Program>(parseScript("0X1A"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 26,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0x10\"", () => {
        assert.match<Program>(parseScript("0x10"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 16,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0x100\"", () => {
        assert.match<Program>(parseScript("0x100"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 256,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0X04\"", () => {
        assert.match<Program>(parseScript("0X04"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 4,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \".14\"", () => {
        assert.match<Program>(parseScript(".14"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0.14,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"6.\"", () => {
        assert.match<Program>(parseScript("6."), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 6,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0.\"", () => {
        assert.match<Program>(parseScript("0."), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"3.14159\"", () => {
        assert.match<Program>(parseScript("3.14159"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 3.14159,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"6.02214179e+23\"", () => {
        assert.match<Program>(parseScript("6.02214179e+23"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 6.02214179e+23,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"1.492417830e-10\"", () => {
        assert.match<Program>(parseScript("1.492417830e-10"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 1.49241783e-10,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0.10100100010000100000100\"", () => {
        assert.match<Program>(parseScript("0.10100100010000100000100"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0.101001000100001,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"110011000111100111001100011110011100110001111001110\"", () => {
        assert.match<Program>(parseScript("110011000111100111001100011110011100110001111001110"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 1.1001100011110011e+50,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0b0\"", () => {
        assert.match<Program>(parseScript("0b0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"1.492417830e-10\"", () => {
        assert.match<Program>(parseScript("1.492417830e-10"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 1.49241783e-10,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"6.02214179e+23\"", () => {
        assert.match<Program>(parseScript("6.02214179e+23"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 6.02214179e+23,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"1.492417830e-10\"", () => {
        assert.match<Program>(parseScript("1.492417830e-10"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 1.49241783e-10,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0x0\"", () => {
        assert.match<Program>(parseScript("0x0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0xabc\"", () => {
        assert.match<Program>(parseScript("0xabc"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 2748,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0xdef\"", () => {
        assert.match<Program>(parseScript("0xdef"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 3567,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"012\"", () => {
        assert.match<Program>(parseScript("012"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 10,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"02\"", () => {
        assert.match<Program>(parseScript("02"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 2,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"012\"", () => {
        assert.match<Program>(parseScript("012"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 10,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"08\"", () => {
        assert.match<Program>(parseScript("08"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 8,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"09\"", () => {
        assert.match<Program>(parseScript("09"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 9,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"09.5\"", () => {
        assert.match<Program>(parseScript("09.5"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 9.5,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0e+100\"", () => {
        assert.match<Program>(parseScript("0e+100"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0x0;\"", () => {
        assert.match<Program>(parseScript("0x0;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0x100\"", () => {
        assert.match<Program>(parseScript("0x100"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 256,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("expect \"0b\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0b");
        });
    });

    it("expect \"0b1a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0b1a");
        });
    });

    it("expect \"0b9\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0b9");
        });
    });

    it("expect \"0b18", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0b18");
        });
    });

    it("expect \"0b12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0b12");
        });
    });

    it("expect \"0B1a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0B1a");
        });
    });

    it("expect \"0o1a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0o1a");
        });
    });

    it("expect \"0o9\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0o9");
        });
    });

    it("expect \"0o18\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0o18");
        });
    });

    it("expect \"0O\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0O");
        });
    });

    it("expect \"0O1a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0O1a");
        });
    });

    it("expect \"09.x\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("09.x");
        });
    });

    it("expect \"0O18\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("0O18");
        });
    });
});
