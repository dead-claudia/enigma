import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `break`", () => {
    it("should throw on \"if(0) break\"", () => {
        assert.throws(SyntaxError, () => { parseScript("if(0) break\""); });
    });

    it("should parse while (true) { break }", () => {
        assert.match<Program>(parseScript("while (true) { break }"), {
            type: "Program",
            body: [
                {
                    type: "WhileStatement",
                    test: {
                        type: "Literal",
                        value: true,
                    },
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "BreakStatement",
                                label: null,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse done: while (true) { break done }", () => {
        assert.match<Program>(parseScript("done: while (true) { break done }"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "done",
                    },
                    body: {
                        type: "WhileStatement",
                        test: {
                            type: "Literal",
                            value: true,
                        },
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "BreakStatement",
                                    label: {
                                        type: "Identifier",
                                        name: "done",
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse done: while (true) { break done; }", () => {
        assert.match<Program>(parseScript("done: while (true) { break done; }"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "done",
                    },
                    body: {
                        type: "WhileStatement",
                        test: {
                            type: "Literal",
                            value: true,
                        },
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "BreakStatement",
                                    label: {
                                        type: "Identifier",
                                        name: "done",
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse __proto__: while (true) { break __proto__; }", () => {
        assert.match<Program>(parseScript("__proto__: while (true) { break __proto__; }"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "__proto__",
                    },
                    body: {
                        type: "WhileStatement",
                        test: {
                            type: "Literal",
                            value: true,
                        },
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "BreakStatement",
                                    label: {
                                        type: "Identifier",
                                        name: "__proto__",
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse {}", () => {
        assert.match<Program>(parseScript(`while (true) {
            if (x) break
            ;
            else y;
        }`), {
            type: "Program",
            body: [
                {
                    type: "WhileStatement",
                    test: {
                        type: "Literal",
                        value: true,
                    },
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "IfStatement",
                                test: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                consequent: {
                                    type: "BreakStatement",
                                    label: null,
                                },
                                alternate: {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "Identifier",
                                        name: "y",
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
});
