import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Binary Logical", () => {

    it("should parse \"x || y\"", () => {
        expect(parseScript("x || y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "LogicalExpression",
                        operator: "||",
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

    it("should parse \"x || y || z\"", () => {
        expect(parseScript("x || y || z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "LogicalExpression",
                        operator: "||",
                        left: {
                            type: "LogicalExpression",
                            operator: "||",
                            left: {
                                type: "Identifier",
                                name: "x",
                            },
                            right: {
                                type: "Identifier",
                                name: "y",
                            },
                        },
                        right: {
                            type: "Identifier",
                            name: "z",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x && y && z\"", () => {
        expect(parseScript("x && y && z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "LogicalExpression",
                        operator: "&&",
                        left: {
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
                        right: {
                            type: "Identifier",
                            name: "z",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x || y ^ z\"", () => {
        expect(parseScript("x || y ^ z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "LogicalExpression",
                        operator: "||",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "BinaryExpression",
                            operator: "^",
                            left: {
                                type: "Identifier",
                                name: "y",
                            },
                            right: {
                                type: "Identifier",
                                name: "z",
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
