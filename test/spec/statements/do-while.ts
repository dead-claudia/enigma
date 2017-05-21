import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `do ... while`", () => {
    it("should parse \"while ( \"\" );\"", () => {
        assert.match<Program>(parseScript(`while ( "" );`), {
            type: "Program",
            body: [
                {
                    type: "WhileStatement",
                    test: {
                        type: "Literal",
                        value: "",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"do break; while false;\"", () => {
        assert.match<Program>(parseScript(`do continue; while(1);`), {
            type: "Program",
            body: [
                {
                    type: "DoWhileStatement",
                    body: {
                        type: "ContinueStatement",
                        label: null,
                    },
                    test: {
                        type: "Literal",
                        value: 1,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"do label1: label2: function f() {} while (false)\"", () => {
        assert.match<Program>(parseScript(`do label1: label2: function f() {} while (false)`), {
            type: "Program",
            body: [
                {
                    type: "DoWhileStatement",
                    body: {
                        type: "LabeledStatement",
                        label: {
                            type: "Identifier",
                            name: "label1",
                        },
                        body: {
                            type: "LabeledStatement",
                            label: {
                                type: "Identifier",
                                name: "label2",
                            },
                            body: {
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
                        },
                    },
                    test: {
                        type: "Literal",
                        value: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"do continue; while(1);\"", () => {
        assert.match<Program>(parseScript(`do continue; while(1);`), {
            type: "Program",
            body: [
                {
                    type: "DoWhileStatement",
                    body: {
                        type: "ContinueStatement",
                        label: null,
                    },
                    test: {
                        type: "Literal",
                        value: 1,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"do {} while (true)\"", () => {
        assert.match<Program>(parseScript(`do {} while (true)`), {
            type: "Program",
            body: [
                {
                    type: "DoWhileStatement",
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    test: {
                        type: "Literal",
                        value: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{do ; while(false); false}\"", () => {
        assert.match<Program>(parseScript(`{do ; while(false); false}`), {
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "DoWhileStatement",
                            body: {
                                type: "EmptyStatement",
                            },
                            test: {
                                type: "Literal",
                                value: false,
                            },
                        },
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "Literal",
                                value: false,
                            },
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{do ; while(false) false}\"", () => {
        assert.match<Program>(parseScript(`{do ; while(false) false}`), {
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "DoWhileStatement",
                            body: {
                                type: "EmptyStatement",
                            },
                            test: {
                                type: "Literal",
                                value: false,
                            },
                        },
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "Literal",
                                value: false,
                            },
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"do ; while (true)\"", () => {
        assert.match<Program>(parseScript(`do ; while (true)`), {
            type: "Program",
            body: [
                {
                    type: "DoWhileStatement",
                    body: {
                        type: "EmptyStatement",
                    },
                    test: {
                        type: "Literal",
                        value: true,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"do break; while false;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`do break; while false;`); });
    });

    it("should parse \"do const x = null; while (false)\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`do const x = null; while (false)`); });
    });

    it("should parse \"do function* g() {} while (false)\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`do function* g() {} while (false)`); });
    });

    it("should parse \"do break; while false;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`do break; while false;`); });
    });
});
