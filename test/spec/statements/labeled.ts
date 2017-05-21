import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - Labeled", () => {
    it("should parse \"start: for (;;) break start\"", () => {
        assert.match<Program>(parseScript("start: for (;;) break start"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "start",
                    },
                    body: {
                        type: "ForStatement",
                        init: null,
                        test: null,
                        update: null,
                        body: {
                            type: "BreakStatement",
                            label: {
                                type: "Identifier",
                                name: "start",
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"start: while (true) break start\"", () => {
        assert.match<Program>(parseScript("start: while (true) break start"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "start",
                    },
                    body: {
                        type: "WhileStatement",
                        test: {
                            type: "Literal",
                            value: true,
                        },
                        body: {
                            type: "BreakStatement",
                            label: {
                                type: "Identifier",
                                name: "start",
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"a:{break a;}\"", () => {
        assert.match<Program>(parseScript("a:{break a;}"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "a",
                    },
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "BreakStatement",
                                label: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse a: function b() {}", () => {
        assert.match<Program>(parseScript("a: function b() {}"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "a",
                    },
                    body: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "b",
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse start: for (;;) break start", () => {
        assert.match<Program>(parseScript("start: for (;;) break start"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "start",
                    },
                    body: {
                        type: "ForStatement",
                        init: null,
                        test: null,
                        update: null,
                        body: {
                            type: "BreakStatement",
                            label: {
                                type: "Identifier",
                                name: "start",
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse start: while (true) break start", () => {
        assert.match<Program>(parseScript("start: while (true) break start"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "start",
                    },
                    body: {
                        type: "WhileStatement",
                        test: {
                            type: "Literal",
                            value: true,
                        },
                        body: {
                            type: "BreakStatement",
                            label: {
                                type: "Identifier",
                                name: "start",
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse__proto__: test", () => {
        assert.match<Program>(parseScript("__proto__: test"), {
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "__proto__",
                    },
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Identifier",
                            name: "test",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
