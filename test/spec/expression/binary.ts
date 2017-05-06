import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Binary", () => {

    it("should parse \"1+2;\"", () => {
        expect(parseScript("1+2;")).to.eql({
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
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x & y\"", () => {
        expect(parseScript("x & y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "&",
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

    it("should parse \"x ^ y\"", () => {
        expect(parseScript("x ^ y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "^",
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

    it("should parse \"x | y\"", () => {
        expect(parseScript("x | y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "|",
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

    it("should parse \"x * y\"", () => {
        expect(parseScript("x * y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
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

    it("should parse \"x / y\"", () => {
        expect(parseScript("x / y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "/",
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

    it("should parse \"(-x) ** y\"", () => {
        expect(parseScript("(-x) ** y")).to.eql({
            body: [
                {
                    expression: {
                        left: {
                            argument: {
                                name: "x",
                                type: "Identifier",
                            },
                            operator: "-",
                            prefix: true,
                            type: "UnaryExpression",
                        },
                        operator: "**",
                        right: {
                            name: "y",
                            type: "Identifier",
                        },
                        type: "BinaryExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"-(x ** y)\"", () => {
        expect(parseScript("-(x ** y)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "-",
                        argument: {
                            type: "BinaryExpression",
                            operator: "**",
                            left: {
                                type: "Identifier",
                                name: "x",
                            },
                            right: {
                                type: "Identifier",
                                name: "y",
                            },
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x < y\"", () => {
        expect(parseScript("x < y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "<",
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

    it("should parse \"x <= y\"", () => {
        expect(parseScript("x <= y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "<=",
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

    it("should parse \"x != y\"", () => {
        expect(parseScript("x != y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "!=",
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

    it("should parse \"x !== y\"", () => {
        expect(parseScript("x !== y")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "!==",
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

    it("should parse \"x + y + z\"", () => {
        expect(parseScript("x + y + z")).to.eql({
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

    it("should parse \"x - y + z\"", () => {
        expect(parseScript("x - y + z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
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

    it("should parse \"x + y - z\"", () => {
        expect(parseScript("x + y - z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "-",
                        left: {
                            type: "BinaryExpression",
                            operator: "+",
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

    it("should parse \"x - y - z\"", () => {
        expect(parseScript("x - y - z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "-",
                        left: {
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

    it("should parse \"x + y * z\"", () => {
        expect(parseScript("x + y * z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "BinaryExpression",
                            operator: "*",
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

    it("should parse \"x + y / z\"", () => {
        expect(parseScript("x + y / z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "BinaryExpression",
                            operator: "/",
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

    it("should parse \"x - y % z\"", () => {
        expect(parseScript("x - y % z")).to.eql({
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
                            type: "BinaryExpression",
                            operator: "%",
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

    it("should parse \"x * y * z\"", () => {
        expect(parseScript("x * y * z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "*",
                        left: {
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

    it("should parse \"x * y / z\"", () => {
        expect(parseScript("x * y / z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "/",
                        left: {
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

    it("should parse \"x * y % z\"", () => {
        expect(parseScript("x * y % z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "%",
                        left: {
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

    it("should parse \"x % y * z\"", () => {
        expect(parseScript("x % y * z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "*",
                        left: {
                            type: "BinaryExpression",
                            operator: "%",
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

    it("should parse \"x << y << z\"", () => {
        expect(parseScript("x << y << z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "<<",
                        left: {
                            type: "BinaryExpression",
                            operator: "<<",
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

    it("should parse \"x | y | z\"", () => {
        expect(parseScript("x | y | z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "|",
                        left: {
                            type: "BinaryExpression",
                            operator: "|",
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

    it("should parse \"x & y & z\"", () => {
        expect(parseScript("x & y & z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "&",
                        left: {
                            type: "BinaryExpression",
                            operator: "&",
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

    it("should parse \"x ^ y ^ z\"", () => {
        expect(parseScript("x ^ y ^ z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "^",
                        left: {
                            type: "BinaryExpression",
                            operator: "^",
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

    it("should parse \"x & y | z\"", () => {
        expect(parseScript("x & y | z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "|",
                        left: {
                            type: "BinaryExpression",
                            operator: "&",
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

    it("should parse \"x | y ^ z\"", () => {
        expect(parseScript("x | y ^ z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "|",
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

    it("should parse \"x | y & z\"", () => {
        expect(parseScript("x | y & z")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "|",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "BinaryExpression",
                            operator: "&",
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
