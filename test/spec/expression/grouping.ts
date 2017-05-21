import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Grouping", () => {
    it("should parse \"(a)\"", () => {
        assert.match<Program>(parseScript("(a)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "a",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(0, a)\"", () => {
        assert.match<Program>(parseScript("(0, a)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "SequenceExpression",
                        expressions: [
                            {
                                type: "Literal",
                                value: 0,
                            },
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a, 0)\"", () => {
        assert.match<Program>(parseScript("(a, 0)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "SequenceExpression",
                        expressions: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Literal",
                                value: 0,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a,a)\"", () => {
        assert.match<Program>(parseScript("(a,a)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "SequenceExpression",
                        expressions: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"((a,a),(a,a))\"", () => {
        assert.match<Program>(parseScript("((a,a),(a,a))"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "SequenceExpression",
                        expressions: [
                            {
                                type: "SequenceExpression",
                                expressions: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                ],
                            },
                            {
                                type: "SequenceExpression",
                                expressions: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    /* tslint:disable max-line-length */
    it("should parse \"((((((((((((((((((((((((((((((((((((((((a))))))))))))))))))))))))))))))))))))))))\"", () => {
        assert.match<Program>(
            parseScript("((((((((((((((((((((((((((((((((((((((((a))))))))))))))))))))))))))))))))))))))))"),
        /* tslint:enable max-line-length */
            {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Identifier",
                            name: "a",
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"void (a)\"", () => {
        assert.match<Program>(parseScript("void (a)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "void",
                        argument: {
                            type: "Identifier",
                            name: "a",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
