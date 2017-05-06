import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Grouping", () => {

    it("should parse \"(a)\"", () => {
        expect(parseScript("(a)")).to.eql({
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
        expect(parseScript("(0, a)")).to.eql({
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
        expect(parseScript("(a, 0)")).to.eql({
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
        expect(parseScript("(a,a)")).to.eql({
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
        expect(parseScript("((a,a),(a,a))")).to.eql({
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
        expect(parseScript("((((((((((((((((((((((((((((((((((((((((a))))))))))))))))))))))))))))))))))))))))"))
        /* tslint:enable max-line-length */
        .to.eql({
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

    it("should parse \"void (a)\"", () => {
        expect(parseScript("void (a)")).to.eql({
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
