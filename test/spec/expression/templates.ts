import { parseScript } from "../../../src";
import { expect } from "chai";

describe.skip("Expressions - Templates", () => {
    it("should parse escaped backslash", () => {
        expect(parseScript("(`\\\\\\'`)")).to.eql({
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
        expect(parseScript("`Hello\\012World`")).to.eql({
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
        expect(parseScript("`Hello\\122World`")).to.eql({
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
        expect(parseScript("`Hello\\0122World`")).to.eql({
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
        expect(parseScript("`Hello\\312World`")).to.eql({
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
        expect(parseScript("`Hello\\412World`")).to.eql({
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
        expect(parseScript("`Hello\\712World`")).to.eql({
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
        expect(parseScript("`Hello\\0World`")).to.eql({
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
        expect(parseScript("`Hello\\1World`")).to.eql({
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
        expect(parseScript("(`\\0`)")).to.eql({
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
        expect(parseScript("(`\\7a`)")).to.eql({
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
        expect(() => parseScript("`")).to.throw();
    });

    it("should not parse parenthesized unmatched single `", () => {
        expect(() => parseScript("(`)")).to.throw();
    });

    it("should parse `\\8`", () => {
        expect(parseScript("(`\\8`)")).to.eql({
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
        expect(() => parseScript("(`\\9`)")).to.eql({
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
                                    cooked: "9",
                                    raw: "\\9",
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

    it("should parse `\\x0`", () => {
        expect(() => parseScript("(`\\x0`)")).to.throw();
    });

    it("should parse `\u2028`", () => {
        expect(parseScript("(`\u2028`)")).to.eql({
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
        expect(parseScript("(`\u2029`)")).to.eql({
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
        expect(() => parseScript("(`\\u{2028`)")).to.throw();
    });

    it("should parse strict `\\1`", () => {
        expect(() => parseScript("'use strict'; (`\\1`)")).to.throw();
    });

    it("should parse strict `\\4`", () => {
        expect(() => parseScript("'use strict'; (`\\4`)")).to.throw();
    });

    it("should parse strict `\\11`", () => {
        expect(() => parseScript("'use strict'; (`\\11`)")).to.throw();
    });

    it("should parse strict `\\000`", () => {
        expect(() => parseScript("'use strict'; (`\\000`)")).to.throw();
    });

    it("should parse strict `\\123`", () => {
        expect(() => parseScript("'use strict'; (`\\123`)")).to.throw();
    });

    it("should parse `\\u{110000}`", () => {
        expect(() => parseScript("(`\\u{110000}`)")).to.throw();
    });

    it("should parse `\\u{FFFFFFF}`", () => {
        expect(() => parseScript("(`\\u{FFFFFFF}`)")).to.throw();
    });

    it("should parse Unicode escape", () => {
        expect(parseScript("`\u2E2F;`")).to.eql({
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
        expect(parseScript("`\u{102A7};`")).to.eql({
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
        expect(parseScript("`Hello`")).to.eql({
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
        expect(parseScript("`\n\r\t\v\b\f\\'\\\"\0`")).to.eql({
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
        expect(parseScript("var source = `\\u0061`;")).to.eql({
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
        expect(parseScript("`\\x61`;")).to.eql({
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
        expect(parseScript("`Hello\\02World`")).to.eql({
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
        expect(parseScript("`Hello\\0World`")).to.eql({
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
        expect(parseScript("(`x`)")).to.eql({
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
        expect(parseScript("(`\\u{0000000000F8}`)")).to.eql({
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
        expect(parseScript("(`\\u{10FFFF}`)")).to.eql({
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
        expect(parseScript("(`\\u{0}`)")).to.eql({
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
        expect(parseScript("(`\\u{00F8}`)")).to.eql({
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
        expect(parseScript("(`\\a`)")).to.eql({
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
        expect(parseScript("(`\u202a`)")).to.eql({
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
        expect(parseScript("(`\\\\\\``)")).to.eql({
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
        expect(parseScript("(`\\5111`)")).to.eql({
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
        expect(parseScript("(`\\2111`)")).to.eql({
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
        expect(parseScript("(`\\11`)")).to.eql({
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
        expect(parseScript("(`\\111`)")).to.eql({
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
        expect(parseScript("(`\\1111`)")).to.eql({
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
        expect(parseScript("'use strict'; (`\\0`)")).to.eql({
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
        expect(parseScript("'use strict'; (`\\0x`)")).to.eql({
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
        expect(parseScript("(`\\\r`)")).to.eql({
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
        expect(() => parseScript("('\u2029')")).to.throw();
    });

    it("expect \"u2028\" to throw", () => {
        expect(() => parseScript("('\u2028')")).to.throw();
    });

    it("expect \"u{2028\" to throw", () => {
        expect(() => parseScript("('\\u{2028')")).to.throw();
    });

    it("expect \"9\"\" to throw", () => {
        expect(() => parseScript("('\\9')")).to.throw();
    });

    it("expect invalid hex to throw", () => {
        expect(() => parseScript("\\xFG")).to.throw();
    });

    it("expect invalid escaped hex to throw", () => {
        expect(() => parseScript("\\u00FG")).to.throw();
        expect(() => parseScript("('\\u00FG')")).to.throw();
    });

    it("expect \"8\"\" to throw", () => {
        expect(() => parseScript("('\\8')")).to.throw();
    });

    it("expect \"u\"\" to throw", () => {
        expect(() => parseScript("('\\u')")).to.throw();
    });

    it("expect \"x\"\" to throw", () => {
        expect(() => parseScript("('\\x')")).to.throw();
    });

    it("expect \"n\"\" to throw", () => {
        expect(() => parseScript("('\n')")).to.throw();
    });

    it("expect slash to throw", () => {
        expect(() => parseScript("(')")).to.throw();
        expect(() => parseScript("'")).to.throw();
    });

    it("expect \" to throw", () => {
        expect(() => parseScript("\"")).to.throw();
    });

    it("expect \"u2E2F\" to throw", () => {
        expect(() => parseScript("\u2E2F")).to.throw();
    });
});
