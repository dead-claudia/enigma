import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - Binary Integer Literals", () => {
    it("should parse \"0b0\"", () => {
        expect(parseScript(`0b0`)).to.eql({
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
        expect(parseScript(`0b1`)).to.eql({
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
        expect(parseScript(`0b10`)).to.eql({
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
        expect(parseScript(`0B0`)).to.eql({
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

    it("should parse \"0B10\"", () => {
        expect(parseScript(`0B10`)).to.eql({
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

});
