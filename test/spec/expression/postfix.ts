import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Postfix", () => {

    it("should parse \"a++\"", () => {
        expect(parseScript("a++")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "a",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x--\"", () => {
        expect(parseScript("x--")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "--",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"eval++\"", () => {
        expect(parseScript("eval++")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "eval",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"eval--\"", () => {
        expect(parseScript("eval--")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "--",
                        argument: {
                            type: "Identifier",
                            name: "eval",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"arguments++\"", () => {
        expect(parseScript("arguments++")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "arguments",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"arguments--\"", () => {
        expect(parseScript("arguments--")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "--",
                        argument: {
                            type: "Identifier",
                            name: "arguments",
                        },
                        prefix: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
