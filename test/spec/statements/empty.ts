import {parseScript} from "../../../src";
import * as assert from "clean-assert";

describe.skip("Statements - Empty", () => {
    it("should parse \";\"", () => {
        assert.match(parseScript(";"), {
            type: "Program",
            sourceType: "script",
            body: [{type: "EmptyStatement"}],
        });
    });
});
