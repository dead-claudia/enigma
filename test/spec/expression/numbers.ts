import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Numbers", () => {

    it("should parse \"\n    0\n\n\"", () => {
        expect(parseScript("\n    0\n\n")).to.eql({
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
        expect(parseScript("0012")).to.eql({
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
        expect(parseScript("0b0")).to.eql({
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
        expect(parseScript("0b1")).to.eql({
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
        expect(parseScript("0b10")).to.eql({
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
        expect(parseScript("0B0")).to.eql({
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
        expect(parseScript("'use strict'; 0b0")).to.eql({
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
        expect(parseScript("(0o0)")).to.eql({
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
        expect(parseScript("0o1")).to.eql({
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
        expect(parseScript("0o10")).to.eql({
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
        expect(parseScript("09")).to.eql({
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
        expect(parseScript("018")).to.eql({
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
        expect(parseScript("'use strict'; 0o0")).to.eql({
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
        expect(parseScript("0X1A")).to.eql({
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
        expect(parseScript("0x10")).to.eql({
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
        expect(parseScript("0x100")).to.eql({
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
        expect(parseScript("0X04")).to.eql({
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
        expect(parseScript(".14")).to.eql({
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
        expect(parseScript("6.")).to.eql({
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
        expect(parseScript("0.")).to.eql({
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
        expect(parseScript("3.14159")).to.eql({
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
        expect(parseScript("6.02214179e+23")).to.eql({
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
        expect(parseScript("1.492417830e-10")).to.eql({
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
        expect(parseScript("0.10100100010000100000100")).to.eql({
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
        expect(parseScript("110011000111100111001100011110011100110001111001110")).to.eql({
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
        expect(parseScript("0b0")).to.eql({
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
        expect(parseScript("1.492417830e-10")).to.eql({
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
        expect(parseScript("6.02214179e+23")).to.eql({
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
        expect(parseScript("1.492417830e-10")).to.eql({
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
        expect(parseScript("0x0")).to.eql({
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
        expect(parseScript("0xabc")).to.eql({
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
        expect(parseScript("0xdef")).to.eql({
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
        expect(parseScript("012")).to.eql({
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
        expect(parseScript("02")).to.eql({
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
        expect(parseScript("012")).to.eql({
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
        expect(parseScript("08")).to.eql({
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
        expect(parseScript("09")).to.eql({
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
        expect(parseScript("09.5")).to.eql({
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
        expect(parseScript("0e+100")).to.eql({
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
        expect(parseScript("0x0;")).to.eql({
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
        expect(parseScript("0x100")).to.eql({
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

    it("expect 0b\" to throw", () => {
        expect(() => {
            parseScript("0b");
        }).to.not.throw();
    });

    it("expect \"0b1a\" to throw", () => {
        expect(() => {
            parseScript("0b1a");
        }).to.throw();
    });

    it("expect \"0b9\" to throw", () => {
        expect(() => {
            parseScript("0b9");
        }).to.throw();
    });

    it("expect \"0b18", () => {
        expect(() => {
            parseScript("0b18");
        }).to.throw();
    });

    it("expect \"0b12\" to throw", () => {
        expect(() => {
            parseScript("0b12");
        }).to.throw();
    });

    it("expect \"0B1a\" to throw", () => {
        expect(() => {
            parseScript("0B1a");
        }).to.throw();
    });

    it("expect \"0o1a\" to throw", () => {
        expect(() => {
            parseScript("0o1a");
        }).to.throw();
    });

    it("expect \"0o9\" to throw", () => {
        expect(() => {
            parseScript("0o9");
        }).to.throw();
    });

    it("expect \"0o18\" to throw", () => {
        expect(() => {
            parseScript("0o18");
        }).to.throw();
    });

    it("expect \"0O\" to throw", () => {
        expect(() => {
            parseScript("0O");
        }).to.not.throw();
    });

    it("expect \"0O1a\" to throw", () => {
        expect(() => {
            parseScript("0O1a");
        }).to.throw();
    });

    it("expect \"09.x\" to throw", () => {
        expect(() => {
            parseScript("09.x");
        }).to.not.throw();
    });

    it("expect \"0O18\" to throw", () => {
        expect(() => {
            parseScript("0O18");
        }).to.throw();
    });

    it("expect \"0xdef\" to throw", () => {
        expect(() => {
            parseScript("0xdef");
        }).to.not.throw();
    });

    it("expect \"0x0\" to throw", () => {
        expect(() => {
            parseScript("0x0");
        }).to.not.throw();
    });

    it("expect \"0x100\" to throw", () => {
        expect(() => {
            parseScript("0x100");
        }).to.not.throw();
    });

    it("expect \"0x100\" to throw", () => {
        expect(() => {
            parseScript("'use strict'; 0o0");
        }).to.throw();
    });
});
