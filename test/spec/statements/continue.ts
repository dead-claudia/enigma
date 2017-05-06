import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `continue`", () => {

    it("should parse \"while (true) { continue }\"", () => {
        expect(parseScript("while (true) { continue }")).to.eql({
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
        expect(parseScript("done: while (true) { continue done }")).to.eql({
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
        expect(parseScript("__proto__: while (true) { continue __proto__; }")).to.eql({
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
        expect(parseScript("a: do continue a; while(1);")).to.eql({
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
        expect(parseScript("a: while (0) { continue \n b; }")).to.eql({
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
        expect(parseScript("a: while (0) { continue \r b; }")).to.eql({
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
        expect(parseScript("a: while (0) { continue /*\r*/ b; }")).to.eql({
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
        expect(parseScript("a: while (0) { continue /*\u2029*/ b; }")).to.eql({
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
        expect(parseScript("done: while (true) { continue done; }")).to.eql({
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
        expect(parseScript("while (true) { continue; }")).to.eql({
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
