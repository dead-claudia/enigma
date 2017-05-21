import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - `new`", () => {
    it("should parse \"new a(b,c)\"", () => {
        assert.match<Program>(parseScript("new a(b,c)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "a",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "b",
                            },
                            {
                                type: "Identifier",
                                name: "c",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"new Button\"", () => {
        assert.match<Program>(parseScript("new Button"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "Button",
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"new Button()\"", () => {
        assert.match<Program>(parseScript("new Button()"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "Button",
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"new Button(a)\"", () => {
        assert.match<Program>(parseScript("new Button(a)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "Button",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse new new foo\"", () => {
        assert.match<Program>(parseScript("new new foo"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "NewExpression",
                            callee: {
                                type: "Identifier",
                                name: "foo",
                            },
                            arguments: [],
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"new new foo()\"", () => {
        assert.match<Program>(parseScript("new new foo()"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "NewExpression",
                            callee: {
                                type: "Identifier",
                                name: "foo",
                            },
                            arguments: [],
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"new f(...a)\"", () => {
        assert.match<Program>(parseScript("new f(...a)"), {
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

    it("should parse \"new f(...a = b)\"", () => {
        assert.match<Program>(parseScript("new f(...a = b)"), {
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
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "b",
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
