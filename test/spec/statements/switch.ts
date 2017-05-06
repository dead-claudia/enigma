import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `switch`", () => {

    it("should parse \"switch (answer) { case 42: hi(); break; default: break }\"", () => {
        expect(parseScript("switch (answer) { case 42: hi(); break; default: break; }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "answer",
                    },
                    cases: [
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 42,
                            },
                            consequent: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "hi",
                                        },
                                        arguments: [],
                                    },
                                },
                                {
                                    type: "BreakStatement",
                                    label: null,
                                },
                            ],
                        },
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [
                                {
                                    type: "BreakStatement",
                                    label: null,
                                },
                            ],
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"switch(a){case 1:default:}\"", () => {
        expect(parseScript("switch(a){case 1:default:}")).to.eql({
            type: "Program",
            body: [
                {
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "a",
                    },
                    cases: [
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 1,
                            },
                            consequent: [],
                        },
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [],
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"switch (answer) { case 0: let a; }\"", () => {
        expect(parseScript("switch (answer) { case 0: let a; }")).to.eql({
    type: "Program",
    body: [
        {
            type: "SwitchStatement",
            discriminant: {
                type: "Identifier",
                name: "answer",
            },
            cases: [
                {
                    type: "SwitchCase",
                    test: {
                        type: "Literal",
                        value: 0,
                    },
                    consequent: [
                        {
                            type: "VariableDeclaration",
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    init: null,
                                },
                            ],
                            kind: "let",
                        },
                    ],
                },
            ],
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"switch (answer) { case 0: hi(); break; default: break }\"", () => {
        expect(parseScript("switch (answer) { case 0: hi(); break; default: break }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "answer",
                    },
                    cases: [
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 0,
                            },
                            consequent: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "hi",
                                        },
                                        arguments: [],
                                    },
                                },
                                {
                                    type: "BreakStatement",
                                    label: null,
                                },
                            ],
                        },
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [
                                {
                                    type: "BreakStatement",
                                    label: null,
                                },
                            ],
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"switch(a){case 1:default:case 2:}\"", () => {
        expect(parseScript("switch(a){case 1:default:case 2:}")).to.eql({
            type: "Program",
            body: [
                {
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "a",
                    },
                    cases: [
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 1,
                            },
                            consequent: [],
                        },
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [],
                        },
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 2,
                            },
                            consequent: [],
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"switch(a){default:case 2:}\"", () => {
        expect(parseScript("switch(a){default:case 2:}")).to.eql({
            type: "Program",
            body: [
                {
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "a",
                    },
                    cases: [
                        {
                            type: "SwitchCase",
                            test: null,
                            consequent: [],
                        },
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 2,
                            },
                            consequent: [],
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"switch (answer) { case 42: hi(); break; }\"", () => {
        expect(parseScript("switch (answer) { case 42: hi(); break; }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "answer",
                    },
                    cases: [
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 42,
                            },
                            consequent: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "hi",
                                        },
                                        arguments: [],
                                    },
                                },
                                {
                                    type: "BreakStatement",
                                    label: null,
                                },
                            ],
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse switch (x) {}", () => {
        expect(parseScript("switch (x) {}")).to.eql({
            type: "Program",
            body: [
                {
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "x",
                    },
                    cases: [],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"switch(a){case 1:}\"", () => {
        expect(parseScript("switch(a){case 1:}")).to.eql({
            type: "Program",
            body: [
                {
                    type: "SwitchStatement",
                    discriminant: {
                        type: "Identifier",
                        name: "a",
                    },
                    cases: [
                        {
                            type: "SwitchCase",
                            test: {
                                type: "Literal",
                                value: 1,
                            },
                            consequent: [],
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });
});
