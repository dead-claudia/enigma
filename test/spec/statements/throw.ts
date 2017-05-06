import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `throw`", () => {
    it("should parse \"throw this\"", () => {
        expect(parseScript("throw this")).to.eql({
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
        expect(parseScript("throw x;")).to.eql({
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

        expect(parseScript("throw x * y")).to.eql({
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
