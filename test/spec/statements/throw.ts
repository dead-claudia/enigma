import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `throw`", () => {
    it("should parse \"throw this\"", () => {
        assert.match<Program>(parseScript("throw this"), {
            type: "Program",
            body: [
                {
                    type: "ThrowStatement",
                    argument: {
                        type: "ThisExpression",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle throw statements", () => {
        assert.match<Program>(parseScript("throw x;"), {
            type: "Program",
            body: [
                {
                    type: "ThrowStatement",
                    argument: {
                        type: "Identifier",
                        name: "x",
                    },
                },
            ],
            sourceType: "script",
        });

        assert.match<Program>(parseScript("throw x * y"), {
            type: "Program",
            body: [
                {
                    type: "ThrowStatement",
                    argument: {
                        type: "BinaryExpression",
                        operator: "*",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Identifier",
                            name: "y",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
