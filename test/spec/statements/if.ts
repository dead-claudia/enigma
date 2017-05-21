import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `if`", () => {
    it("should parse \"if (true) const x = null; else ;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`if (true) const x = null; else ;`); });
    });

    it("should parse \"if (false) label1: label2: function test262() {} else ;\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`if (false) label1: label2: function test262() {} else ;`);
        });
    });

    it("should parse \"if (true) let x;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`if (true) let x;`); });
    });

    it("should parse \"if (true) class C {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`if (true) class C {}`); });
    });

    it("should parse \"if (true) class C {} else class D {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`if (true) class C {} else class D {}`); });
    });

    it("should parse \"if (morning) (function(){})\"", () => {
        assert.match<Program>(parseScript(`if (morning) (function(){})`), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "morning",
                    },
                    consequent: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "FunctionExpression",
                            id: null,
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
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"if(a)b;\"", () => {
        assert.match<Program>(parseScript(`if(a)b;`), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "a",
                    },
                    consequent: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"if (false) L: async function l() {}\"", () => {
        assert.match<Program>(parseScript(`if (false) L: async function l() {}`), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Literal",
                        value: false,
                    },
                    consequent: {
                        type: "LabeledStatement",
                        label: {
                            type: "Identifier",
                            name: "L",
                        },
                        body: {
                            type: "FunctionDeclaration",
                            id: {
                                type: "Identifier",
                                name: "l",
                            },
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                            },
                            generator: false,
                            expression: false,
                            async: true,
                        },
                    },
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"if(a)b;else c;\"", () => {
        assert.match<Program>(parseScript("if(a)b;else c;"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "a",
                    },
                    consequent: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                    alternate: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Identifier",
                            name: "c",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse if (morning) goodMorning()", () => {
        assert.match<Program>(parseScript("if (morning) goodMorning()"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "morning",
                    },
                    consequent: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "goodMorning",
                            },
                            arguments: [],
                        },
                    },
                    alternate: null,
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

    it("should parse if (morning) var x = 0;", () => {
        assert.match<Program>(parseScript("if (morning) var x = 0;"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "morning",
                    },
                    consequent: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    alternate: null,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse if (morning) function a(){}", () => {
        assert.match<Program>(parseScript("if (morning) function a(){}"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "morning",
                    },
                    consequent: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "a",
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

    it("should parse if (morning) goodMorning(); else goodDay()", () => {
        assert.match<Program>(parseScript("if (morning) goodMorning(); else goodDay()"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Identifier",
                        name: "morning",
                    },
                    consequent: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "goodMorning",
                            },
                            arguments: [],
                        },
                    },
                    alternate: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "goodDay",
                            },
                            arguments: [],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse if (morning) var x = 0;", () => {
        assert.match<Program>(parseScript(`if (true) that()\n; else;`), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Literal",
                        value: true,
                    },
                    consequent: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "that",
                            },
                            arguments: [],
                        },
                    },
                    alternate: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse if (true) that(); else;", () => {
        assert.match<Program>(parseScript("if (true) that(); else;"), {
            type: "Program",
            body: [
                {
                    type: "IfStatement",
                    test: {
                        type: "Literal",
                        value: true,
                    },
                    consequent: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "that",
                            },
                            arguments: [],
                        },
                    },
                    alternate: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
