import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("Test262 - Keywords", () => {
    it("should throw on \"instanceof = 1;\"", () => {
        expect(() => { parseScript(`instanceof = 1;`); }).to.throw();
    });
    it("should throw on \"break = 1;\"", () => {
        expect(() => { parseScript(`break = 1;`); }).to.throw();
    });
    it("should throw on \"return = 1;\"", () => {
        expect(() => { parseScript(`return = 1;`); }).to.throw();
    });
    it("should throw on \"typeof = 1;\"", () => {
        expect(() => { parseScript(`typeof = 1;"`); }).to.throw();
    });
    it("should throw on \"this = 1;\"", () => {
        expect(() => { parseScript(`this = 1;`); }).to.throw();
    });
    it("should throw on \"with = 1;\"", () => {
        expect(() => { parseScript(`with = 1;')`); }).to.throw();
    });
    it("should throw on \"do = 1;\"", () => {
        expect(() => { parseScript(`do = 1;`); }).to.throw();
    });
    it("should throw on \"else = 1;\"", () => {
        expect(() => { parseScript(`else = 1;`); }).to.throw();
    });
    it("should throw on \"finally = 1;\"", () => {
        expect(() => { parseScript(`finally = 1;`); }).to.throw();
    });
});
