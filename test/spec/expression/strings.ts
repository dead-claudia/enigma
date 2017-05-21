import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Strings", () => {
    it("should parse vertical tilde ES2009", () => {
        assert.match<Program>(parseScript("('\\\\\\'')"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "\\'",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"\"Hello012World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\012World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello\nWorld",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\122World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\122World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "HelloRWorld",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\0122World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\0122World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello\n2World",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\312World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\312World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "HelloÊWorld",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\712World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\712World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello92World",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\0World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\0World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello\u0000World",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\1World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\1World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello\u0001World",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"0\"", () => {
        assert.match<Program>(parseScript("('\\0')"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "\u0000",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.match<Program>(parseScript("('\\7a')"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "\u0007a",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("'"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("\""); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("(')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\8')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\9')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\x0')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("('\u2028')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("('\u2029')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("('\\u{2028')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; ('\\1')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; ('\\4')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; ('\\11')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("(')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; ('\\000')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("'use strict'; ('\\123')"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("(\"\\u{110000}\")"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.throws(SyntaxError, () => { parseScript("(\"\\u{FFFFFFF}\")"); });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.match<Program>(parseScript("('\\7a')"), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "\u0007a",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse vertical tilde ES2009", () => {
        assert.match<Program>(parseScript("\"\u2E2F;\""), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "ⸯ;",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse carrian letter ES2015", () => {
        assert.match<Program>(parseScript("\"\u{102A7};\""), {
            body: [
                {
                    expression: {
                        type: "Literal",
                        value: "𐊧;",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"\"Hello\"\"", () => {
        assert.match<Program>(parseScript("\"Hello\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse \"\n\r\t\v\b\f\\'\\\"\0\"", () => {
        assert.throws(() => {
            parseScript("\"\n\r\t\v\b\f\\'\\\"\0\"");
        });
    });

    it("should parse \"\"Hello\"\"", () => {
        assert.match<Program>(parseScript(`var source = '\u0061';`), {
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
                                type: "Literal",
                                value: "a",
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\x61\"", () => {
        assert.match<Program>(parseScript(`"\x61";`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "a",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\world\"", () => {
        assert.match<Program>(parseScript("\"Hello\
world\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Helloworld",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\02World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\02World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello\u0002World",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\012World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\012World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello\nWorld",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\122World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\122World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "HelloRWorld",
                        raw: "\"Hello\\122World\"",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\312World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\312World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "HelloÊWorld",
                        raw: "\"Hello\\312World\"",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\412World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\412World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello!2World",
                        raw: "\"Hello\\412World\"",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\712World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\712World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello92World",
                        raw: "\"Hello\\712World\"",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\0World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\0World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello\u0000World",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"Hello\\1World\"", () => {
        assert.match<Program>(parseScript("\"Hello\\1World\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "Hello\u0001World",
                        raw: "\"Hello\\1World\"",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse (x)", () => {
        assert.match<Program>(parseScript("('x')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "x",
                        raw: "'x'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse u{0000000000F8}", () => {
        assert.match<Program>(parseScript("('\\u{0000000000F8}')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "ø",
                        raw: "'\\u{0000000000F8}'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse u{10FFFF}", () => {
        assert.match<Program>(parseScript("('\\u{10FFFF}')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "􏿿",
                        raw: "'\\u{10FFFF}'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse u{0}", () => {
        assert.match<Program>(parseScript("('\\u{0}')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "\u0000",
                        raw: "'\\u{0}'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse u{00F8}", () => {
        assert.match<Program>(parseScript("('\\u{00F8}')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "ø",
                        raw: "'\\u{00F8}'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse u{00F8}", () => {
        assert.match<Program>(parseScript("('\\a')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "a", // a
                        raw: "'\\a'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse u{00F8}", () => {
        assert.match<Program>(parseScript("('\u202a')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "‪",
                        raw: "'‪'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse 7a", () => {
        assert.match<Program>(parseScript("('\\7a')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "\u0007a", // \u0007a
                        raw: "'\\7a'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \\\\\\", () => {
        assert.match<Program>(parseScript("('\\\\\\'')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "\\'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse 5111", () => {
        assert.match<Program>(parseScript("('\\5111')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: ")11",
                        raw: "'\\5111'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \\\\\\", () => {
        assert.match<Program>(parseScript("('\\2111')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "1",
                        raw: "'\\2111'",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse 11", () => {
        assert.match<Program>(parseScript("('\\11')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "\t",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse 111", () => {
        assert.match<Program>(parseScript("('\\111')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "I",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse 1111", () => {
        assert.match<Program>(parseScript("('\\1111')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "I1",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse 0", () => {
        assert.match<Program>(parseScript("('\\0')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "\u0000",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse use strict 0", () => {
        assert.match<Program>(parseScript("'use strict'; ('\\0')"), {
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
                        type: "Literal",
                        value: "\0",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse use strict \"\\0x\"", () => {
        assert.match<Program>(parseScript("'use strict'; ('\\0x')"), {
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
                        type: "Literal",
                        value: "\0x",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse 0", () => {
        assert.match<Program>(parseScript("('\\0')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "\u0000",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse r", () => {
        assert.match<Program>(parseScript("('\\\r')"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse (\"\\u{110000}\")", () => {
        assert.throws(() => {
            parseScript("(\"\\u{110000}\")");
        });
    });

    it("should not parse (\"\\u{FFFFFFF}\"", () => {
        assert.throws(() => {
            parseScript("(\"\\u{FFFFFFF}\")");
        });
    });

    it("should not parse \"u2029\"", () => {
        assert.throws(() => {
            parseScript("('\u2029')");
        });
    });

    it("should not parse \"u2028\"", () => {
        assert.throws(() => {
            parseScript("('\u2028')");
        });
    });

    it("should not parse \"u{2028\"", () => {
        assert.throws(() => {
            parseScript("('\\u{2028')");
        });
    });

    it("should not parse \"9\"\"", () => {
        assert.throws(() => {
            parseScript("('\\9')");
        });
    });

    it("should not parse invalid hex", () => {
        assert.throws(() => {
            parseScript("\\xFG");
        });
    });

    it("should not parse invalid escaped hex", () => {
        assert.throws(() => {
            parseScript("\\u00FG");
        });

        assert.throws(() => {
            parseScript("('\\u00FG')");
        });
    });

    it("should not parse \"8\"\"", () => {
        assert.throws(() => {
            parseScript("('\\8')");
        });
    });

    it("should not parse \"u\"\"", () => {
        assert.throws(() => {
            parseScript("('\\u')");
        });
    });

    it("should not parse \"x\"\"", () => {
        assert.throws(() => {
            parseScript("('\\x')");
        });
    });

    it("should not parse \"n\"\"", () => {
        assert.throws(() => {
            parseScript("('\n')");
        });
    });

    it("should not parse slash", () => {
        assert.throws(() => {
            parseScript("(')");
        });

        assert.throws(() => {
            parseScript("'");
        });
    });

    it("should not parse \"", () => {
        assert.throws(() => {
            parseScript("\"");
        });
    });

    it("should not parse \"u2E2F\"", () => {
        assert.throws(() => {
            parseScript("\u2E2F");
        });
    });
});
