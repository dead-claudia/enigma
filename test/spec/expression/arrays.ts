import { parseScript } from "../../../src";

import {expect} from "chai";

describe.skip("Expression - Arrays", () => {

    it("should parse \"[,,1,,,2,3,,]\"", () => {
        expect(parseScript("[,,1,,,2,3,,]")).to.eql({
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
        expect(parseScript("[a, ...b=c]")).to.eql({
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
        expect(parseScript("([a, ...b=c])")).to.eql({
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
        expect(parseScript("x = [ 1, 2,, 3, ]")).to.eql({
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
        expect(parseScript("日本語 = []")).to.eql({
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
        expect(parseScript("[]")).to.eql({
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
        expect(parseScript("[ 0 ]")).to.eql({
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
        expect(parseScript("[ 1, 2,, 3, ]")).to.eql({
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
