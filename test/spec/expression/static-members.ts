import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Static Members", () => {
    it("should parse \"a.if\"", () => {
        assert.match<Program>(parseScript("a.if"), {
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
        assert.match<Program>(parseScript("a.null"), {
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
        assert.match<Program>(parseScript("a.true"), {
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
        assert.match<Program>(parseScript("a.false"), {
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
        assert.match<Program>(parseScript("a.$._.B0"), {
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
        assert.match<Program>(parseScript("a.b.c"), {
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
        assert.match<Program>(parseScript("a.b"), {
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
