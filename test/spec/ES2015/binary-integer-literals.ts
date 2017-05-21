import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - Binary Integer Literals", () => {
    it("should parse \"0b0\"", () => {
        assert.match<Program>(parseScript(`0b0`), {
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
        assert.match<Program>(parseScript(`0b1`), {
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
        assert.match<Program>(parseScript(`0b10`), {
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
        assert.match<Program>(parseScript(`0B0`), {
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
        assert.match<Program>(parseScript(`0B10`), {
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
