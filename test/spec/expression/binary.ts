import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Binary", () => {
    it("should parse \"1+2;\"", () => {
        assert.match<Program>(parseScript("1+2;"), {
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
        assert.match<Program>(parseScript("x & y"), {
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
        assert.match<Program>(parseScript("x ^ y"), {
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
        assert.match<Program>(parseScript("x | y"), {
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
        assert.match<Program>(parseScript("x || y ^ z"), {
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
        assert.match<Program>(parseScript("x * y"), {
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
        assert.match<Program>(parseScript("x / y"), {
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
        assert.match<Program>(parseScript("(-x) ** y"), {
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
        assert.match<Program>(parseScript("-(x ** y)"), {
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
        assert.match<Program>(parseScript("x < y"), {
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
        assert.match<Program>(parseScript("x <= y"), {
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
        assert.match<Program>(parseScript("x != y"), {
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
        assert.match<Program>(parseScript("x !== y"), {
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
        assert.match<Program>(parseScript("x + y + z"), {
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
        assert.match<Program>(parseScript("x - y + z"), {
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
        assert.match<Program>(parseScript("x + y - z"), {
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
        assert.match<Program>(parseScript("x - y - z"), {
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
        assert.match<Program>(parseScript("x + y * z"), {
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
        assert.match<Program>(parseScript("x + y / z"), {
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
        assert.match<Program>(parseScript("x - y % z"), {
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
        assert.match<Program>(parseScript("x * y * z"), {
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
        assert.match<Program>(parseScript("x * y / z"), {
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
        assert.match<Program>(parseScript("x * y % z"), {
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
        assert.match<Program>(parseScript("x % y * z"), {
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
        assert.match<Program>(parseScript("x << y << z"), {
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
        assert.match<Program>(parseScript("x | y | z"), {
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
        assert.match<Program>(parseScript("x & y & z"), {
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
        assert.match<Program>(parseScript("x ^ y ^ z"), {
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
        assert.match<Program>(parseScript("x & y | z"), {
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
        assert.match<Program>(parseScript("x | y ^ z"), {
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
        assert.match<Program>(parseScript("x | y & z"), {
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
