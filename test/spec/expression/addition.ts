import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Addition", () => {

    it("should parse \"1+2\"", () => {

        expect(parseScript("1+2")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "Literal",
                            value: 1,
                        },
                        right: {
                            type: "Literal",
                            value:  2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"-1\"", () => {

        expect(parseScript("-1")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "-",
                        argument: {
                            type: "Literal",
                            value: 1,
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x - y\"", () => {
        expect(parseScript("x - y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "-",
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
