import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `switch`", () => {
    it("should parse \"switch (answer) { case 42: hi(); break; default: break }\"", () => {
        assert.match<Program>(
            parseScript("switch (answer) { case 42: hi(); break; default: break; }"),
            {
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
            },
        );
    });

    it("should parse \"switch(a){case 1:default:}\"", () => {
        assert.match<Program>(parseScript("switch(a){case 1:default:}"), {
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
        assert.match<Program>(parseScript("switch (answer) { case 0: let a; }"), {
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
        assert.match<Program>(
            parseScript("switch (answer) { case 0: hi(); break; default: break }"),
            {
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
            },
        );
    });

    it("should parse \"switch(a){case 1:default:case 2:}\"", () => {
        assert.match<Program>(parseScript("switch(a){case 1:default:case 2:}"), {
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
        assert.match<Program>(parseScript("switch(a){default:case 2:}"), {
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
        assert.match<Program>(parseScript("switch (answer) { case 42: hi(); break; }"), {
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
        assert.match<Program>(parseScript("switch (x) {}"), {
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
        assert.match<Program>(parseScript("switch(a){case 1:}"), {
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
