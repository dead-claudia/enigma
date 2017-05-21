import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Relational", () => {
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

    it("should parse \"x > y\"", () => {
        assert.match<Program>(parseScript("x > y"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: ">",
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

    it("should parse \"x >= y\"", () => {
        assert.match<Program>(parseScript("x >= y"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: ">=",
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

    it("should parse \"x in y\"", () => {
        assert.match<Program>(parseScript("x in y"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "in",
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

    it("should parse \"x instanceof y\"", () => {
        assert.match<Program>(parseScript("x instanceof y"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "instanceof",
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

    it("should parse \"x < y < z\"", () => {
        assert.match<Program>(parseScript("x < y < z"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "<",
                        left: {
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
});
