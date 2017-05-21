import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `with`", () => {
    it("should parse \"with(1);\"", () => {
        assert.match<Program>(parseScript(`with(1);`), {
            body: [
                {
                    body: {
                        type: "EmptyStatement",
                    },
                    object: {
                        type: "Literal",
                        value: 1,
                    },
                    type: "WithStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"with (x) foo\"", () => {
        assert.match<Program>(parseScript(`with (x) foo`), {
            body: [
                {
                    body: {
                        expression: {
                            name: "foo",
                            type: "Identifier",
                        },
                        type: "ExpressionStatement",
                    },
                    object: {
                        name: "x",
                        type: "Identifier",
                    },
                    type: "WithStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"with (x) foo;\"", () => {
        assert.match<Program>(parseScript(`with (x) foo;`), {
            body: [
                {
                    body: {
                        expression: {
                            name: "foo",
                            type: "Identifier",
                        },
                        type: "ExpressionStatement",
                    },
                    object: {
                        name: "x",
                        type: "Identifier",
                    },
                    type: "WithStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"with (x) { foo = bar }\"", () => {
        assert.match<Program>(parseScript(`with (x) { foo = bar }`), {
            type: "Program",
            body: [
                {
                    type: "WithStatement",
                    object: {
                        type: "Identifier",
                        name: "x",
                    },
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "foo",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "bar",
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
