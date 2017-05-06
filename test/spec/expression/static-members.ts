import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Static Members", () => {

    it("should parse \"a.if\"", () => {
        expect(parseScript("a.if")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "a",
                        },
                        property: {
                            type: "Identifier",
                            name: "if",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a.null\"", () => {
        expect(parseScript("a.null")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "a",
                        },
                        property: {
                            type: "Identifier",
                            name: "null",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a.true\"", () => {
        expect(parseScript("a.true")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "a",
                        },
                        property: {
                            type: "Identifier",
                            name: "true",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a.false\"", () => {
        expect(parseScript("a.false")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "a",
                        },
                        property: {
                            type: "Identifier",
                            name: "false",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a.$._.B0\"", () => {
        expect(parseScript("a.$._.B0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "$",
                                },
                            },
                            property: {
                                type: "Identifier",
                                name: "_",
                            },
                        },
                        property: {
                            type: "Identifier",
                            name: "B0",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a.b.c\"", () => {
        expect(parseScript("a.b.c")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "Identifier",
                                name: "a",
                            },
                            property: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                        property: {
                            type: "Identifier",
                            name: "c",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a.b\"", () => {
        expect(parseScript("a.b")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "a",
                        },
                        property: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
