import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `do ... while`", () => {

    it("should parse \"while ( \"\" );\"", () => {
        expect(parseScript(`while ( "" );`)).to.eql({
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
        expect(parseScript(`do continue; while(1);`)).to.eql({
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
        expect(parseScript(`do label1: label2: function f() {} while (false)`)).to.eql({
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
        expect(parseScript(`do continue; while(1);`)).to.eql({
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
        expect(parseScript(`do {} while (true)`)).to.eql({
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
        expect(parseScript(`{do ; while(false); false}`)).to.eql({
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
        expect(parseScript(`{do ; while(false) false}`)).to.eql({
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
        expect(parseScript(`do ; while (true)`)).to.eql({
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
        expect(() => { parseScript(`do break; while false;`); }).to.throw();
    });

    it("should parse \"do const x = null; while (false)\"", () => {
        expect(() => { parseScript(`do const x = null; while (false)`); }).to.throw();
    });

    it("should parse \"do function* g() {} while (false)\"", () => {
        expect(() => { parseScript(`do function* g() {} while (false)`); }).to.throw();
    });

    it("should parse \"do break; while false;\"", () => {
        expect(() => { parseScript(`do break; while false;`); }).to.throw();
    });
});
