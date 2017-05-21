import {hasNext, consumeDirectiveSemicolon, consumeSemicolon} from "../../../src/scanner";
import {Token} from "../../../src/token";
import {Context} from "../../../src/common";
import {create} from "../../../src/parser";
import * as assert from "clean-assert";

describe("src/scanner/semicolon", () => {
    describe("consumeDirectiveSemicolon()", () => {
        it("consumes a `;`", () => {
            const parser = create("    \t \f\v;  \t ", undefined);

            assert.equal(consumeDirectiveSemicolon(parser, Context.Empty), true);
            assert.equal(hasNext(parser), true);
            assert.equal(parser.line, 1);
            assert.equal(parser.column, 9);
        });

        it("consumes an inserted `;` before a string", () => {
            const parser = create("    \t \f\v\n 'abc'  \t ", undefined);

            assert.equal(consumeDirectiveSemicolon(parser, Context.Empty), true);
            assert.equal(hasNext(parser), true);
            assert.equal(parser.line, 2);
            assert.equal(parser.column, 1);
        });

        it("doesn't consume an inserted `;` before a non-string", () => {
            const parser = create("    \t \f\v\n abc  \t ", undefined);

            assert.equal(consumeDirectiveSemicolon(parser, Context.Empty), false);
            assert.equal(hasNext(parser), true);
            assert.equal(parser.line, 2);
            assert.equal(parser.column, 1);
        });

        it("doesn't consume an inserted `;` at the end", () => {
            const parser = create("    \t \f\v\n", undefined);

            assert.equal(consumeDirectiveSemicolon(parser, Context.Empty), false);
            assert.equal(hasNext(parser), false);
            assert.equal(parser.line, 2);
            assert.equal(parser.column, 0);
        });

        it("doesn't consume a missing non-inserted `;` before a string", () => {
            const parser = create("    \t \f\v 'abc'  \t ", undefined);

            assert.equal(consumeDirectiveSemicolon(parser, Context.Empty), false);
            assert.equal(hasNext(parser), true);
            assert.equal(parser.line, 1);
            assert.equal(parser.column, 9);
        });

        it("doesn't consume a missing non-inserted `;` before a non-string", () => {
            const parser = create("    \t \f\v =  \t ", undefined);

            assert.equal(consumeDirectiveSemicolon(parser, Context.Empty), false);
            assert.equal(hasNext(parser), true);
            assert.equal(parser.line, 1);
            assert.equal(parser.column, 9);
        });

        it("doesn't consume a missing same-line `;` at the end", () => {
            const parser = create("    \t \f\v", undefined);

            assert.equal(consumeDirectiveSemicolon(parser, Context.Empty), false);
            assert.equal(hasNext(parser), false);
            assert.equal(parser.line, 1);
            assert.equal(parser.column, 8);
        });
    });

    describe("consumeSemicolon()", () => {
        it("consumes a `;`", () => {
            const parser = create("    \t \f\v;  \t ", undefined);

            consumeSemicolon(parser, Context.Empty);
            assert.equal(hasNext(parser), true);
            assert.equal(parser.line, 1);
            assert.equal(parser.column, 9);
        });

        it("consumes an inserted `;` before a string", () => {
            const parser = create("    \t \f\v\n 'abc'  \t ", undefined);

            consumeSemicolon(parser, Context.Empty);
            assert.equal(hasNext(parser), true);
            assert.equal(parser.line, 2);
            assert.equal(parser.column, 1);
        });

        it("consumes an inserted `;` before a non-string", () => {
            const parser = create("    \t \f\v\n abc  \t ", undefined);

            consumeSemicolon(parser, Context.Empty);
            assert.equal(hasNext(parser), true);
            assert.equal(parser.line, 2);
            assert.equal(parser.column, 1);
        });

        it("consumes an inserted `;` at the end", () => {
            const parser = create("    \t \f\v\n", undefined);

            consumeSemicolon(parser, Context.Empty);
            assert.equal(hasNext(parser), false);
            assert.equal(parser.line, 2);
            assert.equal(parser.column, 0);
        });

        it("doesn't consume a missing non-inserted `;` before a string", () => {
            const parser = create("    \t \f\v 'abc'  \t ", undefined);

            assert.throws(SyntaxError, () => {
                consumeSemicolon(parser, Context.Empty);
            });
        });

        it("doesn't consume a missing non-inserted `;` before a non-string", () => {
            const parser = create("    \t \f\v =  \t ", undefined);

            assert.throws(SyntaxError, () => {
                consumeSemicolon(parser, Context.Empty);
            });
        });

        it("consumes an inserted same-line `;` at the end", () => {
            const parser = create("    \t \f\v", undefined);

            consumeSemicolon(parser, Context.Empty);
            assert.equal(hasNext(parser), false);
            assert.equal(parser.line, 1);
            assert.equal(parser.column, 8);
        });
    });
});
