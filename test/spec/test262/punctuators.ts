import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Test262 - Punctuators", () => {
    it("should throw on \"\u003B;;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`\u003B;`); });
    });
    it("should throw on \"1\u002C2;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`1\u002C2;`); });
    });
    it("should throw on \"1\u002D2;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`1\u002D2;`); });
    });
    it("should throw on \"\u007B\u007D;\"\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`\u007B\u007D;"`); });
    });

    it("should parse \"1 & 2 | 3 ^ 4 && !5 || ~6;\"", () => {
        assert.match<Program>(parseScript(`1 & 2 | 3 ^ 4 && !5 || ~6;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "LogicalExpression",
                        operator: "||",
                        left: {
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "BinaryExpression",
                                operator: "|",
                                left: {
                                    type: "BinaryExpression",
                                    operator: "&",
                                    left: {
                                        type: "Literal",
                                        value: 1,
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 2,
                                    },
                                },
                                right: {
                                    type: "BinaryExpression",
                                    operator: "^",
                                    left: {
                                        type: "Literal",
                                        value: 3,
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 4,
                                    },
                                },
                            },
                            right: {
                                type: "UnaryExpression",
                                operator: "!",
                                argument: {
                                    type: "Literal",
                                    value: 5,
                                },
                                prefix: true,
                            },
                        },
                        right: {
                            type: "UnaryExpression",
                            operator: "~",
                            argument: {
                                type: "Literal",
                                value: 6,
                            },
                            prefix: true,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \" 1 < 2 > 3 <= 4 >= 5 == 6 != 7 === 8 !== 9;\"", () => {
        assert.match<Program>(parseScript(` 1 < 2 > 3 <= 4 >= 5 == 6 != 7 === 8 !== 9;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "!==",
                        left: {
                            type: "BinaryExpression",
                            operator: "===",
                            left: {
                                type: "BinaryExpression",
                                operator: "!=",
                                left: {
                                    type: "BinaryExpression",
                                    operator: "==",
                                    left: {
                                        type: "BinaryExpression",
                                        operator: ">=",
                                        left: {
                                            type: "BinaryExpression",
                                            operator: "<=",
                                            left: {
                                                type: "BinaryExpression",
                                                operator: ">",
                                                left: {
                                                    type: "BinaryExpression",
                                                    operator: "<",
                                                    left: {
                                                        type: "Literal",
                                                        value: 1,
                                                    },
                                                    right: {
                                                        type: "Literal",
                                                        value: 2,
                                                    },
                                                },
                                                right: {
                                                    type: "Literal",
                                                    value: 3,
                                                },
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 4,
                                            },
                                        },
                                        right: {
                                            type: "Literal",
                                            value: 5,
                                        },
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 6,
                                    },
                                },
                                right: {
                                    type: "Literal",
                                    value: 7,
                                },
                            },
                            right: {
                                type: "Literal",
                                value: 8,
                            },
                        },
                        right: {
                            type: "Literal",
                            value: 9,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"1 + 2 - 3 * 4 % 5 / 6 << 7 >> 8 >>> 9;\"", () => {
        assert.match<Program>(parseScript(`1 + 2 - 3 * 4 % 5 / 6 << 7 >> 8 >>> 9;`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: ">>>",
                        left: {
                            type: "BinaryExpression",
                            operator: ">>",
                            left: {
                                type: "BinaryExpression",
                                operator: "<<",
                                left: {
                                    type: "BinaryExpression",
                                    operator: "-",
                                    left: {
                                        type: "BinaryExpression",
                                        operator: "+",
                                        left: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                        right: {
                                            type: "Literal",
                                            value: 2,
                                        },
                                    },
                                    right: {
                                        type: "BinaryExpression",
                                        operator: "/",
                                        left: {
                                            type: "BinaryExpression",
                                            operator: "%",
                                            left: {
                                                type: "BinaryExpression",
                                                operator: "*",
                                                left: {
                                                    type: "Literal",
                                                    value: 3,
                                                },
                                                right: {
                                                    type: "Literal",
                                                    value: 4,
                                                },
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 5,
                                            },
                                        },
                                        right: {
                                            type: "Literal",
                                            value: 6,
                                        },
                                    },
                                },
                                right: {
                                    type: "Literal",
                                    value: 7,
                                },
                            },
                            right: {
                                type: "Literal",
                                value: 8,
                            },
                        },
                        right: {
                            type: "Literal",
                            value: 9,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"({});[];\"", () => {
        assert.match<Program>(parseScript(`({});[];`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [],
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrayExpression",
                        elements: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \" this.nan %= 6; this.nan <<= 7; this.nan >>= 8; this.nan >>>= 9;\"", () => {
        assert.match<Program>(
            parseScript(` this.nan %= 6; this.nan <<= 7; this.nan >>= 8; this.nan >>>= 9;`),
            {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "%=",
                            left: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "ThisExpression",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "nan",
                                },
                            },
                            right: {
                                type: "Literal",
                                value: 6,
                            },
                        },
                    },
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "<<=",
                            left: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "ThisExpression",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "nan",
                                },
                            },
                            right: {
                                type: "Literal",
                                value: 7,
                            },
                        },
                    },
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: ">>=",
                            left: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "ThisExpression",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "nan",
                                },
                            },
                            right: {
                                type: "Literal",
                                value: 8,
                            },
                        },
                    },
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: ">>>=",
                            left: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "ThisExpression",
                                },
                                property: {
                                    type: "Identifier",
                                    name: "nan",
                                },
                            },
                            right: {
                                type: "Literal",
                                value: 9,
                            },
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });
});
