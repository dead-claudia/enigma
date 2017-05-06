import { parseScript } from "../../../src";
import { expect } from "chai";
import { Expression } from "../../../src/estree";

describe.skip("Expressions - Tagged Templates", () => {
    context("identifier tag", () => {
        test("tag", {
            type: "Identifier",
            name: "tag",
        });
    });

    context("call expression tag", () => {
        test("tag()", {
            type: "CallExpression",
            callee: {
                type: "Identifier",
                name: "tag",
            },
            arguments: [],
        });
    });
});

function test(src: string, node: Expression) {
    it("should parse escaped backslash", () => {
        expect(parseScript("(" + src + " `\\\\\\'`)")).to.eql({
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse `Hello012World`", () => {
        expect(parseScript(src + "`Hello\\012World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\122World`", () => {
        expect(parseScript(src + "`Hello\\122World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\0122World`", () => {
        expect(parseScript(src + "`Hello\\0122World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\312World`", () => {
        expect(parseScript(src + "`Hello\\312World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\412World`", () => {
        expect(parseScript(src + "`Hello\\412World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\712World`", () => {
        expect(parseScript(src + "`Hello\\712World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\0World`", () => {
        expect(parseScript(src + "`Hello\\0World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\1World`", () => {
        expect(parseScript(src + "`Hello\\1World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\0`", () => {
        expect(parseScript("(" + src + "`\\0`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\7a`", () => {
        expect(parseScript("(" + src + "`\\7a`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse unmatched single `", () => {
        expect(() => parseScript(src + "`")).to.throw();
    });

    it("should not parse parenthesized unmatched single `", () => {
        expect(() => parseScript("(" + src + "`)")).to.throw();
    });

    it("should parse `\\8`", () => {
        expect(parseScript("(" + src + "`\\8`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse `\\9`", () => {
        expect(() => parseScript("(" + src + "`\\9`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\x0`", () => {
        expect(parseScript("(" + src + "`\\x0`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined",
                                        raw: "\\x0",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\u2028`", () => {
        expect(parseScript("(" + src + "`\u2028`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\u2029`", () => {
        expect(parseScript("(" + src + "`\u2029`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{2028`", () => {
        expect(parseScript("(" + src + "`\\u{2028`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined",
                                        raw: "\\u{2028",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse strict `\\1`", () => {
        expect(parseScript("'use strict'; (" + src + "`\\1`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined",
                                        raw: "\\1",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse strict `\\4`", () => {
        expect(parseScript("'use strict'; (" + src + "`\\4`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined",
                                        raw: "\\4",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse strict `\\11`", () => {
        expect(parseScript("'use strict'; (" + src + "`\\11`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined1",
                                        raw: "\\11",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse strict `\\000`", () => {
        expect(parseScript("'use strict'; (" + src + "`\\000`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined0",
                                        raw: "\\000",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse strict `\\123`", () => {
        expect(parseScript("'use strict'; (" + src + "`\\123`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined23",
                                        raw: "\\123",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{110000}`", () => {
        expect(parseScript("(" + src + "`\\u{110000}`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined}",
                                        raw: "\\u{110000}",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{FFFFFFF}`", () => {
        expect(parseScript("(" + src + "`\\u{FFFFFFF}`)")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined}",
                                        raw: "\\u{FFFFFFF}",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse Unicode escape", () => {
        expect(parseScript(src + "`\u2E2F;`")).to.eql({
            body: [
                {

                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse carrian letter ES2015", () => {
        expect(parseScript(src + "`\u{102A7};`")).to.eql({
            body: [
                {
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse `Hello`", () => {
        expect(parseScript(src + "`Hello`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\n\r\t\v\b\f\\'\\\"\0`", () => {
        expect(parseScript(src + "`\n\r\t\v\b\f\\'\\\"\0`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u0061`", () => {
        expect(parseScript("var source = " + src + "`\\u0061`;")).to.eql({
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
        expect(parseScript(src + "`\\x61`;")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\02World`", () => {
        expect(parseScript(src + "`Hello\\02World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `Hello\\0World`", () => {
        expect(parseScript(src + "`Hello\\0World`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `x`", () => {
        expect(parseScript("(" + src + "`x`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{0000000000F8}`", () => {
        expect(parseScript("(" + src + "`\\u{0000000000F8}`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{10FFFF}`", () => {
        expect(parseScript("(" + src + "`\\u{10FFFF}`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u{0}`", () => {
        expect(parseScript("(" + src + "`\\u{0}`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\u{00F8}`", () => {
        expect(parseScript("(" + src + "`\\u{00F8}`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\a`", () => {
        expect(parseScript("(" + src + "`\\a`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\u202a`", () => {
        expect(parseScript("(" + src + "`\u202a`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\\\\\``", () => {
        expect(parseScript("(" + src + "`\\\\\\``)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\5111`", () => {
        expect(parseScript("(" + src + "`\\5111`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\2111`", () => {
        expect(parseScript("(" + src + "`\\2111`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\11`", () => {
        expect(parseScript("(" + src + "`\\11`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\111`", () => {
        expect(parseScript("(" + src + "`\\111`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\1111`", () => {
        expect(parseScript("(" + src + "`\\1111`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse strict `\\0`", () => {
        expect(parseScript("'use strict'; (" + src + "`\\0`)")).to.eql({
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
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse use strict 0x", () => {
        expect(parseScript("'use strict'; (" + src + "`\\0x`)")).to.eql({
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
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse `\\<CR>`", () => {
        expect(parseScript("(" + src + "`\\\r`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse `\\9`", () => {
        expect(parseScript("(`\\9`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined",
                                        raw: "\\9",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse invalid hex", () => {
        expect(parseScript("`\\xFG`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefinedG",
                                        raw: "\\xFG",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse invalid unicode hex", () => {
        expect(parseScript("`\\u00FG`")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefinedG",
                                        raw: "\\u00FG",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("expect `\\u` to throw", () => {
        expect(parseScript("(`\\u`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined",
                                        raw: "\\u",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("expect `\\x` to throw", () => {
        expect(parseScript("(`\\x`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\\undefined",
                                        raw: "\\x",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("expect `\\n` to throw", () => {
        expect(parseScript("(`\n`)")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "TaggedTemplateExpression",
                        tag: node,
                        quasi: {
                            type: "TemplateLiteral",
                            expressions: [],
                            quasis: [
                                {
                                    type: "TemplateElement",
                                    value: {
                                        cooked: "\n",
                                        raw: "\n",
                                    },
                                    tail: true,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
}
