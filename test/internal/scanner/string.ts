import {hasNext, scan} from "../../../src/scanner";
import {fromCodePoint} from "../../../src/scanner/common";
import {Context} from "../../../src/common";
import {create} from "../../../src/parser";
import {Token} from "../../../src/token";
import {expect} from "chai";

describe("src/scanner/string", () => {
    describe("scanString()", () => {
        interface Opts {
            source: string;
            value: string;
            raw: string;
            line: number;
            column: number;
            strict?: boolean;
        }

        function pass(name: string, opts: Opts) {
            function test(name: string, context: Context, isEnd: boolean) {
                it(name, () => {
                    if (opts.strict !== true) {
                        const parser = create(isEnd ? opts.source : `${opts.source} `, undefined);

                        expect(scan(parser, context)).to.equal(Token.StringLiteral);
                        expect(hasNext(parser)).to.equal(!isEnd);
                        expect(parser.tokenValue).to.equal(opts.value);
                        if (context & Context.OptionsRaw) {
                            expect(parser.tokenRaw).to.equal(opts.raw);
                        }
                        expect(parser.line).to.equal(opts.line);
                        expect(parser.column).to.equal(opts.column);
                    }

                    if (opts.strict !== false) {
                        const parser = create(isEnd ? opts.source : `${opts.source} `, undefined);

                        expect(scan(parser, context | Context.Strict))
                        .to.equal(Token.StringLiteral);
                        expect(hasNext(parser)).to.equal(!isEnd);
                        expect(parser.tokenValue).to.equal(opts.value);
                        if (context & Context.OptionsRaw) {
                            expect(parser.tokenRaw).to.equal(opts.raw);
                        }
                        expect(parser.line).to.equal(opts.line);
                        expect(parser.column).to.equal(opts.column);
                    }
                });
            }

            test(`${name} (normal, has next)`, Context.Empty, false);
            test(`${name} (with raw, has next)`, Context.OptionsRaw, false);
            test(`${name} (normal, end)`, Context.Empty, true);
            test(`${name} (with raw, end)`, Context.OptionsRaw, true);
        }

        function fail(name: string, source: string, strict?: boolean) {
            function test(name: string, context: Context, isEnd: boolean) {
                it(name, () => {
                    if (strict !== true) {
                        const parser = create(isEnd ? source : `${source} `, undefined);
                        expect(() => {
                            scan(parser, context);
                        }).to.throw(SyntaxError);
                    }

                    if (strict !== false) {
                        const parser = create(isEnd ? source : `${source} `, undefined);
                        expect(() => {
                            scan(parser, context | Context.Strict);
                        }).to.throw(SyntaxError);
                    }
                });
            }

            test(`${name} (normal, has next)`, Context.Empty, false);
            test(`${name} (with raw, has next)`, Context.OptionsRaw, false);
            test(`${name} (normal, end)`, Context.Empty, true);
            test(`${name} (with raw, end)`, Context.OptionsRaw, true);
        }

        fail("doesn't scan '", "'");
        fail("doesn't scan \"", "\"");

        pass("scans ''", {
            source: "''",
            value: "",
            raw: "''",
            line: 1, column: 2,
        });

        pass("scans \"\"", {
            source: "\"\"",
            value: "",
            raw: "\"\"",
            line: 1, column: 2,
        });

        fail("doesn't scan '\\n'", "'\n'");
        fail("doesn't scan \"\\n\"", "\"\n\"");

        pass("scans 'abc'", {
            source: "'abc'",
            value: "abc",
            raw: "'abc'",
            line: 1, column: 5,
        });

        pass("scans \"abc\"", {
            source: "\"abc\"",
            value: "abc",
            raw: "\"abc\"",
            line: 1, column: 5,
        });

        pass("scans '123'", {
            source: "'123'",
            value: "123",
            raw: "'123'",
            line: 1, column: 5,
        });

        pass("scans \"123\"", {
            source: "\"123\"",
            value: "123",
            raw: "\"123\"",
            line: 1, column: 5,
        });

        // Keep an explosion of tests down.
        (() => {
            const enum Chars {
                EnglishUpperA = 0x41,
                EnglishUpperZ = 0x5A,
                EnglishLowerA = 0x61,
                EnglishLowerZ = 0x7A,
                RussianUpperА = 0x410,
                RussianUpperЯ = 0x42F,
                RussianUpperЁ = 0x401,
                RussianLowerА = 0x430,
                RussianLowerЯ = 0x44F,
                RussianLowerЁ = 0x451,
                Zero = 0x30,
                Nine = 0x39,
            }

            function attemptPart(
                message: string, raw: string, value: string,
                source: string, isEnd: boolean, context: Context, strict?: boolean,
            ) {
                if (strict !== true) {
                    const parser = create(source, undefined);
                    expect(scan(parser, context)).to.eql(Token.StringLiteral, message);
                    expect(hasNext(parser)).to.eql(!isEnd, message);
                    expect(parser.tokenValue).to.eql(value, message);
                    if (context & Context.OptionsRaw) expect(parser.tokenRaw).to.eql(raw, message);
                    expect(parser.line).to.eql(1, message);
                    expect(parser.column).to.eql(raw.length, message);
                }

                if (strict !== false) {
                    const parser = create(source, undefined);
                    expect(scan(parser, context | Context.Strict))
                    .to.eql(Token.StringLiteral, message);
                    expect(hasNext(parser)).to.eql(!isEnd, message);
                    expect(parser.tokenValue).to.eql(value, message);
                    if (context & Context.OptionsRaw) expect(parser.tokenRaw).to.eql(raw, message);
                    expect(parser.line).to.eql(1, message);
                    expect(parser.column).to.eql(raw.length, message);
                }
            }

            function attemptFailPart(
                message: string, source: string, context: Context, strict?: boolean,
            ) {
                if (strict !== true) {
                    const parser = create(source, undefined);
                    expect(() => {
                        scan(parser, context);
                    }).to.throw(SyntaxError, undefined, message);
                }

                if (strict !== false) {
                    const parser = create(source, undefined);
                    expect(() => {
                        scan(parser, context | Context.Strict);
                    }).to.throw(SyntaxError, undefined, message);
                }
            }

            function testCharPart(desc: string, raw: string, value: string, strict?: boolean) {
                attemptPart(
                    `${desc} (normal, has next)`, raw, value,
                    `${raw} `, false, Context.Empty, strict,
                );
                attemptPart(
                    `${desc} (with raw, has next)`, raw, value,
                    `${raw} `, false, Context.OptionsRaw, strict,
                );
                attemptPart(
                    `${desc} (normal, end)`, raw, value,
                    raw, true, Context.Empty, strict,
                );
                attemptPart(
                    `${desc} (with raw, end)`, raw, value,
                    raw, true, Context.OptionsRaw, strict,
                );
            }

            function failCharPart(desc: string, raw: string, value: string, strict?: boolean) {
                attemptFailPart(
                    `${desc} (normal, has next)`, `${raw} `, Context.Empty, strict,
                );
                attemptFailPart(
                    `${desc} (with raw, has next)`, `${raw} `, Context.OptionsRaw, strict,
                );
                attemptFailPart(
                    `${desc} (normal, end)`, raw, Context.Empty, strict,
                );
                attemptFailPart(
                    `${desc} (with raw, end)`, raw, Context.OptionsRaw, strict,
                );
            }

            function testChar(code: number): void {
                const letter = String.fromCharCode(code);

                testCharPart(`'${letter}'`, `'${letter}'`, letter);
                testCharPart(`"${letter}"`, `"${letter}"`, letter);
            }

            it("scans English capitals", () => {
                for (let code = Chars.EnglishUpperA; code <= Chars.EnglishUpperZ; code++) {
                    testChar(code);
                }
            });

            it("scans English small", () => {
                for (let code = Chars.EnglishLowerA; code <= Chars.EnglishLowerZ; code++) {
                    testChar(code);
                }
            });

            it("scans Russian capitals", () => {
                for (let code = Chars.RussianUpperА; code <= Chars.RussianUpperЯ; code++) {
                    testChar(code);
                }
                testChar(Chars.RussianUpperЁ);
            });

            it("scans Russian small", () => {
                for (let code = Chars.RussianLowerА; code <= Chars.RussianLowerЯ; code++) {
                    testChar(code);
                }
                testChar(Chars.RussianLowerЁ);
            });

            it("scans digits", () => {
                for (let code = Chars.Zero; code < Chars.Nine; code++) {
                    testChar(code);
                }
            });

            function testEscapedChar(code: number): void {
                const letter = String.fromCharCode(code);
                testCharPart(`'\\${letter}'`, `'\\${letter}'`, letter);
            }

            it("scans redundantly escaped English capitals", () => {
                for (let code = Chars.EnglishUpperA; code < Chars.EnglishUpperZ; code++) {
                    testEscapedChar(code);
                }
            });

            it("scans redundantly escaped English small", () => {
                const magicSmall = [..."bfnrtvxu"].map(c => c.charCodeAt(0));
                for (let code = Chars.EnglishLowerA; code < Chars.EnglishLowerZ; code++) {
                    if (magicSmall.indexOf(code) < 0) testEscapedChar(code);
                }
            });

            it("scans redundantly escaped Russian capitals", () => {
                for (let code = Chars.RussianUpperА; code < Chars.RussianUpperЯ; code++) {
                    testEscapedChar(code);
                }
                testEscapedChar(Chars.RussianUpperЁ);
            });

            it("scans redundantly escaped Russian small", () => {
                for (let code = Chars.RussianLowerА; code < Chars.RussianLowerЯ; code++) {
                    testEscapedChar(code);
                }
                testEscapedChar(Chars.RussianLowerЁ);
            });

            context("scans ASCII control escapes", () => {
                function getHex(code: number): string {
                    if (code < 0x10) return `0${code.toString(16)}`;
                    return code.toString(16);
                }

                it("scans \\x00 - \\xff", () => {
                    for (let code = 0x00; code < 0xff; code++) {
                        const ch = String.fromCharCode(code);
                        const escape = `\\x${getHex(code)}`;
                        testCharPart(`'${escape}'`, `'${escape}'`, ch);
                        testCharPart(`"${escape}"`, `"${escape}"`, ch);
                    }
                });

                it("scans \\x00 - \\xFF", () => {
                    for (let code = 0x00; code < 0xff; code++) {
                        const ch = String.fromCharCode(code);
                        const escape = `\\x${getHex(code).toUpperCase()}`;
                        testCharPart(`'${escape}'`, `'${escape}'`, ch);
                        testCharPart(`"${escape}"`, `"${escape}"`, ch);
                    }
                });

                fail("doesn't scan '\\x0g'", "'\\x0g'");
                fail("doesn't scan '\\xg0'", "'\\xg0'");
                fail("doesn't scan '\\xgg'", "'\\xgg'");
                fail("doesn't scan '\\xfg'", "'\\xfg'");
            });

            context("Unicode escapes", () => {
                function readEscape(code: number): string {
                    if (code < 0x10) return `\\u000${code.toString(16)}`;
                    if (code < 0x100) return `\\u00${code.toString(16)}`;
                    if (code < 0x1000) return `\\u0${code.toString(16)}`;
                    return `\\u${code.toString(16)}`;
                }

                for (let i = 0; i <= 0xff; i++) {
                    const start = i << 8;
                    const end = start | 0xff;

                    const startStr = readEscape(start);
                    const endStr = readEscape(end);

                    it(`scans ${startStr} - ${endStr}`, () => {
                        for (let code = start; code < end; code++) {
                            const ch = String.fromCharCode(code);
                            const escape = readEscape(code);
                            testCharPart(`'${escape}'`, `'${escape}'`, ch);
                            testCharPart(`"${escape}"`, `"${escape}"`, ch);
                        }
                    });
                }

                fail("doesn't scan '\\u000g'", "'\\u000g'");
                fail("doesn't scan '\\u00g0'", "'\\u00g0'");
                fail("doesn't scan '\\u0g00'", "'\\u0g00'");
                fail("doesn't scan '\\ug000'", "'\\ug000'");
                fail("doesn't scan '\\ugggg'", "'\\ugggg'");
                fail("doesn't scan '\\ufffg'", "'\\ufffg'");

                fail("doesn't scan '\\u1'", "'\\u1'");
                fail("doesn't scan '\\uA'", "'\\uA'");

                fail("doesn't scan '\\u11'", "'\\u11'");
                fail("doesn't scan '\\uAA'", "'\\uAA'");

                fail("doesn't scan '\\u111'", "'\\u111'");
                fail("doesn't scan '\\uAAA'", "'\\uAAA'");

                function checkNot5(source: string, code: number, letter: string) {
                    pass(`scans ${source}`, {
                        source,
                        value: String.fromCharCode(code) + letter,
                        raw: source,
                        line: 1, column: 9,
                    });
                }

                checkNot5("'\\u0001F'", 1, "F");
                checkNot5("\"\\u0001F\"", 1, "F");
                checkNot5("'\\u0002E'", 2, "E");
                checkNot5("\"\\u0002E\"", 2, "E");
                checkNot5("'\\u0003D'", 3, "D");
                checkNot5("\"\\u0003D\"", 3, "D");
                checkNot5("'\\u0004C'", 4, "C");
                checkNot5("\"\\u0004C\"", 4, "C");
                checkNot5("'\\u0005B'", 5, "B");
                checkNot5("\"\\u0005B\"", 5, "B");
                checkNot5("'\\u0006A'", 6, "A");
                checkNot5("\"\\u0006A\"", 6, "A");
                checkNot5("'\\u00079'", 7, "9");
                checkNot5("\"\\u00079\"", 7, "9");
                checkNot5("'\\u00088'", 8, "8");
                checkNot5("\"\\u00088\"", 8, "8");
                checkNot5("'\\u00097'", 9, "7");
                checkNot5("\"\\u00097\"", 9, "7");
                checkNot5("'\\u000A6'", 10, "6");
                checkNot5("\"\\u000A6\"", 10, "6");
                checkNot5("'\\u000B5'", 11, "5");
                checkNot5("\"\\u000B5\"", 11, "5");
                checkNot5("'\\u000C4'", 12, "4");
                checkNot5("\"\\u000C4\"", 12, "4");
                checkNot5("'\\u000D3'", 13, "3");
                checkNot5("\"\\u000D3\"", 13, "3");
                checkNot5("'\\u000E2'", 14, "2");
                checkNot5("\"\\u000E2\"", 14, "2");
                checkNot5("'\\u000F1'", 15, "1");
                checkNot5("\"\\u000F1\"", 15, "1");
            });

            context("Unicode brace escapes", () => {
                for (let i = 0x101; i <= 0x10f; i++) {
                    const start = i << 8;
                    const end = start | 0xff;

                    const startStr = `\\u{${start.toString(16)}}`;
                    const endStr = `\\u{${end.toString(16)}}`;

                    it(`scans ${startStr} - ${endStr}`, function () {
                        this.slow(100);
                        for (let code = start; code <= end; code++) {
                            const ch = fromCodePoint(code);
                            const escape = `\\u{${code.toString(16)}}`;
                            testCharPart(`'${escape}'`, `'${escape}'`, ch);
                            testCharPart(`"${escape}"`, `"${escape}"`, ch);

                            const extra0 = `\\u{0${code.toString(16)}}`;
                            testCharPart(`'${extra0}'`, `'${extra0}'`, ch);
                            testCharPart(`"${extra0}"`, `"${extra0}"`, ch);

                            const extra000 = `\\u{000${code.toString(16)}}`;
                            testCharPart(`'${extra000}'`, `'${extra000}'`, ch);
                            testCharPart(`"${extra000}"`, `"${extra000}"`, ch);
                        }
                    });
                }

                fail("doesn't scan '\\u{g}'", "'\\u{g}'");
                fail("doesn't scan '\\u{g0}'", "'\\u{g0}'");
                fail("doesn't scan '\\u{0g}'", "'\\u{0g}'");
                fail("doesn't scan '\\u{0g0}'", "'\\u{0g0}'");
                fail("doesn't scan '\\u{g0g}'", "'\\u{g0g}'");
                fail("doesn't scan '\\u{11000}'", "'\\u{11000}'");
                fail("doesn't scan '\\u{11fff}'", "'\\u{11fff}'");
            });

            context("legacy octal", () => {
                it("scans \\0 - \\7 (with possible leading zeroes)", () => {
                    for (let code = 0; code <= 6; code++) {
                        const ch = fromCodePoint(code);

                        const escape0 = `\\${code}`;
                        testCharPart(`'${escape0}'`, `'${escape0}'`, ch, false);
                        testCharPart(`"${escape0}"`, `"${escape0}"`, ch, false);
                        if (code !== 0) {
                            failCharPart(`'${escape0}'`, `'${escape0}'`, ch, true);
                            failCharPart(`"${escape0}"`, `"${escape0}"`, ch, true);
                        }

                        const escape1 = `\\0${code}`;
                        testCharPart(`'${escape1}'`, `'${escape1}'`, ch, false);
                        testCharPart(`"${escape1}"`, `"${escape1}"`, ch, false);
                        failCharPart(`'${escape1}'`, `'${escape1}'`, ch, true);
                        failCharPart(`"${escape1}"`, `"${escape1}"`, ch, true);

                        const escape2 = `\\00${code}`;
                        testCharPart(`'${escape2}'`, `'${escape2}'`, ch, false);
                        testCharPart(`"${escape2}"`, `"${escape2}"`, ch, false);
                        failCharPart(`'${escape2}'`, `'${escape2}'`, ch, true);
                        failCharPart(`"${escape2}"`, `"${escape2}"`, ch, true);
                    }
                });

                it("scans \\10 - \\77 (with possible leading zeroes)", () => {
                    for (let code = 0o10; code <= 0o77; code++) {
                        const ch = fromCodePoint(code);
                        const escape0 = `\\${code.toString(8)}`;
                        testCharPart(`'${escape0}'`, `'${escape0}'`, ch, false);
                        testCharPart(`"${escape0}"`, `"${escape0}"`, ch, false);
                        failCharPart(`'${escape0}'`, `'${escape0}'`, ch, true);
                        failCharPart(`"${escape0}"`, `"${escape0}"`, ch, true);

                        const escape1 = `\\0${code.toString(8)}`;
                        testCharPart(`'${escape1}'`, `'${escape1}'`, ch, false);
                        testCharPart(`"${escape1}"`, `"${escape1}"`, ch, false);
                        failCharPart(`'${escape1}'`, `'${escape1}'`, ch, true);
                        failCharPart(`"${escape1}"`, `"${escape1}"`, ch, true);
                    }
                });

                it("scans \\100 - \\377 (with possible leading zeroes)", () => {
                    for (let code = 0o100; code <= 0o377; code++) {
                        const ch = fromCodePoint(code);
                        const escape0 = `\\${code.toString(8)}`;
                        testCharPart(`'${escape0}'`, `'${escape0}'`, ch, false);
                        testCharPart(`"${escape0}"`, `"${escape0}"`, ch, false);
                        failCharPart(`'${escape0}'`, `'${escape0}'`, ch, true);
                        failCharPart(`"${escape0}"`, `"${escape0}"`, ch, true);
                    }
                });
            });
        })();

        fail("doesn't scan '\\'", "'\\'");
        fail("doesn't scan \"\\\"", "\"\\\"");

        fail("doesn't scan '\\\\\\'", "'\\\\\\'");
        fail("doesn't scan \"\\\\\\\"", "\"\\\\\\\"");

        pass("should scan '\\b'", {
            source: "'\\b'",
            value: "\b",
            raw: "'\\b'",
            line: 1, column: 4,
        });

        pass("should scan \"\\b\"", {
            source: "\"\\b\"",
            value: "\b",
            raw: "\"\\b\"",
            line: 1, column: 4,
        });

        pass("should scan '\\t'", {
            source: "'\\t'",
            value: "\t",
            raw: "'\\t'",
            line: 1, column: 4,
        });

        pass("should scan \"\\t\"", {
            source: "\"\\t\"",
            value: "\t",
            raw: "\"\\t\"",
            line: 1, column: 4,
        });

        pass("should scan '\\n'", {
            source: "'\\n'",
            value: "\n",
            raw: "'\\n'",
            line: 1, column: 4,
        });

        pass("should scan \"\\n\"", {
            source: "\"\\n\"",
            value: "\n",
            raw: "\"\\n\"",
            line: 1, column: 4,
        });

        pass("should scan '\\v'", {
            source: "'\\v'",
            value: "\v",
            raw: "'\\v'",
            line: 1, column: 4,
        });

        pass("should scan \"\\v\"", {
            source: "\"\\v\"",
            value: "\v",
            raw: "\"\\v\"",
            line: 1, column: 4,
        });

        pass("should scan '\\f'", {
            source: "'\\f'",
            value: "\f",
            raw: "'\\f'",
            line: 1, column: 4,
        });

        pass("should scan \"\\f\"", {
            source: "\"\\f\"",
            value: "\f",
            raw: "\"\\f\"",
            line: 1, column: 4,
        });

        pass("should scan '\\r'", {
            source: "'\\r'",
            value: "\r",
            raw: "'\\r'",
            line: 1, column: 4,
        });

        pass("should scan \"\\r\"", {
            source: "\"\\r\"",
            value: "\r",
            raw: "\"\\r\"",
            line: 1, column: 4,
        });

        pass("should scan '\\\"'", {
            source: "'\\\"'",
            value: "\"",
            raw: "'\\\"'",
            line: 1, column: 4,
        });

        pass("should scan \"\\\"\"", {
            source: "\"\\r\"",
            value: "\r",
            raw: "\"\\r\"",
            line: 1, column: 4,
        });

        pass("should scan '\\\''", {
            source: "'\\\''",
            value: "\'",
            raw: "'\\\''",
            line: 1, column: 4,
        });

        pass("should scan \"\\\'\"", {
            source: "\"\\'\"",
            value: "\'",
            raw: "\"\\'\"",
            line: 1, column: 4,
        });

        pass("should scan '\"'", {
            source: "'\"'",
            value: "\"",
            raw: "'\"'",
            line: 1, column: 3,
        });

        pass("should scan \"'\"", {
            source: "\"'\"",
            value: "\'",
            raw: "\"'\"",
            line: 1, column: 3,
        });

        fail("doesn't scan '\\1'", "'\\1'", true);
        fail("doesn't scan \"\\1\"", "\"\\1\"", true);

        fail("doesn't scan '\\7'", "'\\7'", true);
        fail("doesn't scan \"\\7\"", "\"\\7\"", true);

        pass("should scan '\\0'", {
            source: "'\\0'",
            value: "\0",
            raw: "'\\0'",
            line: 1, column: 4,
        });

        pass("should scan \"\\0\"", {
            source: "\"\\0\"",
            value: "\0",
            raw: "\"\\0\"",
            line: 1, column: 4,
        });

        pass("should scan '\\u180E'", {
            source: "'\u180E'",
            value: "\u180E",
            raw: "'\u180E'",
            line: 1, column: 3,
        });

        pass("should scan \"\\u180E\"", {
            source: "\"\u180E\"",
            value: "\u180E",
            raw: "\"\u180E\"",
            line: 1, column: 3,
        });
    });
});
