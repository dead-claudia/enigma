import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Conditionals", () => {

    it("should parse \"a?b:c", () => {
        expect(parseScript("a?b:c")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "ConditionalExpression",
                test: {
                    type: "Identifier",
                    name: "a",
                },
                consequent: {
                    type: "Identifier",
                    name: "b",
                },
                alternate: {
                    type: "Identifier",
                    name: "c",
                },
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"y ? 1 : 2\"", () => {
        expect(parseScript("y  ? 1 : 2")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "ConditionalExpression",
                test: {
                    type: "Identifier",
                    name: "y",
                },
                consequent: {
                    type: "Literal",
                    value: 1,
                },
                alternate: {
                    type: "Literal",
                    value: 2,
                },
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"x && y\"", () => {
        expect(parseScript("x && y")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                operator: "&&",
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

    it("should parse \"x = (0) ? 1 : 2\"", () => {
        expect(parseScript("x = (0) ? 1 : 2")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "Identifier",
                    name: "x",
                },
                right: {
                    type: "ConditionalExpression",
                    test: {
                        type: "Literal",
                        value: 0,
                    },
                    consequent: {
                        type: "Literal",
                        value: 1,
                    },
                    alternate: {
                        type: "Literal",
                        value:  2,
                    },
                },
            },
        },
    ],
    sourceType: "script",
});
   });
});
