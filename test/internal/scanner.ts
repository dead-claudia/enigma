import {hasNext, seek, Seek} from "../../src/scanner";
import {create} from "../../src/parser";
import {expect} from "chai";

describe("src/scanner", () => {
    describe("seek()", () => {
        it("skips nothing", () => {
            const parser = create("", undefined);

            expect(seek(parser)).to.equal(Seek.None);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(0);
        });

        it("skips spaces", () => {
            const parser = create("        ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(8);
        });

        it("skips tabs", () => {
            const parser = create("\t\t\t\t\t\t\t\t", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(8);
        });

        it("skips vertical tabs", () => {
            const parser = create("\v\v\v\v\v\v\v\v", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(8);
        });

        it("skips line feeds", () => {
            const parser = create("\n\n\n\n\n\n\n\n", undefined);

            expect(seek(parser)).to.equal(Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(9);
            expect(parser.column).to.equal(0);
        });

        it("skips carriage returns", () => {
            const parser = create("\r\r\r\r\r\r\r\r", undefined);

            expect(seek(parser)).to.equal(Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(9);
            expect(parser.column).to.equal(0);
        });

        it("skips Windows newlines", () => {
            const parser = create("\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n", undefined);

            expect(seek(parser)).to.equal(Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(9);
            expect(parser.column).to.equal(0);
        });

        it("skips line separators", () => {
            const parser = create("\u2028\u2028\u2028\u2028\u2028\u2028\u2028\u2028", undefined);

            expect(seek(parser)).to.equal(Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(9);
            expect(parser.column).to.equal(0);
        });

        it("skips paragraph separators", () => {
            const parser = create("\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029", undefined);

            expect(seek(parser)).to.equal(Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(9);
            expect(parser.column).to.equal(0);
        });

        it("skips mixed whitespace", () => {
            const parser = create("    \t \r\n \n\r \v\f\t ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(4);
            expect(parser.column).to.equal(5);
        });

        it("skips single line comments with line feed", () => {
            const parser = create("  \t // foo bar\n  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(2);
        });

        it("skips single line comments with carriage return", () => {
            const parser = create("  \t // foo bar\r  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(2);
        });

        it("skips single line comments with Windows newlines", () => {
            const parser = create("  \t // foo bar\r\n  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(2);
        });

        it("skips single line comments with line separators", () => {
            const parser = create("  \t // foo bar\u2028  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(2);
        });

        it("skips single line comments with paragraph separators", () => {
            const parser = create("  \t // foo bar\u2029  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(2);
        });

        it("skips multiple single line comments with line feed", () => {
            const parser = create("  \t // foo bar\n // baz \n //", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(3);
        });

        it("skips multiple single line comments with carriage return", () => {
            const parser = create("  \t // foo bar\r // baz \n //", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(3);
        });

        it("skips multiple single line comments with Windows newlines", () => {
            const parser = create("  \t // foo bar\r\n // baz \n //", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(3);
        });

        it("skips multiple single line comments with line separators", () => {
            const parser = create("  \t // foo bar\u2028 // baz \n //", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(3);
        });

        it("skips multiple single line comments with paragraph separators", () => {
            const parser = create("  \t // foo bar\u2029 // baz \n //", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(3);
        });

        // ----------------------------------------------------------------------------------------
        it("skips multiline comments with nothing", () => {
            const parser = create("  \t /* foo * /* bar */  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(24);
        });

        it("skips multiline comments with line feed", () => {
            const parser = create("  \t /* foo * /* bar \n */  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(5);
        });

        it("skips multiline comments with carriage return", () => {
            const parser = create("  \t /* foo * /* bar \r */  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(5);
        });

        it("skips multiline comments with Windows newlines", () => {
            const parser = create("  \t /* foo * /* bar \r\n */  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(5);
        });

        it("skips multiline comments with line separators", () => {
            const parser = create("  \t /* foo * /* bar \u2028 */  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(5);
        });

        it("skips single line comments with paragraph separators", () => {
            const parser = create("  \t /* foo * /* bar\u2029 */  ", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(5);
        });

        it("skips multiple single line comments with line feed", () => {
            const parser = create("  \t /* foo bar\n *//* baz*/ \n /**/", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(5);
        });

        it("skips multiple single line comments with carriage return", () => {
            const parser = create("  \t /* foo bar\r *//* baz*/ \n /**/", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(5);
        });

        it("skips multiple single line comments with Windows newlines", () => {
            const parser = create("  \t /* foo bar\r\n *//* baz*/ \n /**/", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(5);
        });

        it("skips multiple single line comments with line separators", () => {
            const parser = create("  \t /* foo bar\u2028 *//* baz*/ \n /**/", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(5);
        });

        it("skips multiple single line comments with paragraph separators", () => {
            const parser = create("  \t /* foo bar\u2029 *//* baz*/ \n /**/", undefined);

            expect(seek(parser)).to.equal(Seek.SameLine | Seek.NewLine);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(3);
            expect(parser.column).to.equal(5);
        });
    });
});
