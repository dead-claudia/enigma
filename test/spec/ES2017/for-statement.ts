import {parseScript} from "../../../src";
import * as assert from "clean-assert";

describe.skip("ES2017 - `for` Statement", () => {
    it("should throw on invalid var init for in\"", () => {
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; for (var i=0 in j);"); });
        assert.throws(SyntaxError, () => { parseScript("for (var {x}=0 in y);"); });
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; for (var {x}=0 in y);"); });
        assert.throws(SyntaxError, () => { parseScript("for (var {x}=0 in y);"); });
        assert.throws(SyntaxError, () => { parseScript("for (var [p]=0 in q);"); });
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; for (var [p]=1 in q);"); });
    });
});
