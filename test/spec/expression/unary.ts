import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Unary", () => {
    it("should parse ++x", () => {
        assert.match<Program>(parseScript("++x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse -x", () => {
        assert.match<Program>(parseScript("-x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "-",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse +x", () => {
        assert.match<Program>(parseScript("+x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "+",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse ~x", () => {
        assert.match<Program>(parseScript("~x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "~",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse !x", () => {
        assert.match<Program>(parseScript("!x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "!",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"void x\"", () => {
        assert.match<Program>(parseScript("void x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "void",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"delete x\"", () => {
        assert.match<Program>(parseScript("delete x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "delete",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse typeof x", () => {
        assert.match<Program>(parseScript("typeof x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "typeof",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"delete a\"", () => {
        assert.match<Program>(parseScript("delete a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "delete",
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

    it("should parse \"+a\"", () => {
        assert.match<Program>(parseScript("+a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "+",
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

    it("should parse \"~a\"", () => {
        assert.match<Program>(parseScript("~a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "~",
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

    it("should parse \"-a\"", () => {
        assert.match<Program>(parseScript("-a"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "UnaryExpression",
                        operator: "-",
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
