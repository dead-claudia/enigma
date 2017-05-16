import {
    hasNext, Directive, scanDirective, consumeDirectiveSemicolon,
} from "../../../src/scanner";
import {Context} from "../../../src/common";
import {create} from "../../../src/parser";
import {expect} from "chai";

describe("src/scanner/directive", () => {
    describe("scanDirective()", () => {
        interface Step { hasNext: boolean; line: number; column: number; }
        interface StepDir extends Step { directive: Directive; semi?: undefined; }
        interface StepSemi extends Step { directive?: undefined; semi: boolean; }

        function pass(name: string, opts: {source: string, steps: Array<StepDir | StepSemi>}) {
            it(name, () => {
                const parser = create(opts.source, undefined);

                for (const step of opts.steps) {
                    if (step.directive != null) {
                        expect({
                            directive: scanDirective(parser, Context.Empty),
                            hasNext: hasNext(parser), line: parser.line, column: parser.column,
                        }).to.eql(step);
                    } else {
                        expect({
                            semi: consumeDirectiveSemicolon(parser, Context.Empty),
                            hasNext: hasNext(parser), line: parser.line, column: parser.column,
                        }).to.eql(step);
                    }
                }
            });
        }

        function fail(name: string, source: string) {
            it(name, () => {
                const parser = create(source, undefined);

                expect(() => {
                    scanDirective(parser, Context.Empty);
                }).to.throw(SyntaxError);
            });
        }

        pass("scans nothing from an empty source", {
            source: "",
            steps: [
                {directive: Directive.None, hasNext: false, line: 1, column: 0},
            ],
        });

        pass("scans a single 'use strict'", {
            source: "'use strict'",
            steps: [
                {directive: Directive.Strict, hasNext: false, line: 1, column: 12},
            ],
        });

        pass("scans a single \"use strict\"", {
            source: "\"use strict\"",
            steps: [
                {directive: Directive.Strict, hasNext: false, line: 1, column: 12},
            ],
        });

        pass("scans a single 'use\\x20strict'", {
            source: "'use\\x20strict'",
            steps: [
                {directive: Directive.Other, hasNext: false, line: 1, column: 15},
            ],
        });

        pass("scans a single \"use\\x20strict\"", {
            source: "\"use\\x20strict\"",
            steps: [
                {directive: Directive.Other, hasNext: false, line: 1, column: 15},
            ],
        });

        pass("scans a single 'use asm'", {
            source: "'use asm'",
            steps: [
                {directive: Directive.Other, hasNext: false, line: 1, column: 9},
            ],
        });

        pass("scans a single \"use asm\"", {
            source: "\"use asm\"",
            steps: [
                {directive: Directive.Other, hasNext: false, line: 1, column: 9},
            ],
        });

        pass("scans 'use asm' + semi + 'use strict'", {
            source: "'use asm'; 'use strict'",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 1, column: 10},
                {directive: Directive.Strict, hasNext: false, line: 1, column: 23},
            ],
        });

        pass("scans \"use asm\" + semi + \"use strict\"", {
            source: "\"use asm\"; \"use strict\"",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 1, column: 10},
                {directive: Directive.Strict, hasNext: false, line: 1, column: 23},
            ],
        });

        pass("scans 'use asm' + LF + 'use strict'", {
            source: "'use asm' \n 'use strict'",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans \"use asm\" + LF + \"use strict\"", {
            source: "\"use asm\" \n \"use strict\"",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans 'use asm' + CR + 'use strict'", {
            source: "'use asm' \r 'use strict'",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans \"use asm\" + CR + \"use strict\"", {
            source: "\"use asm\" \r \"use strict\"",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans 'use asm' + CRLF + 'use strict'", {
            source: "'use asm' \r\n 'use strict'",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans \"use asm\" + CRLF + \"use strict\"", {
            source: "\"use asm\" \r\n \"use strict\"",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans 'use asm' + line separator + 'use strict'", {
            source: "'use asm' \u2028 'use strict'",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans \"use asm\" + line separator + \"use strict\"", {
            source: "\"use asm\" \u2028 \"use strict\"",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans 'use asm' + paragraph separator + 'use strict'", {
            source: "'use asm' \u2029 'use strict'",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        pass("scans \"use asm\" + paragraph separator + \"use strict\"", {
            source: "\"use asm\" \u2029 \"use strict\"",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 9},
                {semi: true, hasNext: true, line: 2, column: 1},
                {directive: Directive.Strict, hasNext: false, line: 2, column: 13},
            ],
        });

        /* tslint:disable max-line-length */

        fail("catches incomplete strings", "'incomplete");

        fail("catches invalid newlines", "'random\nnewline'");
        fail("catches invalid carriage returns", "'random\rnewline'");
        fail("catches invalid Windows newlines", "'random\r\nnewline'");
        fail("catches invalid line separators", "'random\u2028newline'");
        fail("catches invalid paragraph separators", "'random\u2029newline'");

        fail("catches invalid newlines after null escapes", "'random\\0\nnewline'");
        fail("catches invalid carriage returns after null escapes", "'random\\0\rnewline'");
        fail("catches invalid Windows newlines after null escapes", "'random\\0\r\nnewline'");
        fail("catches invalid line separators after null escapes", "'random\\0\u2028newline'");
        fail("catches invalid paragraph separators after null escapes", "'random\\0\u2029newline'");

        fail("catches invalid newlines after legacy octal escapes", "'random\\12\nnewline'");
        fail("catches invalid carriage returns after legacy octal escapes", "'random\\12\rnewline'");
        fail("catches invalid Windows newlines after legacy octal escapes", "'random\\12\r\nnewline'");
        fail("catches invalid line separators after legacy octal escapes", "'random\\12\u2028newline'");
        fail("catches invalid paragraph separators after legacy octal escapes", "'random\\12\u2029newline'");

        fail("catches invalid newlines after ASCII \\x", "'random\\x\nnewline'");
        fail("catches invalid carriage returns after ASCII \\x", "'random\\x\rnewline'");
        fail("catches invalid Windows newlines after ASCII \\x", "'random\\x\r\nnewline'");
        fail("catches invalid line separators after ASCII \\x", "'random\\x\u2028newline'");
        fail("catches invalid paragraph separators after ASCII \\x", "'random\\x\u2029newline'");

        fail("catches invalid newlines after ASCII \\x0", "'random\\x0\nnewline'");
        fail("catches invalid carriage returns after ASCII \\x0", "'random\\x0\rnewline'");
        fail("catches invalid Windows newlines after ASCII \\x0", "'random\\x0\r\nnewline'");
        fail("catches invalid line separators after ASCII \\x0", "'random\\x0\u2028newline'");
        fail("catches invalid paragraph separators after ASCII \\x0", "'random\\x0\u2029newline'");

        fail("catches invalid newlines after Unicode \\u", "'random\\u\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u", "'random\\u\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u", "'random\\u\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u", "'random\\u\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u", "'random\\u\u2029newline'");

        fail("catches invalid newlines after Unicode \\u0", "'random\\u0\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u0", "'random\\u0\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u0", "'random\\u0\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u0", "'random\\u0\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u0", "'random\\u0\u2029newline'");

        fail("catches invalid newlines after Unicode \\ua", "'random\\ua\nnewline'");
        fail("catches invalid carriage returns after Unicode \\ua", "'random\\ua\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\ua", "'random\\ua\r\nnewline'");
        fail("catches invalid line separators after Unicode \\ua", "'random\\ua\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\ua", "'random\\ua\u2029newline'");

        fail("catches invalid newlines after Unicode \\u00", "'random\\u00\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u00", "'random\\u00\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u00", "'random\\u00\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u00", "'random\\u00\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u00", "'random\\u00\u2029newline'");

        fail("catches invalid newlines after Unicode \\u0a", "'random\\u0a\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u0a", "'random\\u0a\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u0a", "'random\\u0a\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u0a", "'random\\u0a\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u0a", "'random\\u0a\u2029newline'");

        fail("catches invalid newlines after Unicode \\u000", "'random\\u000\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u000", "'random\\u000\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u000", "'random\\u000\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u000", "'random\\u000\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u000", "'random\\u000\u2029newline'");

        fail("catches invalid newlines after Unicode \\u00a", "'random\\u00a\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u00a", "'random\\u00a\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u00a", "'random\\u00a\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u00a", "'random\\u00a\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u00a", "'random\\u00a\u2029newline'");

        fail("catches invalid newlines after Unicode \\u{", "'random\\u{\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u{", "'random\\u{\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u{", "'random\\u{\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u{", "'random\\u{\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u{", "'random\\u{\u2029newline'");

        fail("catches invalid newlines after Unicode \\u{0", "'random\\u{0\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u{0", "'random\\u{0\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u{0", "'random\\u{0\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u{0", "'random\\u{0\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u{0", "'random\\u{0\u2029newline'");

        fail("catches invalid newlines after Unicode \\u{a", "'random\\u{a\nnewline'");
        fail("catches invalid carriage returns after Unicode \\u{a", "'random\\u{a\rnewline'");
        fail("catches invalid Windows newlines after Unicode \\u{a", "'random\\u{a\r\nnewline'");
        fail("catches invalid line separators after Unicode \\u{a", "'random\\u{a\u2028newline'");
        fail("catches invalid paragraph separators after Unicode \\u{a", "'random\\u{a\u2029newline'");

        fail("catches invalid space after ASCII \\x", "'random\\x foo'");
        fail("catches invalid space after ASCII \\x0", "'random\\x0 foo'");
        fail("catches invalid space after Unicode \\u", "'random\\u foo'");
        fail("catches invalid space after Unicode \\u0", "'random\\u0 foo'");
        fail("catches invalid space after Unicode \\ua", "'random\\ua foo'");
        fail("catches invalid space after Unicode \\u00", "'random\\u00 foo'");
        fail("catches invalid space after Unicode \\u0a", "'random\\u0a foo'");
        fail("catches invalid space after Unicode \\u000", "'random\\u000 foo'");
        fail("catches invalid space after Unicode \\u00a", "'random\\u00a foo'");
        fail("catches invalid space after Unicode \\u{", "'random\\u{ foo'");
        fail("catches invalid space after Unicode \\u{0", "'random\\u{0 foo'");
        fail("catches invalid space after Unicode \\u{a", "'random\\u{a foo'");

        fail("catches invalid \\ after ASCII \\x", "'random\\x\\ foo'");
        fail("catches invalid \\ after ASCII \\x0", "'random\\x0\\ foo'");
        fail("catches invalid \\ after Unicode \\u", "'random\\u\\ foo'");
        fail("catches invalid \\ after Unicode \\u0", "'random\\u0\\ foo'");
        fail("catches invalid \\ after Unicode \\ua", "'random\\ua\\ foo'");
        fail("catches invalid \\ after Unicode \\u00", "'random\\u00\\ foo'");
        fail("catches invalid \\ after Unicode \\u0a", "'random\\u0a\\ foo'");
        fail("catches invalid \\ after Unicode \\u000", "'random\\u000\\ foo'");
        fail("catches invalid \\ after Unicode \\u00a", "'random\\u00a\\ foo'");
        fail("catches invalid \\ after Unicode \\u{", "'random\\u{\\ foo'");
        fail("catches invalid \\ after Unicode \\u{0", "'random\\u{0\\ foo'");
        fail("catches invalid \\ after Unicode \\u{a", "'random\\u{a\\ foo'");

        fail("catches invalid x after ASCII \\x", "'random\\xx foo'");
        fail("catches invalid x after ASCII \\x0", "'random\\x0x foo'");
        fail("catches invalid x after Unicode \\u", "'random\\ux foo'");
        fail("catches invalid x after Unicode \\u0", "'random\\u0x foo'");
        fail("catches invalid x after Unicode \\ua", "'random\\uax foo'");
        fail("catches invalid x after Unicode \\u00", "'random\\u00x foo'");
        fail("catches invalid x after Unicode \\u0a", "'random\\u0ax foo'");
        fail("catches invalid x after Unicode \\u000", "'random\\u000x foo'");
        fail("catches invalid x after Unicode \\u00a", "'random\\u00ax foo'");
        fail("catches invalid x after Unicode \\u{", "'random\\u{x foo'");
        fail("catches invalid x after Unicode \\u{0", "'random\\u{0x foo'");
        fail("catches invalid x after Unicode \\u{a", "'random\\u{ax foo'");

        fail("catches invalid X after ASCII \\x", "'random\\xX foo'");
        fail("catches invalid X after ASCII \\x0", "'random\\x0X foo'");
        fail("catches invalid X after Unicode \\u", "'random\\uX foo'");
        fail("catches invalid X after Unicode \\u0", "'random\\u0X foo'");
        fail("catches invalid X after Unicode \\ua", "'random\\uaX foo'");
        fail("catches invalid X after Unicode \\u00", "'random\\u00X foo'");
        fail("catches invalid X after Unicode \\u0a", "'random\\u0aX foo'");
        fail("catches invalid X after Unicode \\u000", "'random\\u000X foo'");
        fail("catches invalid X after Unicode \\u00a", "'random\\u00aX foo'");
        fail("catches invalid X after Unicode \\u{", "'random\\u{X foo'");
        fail("catches invalid X after Unicode \\u{0", "'random\\u{0X foo'");
        fail("catches invalid X after Unicode \\u{a", "'random\\u{aX foo'");

        fail("catches invalid u after ASCII \\x", "'random\\xu foo'");
        fail("catches invalid u after ASCII \\x0", "'random\\x0u foo'");
        fail("catches invalid u after Unicode \\u", "'random\\uu foo'");
        fail("catches invalid u after Unicode \\u0", "'random\\u0u foo'");
        fail("catches invalid u after Unicode \\ua", "'random\\uau foo'");
        fail("catches invalid u after Unicode \\u00", "'random\\u00u foo'");
        fail("catches invalid u after Unicode \\u0a", "'random\\u0au foo'");
        fail("catches invalid u after Unicode \\u000", "'random\\u000u foo'");
        fail("catches invalid u after Unicode \\u00a", "'random\\u00au foo'");
        fail("catches invalid u after Unicode \\u{", "'random\\u{u foo'");
        fail("catches invalid u after Unicode \\u{0", "'random\\u{0u foo'");
        fail("catches invalid u after Unicode \\u{a", "'random\\u{au foo'");

        fail("catches invalid U after ASCII \\x", "'random\\xU foo'");
        fail("catches invalid U after ASCII \\x0", "'random\\x0U foo'");
        fail("catches invalid U after Unicode \\u", "'random\\uU foo'");
        fail("catches invalid U after Unicode \\u0", "'random\\u0U foo'");
        fail("catches invalid U after Unicode \\ua", "'random\\uaU foo'");
        fail("catches invalid U after Unicode \\u00", "'random\\u00U foo'");
        fail("catches invalid U after Unicode \\u0a", "'random\\u0aU foo'");
        fail("catches invalid U after Unicode \\u000", "'random\\u000U foo'");
        fail("catches invalid U after Unicode \\u00a", "'random\\u00aU foo'");
        fail("catches invalid U after Unicode \\u{", "'random\\u{U foo'");
        fail("catches invalid U after Unicode \\u{0", "'random\\u{0U foo'");
        fail("catches invalid U after Unicode \\u{a", "'random\\u{aU foo'");

        fail("catches invalid { after ASCII \\x", "'random\\x{ foo'");
        fail("catches invalid { after ASCII \\x0", "'random\\x0{ foo'");
        fail("catches invalid { after Unicode \\u", "'random\\u{ foo'");
        fail("catches invalid { after Unicode \\u0", "'random\\u0{ foo'");
        fail("catches invalid { after Unicode \\ua", "'random\\ua{ foo'");
        fail("catches invalid { after Unicode \\u00", "'random\\u00{ foo'");
        fail("catches invalid { after Unicode \\u0a", "'random\\u0a{ foo'");
        fail("catches invalid { after Unicode \\u000", "'random\\u000{ foo'");
        fail("catches invalid { after Unicode \\u00a", "'random\\u00a{ foo'");
        fail("catches invalid { after Unicode \\u{", "'random\\u{{ foo'");
        fail("catches invalid { after Unicode \\u{0", "'random\\u{0{ foo'");
        fail("catches invalid { after Unicode \\u{a", "'random\\u{a{ foo'");

        fail("catches invalid } after ASCII \\x", "'random\\x} foo'");
        fail("catches invalid } after ASCII \\x0", "'random\\x0} foo'");
        fail("catches invalid } after Unicode \\u", "'random\\u} foo'");
        fail("catches invalid } after Unicode \\u0", "'random\\u0} foo'");
        fail("catches invalid } after Unicode \\ua", "'random\\ua} foo'");
        fail("catches invalid } after Unicode \\u00", "'random\\u00} foo'");
        fail("catches invalid } after Unicode \\u0a", "'random\\u0a} foo'");
        fail("catches invalid } after Unicode \\u000", "'random\\u000} foo'");
        fail("catches invalid } after Unicode \\u00a", "'random\\u00a} foo'");
        fail("catches invalid } after Unicode \\u{", "'random\\u{} foo'");

        pass("scans a single 'random\\u{0} foo'", {
            source: "'random\\u{0} foo'",
            steps: [
                {directive: Directive.Other, hasNext: false, line: 1, column: 17},
            ],
        });

        pass("scans a single 'random\\u{a} foo'", {
            source: "'random\\u{a} foo'",
            steps: [
                {directive: Directive.Other, hasNext: false, line: 1, column: 17},
            ],
        });

        pass("scans a single 'sloppy\\012escape'; 'use strict';", {
            source: "'sloppy\\012escape';\n'use strict';",
            steps: [
                {directive: Directive.Other, hasNext: true, line: 1, column: 18},
                {semi: true, hasNext: true, line: 1, column: 19},
                {directive: Directive.Strict, hasNext: true, line: 2, column: 12},
            ],
        });

        /* tslint:enable max-line-length */
    });
});
