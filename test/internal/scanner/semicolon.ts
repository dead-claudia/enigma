import {hasNext, consumeDirectiveSemicolon, consumeSemicolon} from "../../../src/scanner";
import {Token} from "../../../src/token";
import {Context} from "../../../src/common";
import {create} from "../../../src/parser";
import {expect} from "chai";

describe("src/scanner/semicolon", () => {
    describe("consumeDirectiveSemicolon()", () => {
        it("consumes a `;`", () => {
            const parser = create("    \t \f\v;  \t ", undefined);

            expect(consumeDirectiveSemicolon(parser, Context.Empty)).to.equal(true);
            expect(hasNext(parser)).to.equal(true);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(9);
        });

        it("consumes an inserted `;` before a string", () => {
            const parser = create("    \t \f\v\n 'abc'  \t ", undefined);

            expect(consumeDirectiveSemicolon(parser, Context.Empty)).to.equal(true);
            expect(hasNext(parser)).to.equal(true);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(1);
        });

        it("doesn't consume an inserted `;` before a non-string", () => {
            const parser = create("    \t \f\v\n abc  \t ", undefined);

            expect(consumeDirectiveSemicolon(parser, Context.Empty)).to.equal(false);
            expect(hasNext(parser)).to.equal(true);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(1);
        });

        it("doesn't consume an inserted `;` at the end", () => {
            const parser = create("    \t \f\v\n", undefined);

            expect(consumeDirectiveSemicolon(parser, Context.Empty)).to.equal(false);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(0);
        });

        it("doesn't consume a missing non-inserted `;` before a string", () => {
            const parser = create("    \t \f\v 'abc'  \t ", undefined);

            expect(consumeDirectiveSemicolon(parser, Context.Empty)).to.equal(false);
            expect(hasNext(parser)).to.equal(true);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(9);
        });

        it("doesn't consume a missing non-inserted `;` before a non-string", () => {
            const parser = create("    \t \f\v =  \t ", undefined);

            expect(consumeDirectiveSemicolon(parser, Context.Empty)).to.equal(false);
            expect(hasNext(parser)).to.equal(true);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(9);
        });

        it("doesn't consume a missing same-line `;` at the end", () => {
            const parser = create("    \t \f\v", undefined);

            expect(consumeDirectiveSemicolon(parser, Context.Empty)).to.equal(false);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(8);
        });
    });

    describe("consumeSemicolon()", () => {
        it("consumes a `;`", () => {
            const parser = create("    \t \f\v;  \t ", undefined);

            consumeSemicolon(parser, Context.Empty);
            expect(hasNext(parser)).to.equal(true);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(9);
        });

        it("consumes an inserted `;` before a string", () => {
            const parser = create("    \t \f\v\n 'abc'  \t ", undefined);

            consumeSemicolon(parser, Context.Empty);
            expect(hasNext(parser)).to.equal(true);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(1);
        });

        it("consumes an inserted `;` before a non-string", () => {
            const parser = create("    \t \f\v\n abc  \t ", undefined);

            consumeSemicolon(parser, Context.Empty);
            expect(hasNext(parser)).to.equal(true);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(1);
        });

        it("consumes an inserted `;` at the end", () => {
            const parser = create("    \t \f\v\n", undefined);

            consumeSemicolon(parser, Context.Empty);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(2);
            expect(parser.column).to.equal(0);
        });

        it("doesn't consume a missing non-inserted `;` before a string", () => {
            const parser = create("    \t \f\v 'abc'  \t ", undefined);

            expect(() => {
                consumeSemicolon(parser, Context.Empty);
            }).to.throw(SyntaxError);
        });

        it("doesn't consume a missing non-inserted `;` before a non-string", () => {
            const parser = create("    \t \f\v =  \t ", undefined);

            expect(() => {
                consumeSemicolon(parser, Context.Empty);
            }).to.throw(SyntaxError);
        });

        it("consumes an inserted same-line `;` at the end", () => {
            const parser = create("    \t \f\v", undefined);

            consumeSemicolon(parser, Context.Empty);
            expect(hasNext(parser)).to.equal(false);
            expect(parser.line).to.equal(1);
            expect(parser.column).to.equal(8);
        });
    });
});
