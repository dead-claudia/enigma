import {hasNext, skipMeta, seek, Seek} from "../../../src/scanner";
import {Context} from "../../../src/common";
import {create} from "../../../src/parser";
import * as assert from "clean-assert";

describe("src/scanner/seek", () => {
    describe("skipMeta()", () => {
        interface Opts {
            source: string;
            hasNext: boolean;
            line: number;
            column: number;
            index: number;
        }

        function pass(name: string, opts: Opts) {
            it(name, () => {
                const parser = create(opts.source, undefined);

                delete opts.source;
                skipMeta(parser);

                assert.match({
                    hasNext: hasNext(parser),
                    line: parser.line,
                    column: parser.column,
                    index: parser.index,
                }, opts);
            });
        }

        function fail(name: string, source: string) {
            it(name, () => {
                const parser = create(source, undefined);

                assert.throws(SyntaxError, () => skipMeta(parser));
            });
        }

        pass("skips nothing in an empty source", {
            source: "",
            hasNext: false,
            index: 0, line: 1, column: 0,
        });

        pass("skips nothing before an identifier", {
            source: "foo",
            hasNext: true,
            index: 0, line: 1, column: 0,
        });

        fail("fails before a lone hash", "# foo");

        pass("skips nothing before a lone exclamation", {
            source: "! foo",
            hasNext: true,
            index: 0, line: 1, column: 0,
        });

        pass("skips a BOM in an otherwise empty source", {
            source: "\uFFEF",
            hasNext: false,
            index: 1, line: 1, column: 0,
        });

        pass("skips a BOM before an identifier", {
            source: "\uFFEFfoo",
            hasNext: true,
            index: 1, line: 1, column: 0,
        });

        fail("skips a BOM and fails before a lone hash", "\uFFEF# foo");

        pass("skips a BOM before a lone exclamation", {
            source: "\uFFEF! foo",
            hasNext: true,
            index: 1, line: 1, column: 0,
        });

        pass("skips a shebang+LF in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\n",
            hasNext: false,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+LF before an identifier", {
            source: "#!/foo/bar/baz -abc\nfoo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+LF before a lone hash", {
            source: "#!/foo/bar/baz -abc\n# foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+LF before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\n! foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+CR in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\r",
            hasNext: false,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+CR before an identifier", {
            source: "#!/foo/bar/baz -abc\rfoo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+CR before a lone hash", {
            source: "#!/foo/bar/baz -abc\r# foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+CR before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\r! foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+CRLF in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\r\n",
            hasNext: false,
            index: 21, line: 2, column: 0,
        });

        pass("skips a shebang+CRLF before an identifier", {
            source: "#!/foo/bar/baz -abc\r\nfoo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a shebang+CRLF before a lone hash", {
            source: "#!/foo/bar/baz -abc\r\n# foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a shebang+CRLF before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\r\n! foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a shebang+line separator in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\u2028",
            hasNext: false,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+line separator before an identifier", {
            source: "#!/foo/bar/baz -abc\u2028foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+line separator before a lone hash", {
            source: "#!/foo/bar/baz -abc\u2028# foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+line separator before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\u2028! foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+paragraph separator in an otherwise empty source", {
            source: "#!/foo/bar/baz -abc\u2029",
            hasNext: false,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+paragraph separator before an identifier", {
            source: "#!/foo/bar/baz -abc\u2029foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+paragraph separator before a lone hash", {
            source: "#!/foo/bar/baz -abc\u2029# foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a shebang+paragraph separator before a lone exclamation", {
            source: "#!/foo/bar/baz -abc\u2029! foo",
            hasNext: true,
            index: 20, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+LF in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\n",
            hasNext: false,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+LF before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\nfoo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+LF before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\n# foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+LF before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\n! foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CR in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\r",
            hasNext: false,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CR before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\rfoo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CR before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\r# foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CR before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\r! foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CRLF in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\r\n",
            hasNext: false,
            index: 22, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CRLF before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\r\nfoo",
            hasNext: true,
            index: 22, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CRLF before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\r\n# foo",
            hasNext: true,
            index: 22, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+CRLF before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\r\n! foo",
            hasNext: true,
            index: 22, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+line separator in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2028",
            hasNext: false,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+line separator before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2028foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+line separator before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2028# foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+line separator before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2028! foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+paragraph separator in an otherwise empty source", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2029",
            hasNext: false,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+paragraph separator before an identifier", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2029foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+paragraph separator before a lone hash", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2029# foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });

        pass("skips a BOM+shebang+paragraph separator before a lone exclamation", {
            source: "\uFFEF#!/foo/bar/baz -abc\u2029! foo",
            hasNext: true,
            index: 21, line: 2, column: 0,
        });
    });

    describe("seek()", () => {
        context("script", () => run(false));
        context("module", () => run(true));
    });

    function run(isModule: boolean) {
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

                assert.match({
                    seek: seek(parser, isModule ? Context.Module : Context.Empty),
                    hasNext: hasNext(parser),
                    line: parser.line, column: parser.column,
                }, {
                    seek: opts.seek, hasNext: opts.hasNext,
                    line: opts.line, column: opts.column,
                });
            });
        }

        function passAll(name: (lt: string) => string, opts: (lt: string) => Opts) {
            pass(name("line feed"), opts("\n"));
            pass(name("carriage return"), opts("\r"));
            pass(name("Windows newline"), opts("\r"));
            pass(name("line separators"), opts("\u2028"));
            pass(name("paragraph separators"), opts("\u2029"));
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

        passAll(lt => `skips ${lt}s`, lt => ({
            source: `${lt}${lt}${lt}${lt}${lt}${lt}${lt}${lt}`,
            seek: Seek.NewLine,
            hasNext: false,
            line: 9, column: 0,
        }));

        pass("skips mixed whitespace", {
            source: "    \t \r\n \n\r \v\f\t ",
            seek: Seek.NewLine,
            hasNext: false,
            line: 4, column: 5,
        });

        passAll(lt => "skips single line comments with line feed", lt => ({
            source: `  \t // foo bar${lt}  `,
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 2,
        }));

        passAll(lt => `skips multiple single line comments with ${lt}`, lt => ({
            source: `  \t // foo bar${lt} // baz ${lt} //`,
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 3,
        }));

        pass("skips multiline comments with nothing", {
            source: "  \t /* foo * /* bar */  ",
            seek: Seek.SameLine,
            hasNext: false,
            line: 1, column: 24,
        });

        passAll(lt => `skips multiline comments with ${lt}`, lt => ({
            source: `  \t /* foo * /* bar ${lt} */  `,
            seek: Seek.NewLine,
            hasNext: false,
            line: 2, column: 5,
        }));

        passAll(lt => `skips multiple multiline comments with ${lt}`, lt => ({
            source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
            seek: Seek.NewLine,
            hasNext: false,
            line: 3, column: 5,
        }));

        if (isModule) {
            passAll(lt => `avoids HTML single line comments with ${lt}`, lt => ({
                source: `  \t <!-- foo bar${lt}  `,
                seek: Seek.SameLine,
                hasNext: true,
                line: 1, column: 4,
            }));

            passAll(lt => `avoids multiple HTML single line comments with ${lt}`, lt => ({
                source: `  \t <!-- foo bar${lt} <!-- baz ${lt} <!--`,
                seek: Seek.SameLine,
                hasNext: true,
                line: 1, column: 4,
            }));

            passAll(lt => `avoids single HTML close comment after ${lt}`, lt => ({
                source: `  \t ${lt}-->  `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 2, column: 0,
            }));

            passAll(lt => `avoids line of single HTML close comment after ${lt}`, lt => ({
                source: `  \t ${lt}--> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 2, column: 0,
            }));

            passAll(lt => `allows HTML close comment after ${lt} + WS`, lt => ({
                source: `  \t ${lt}   --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 2, column: 3,
            }));

            passAll(lt => `avoids single-line block on line of HTML close after ${lt}`, lt => ({
                source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence */    ${""
                    }--> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 2, column: 56,
            }));

            passAll(lt => `avoids 2 single-line block on line of HTML close after ${lt}`, lt => ({
                source: `  \t /*${lt}*/ /**/ /* second optional ${""
                    }SingleLineDelimitedCommentSequence */    ${""
                    }--> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 2, column: 68,
            }));

            passAll(lt => `avoids block HTML close with ${lt} + empty line`, lt => ({
                source: `  \t /*${lt}*/  -->${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 2, column: 4,
            }));

            passAll(lt => `avoids block HTML close with ${lt}`, lt => ({
                source: `  \t /*${lt}*/  --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 2, column: 4,
            }));

            passAll(lt => `avoids first line block HTML close with ${lt}`, lt => ({
                source: `  \t /* optional FirstCommentLine ${lt}*/  --> ` +
                    `the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 2, column: 4,
            }));

            passAll(lt => `avoids multi block + HTML close with ${lt}`, lt => ({
                source: `  \t /*${lt}optional${lt}MultiLineCommentChars ${lt}*/  --> ` +
                    `the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 4, column: 4,
            }));

            passAll(lt => `avoids multi block + single block + HTML close with ${lt}`, lt => ({
                source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence ${lt
                    }*/  --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 3, column: 4,
            }));

            passAll(lt => `avoids multi block + 2 single block + HTML close with ${lt}`, lt => ({
                source: `  \t /*${lt}*/ /**/ /* optional SingleLineDelimitedCommentSequence ${lt
                    }*/  --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: true,
                line: 3, column: 4,
            }));
        } else {
            passAll(lt => `skips HTML single line comments with ${lt}`, lt => ({
                source: `  \t <!-- foo bar${lt}  `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 2,
            }));

            passAll(lt => `skips multiple HTML single line comments with ${lt}`, lt => ({
                source: `  \t <!-- foo bar${lt} <!-- baz ${lt} <!--`,
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 5,
            }));

            passAll(lt => `skips single HTML close comment after ${lt}`, lt => ({
                source: `  \t ${lt}-->  `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 2, column: 5,
            }));

            passAll(lt => `skips line of single HTML close comment after ${lt}`, lt => ({
                source: `  \t ${lt}--> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            }));

            passAll(lt => `allows HTML close comment after ${lt} + WS`, lt => ({
                source: `  \t ${lt}   --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            }));

            passAll(lt => `skips single-line block on line of HTML close after ${lt}`, lt => ({
                source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence */    ${""
                    }--> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            }));

            passAll(lt => `skips 2 single-line block on line of HTML close after ${lt}`, lt => ({
                source: `  \t /*${lt}*/ /**/ /* second optional ${""
                    }SingleLineDelimitedCommentSequence */    ${""
                    }--> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            }));

            passAll(lt => `skips block HTML close with ${lt} + empty line`, lt => ({
                source: `  \t /*${lt}*/  -->${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            }));

            passAll(lt => `skips block HTML close with ${lt}`, lt => ({
                source: `  \t /*${lt}*/  --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            }));

            passAll(lt => `skips first line block HTML close with ${lt}`, lt => ({
                source: `  \t /* optional FirstCommentLine ${lt}*/  --> ` +
                    `the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 3, column: 1,
            }));

            passAll(lt => `skips multi block + HTML close with ${lt}`, lt => ({
                source: `  \t /*${lt}optional${lt}MultiLineCommentChars ${lt
                    }*/  --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 5, column: 1,
            }));

            passAll(lt => `skips multi block + single block + HTML close with ${lt}`, lt => ({
                source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence ${lt
                    }*/  --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            }));

            passAll(lt => `skips multi block + 2 single block + HTML close with ${lt}`, lt => ({
                source: `  \t /*${lt}*/ /**/ /* optional SingleLineDelimitedCommentSequence ${lt
                    }*/  --> the comment extends to these characters${lt} `,
                seek: Seek.NewLine,
                hasNext: false,
                line: 4, column: 1,
            }));
        }

        pass("avoids single HTML close comment w/o line terminator", {
            source: "  \t -->  ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 4,
        });

        pass("avoids line of single HTML close comment w/o line terminator", {
            source: "  \t --> the comment doesn't extend to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 4,
        });

        pass("avoids single-line block on line of HTML close w/o line terminator", {
            source: "  \t /* optional SingleLineDelimitedCommentSequence */ " +
                "   --> the comment doesn't extend to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 57,
        });

        pass("avoids 2 single-line block on line of HTML close w/o line terminator", {
            source: "  \t /**/ /* second optional SingleLineDelimitedCommentSequence */ " +
                "   --> the comment doesn't extend to these characters\n ",
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
            source: "  \t /**/  --> the comment doesn't extend to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 10,
        });

        pass("avoids first line block HTML close w/o line terminator", {
            source: "  \t /* optional FirstCommentLine */  --> " +
                "the comment doesn't extend to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 37,
        });

        pass("avoids 2 single block + HTML close w/o line terminator", {
            source: "  \t /**/ /* optional second SingleLineDelimitedCommentSequence */" +
                "  --> the comment doesn't extend to these characters\n ",
            seek: Seek.SameLine,
            hasNext: true,
            line: 1, column: 67,
        });
    }
});
