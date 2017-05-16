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
                expect({hasNext: hasNext(parser), line: parser.line, column: parser.column})
                .to.eql({hasNext: opts.hasNext, line: opts.line, column: opts.column});
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
        context("sloppy", () => run(false));
        context("strict", () => run(true));
    });

    function run(strict: boolean) {
        interface PassOpts {
            strict?: boolean;
            source: string;
            seek: Seek;
            hasNext: boolean;
            line: number;
            column: number;
        }

        function pass(name: string, opts: PassOpts) {
            if (opts.strict != null && opts.strict !== strict) return;
            it(name, () => {
                const parser = create(opts.source, undefined);

                expect({
                    seek: seek(parser, strict ? Context.Strict : Context.Empty),
                    hasNext: hasNext(parser),
                    line: parser.line, column: parser.column,
                }).to.eql({
                    seek: opts.seek, hasNext: opts.hasNext,
                    line: opts.line, column: opts.column,
                });
            });
        }

        function fail(name: string, source: string, strictOpt?: boolean) {
            if (strictOpt != null && strictOpt !== strict) return;
            it(name, () => {
                const parser = create(source, undefined);

                expect(() => {
                    seek(parser, strict ? Context.Strict : Context.Empty);
                }).to.throw(SyntaxError);
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

        if (strict) {
            pass("avoids HTML single line comments with line feed", {
                strict: false,
                source: "  \t <!-- foo bar\n  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids HTML single line comments with carriage return", {
                strict: false,
                source: "  \t <!-- foo bar\r  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids HTML single line comments with Windows newlines", {
                strict: false,
                source: "  \t <!-- foo bar\r\n  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids HTML single line comments with line separators", {
                strict: false,
                source: "  \t <!-- foo bar\u2028  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids HTML single line comments with paragraph separators", {
                strict: false,
                source: "  \t <!-- foo bar\u2029  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids multiple HTML single line comments with line feed", {
                strict: false,
                source: "  \t <!-- foo bar\n <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids multiple HTML single line comments with carriage return", {
                strict: false,
                source: "  \t <!-- foo bar\r <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids multiple HTML single line comments with Windows newlines", {
                strict: false,
                source: "  \t <!-- foo bar\r\n <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids multiple HTML single line comments with line separators", {
                strict: false,
                source: "  \t <!-- foo bar\u2028 <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids multiple HTML single line comments with paragraph separators", {
                strict: false,
                source: "  \t <!-- foo bar\u2029 <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 1, column: 4,
            });

            pass("avoids single HTML close comment after line feed", {
                strict: false,
                source: "  \t \n-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids single HTML close comment after carriage return", {
                strict: false,
                source: "  \t \r-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids single HTML close comment after Windows newlines", {
                strict: false,
                source: "  \t \r\n-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids single HTML close comment after line separators", {
                strict: false,
                source: "  \t \u2028-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids single HTML close comment after paragraph separators", {
                strict: false,
                source: "  \t \u2029-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids line of single HTML close comment after line feed", {
                strict: false,
                source: "  \t \n--> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids line of single HTML close comment after carriage return", {
                strict: false,
                source: "  \t \r--> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids line of single HTML close comment after Windows newlines", {
                strict: false,
                source: "  \t \r\n--> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids line of single HTML close comment after line separators", {
                strict: false,
                source: "  \t \u2028--> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("avoids line of single HTML close comment after paragraph separators", {
                strict: false,
                source: "  \t \u2029--> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 0,
            });

            pass("allows HTML close comment after line feed + WS", {
                strict: false,
                source: "  \t \n   --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 3,
            });

            pass("allows HTML close comment after carriage return + WS", {
                strict: false,
                source: "  \t \r   --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 3,
            });

            pass("allows HTML close comment after Windows newlines + WS", {
                strict: false,
                source: "  \t \r\n   --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 3,
            });

            pass("allows HTML close comment after line separators + WS", {
                strict: false,
                source: "  \t \u2028   --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 3,
            });

            pass("allows HTML close comment after paragraph separators + WS", {
                strict: false,
                source: "  \t \u2029   --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 3,
            });

            pass("avoids single-line block on line of HTML close after line feed", {
                strict: false,
                source: "  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 56,
            });

            pass("avoids single-line block on line of HTML close after carriage return", {
                strict: false,
                source: "  \t /*\r*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 56,
            });

            pass("avoids single-line block on line of HTML close after Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 56,
            });

            pass("avoids single-line block on line of HTML close after line separators", {
                strict: false,
                source: "  \t /*\u2028*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 56,
            });

            pass("avoids single-line block on line of HTML close after paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 56,
            });

            pass("avoids 2 single-line block on line of HTML close after line feed", {
                strict: false,
                source: "  \t /*\n*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 69,
            });

            pass("avoids 2 single-line block on line of HTML close after carriage return", {
                strict: false,
                source: "  \t /*\r*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 69,
            });

            pass("avoids 2 single-line block on line of HTML close after Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 69,
            });

            pass("avoids 2 single-line block on line of HTML close after line separators", {
                strict: false,
                source: "  \t /*\u2028*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 69,
            });

            pass("avoids 2 single-line block on line of HTML close after paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 69,
            });

            pass("avoids block HTML close with line feed + empty line", {
                strict: false,
                source: "  \t /*\n*/  -->\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with carriage return + empty line", {
                strict: false,
                source: "  \t /*\r*/  -->\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with Windows newlines + empty line", {
                strict: false,
                source: "  \t /*\r\n*/  -->\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with line separators + empty line", {
                strict: false,
                source: "  \t /*\u2028*/  -->\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with paragraph separators + empty line", {
                strict: false,
                source: "  \t /*\u2029*/  -->\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with line feed", {
                strict: false,
                source: "  \t /*\n*/  --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with carriage return", {
                strict: false,
                source: "  \t /*\r*/  --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/  --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with line separators", {
                strict: false,
                source: "  \t /*\u2028*/  --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids block HTML close with paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/  --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids first line block HTML close with line feed", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \n*/  --> " +
                    "the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids first line block HTML close with carriage return", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \r*/  --> " +
                    "the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids first line block HTML close with Windows newlines", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \r\n*/  --> " +
                    "the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids first line block HTML close with line separators", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \u2028*/  --> " +
                    "the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids first line block HTML close with paragraph separators", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \u2029*/  --> " +
                    "the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 4,
            });

            pass("avoids multi block + HTML close with line feed", {
                strict: false,
                source: "  \t /*\noptional\nMultiLineCommentChars \n*/  --> " +
                    "the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 4,
            });

            pass("avoids multi block + HTML close with carriage return", {
                strict: false,
                source: "  \t /*\roptional\rMultiLineCommentChars \r*/  --> " +
                    "the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 4,
            });

            pass("avoids multi block + HTML close with Windows newlines", {
                strict: false,
                source: "  \t /*\r\noptional\r\nMultiLineCommentChars \r\n*/  --> " +
                    "the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 4,
            });

            pass("avoids multi block + HTML close with line separators", {
                strict: false,
                source: "  \t /*\u2028optional\u2028MultiLineCommentChars \u2028*/  --> " +
                    "the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 4,
            });

            pass("avoids multi block + HTML close with paragraph separators", {
                strict: false,
                source: "  \t /*\u2029optional\u2029MultiLineCommentChars \u2029*/  --> " +
                    "the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 4,
            });

            pass("avoids multi block + single block + HTML close with line feed", {
                strict: false,
                source: "  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\n*/  --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + single block + HTML close with carriage return", {
                strict: false,
                source: "  \t /*\r*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\r*/  --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + single block + HTML close with Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\r\n*/  --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + single block + HTML close with line separators", {
                strict: false,
                source: "  \t /*\u2028*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\u2028*/  --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + single block + HTML close with paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\u2029*/  --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + 2 single block + HTML close with line feed", {
                strict: false,
                source: "  \t /*\n*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\n*/  --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + 2 single block + HTML close with carriage return", {
                strict: false,
                source: "  \t /*\r*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\r*/  --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + 2 single block + HTML close with Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\r\n*/  --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + 2 single block + HTML close with line separators", {
                strict: false,
                source: "  \t /*\u2028*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\u2028*/  --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });

            pass("avoids multi block + 2 single block + HTML close with paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\u2029*/  --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 4,
            });
        } else {
            pass("skips HTML single line comments with line feed", {
                strict: false,
                source: "  \t <!-- foo bar\n  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 2,
            });

            pass("skips HTML single line comments with carriage return", {
                strict: false,
                source: "  \t <!-- foo bar\r  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 2,
            });

            pass("skips HTML single line comments with Windows newlines", {
                strict: false,
                source: "  \t <!-- foo bar\r\n  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 2,
            });

            pass("skips HTML single line comments with line separators", {
                strict: false,
                source: "  \t <!-- foo bar\u2028  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 2,
            });

            pass("skips HTML single line comments with paragraph separators", {
                strict: false,
                source: "  \t <!-- foo bar\u2029  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 2,
            });

            pass("skips multiple HTML single line comments with line feed", {
                strict: false,
                source: "  \t <!-- foo bar\n <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 5,
            });

            pass("skips multiple HTML single line comments with carriage return", {
                strict: false,
                source: "  \t <!-- foo bar\r <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 5,
            });

            pass("skips multiple HTML single line comments with Windows newlines", {
                strict: false,
                source: "  \t <!-- foo bar\r\n <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 5,
            });

            pass("skips multiple HTML single line comments with line separators", {
                strict: false,
                source: "  \t <!-- foo bar\u2028 <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 5,
            });

            pass("skips multiple HTML single line comments with paragraph separators", {
                strict: false,
                source: "  \t <!-- foo bar\u2029 <!-- baz \n <!--",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 5,
            });

            pass("skips single HTML close comment after line feed", {
                strict: false,
                source: "  \t \n-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 5,
            });

            pass("skips single HTML close comment after carriage return", {
                strict: false,
                source: "  \t \r-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 5,
            });

            pass("skips single HTML close comment after Windows newlines", {
                strict: false,
                source: "  \t \r\n-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 5,
            });

            pass("skips single HTML close comment after line separators", {
                strict: false,
                source: "  \t \u2028-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 5,
            });

            pass("skips single HTML close comment after paragraph separators", {
                strict: false,
                source: "  \t \u2029-->  ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 5,
            });

            pass("skips line of single HTML close comment after line feed", {
                strict: false,
                source: "  \t \n--> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips line of single HTML close comment after carriage return", {
                strict: false,
                source: "  \t \r--> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips line of single HTML close comment after Windows newlines", {
                strict: false,
                source: "  \t \r\n--> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips line of single HTML close comment after line separators", {
                strict: false,
                source: "  \t \u2028--> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips line of single HTML close comment after paragraph separators", {
                strict: false,
                source: "  \t \u2029--> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("allows HTML close comment after line feed + WS", {
                strict: false,
                source: "  \t \n   --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("allows HTML close comment after carriage return + WS", {
                strict: false,
                source: "  \t \r   --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("allows HTML close comment after Windows newlines + WS", {
                strict: false,
                source: "  \t \r\n   --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("allows HTML close comment after line separators + WS", {
                strict: false,
                source: "  \t \u2028   --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("allows HTML close comment after paragraph separators + WS", {
                strict: false,
                source: "  \t \u2029   --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips single-line block on line of HTML close after line feed", {
                strict: false,
                source: "  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips single-line block on line of HTML close after carriage return", {
                strict: false,
                source: "  \t /*\r*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips single-line block on line of HTML close after Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips single-line block on line of HTML close after line separators", {
                strict: false,
                source: "  \t /*\u2028*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips single-line block on line of HTML close after paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/ /* optional SingleLineDelimitedCommentSequence */ " +
                    "   --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips 2 single-line block on line of HTML close after line feed", {
                strict: false,
                source: "  \t /*\n*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips 2 single-line block on line of HTML close after carriage return", {
                strict: false,
                source: "  \t /*\r*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips 2 single-line block on line of HTML close after Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips 2 single-line block on line of HTML close after line separators", {
                strict: false,
                source: "  \t /*\u2028*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips 2 single-line block on line of HTML close after paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/ /**/ /* second optional SingleLineDelimitedCommentSequence */ " + // tslint:disable-line max-line-length
                    "   --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with line feed + empty line", {
                strict: false,
                source: "  \t /*\n*/  -->\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with carriage return + empty line", {
                strict: false,
                source: "  \t /*\r*/  -->\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with Windows newlines + empty line", {
                strict: false,
                source: "  \t /*\r\n*/  -->\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with line separators + empty line", {
                strict: false,
                source: "  \t /*\u2028*/  -->\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with paragraph separators + empty line", {
                strict: false,
                source: "  \t /*\u2029*/  -->\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with line feed", {
                strict: false,
                source: "  \t /*\n*/  --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with carriage return", {
                strict: false,
                source: "  \t /*\r*/  --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/  --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with line separators", {
                strict: false,
                source: "  \t /*\u2028*/  --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips block HTML close with paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/  --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips first line block HTML close with line feed", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \n*/  --> " +
                    "the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips first line block HTML close with carriage return", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \r*/  --> " +
                    "the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips first line block HTML close with Windows newlines", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \r\n*/  --> " +
                    "the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips first line block HTML close with line separators", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \u2028*/  --> " +
                    "the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips first line block HTML close with paragraph separators", {
                strict: false,
                source: "  \t /* optional FirstCommentLine \u2029*/  --> " +
                    "the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            });

            pass("skips multi block + HTML close with line feed", {
                strict: false,
                source: "  \t /*\noptional\nMultiLineCommentChars \n*/  --> " +
                    "the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 5, column: 1,
            });

            pass("skips multi block + HTML close with carriage return", {
                strict: false,
                source: "  \t /*\roptional\rMultiLineCommentChars \r*/  --> " +
                    "the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 5, column: 1,
            });

            pass("skips multi block + HTML close with Windows newlines", {
                strict: false,
                source: "  \t /*\r\noptional\r\nMultiLineCommentChars \r\n*/  --> " +
                    "the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 5, column: 1,
            });

            pass("skips multi block + HTML close with line separators", {
                strict: false,
                source: "  \t /*\u2028optional\u2028MultiLineCommentChars \u2028*/  --> " +
                    "the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 5, column: 1,
            });

            pass("skips multi block + HTML close with paragraph separators", {
                strict: false,
                source: "  \t /*\u2029optional\u2029MultiLineCommentChars \u2029*/  --> " +
                    "the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 5, column: 1,
            });

            pass("skips multi block + single block + HTML close with line feed", {
                strict: false,
                source: "  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\n*/  --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + single block + HTML close with carriage return", {
                strict: false,
                source: "  \t /*\r*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\r*/  --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + single block + HTML close with Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\r\n*/  --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + single block + HTML close with line separators", {
                strict: false,
                source: "  \t /*\u2028*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\u2028*/  --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + single block + HTML close with paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/ /* optional SingleLineDelimitedCommentSequence " +
                    "\u2029*/  --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + 2 single block + HTML close with line feed", {
                strict: false,
                source: "  \t /*\n*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\n*/  --> the comment extends to these characters\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + 2 single block + HTML close with carriage return", {
                strict: false,
                source: "  \t /*\r*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\r*/  --> the comment extends to these characters\r ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + 2 single block + HTML close with Windows newlines", {
                strict: false,
                source: "  \t /*\r\n*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\r\n*/  --> the comment extends to these characters\r\n ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + 2 single block + HTML close with line separators", {
                strict: false,
                source: "  \t /*\u2028*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\u2028*/  --> the comment extends to these characters\u2028 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });

            pass("skips multi block + 2 single block + HTML close with paragraph separators", {
                strict: false,
                source: "  \t /*\u2029*/ /**/ /* optional SingleLineDelimitedCommentSequence " +
                    "\u2029*/  --> the comment extends to these characters\u2029 ",
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            });
        }

        pass("avoids single HTML close comment w/o line terminator", {
            source: "  \t -->  ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 4,
        });

        pass("avoids line of single HTML close comment w/o line terminator", {
            source: "  \t --> the comment extends to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 4,
        });

        pass("avoids single-line block on line of HTML close w/o line terminator", {
            source: "  \t /* optional SingleLineDelimitedCommentSequence */ " +
                "   --> the comment extends to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 57,
        });

        pass("avoids 2 single-line block on line of HTML close w/o line terminator", {
            source: "  \t /**/ /* second optional SingleLineDelimitedCommentSequence */ " +
                "   --> the comment extends to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 69,
        });

        pass("avoids block HTML close with empty line w/o line terminator", {
            source: "  \t /**/  -->\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 10,
        });

        pass("avoids block HTML close with chars w/o line terminator", {
            source: "  \t /**/  --> the comment extends to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 10,
        });

        pass("avoids first line block HTML close w/o line terminator", {
            source: "  \t /* optional FirstCommentLine */  --> " +
                "the comment extends to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 37,
        });

        pass("avoids 2 single block + HTML close w/o line terminator", {
            source: "  \t /**/ /* optional second SingleLineDelimitedCommentSequence */" +
                "  --> the comment extends to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 67,
        });
    }
});
