import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2016 - Exponentiation", () => {

    it("should parse \"x **= 42\"", () => {
        assert.match<Program>(parseScript("x **= 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "**=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 42,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"3 ** 5 * 1\"", () => {
        assert.match<Program>(parseScript("3 ** 5 * 1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "*",
                        left: {
                            type: "BinaryExpression",
                            operator: "**",
                            left: {
                                type: "Literal",
                                value: 3,
                            },
                            right: {
                                type: "Literal",
                                value: 5,
                            },
                        },
                        right: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"3 % 5 ** 1\"", () => {
        assert.match<Program>(parseScript("3 % 5 ** 1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "%",
                        left: {
                            type: "Literal",
                            value: 3,
                        },
                        right: {
                            type: "BinaryExpression",
                            operator: "**",
                            left: {
                                type: "Literal",
                                value: 5,
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"-a * 5\"", () => {
        assert.match<Program>(parseScript("-a * 5"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "*",
                        left: {
                            type: "UnaryExpression",
                            operator: "-",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                            prefix: true,
                        },
                        right: {
                            type: "Literal",
                            value: 5,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(-5) ** y\"", () => {
        assert.match<Program>(parseScript("(-5) ** y"), {
            body: [
                {
                    expression: {
                        left: {
                            argument: {
                                type: "Literal",
                                value: 5,
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

    it("should parse \"++a ** 2\"", () => {
        assert.match<Program>(parseScript("++a ** 2"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "**",
                        left: {
                            type: "UpdateExpression",
                            operator: "++",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                            prefix: true,
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

    it("should parse \"a-- ** 2\"", () => {
        assert.match<Program>(parseScript("a-- ** 2"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "**",
                        left: {
                            type: "UpdateExpression",
                            operator: "--",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                            prefix: false,
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

    it("should handle exponential plusplus", () => {
        assert.match<Program>(parseScript("a++ ** 2"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "**",
                        left: {
                            type: "UpdateExpression",
                            operator: "++",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                            prefix: false,
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

    it("should handle exponential precedence", () => {
        assert.match<Program>(parseScript("1 * 5 ** 2"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "*",
                        left: {
                            type: "Literal",
                            value: 1,
                        },
                        right: {
                            type: "BinaryExpression",
                            operator: "**",
                            left: {
                                type: "Literal",
                                value: 5,
                            },
                            right: {
                                type: "Literal",
                                value: 2,
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

});
