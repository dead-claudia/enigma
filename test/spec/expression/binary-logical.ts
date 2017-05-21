import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Binary Logical", () => {
    it("should parse \"x || y\"", () => {
        assert.match<Program>(parseScript("x || y"), {
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
        assert.match<Program>(parseScript("x && y"), {
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
        assert.match<Program>(parseScript("x || y || z"), {
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
        assert.match<Program>(parseScript("x && y && z"), {
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
});
