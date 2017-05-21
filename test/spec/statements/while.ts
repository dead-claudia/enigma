import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `while`", () => {
    it("should parse \"while(1);\"", () => {
        assert.match<Program>(parseScript(`while(1);`), {
            body: [
                {
                    body: {
                        type: "EmptyStatement",
                    },
                    test: {
                        type: "Literal",
                        value: 1,
                    },
                    type: "WhileStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"while (true) {}\"", () => {
        assert.match<Program>(parseScript(`while (true) {}`), {
            body: [
                {
                    body: {
                        body: [],
                        type: "BlockStatement",
                    },
                    test: {
                        type: "Literal",
                        value: true,
                    },
                    type: "WhileStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"while (true) doSomething()\"", () => {
        assert.match<Program>(parseScript(`while (true) doSomething()`), {
            body: [
                {
                    body: {
                        expression: {
                            arguments: [],
                            callee: {
                                name: "doSomething",
                                type: "Identifier",
                            },
                            type: "CallExpression",
                        },
                        type: "ExpressionStatement",
                    },
                    test: {
                        type: "Literal",
                        value: true,
                    },
                    type: "WhileStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"while (x < 10) { x++; y--; }\"", () => {
        assert.match<Program>(parseScript(`while (x < 10) { x++; y--; }`), {
            type: "Program",
            body: [
                {
                    type: "WhileStatement",
                    test: {
                        type: "BinaryExpression",
                        operator: "<",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 10,
                        },
                    },
                    body: {
                        type: "BlockStatement",
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
                                    prefix: false,
                                },
                            },
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "UpdateExpression",
                                    operator: "--",
                                    argument: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                    prefix: false,
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
