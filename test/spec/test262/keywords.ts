import {parseScript, parseModule} from "../../../src";
import * as assert from "clean-assert";

describe.skip("Test262 - Keywords", () => {
    it("should throw on \"instanceof = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`instanceof = 1;`); });
    });
    it("should throw on \"break = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`break = 1;`); });
    });
    it("should throw on \"return = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`return = 1;`); });
    });
    it("should throw on \"typeof = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`typeof = 1;"`); });
    });
    it("should throw on \"this = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`this = 1;`); });
    });
    it("should throw on \"with = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`with = 1;')`); });
    });
    it("should throw on \"do = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`do = 1;`); });
    });
    it("should throw on \"else = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`else = 1;`); });
    });
    it("should throw on \"finally = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`finally = 1;`); });
    });
});
