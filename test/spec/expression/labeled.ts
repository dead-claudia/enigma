import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Labeled", () => {

    it("should parse \"a:{break a;}", () => {
        expect(parseScript("a:{break a;}")).to.eql({
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

    it("should parse \"start: while (true) break start", () => {
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

    it("should parse \"__proto__: test", () => {
        expect(parseScript("__proto__: test")).to.eql({
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

    it("should parse \"start: for (;;) break start", () => {
        expect(parseScript("start: for (;;) break start")).to.eql({
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
});
