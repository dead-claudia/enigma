import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("Test262 - Punctuators", () => {
    it("should throw on \"\u003B;;\"", () => {
        expect(() => { parseScript(`\u003B;`); }).throw();
    });
    it("should throw on \"1\u002C2;\"", () => {
        expect(() => { parseScript(`1\u002C2;`); }).throw();
    });
    it("should throw on \"1\u002D2;\"", () => {
        expect(() => { parseScript(`1\u002D2;`); }).throw();
    });
    it("should throw on \"\u007B\u007D;\"\"", () => {
        expect(() => { parseScript(`\u007B\u007D;"`); }).throw();
    });

    it("should parse \"1 & 2 | 3 ^ 4 && !5 || ~6;\"", () => {
        expect(parseScript(`1 & 2 | 3 ^ 4 && !5 || ~6;`)).to.eql({
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
        expect(parseScript(` 1 < 2 > 3 <= 4 >= 5 == 6 != 7 === 8 !== 9;`)).to.eql({
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
        expect(parseScript(`1 + 2 - 3 * 4 % 5 / 6 << 7 >> 8 >>> 9;`)).to.eql({
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
        expect(parseScript(`({});[];`)).to.eql({
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
        expect(parseScript(` this.nan %= 6; this.nan <<= 7; this.nan >>= 8; this.nan >>>= 9;`))
        .to.eql({
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
        });
    });
});
