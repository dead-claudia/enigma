import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Test262 - Line Terminators", () => {
    it("should parse \"/*\u2028 multi line \u2028 comment \u2028 x = 1;*/\"", () => {
        assert.match<Program>(parseScript(`/*\u2028 multi line \u2028 comment \u2028 x = 1;*/`), {
            type: "Program",
            sourceType: "script",
            body: [],
        });
    });

    it("should parse \"\u2029var\u2029x\u2029=\u2029y\u2029%\u2029z\u2029; result = x;\"", () => {
        assert.match<Program>(
            parseScript(`\u2029var\u2029x\u2029=\u2029y\u2029%\u2029z\u2029; result = x;`),
            {
                body: [
                    {
                        declarations: [
                            {
                                id: {
                                    name: "x",
                                    type: "Identifier",
                                },
                                init: {
                                    left: {
                                        name: "y",
                                        type: "Identifier",
                                    },
                                    operator: "%",
                                    right: {
                                        name: "z",
                                        type: "Identifier",
                                    },
                                    type: "BinaryExpression",
                                },
                                type: "VariableDeclarator",
                            },
                        ],
                        kind: "var",
                        type: "VariableDeclaration",
                    },
                    {
                        expression: {
                            left: {
                                name: "result",
                                type: "Identifier",
                            },
                            operator: "=",
                            right: {
                                name: "x",
                                type: "Identifier",
                            },
                            type: "AssignmentExpression",
                        },
                        type: "ExpressionStatement",
                    },
                ],
                sourceType: "script",
                type: "Program",
            },
        );
    });

    it("should throw on \"var\u2028x;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`var\u2028x;`); });
    });

    it("should throw on \"var\\nx\\n=\\ny\\n<\\nz\\n; x === true\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var\\nx\\n=\\ny\\n<\\nz\\n; x === true`);
        });
    });
});
