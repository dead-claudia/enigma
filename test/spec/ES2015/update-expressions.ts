import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";
describe.skip("ES2015 - Update Expressions", () => {
    it("should handle increment", () => {
        expect(() => { parseScript("++a"); }).not.to.throw();
    });
    it("should handle decrement", () => {
        expect(() => { parseScript("--a"); }).not.to.throw();
    });
});
