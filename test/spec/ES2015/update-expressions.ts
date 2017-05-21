import {parseScript, parseModule} from "../../../src";

describe.skip("ES2015 - Update Expressions", () => {
    it("should handle increment", () => {
        parseScript("++a");
    });
    it("should handle decrement", () => {
        parseScript("--a");
    });
});
