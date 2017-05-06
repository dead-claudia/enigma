import { parseScript } from "../../../src";

import {expect} from "chai";

describe.skip("Expressions - Unary", () => {

    it("should parse ++x", () => {
        expect(parseScript("++x")).to.eql({
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
        expect(parseScript("-x")).to.eql({
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
        expect(parseScript("+x")).to.eql({
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
        expect(parseScript("~x")).to.eql({
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
        expect(parseScript("!x")).to.eql({
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
        expect(parseScript("void x")).to.eql({
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
        expect(parseScript("delete x")).to.eql({
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
        expect(parseScript("typeof x")).to.eql({
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
        expect(parseScript("delete a")).to.eql({
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
        expect(parseScript("+a")).to.eql({
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
        expect(parseScript("~a")).to.eql({
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
        expect(parseScript("-a")).to.eql({
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
