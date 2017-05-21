import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `continue`", () => {
    it("should parse \"while (true) { continue }\"", () => {
        assert.match<Program>(parseScript("while (true) { continue }"), {
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
                                type: "ContinueStatement",
                                label: null,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"done: while (true) { continue done }\"", () => {
        assert.match<Program>(parseScript("done: while (true) { continue done }"), {
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
                                    type: "ContinueStatement",
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

    it("should parse \"__proto__: while (true) { continue __proto__; }\"", () => {
        assert.match<Program>(parseScript("__proto__: while (true) { continue __proto__; }"), {
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
                                    type: "ContinueStatement",
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

    it("should parse \"a: do continue a; while(1);\"", () => {
        assert.match<Program>(parseScript("a: do continue a; while(1);"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "a",
                    },
                    body: {
                        type: "DoWhileStatement",
                        body: {
                            type: "ContinueStatement",
                            label: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                        test: {
                            type: "Literal",
                            value: 1,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a: while (0) { continue \n b; }\"", () => {
        assert.match<Program>(parseScript("a: while (0) { continue \n b; }"), {
            body: [
                {
                    body: {
                        body: {
                            body: [
                                {
                                    label: null,
                                    type: "ContinueStatement",
                                },
                                {
                                    expression: {
                                        name: "b",
                                        type: "Identifier",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                            type: "BlockStatement",
                        },
                        test: {
                            type: "Literal",
                            value: 0,
                        },
                        type: "WhileStatement",
                    },
                    label: {
                        name: "a",
                        type: "Identifier",
                    },
                    type: "LabeledStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"a: while (0) { continue \r b; }\"", () => {
        assert.match<Program>(parseScript("a: while (0) { continue \r b; }"), {
            body: [
                {
                    body: {
                        body: {
                            body: [
                                {
                                    label: null,
                                    type: "ContinueStatement",
                                },
                                {
                                    expression: {
                                        name: "b",
                                        type: "Identifier",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                            type: "BlockStatement",
                        },
                        test: {
                            type: "Literal",
                            value: 0,
                        },
                        type: "WhileStatement",
                    },
                    label: {
                        name: "a",
                        type: "Identifier",
                    },
                    type: "LabeledStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"a: while (0) { continue /*\r*/ b; }\"", () => {
        assert.match<Program>(parseScript("a: while (0) { continue /*\r*/ b; }"), {
            body: [
                {
                    body: {
                        body: {
                            body: [
                                {
                                    label: null,
                                    type: "ContinueStatement",
                                },
                                {
                                    expression: {
                                        name: "b",
                                        type: "Identifier",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                            type: "BlockStatement",
                        },
                        test: {
                            type: "Literal",
                            value: 0,
                        },
                        type: "WhileStatement",
                    },
                    label: {
                        name: "a",
                        type: "Identifier",
                    },
                    type: "LabeledStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"a: while (0) { continue /*\u2029*/ b; }\"", () => {
        assert.match<Program>(parseScript("a: while (0) { continue /*\u2029*/ b; }"), {
            body: [
                {
                    body: {
                        body: {
                            body: [
                                {
                                    label: null,
                                    type: "ContinueStatement",
                                },
                                {
                                    expression: {
                                        name: "b",
                                        type: "Identifier",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                            type: "BlockStatement",
                        },
                        test: {
                            type: "Literal",
                            value: 0,
                        },
                        type: "WhileStatement",
                    },
                    label: {
                        name: "a",
                        type: "Identifier",
                    },
                    type: "LabeledStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"done: while (true) { continue done; }\"", () => {
        assert.match<Program>(parseScript("done: while (true) { continue done; }"), {
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
                                    type: "ContinueStatement",
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

    it("should parse \"while (true) { continue; }\"", () => {
        assert.match<Program>(parseScript("while (true) { continue; }"), {
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
                                type: "ContinueStatement",
                                label: null,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
