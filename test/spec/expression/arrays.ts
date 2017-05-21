import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expression - Arrays", () => {
    it("should parse \"[,,1,,,2,3,,]\"", () => {
        assert.match<Program>(parseScript("[,,1,,,2,3,,]"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
                            null,
                            null,
                            {
                                type: "Literal",
                                value: 1,
                            },
                            null,
                            null,
                            {
                                type: "Literal",
                                value: 2,
                            },
                            {
                                type: "Literal",
                                value: 3,
                            },
                            null,
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[a, ...b=c]\"", () => {
        assert.match<Program>(parseScript("[a, ...b=c]"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"([a, ...b=c])\"", () => {
        assert.match<Program>(parseScript("([a, ...b=c])"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x = [ 1, 2,, 3, ]\"", () => {
        assert.match<Program>(parseScript("x = [ 1, 2,, 3, ]"), {
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
                            type: "ArrayExpression",
                            elements: [
                                {
                                    type: "Literal",
                                    value: 1,
                                },
                                {
                                    type: "Literal",
                                    value:  2,
                                },
                                null,
                                {
                                    type: "Literal",
                                    value:  3,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"日本語 = []\"", () => {
        assert.match<Program>(parseScript("日本語 = []"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "日本語",
                        },
                        right: {
                            type: "ArrayExpression",
                            elements: [],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[]\"", () => {
        assert.match<Program>(parseScript("[]"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[ 0 ]\"", () => {
        assert.match<Program>(parseScript("[ 0 ]"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
                            {
                                type: "Literal",
                                value:  0,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[ 1, 2,, 3, ]\"", () => {
        assert.match<Program>(parseScript("[ 1, 2,, 3, ]"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [
                            {
                                type: "Literal",
                                value: 1,
                            },
                            {
                                type: "Literal",
                                value:  2,
                            },
                            null,
                            {
                                type: "Literal",
                                value:  3,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
