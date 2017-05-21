import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Templates", () => {
    it("should parse escaped backslash", () => {
        assert.match<Program>(parseScript("(`\\\\\\'`)"), {
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\\'",
                                    raw: "\\\\\\'",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse `Hello012World`", () => {
        assert.match<Program>(parseScript("`Hello\\012World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello\nWorld",
                                    raw: "Hello\\012World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\122World`", () => {
        assert.match<Program>(parseScript("`Hello\\122World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "HelloRWorld",
                                    raw: "Hello\\122World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\0122World`", () => {
        assert.match<Program>(parseScript("`Hello\\0122World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello\n2World",
                                    raw: "Hello\\0122World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\312World`", () => {
        assert.match<Program>(parseScript("`Hello\\312World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "HelloÊWorld",
                                    raw: "Hello\\312World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\412World`", () => {
        assert.match<Program>(parseScript("`Hello\\412World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello!2World",
                                    raw: "Hello\\412World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\712World`", () => {
        assert.match<Program>(parseScript("`Hello\\712World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello92World",
                                    raw: "Hello\\712World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\0World`", () => {
        assert.match<Program>(parseScript("`Hello\\0World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello\u0000World",
                                    raw: "Hello\\0World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\1World`", () => {
        assert.match<Program>(parseScript("`Hello\\1World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello\x01World",
                                    raw: "Hello\\1World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\0`", () => {
        assert.match<Program>(parseScript("(`\\0`)"), {
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\0",
                                    raw: "\\0",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\7a`", () => {
        assert.match<Program>(parseScript("(`\\7a`)"), {
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\x7a",
                                    raw: "\\7a",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse unmatched single `", () => {
        assert.throws(SyntaxError, () => { parseScript("`"); });
    });

    it("should not parse parenthesized unmatched single `", () => {
        assert.throws(SyntaxError, () => { parseScript("(`)"); });
    });

    it("should parse `\\8`", () => {
        assert.match<Program>(parseScript("(`\\8`)"), {
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "8",
                                    raw: "\\8",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse `\\9`", () => {
        assert.throws(SyntaxError, () => { parseScript("(`\\9`)"); });
    });

    it("should parse `\\x0`", () => {
        assert.throws(SyntaxError, () => { parseScript("(`\\x0`)"); });
    });

    it("should parse `\u2028`", () => {
        assert.match<Program>(parseScript("(`\u2028`)"), {
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\u2028",
                                    raw: "\u2028",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\u2029`", () => {
        assert.match<Program>(parseScript("(`\u2029`)"), {
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\u2029",
                                    raw: "\u2029",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{2028`", () => {
        assert.throws(SyntaxError, () => { parseScript("(`\\u{2028`)"); });
    });

    it("should parse strict `\\1`", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; (`\\1`)"); });
    });

    it("should parse strict `\\4`", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; (`\\4`)"); });
    });

    it("should parse strict `\\11`", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; (`\\11`)"); });
    });

    it("should parse strict `\\000`", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; (`\\000`)"); });
    });

    it("should parse strict `\\123`", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; (`\\123`)"); });
    });

    it("should parse `\\u{110000}`", () => {
        assert.throws(SyntaxError, () => { parseScript("(`\\u{110000}`)"); });
    });

    it("should parse `\\u{FFFFFFF}`", () => {
        assert.throws(SyntaxError, () => { parseScript("(`\\u{FFFFFFF}`)"); });
    });

    it("should parse Unicode escape", () => {
        assert.match<Program>(parseScript("`\u2E2F;`"), {
            body: [
                {

                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "ⸯ;",
                                    raw: "\u2E2F;",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse carrian letter ES2015", () => {
        assert.match<Program>(parseScript("`\u{102A7};`"), {
            body: [
                {
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "𐊧;",
                                    raw: "\u{102A7};",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse `Hello`", () => {
        assert.match<Program>(parseScript("`Hello`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello",
                                    raw: "Hello",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\n\r\t\v\b\f\\'\\\"\0`", () => {
        assert.match<Program>(parseScript("`\n\r\t\v\b\f\\'\\\"\0`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\n\r\t\v\b\f\'\"\0",
                                    raw: "\n\r\t\v\b\f\\\'\"\0",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u0061`", () => {
        assert.match<Program>(parseScript("var source = `\\u0061`;"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "source",
                            },
                            init: {
                                type: "TemplateLiteral",
                                expressions: [],
                                quasis: [
                                    {
                                        type: "TemplateElement",
                                        value: {
                                            cooked: "a",
                                            raw: "\\u0061",
                                        },
                                        tail: true,
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\x61`", () => {
        assert.match<Program>(parseScript("`\\x61`;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "a",
                                    raw: "\\x61",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\02World`", () => {
        assert.match<Program>(parseScript("`Hello\\02World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello\u0002World",
                                    raw: "Hello\\02World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\0World`", () => {
        assert.match<Program>(parseScript("`Hello\\0World`"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "Hello\0World",
                                    raw: "Hello\\0World",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `x`", () => {
        assert.match<Program>(parseScript("(`x`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "x",
                                    raw: "x",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{0000000000F8}`", () => {
        assert.match<Program>(parseScript("(`\\u{0000000000F8}`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "ø",
                                    raw: "u{0000000000F8}",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{10FFFF}`", () => {
        assert.match<Program>(parseScript("(`\\u{10FFFF}`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\u{10FFFF}",
                                    raw: "\\u{10FFFF}",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{0}`", () => {
        assert.match<Program>(parseScript("(`\\u{0}`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\0",
                                    raw: "\\u{0}",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\u{00F8}`", () => {
        assert.match<Program>(parseScript("(`\\u{00F8}`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "ø",
                                    raw: "\\u{00F8}",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\a`", () => {
        assert.match<Program>(parseScript("(`\\a`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "a",
                                    raw: "\\a",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u202a`", () => {
        assert.match<Program>(parseScript("(`\u202a`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\u202a",
                                    raw: "\\u202a",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\\\\\``", () => {
        assert.match<Program>(parseScript("(`\\\\\\``)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\\`",
                                    raw: "\\\\\\`",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\5111`", () => {
        assert.match<Program>(parseScript("(`\\5111`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: ")11",
                                    raw: "\\5111",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\2111`", () => {
        assert.match<Program>(parseScript("(`\\2111`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "1",
                                    raw: "\\2111",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\11`", () => {
        assert.match<Program>(parseScript("(`\\11`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\t",
                                    raw: "\\11",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\111`", () => {
        assert.match<Program>(parseScript("(`\\111`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "I",
                                    raw: "\\111",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\1111`", () => {
        assert.match<Program>(parseScript("(`\\1111`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "I1",
                                    raw: "\\1111",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse strict `\\0`", () => {
        assert.match<Program>(parseScript("'use strict'; (`\\0`)"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "use strict",
                    },
                    type: "ExpressionStatement",
                },
                {
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\0",
                                    raw: "\\0",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse use strict 0x", () => {
        assert.match<Program>(parseScript("'use strict'; (`\\0x`)"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "use strict",
                    },
                    type: "ExpressionStatement",
                },
                {
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "\0x",
                                    raw: "\\0x",
                                },
                                tail: true,
                            },
                        ],
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse `\\<CR>`", () => {
        assert.match<Program>(parseScript("(`\\\r`)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TemplateLiteral",
                        expressions: [],
                        quasis: [
                            {
                                type: "TemplateElement",
                                value: {
                                    cooked: "",
                                    raw: "\\\r",
                                },
                                tail: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("expect \"u2029\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("('\u2029')"); });
    });

    it("expect \"u2028\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("('\u2028')"); });
    });

    it("expect \"u{2028\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\u{2028')"); });
    });

    it("expect \"9\"\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\9')"); });
    });

    it("expect invalid hex to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("\\xFG"); });
    });

    it("expect invalid escaped hex to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("\\u00FG"); });
        assert.throws(SyntaxError, () => { parseScript("('\\u00FG')"); });
    });

    it("expect \"8\"\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\8')"); });
    });

    it("expect \"u\"\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\u')"); });
    });

    it("expect \"x\"\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\x')"); });
    });

    it("expect \"n\"\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("('\n')"); });
    });

    it("expect slash to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("(')"); });
        assert.throws(SyntaxError, () => { parseScript("'"); });
    });

    it("expect \" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("\""); });
    });

    it("expect \"u2E2F\" to throw", () => {
        assert.throws(SyntaxError, () => { parseScript("\u2E2F"); });
    });
});
