import {hasNext, skipMeta, seek, Seek} from "../../../src/scanner";
import {Context} from "../../../src/common";
import {create} from "../../../src/parser";
import {expect} from "chai";

describe("src/scanner/seek", () => {
    describe("skipMeta()", () => {
        interface Opts {
            source: string;
            hasNext: boolean;
            line: number;
            column: number;
        }

        function pass(name: string, opts: Opts) {
            it(name, () => {
                const parser = create(opts.source, undefined);

                skipMeta(parser);
                expect(hasNext(parser)).to.equal(opts.hasNext);
                expect(parser.line).to.equal(opts.line);
                expect(parser.column).to.equal(opts.column);
            });
        }

        pass("skips nothing in an empty source", {
            source: "",
            hasNext: false,
            line: 1, column: 0,
        });

        pass("skips nothing before an identifier", {
            source: "foo",
            hasNext: true,
            line: 1, column: 0,
        });

        pass("skips nothing before a lone hash", {
            source: "# foo",
            hasNext: true,
            line: 1, column: 0,
        });

        pass("skips nothing before a lone exclamation", {
            source: "! foo",
            hasNext: true,
            line: 1, column: 0,
        });

        pass("skips a BOM in an otherwise empty source", {
            source: "\uFFEF",
            hasNext: false,
            line: 1, column: 0,
        });

        pass("skips a BOM before an identifier", {
            source: "\uFFEFfoo",
            hasNext: true,
            line: 1, column: 0,
        });

        pass("skips a BOM before a lone hash", {
            source: "\uFFEF# foo",
            hasNext: true,
            line: 1, column: 0,
        });

        pass("skips a BOM before a lone exclamation", {
            source: "\uFFEF! foo",
            hasNext: true,
            line: 1, column: 0,
        });

        pass("skips a shebang+LF in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\n",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a shebang+LF before an identifier", {
            source: "#!/foo/bar/baz -abc\nfoo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+LF before a lone hash", {
            source: "#!/foo/bar/baz -abc\n# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+LF before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\n! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+CR in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\r",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a shebang+CR before an identifier", {
            source: "#!/foo/bar/baz -abc\rfoo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+CR before a lone hash", {
            source: "#!/foo/bar/baz -abc\r# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+CR before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\r! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+CRLF in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\r\n",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a shebang+CRLF before an identifier", {
            source: "#!/foo/bar/baz -abc\r\nfoo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+CRLF before a lone hash", {
            source: "#!/foo/bar/baz -abc\r\n# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+CRLF before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\r\n! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+line separator in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\u2028",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a shebang+line separator before an identifier", {
            source: "#!/foo/bar/baz -abc\u2028foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+line separator before a lone hash", {
            source: "#!/foo/bar/baz -abc\u2028# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+line separator before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\u2028! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+paragraph separator in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\u2029",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a shebang+paragraph separator before an identifier", {
            source: "#!/foo/bar/baz -abc\u2029foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+paragraph separator before a lone hash", {
            source: "#!/foo/bar/baz -abc\u2029# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a shebang+paragraph separator before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\u2029! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+LF in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\n",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+LF before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\nfoo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+LF before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\n# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+LF before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\n! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CR in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\r",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CR before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\rfoo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CR before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\r# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CR before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\r! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CRLF in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\r\n",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CRLF before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\r\nfoo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CRLF before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\r\n# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CRLF before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\r\n! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+line separator in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2028",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+line separator before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2028foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+line separator before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2028# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+line separator before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2028! foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+paragraph separator in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2029",
            hasNext: false,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+paragraph separator before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2029foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+paragraph separator before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2029# foo",
            hasNext: true,
            line: 2, column: 0,
        });

        pass("skips a BOM+shebang+paragraph separator before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2029! foo",
            hasNext: true,
            line: 2, column: 0,
        });
    });

    describe("seek()", () => {
        interface Opts {
            source: string;
            seek: Seek;
            hasNext: boolean;
            line: number;
            column: number;
        }

        function pass(name: string, opts: Opts) {
            it(name, () => {
                const parser = create(opts.source, undefined);

                expect(seek(parser, Context.Empty)).to.equal(opts.seek);
                expect(hasNext(parser)).to.equal(opts.hasNext);
                expect(parser.line).to.equal(opts.line);
                expect(parser.column).to.equal(opts.column);
            });
        }

        pass("skips nothing", {
            source: "",
            seek: Seek.None,
            hasNext: false,
            line: 1, column: 0,
        });

        pass("skips spaces", {
            source: "        ",
            seek: Seek.SameLine,
            hasNext: false,
            line: 1, column: 8,
        });

        pass("skips tabs", {
            source: "\t\t\t\t\t\t\t\t",
            seek: Seek.SameLine,
            hasNext: false,
            line: 1, column: 8,
        });

        pass("skips vertical tabs", {
            source: "\v\v\v\v\v\v\v\v",
            seek: Seek.SameLine,
            hasNext: false,
            line: 1, column: 8,
        });

        pass("skips line feeds", {
            source: "\n\n\n\n\n\n\n\n",
            seek: Seek.NewLine,
            hasNext: false,
            line: 9, column: 0,
        });

        pass("skips carriage returns", {
            source: "\r\r\r\r\r\r\r\r",
            seek: Seek.NewLine,
            hasNext: false,
            line: 9, column: 0,
        });

        pass("skips Windows newlines", {
            source: "\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n",
            seek: Seek.NewLine,
            hasNext: false,
            line: 9, column: 0,
        });

        pass("skips line separators", {
            source: "\u2028\u2028\u2028\u2028\u2028\u2028\u2028\u2028",
            seek: Seek.NewLine,
            hasNext: false,
            line: 9, column: 0,
        });

        pass("skips paragraph separators", {
            source: "\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029",
            seek: Seek.NewLine,
            hasNext: false,
            line: 9, column: 0,
        });

        pass("skips mixed whitespace", {
            source: "    \t \r\n \n\r \v\f\t ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 4, column: 5,
        });

        pass("skips single line comments with line feed", {
            source: "  \t // foo bar\n  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 2,
        });

        pass("skips single line comments with carriage return", {
            source: "  \t // foo bar\r  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 2,
        });

        pass("skips single line comments with Windows newlines", {
            source: "  \t // foo bar\r\n  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 2,
        });

        pass("skips single line comments with line separators", {
            source: "  \t // foo bar\u2028  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 2,
        });

        pass("skips single line comments with paragraph separators", {
            source: "  \t // foo bar\u2029  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 2,
        });

        pass("skips multiple single line comments with line feed", {
            source: "  \t // foo bar\n // baz \n //",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 3,
        });

        pass("skips multiple single line comments with carriage return", {
            source: "  \t // foo bar\r // baz \n //",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 3,
        });

        pass("skips multiple single line comments with Windows newlines", {
            source: "  \t // foo bar\r\n // baz \n //",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 3,
        });

        pass("skips multiple single line comments with line separators", {
            source: "  \t // foo bar\u2028 // baz \n //",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 3,
        });

        pass("skips multiple single line comments with paragraph separators", {
            source: "  \t // foo bar\u2029 // baz \n //",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 3,
        });

        pass("skips multiline comments with nothing", {
            source: "  \t /* foo * /* bar */  ",
            seek: Seek.SameLine,
            hasNext: false,
            line: 1, column: 24,
        });

        pass("skips multiline comments with line feed", {
            source: "  \t /* foo * /* bar \n */  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 5,
        });

        pass("skips multiline comments with carriage return", {
            source: "  \t /* foo * /* bar \r */  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 5,
        });

        pass("skips multiline comments with Windows newlines", {
            source: "  \t /* foo * /* bar \r\n */  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 5,
        });

        pass("skips multiline comments with line separators", {
            source: "  \t /* foo * /* bar \u2028 */  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 5,
        });

        pass("skips multiline comments with paragraph separators", {
            source: "  \t /* foo * /* bar\u2029 */  ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 5,
        });

        pass("skips multiple multiline comments with line feed", {
            source: "  \t /* foo bar\n *//* baz*/ \n /**/",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 5,
        });

        pass("skips multiple multiline comments with carriage return", {
            source: "  \t /* foo bar\r *//* baz*/ \n /**/",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 5,
        });

        pass("skips multiple multiline comments with Windows newlines", {
            source: "  \t /* foo bar\r\n *//* baz*/ \n /**/",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 5,
        });

        pass("skips multiple multiline comments with line separators", {
            source: "  \t /* foo bar\u2028 *//* baz*/ \n /**/",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 5,
        });

        pass("skips multiple multiline comments with paragraph separators", {
            source: "  \t /* foo bar\u2029 *//* baz*/ \n /**/",
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 5,
        });
    });
});
