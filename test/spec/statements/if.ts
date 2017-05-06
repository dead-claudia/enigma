import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `if`", () => {

    it("should parse \"if (true) const x = null; else ;\"", () => {
        expect(() => { parseScript(`if (true) const x = null; else ;`); }).to.throw();
    });

    it("should parse \"if (false) label1: label2: function test262() {} else ;\"", () => {
        expect(() => { parseScript(`if (false) label1: label2: function test262() {} else ;`); })
        .to.throw();
    });

    it("should parse \"if (true) let x;\"", () => {
        expect(() => { parseScript(`if (true) let x;`); }).to.throw();
    });

    it("should parse \"if (true) class C {}\"", () => {
        expect(() => { parseScript(`if (true) class C {}`); }).to.throw();
    });

    it("should parse \"if (true) class C {} else class D {}\"", () => {
        expect(() => { parseScript(`if (true) class C {} else class D {}`); }).to.throw();
    });

    it("should parse \"if (morning) (function(){})\"", () => {
        expect(parseScript(`if (morning) (function(){})`)).to.eql({
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
        expect(parseScript(`if(a)b;`)).to.eql({
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
        expect(parseScript(`if (false) L: async function l() {}`)).to.eql({
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
        expect(parseScript("if(a)b;else c;")).to.eql({
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
        expect(parseScript("if (morning) goodMorning()")).to.eql({
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
        expect(parseScript("start: while (true) break start")).to.eql({
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
        expect(parseScript("if (morning) var x = 0;")).to.eql({
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
        expect(parseScript("if (morning) function a(){}")).to.eql({
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
        expect(parseScript("if (morning) goodMorning(); else goodDay()")).to.eql({
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
        expect(parseScript(`if (true) that()
        ; else;`)).to.eql({
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
        expect(parseScript("if (true) that(); else;")).to.eql({
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
