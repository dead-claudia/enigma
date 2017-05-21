import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - Spread elements", () => {

    it("should call spread first", () => {
        assert.match<Program>(parseScript("f(...x, y, z);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should call multi spread", () => {
        assert.match<Program>(parseScript("f(...x, ...y, ...z);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "z",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should call spread default", () => {
        assert.match<Program>(parseScript("f(g, ...h = i);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "g",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "h",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "i",
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

    it("should call spread", () => {
        assert.match<Program>(parseScript("f(...g);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "g",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle new spread default", () => {
        assert.match<Program>(parseScript("new f(g, ...h = i);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "g",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "h",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "i",
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

    it("should handle new spread first", () => {
        assert.match<Program>(parseScript("new f(...x, y, z);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle new spread number", () => {
        assert.match<Program>(parseScript("new f(....5);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Literal",
                                    value: 0.5,
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle call spread", () => {
        assert.match<Program>(parseScript("f(...g);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "g",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle new multi spread", () => {
        assert.match<Program>(parseScript("new f(...x, ...y, ...z);"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "z",
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
