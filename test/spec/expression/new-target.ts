import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - `new.target`", () => {
    it("should parse \"function f() { new.target; }\"", () => {
        expect(parseScript("function f() { new.target; }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "MetaProperty",
                                    meta: {
                                        type: "Identifier",
                                        name: "new",
                                    },
                                    property: {
                                        type: "Identifier",
                                        name: "target",
                                    },
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function f(a = new.target){})\"", () => {
        expect(parseScript("(function f(a = new.target){})")).to.eql({
            body: [
                {
                    expression: {
                        async: false,
                        body: {
                            body: [],
                            type: "BlockStatement",
                        },
                        expression: false,
                        generator: false,
                        id: {
                            name: "f",
                            type: "Identifier",
                        },
                        params: [
                            {
                                left: {
                                    name: "a",
                                    type: "Identifier",
                                },
                                right: {
                                    meta: {
                                        name: "new",
                                        type: "Identifier",
                                    },
                                    property: {
                                        name: "target",
                                        type: "Identifier",
                                    },
                                    type: "MetaProperty",
                                },
                                type: "AssignmentPattern",
                            },
                        ],
                        type: "FunctionExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"function f() { new new.target; }\"", () => {
        expect(parseScript("function f() { new new.target; }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "NewExpression",
                                    callee: {
                                        type: "MetaProperty",
                                        meta: {
                                            type: "Identifier",
                                            name: "new",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "target",
                                        },
                                    },
                                    arguments: [],
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function f() { new.target(); }\"", () => {
        expect(parseScript("function f() { new.target(); }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "MetaProperty",
                                        meta: {
                                            type: "Identifier",
                                            name: "new",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "target",
                                        },
                                    },
                                    arguments: [],
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"function f() { new[\"target\"]; }\"", () => {
        expect(parseScript("function f() { new[\"target\"]; }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "NewExpression",
                                    callee: {
                                        type: "ArrayExpression",
                                        elements: [
                                            {
                                                type: "Literal",
                                                value: "target",
                                            },
                                        ],
                                    },
                                    arguments: [],
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse \"function f() { new.anythingElse; }\"", () => {
        expect(() => { parseScript("function f() { new.anythingElse; }"); })
        .to.throw("Invalid Meta property");
    });

    it("should not parse \"function f() { new..target; }\"", () => {
        expect(() => { parseScript("function f() { new..target; }"); })
        .to.throw("Invalid Meta property");
    });
});
