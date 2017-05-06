import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Complex", () => {

    it("should parse a || b && c | d ^ e & f == g < h >>> i + j * k", () => {
        expect(parseScript("a || b && c | d ^ e & f == g < h >>> i + j * k")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "LogicalExpression",
                operator: "||",
                left: {
                    type: "Identifier",
                    name: "a",
                },
                right: {
                    type: "LogicalExpression",
                    operator: "&&",
                    left: {
                        type: "Identifier",
                        name: "b",
                    },
                    right: {
                        type: "BinaryExpression",
                        operator: "|",
                        left: {
                            type: "Identifier",
                            name: "c",
                        },
                        right: {
                            type: "BinaryExpression",
                            operator: "^",
                            left: {
                                type: "Identifier",
                                name: "d",
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "&",
                                left: {
                                    type: "Identifier",
                                    name: "e",
                                },
                                right: {
                                    type: "BinaryExpression",
                                    operator: "==",
                                    left: {
                                        type: "Identifier",
                                        name: "f",
                                    },
                                    right: {
                                        type: "BinaryExpression",
                                        operator: "<",
                                        left: {
                                            type: "Identifier",
                                            name: "g",
                                        },
                                        right: {
                                            type: "BinaryExpression",
                                            operator: ">>>",
                                            left: {
                                                type: "Identifier",
                                                name: "h",
                                            },
                                            right: {
                                                type: "BinaryExpression",
                                                operator: "+",
                                                left: {
                                                    type: "Identifier",
                                                    name: "i",
                                                },
                                                right: {
                                                    type: "BinaryExpression",
                                                    operator: "*",
                                                    left: {
                                                        type: "Identifier",
                                                        name: "j",
                                                    },
                                                    right: {
                                                        type: "Identifier",
                                                        name: "k",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    ],
    sourceType: "script",
});
    });
    it("should parse a + (b < (c * d)) + e", () => {
        expect(parseScript("a + (b < (c * d)) + e")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "BinaryExpression",
                operator: "+",
                left: {
                    type: "BinaryExpression",
                    operator: "+",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "BinaryExpression",
                        operator: "<",
                        left: {
                            type: "Identifier",
                            name: "b",
                        },
                        right: {
                            type: "BinaryExpression",
                            operator: "*",
                            left: {
                                type: "Identifier",
                                name: "c",
                            },
                            right: {
                                type: "Identifier",
                                name: "d",
                            },
                        },
                    },
                },
                right: {
                    type: "Identifier",
                    name: "e",
                },
            },
        },
    ],
    sourceType: "script",
});
    });

});
