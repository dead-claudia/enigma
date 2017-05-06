import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Strings", () => {

    it("should parse vertical tilde ES2009", () => {
        expect(parseScript("('\\\\\\'')")).to.eql({
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
        expect(parseScript("\"Hello\\012World\"")).to.eql({
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
        expect(parseScript("\"Hello\\122World\"")).to.eql({
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
        expect(parseScript("\"Hello\\0122World\"")).to.eql({
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
        expect(parseScript("\"Hello\\312World\"")).to.eql({
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
        expect(parseScript("\"Hello\\712World\"")).to.eql({
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
        expect(parseScript("\"Hello\\0World\"")).to.eql({
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
        expect(parseScript("\"Hello\\1World\"")).to.eql({
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
        expect(parseScript("('\\0')")).to.eql({
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
        expect(parseScript("('\\7a')")).to.eql({
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
        expect(() => { parseScript("'"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("\""); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("(')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("('\\8')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("('\\9')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("('\\x0')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("('\u2028')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("('\u2029')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("('\\u{2028')"); }).to.throw();
    });
    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("'use strict'; ('\\1')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("'use strict'; ('\\4')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("'use strict'; ('\\11')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("(')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("'use strict'; ('\\000')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("'use strict'; ('\\123')"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("(\"\\u{110000}\")"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(() => { parseScript("(\"\\u{FFFFFFF}\")"); }).to.throw();
    });

    it("should parse vertical tilde ES2009", () => {
        expect(parseScript("('\\7a')")).to.eql({
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
        expect(parseScript("\"\u2E2F;\"")).to.eql({
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
        expect(parseScript("\"\u{102A7};\"")).to.eql({
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
        expect(parseScript("\"Hello\"")).to.eql({
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

    it("expect \"\n\r\t\v\b\f\\'\\\"\0\" to throw", () => {
        expect(() => {
            parseScript("\"\n\r\t\v\b\f\\'\\\"\0\"");
        }).to.throw();
    });

    it("should parse \"\"Hello\"\"", () => {
        expect(parseScript(`var source = '\u0061';`)).to.eql({
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
        expect(parseScript(`"\x61";`)).to.eql({
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
        expect(parseScript("\"Hello\
world\"")).to.eql({
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
        expect(parseScript("\"Hello\\02World\"")).to.eql({
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
        expect(parseScript("\"Hello\\012World\"")).to.eql({
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
        expect(parseScript("\"Hello\\122World\"")).to.eql({
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
        expect(parseScript("\"Hello\\312World\"")).to.eql({
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
        expect(parseScript("\"Hello\\412World\"")).to.eql({
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
        expect(parseScript("\"Hello\\712World\"")).to.eql({
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
        expect(parseScript("\"Hello\\0World\"")).to.eql({
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
        expect(parseScript("\"Hello\\1World\"")).to.eql({
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
        expect(parseScript("('x')")).to.eql({
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
        expect(parseScript("('\\u{0000000000F8}')")).to.eql({
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
        expect(parseScript("('\\u{10FFFF}')")).to.eql({
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
        expect(parseScript("('\\u{0}')")).to.eql({
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
        expect(parseScript("('\\u{00F8}')")).to.eql({
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
        expect(parseScript("('\\a')")).to.eql({
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
        expect(parseScript("('\u202a')")).to.eql({
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
        expect(parseScript("('\\7a')")).to.eql({
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
        expect(parseScript("('\\\\\\'')")).to.eql({
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
        expect(parseScript("('\\5111')")).to.eql({
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
        expect(parseScript("('\\2111')")).to.eql({
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
        expect(parseScript("('\\11')")).to.eql({
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
        expect(parseScript("('\\111')")).to.eql({
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
        expect(parseScript("('\\1111')")).to.eql({
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
        expect(parseScript("('\\0')")).to.eql({
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
        expect(parseScript("'use strict'; ('\\0')")).to.eql({
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
        expect(parseScript("'use strict'; ('\\0x')")).to.eql({
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
        expect(parseScript("('\\0')")).to.eql({
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
        expect(parseScript("('\\\r')")).to.eql({
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

    it("expect (\"\\u{110000}\") to throw", () => {
        expect(() => {
            parseScript("(\"\\u{110000}\")");
        }).to.throw();
    });

    it("expect (\"\\u{FFFFFFF}\"", () => {
        expect(() => {
            parseScript("(\"\\u{FFFFFFF}\")");
        }).to.throw();
    });

    it("expect \"u2029\" to throw", () => {
        expect(() => {
            parseScript("('\u2029')");
        }).to.throw();
    });

    it("expect \"u2028\" to throw", () => {
        expect(() => {
            parseScript("('\u2028')");
        }).to.throw();
    });

    it("expect \"u{2028\" to throw", () => {
        expect(() => {
            parseScript("('\\u{2028')");
        }).to.throw();
    });

    it("expect \"9\"\" to throw", () => {
        expect(() => {
            parseScript("('\\9')");
        }).to.throw();
    });
    it("expect invalid hex to throw", () => {
        expect(() => {
            parseScript("\\xFG");
        }).to.throw();
    });

    it("expect invalid escaped hex to throw", () => {

        expect(() => {
            parseScript("\\u00FG");
        }).to.throw();

        expect(() => {
            parseScript("('\\u00FG')");
        }).to.throw();
    });

    it("expect \"8\"\" to throw", () => {
        expect(() => {
            parseScript("('\\8')");
        }).to.throw();
    });

    it("expect \"u\"\" to throw", () => {
        expect(() => {
            parseScript("('\\u')");
        }).to.throw();
    });

    it("expect \"x\"\" to throw", () => {
        expect(() => {
            parseScript("('\\x')");
        }).to.throw();
    });

    it("expect \"n\"\" to throw", () => {
        expect(() => {
            parseScript("('\n')");
        }).to.throw();
    });

    it("expect slash to throw", () => {
        expect(() => {
            parseScript("(')");
        }).to.throw();

        expect(() => {
            parseScript("'");
        }).to.throw();
    });

    it("expect \" to throw", () => {
        expect(() => {
            parseScript("\"");
        }).to.throw();
    });

    it("expect \"u2E2F\" to throw", () => {
        expect(() => {
            parseScript("\u2E2F");
        }).to.throw();
    });

});
