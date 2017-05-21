import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2016 - B.3.4 Function declarations in `IfStatement` Statement Clauses", () => {

    it(`should parse "if (x) function f() { return 23; } else function f() { return 42; }"`, () => {
        assert.match<Program>(
            parseScript("if (x) function f() { return 23; } else function f() { return 42; }"),
            {
                type: "Program",
                body: [
                    {
                        type: "IfStatement",
                        test: {
                            type: "Identifier",
                            name: "x",
                        },
                        consequent: {
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
                                        type: "ReturnStatement",
                                        argument: {
                                            type: "Literal",
                                            value: 23,
                                        },
                                    },
                                ],
                            },
                            generator: false,
                            expression: false,
                            async: false,
                        },
                        alternate: {
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
                                        type: "ReturnStatement",
                                        argument: {
                                            type: "Literal",
                                            value: 42,
                                        },
                                    },
                                ],
                            },
                            generator: false,
                            expression: false,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"if (x) function f() {}\"", () => {
        assert.match<Program>(parseScript("if (x) function f() {}"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "x",
                    },
                    consequent: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "f",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });
});
