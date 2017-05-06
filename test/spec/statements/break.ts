import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `break`", () => {

    it("should throw on \"if(0) break\"", () => {
        expect(() => { parseScript("if(0) break\""); }).to.throw();
    });

    it("should parse while (true) { break }", () => {
        expect(parseScript("while (true) { break }")).to.eql({
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
        expect(parseScript("done: while (true) { break done }")).to.eql({
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
        expect(parseScript("done: while (true) { break done; }")).to.eql({
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
        expect(parseScript("__proto__: while (true) { break __proto__; }")).to.eql({
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
        expect(parseScript(`while (true) {
    if (x) break
    ;
    else y;
}`)).to.eql({
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
