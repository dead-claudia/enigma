import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2017 - `for` Statement", () => {
    it("should throw on invalid var init for in\"", () => {
        expect(() => { parseScript("\"use strict\"; for (var i=0 in j);"); }).to.throw();
        expect(() => { parseScript("for (var {x}=0 in y);"); }).to.throw();
        expect(() => { parseScript("\"use strict\"; for (var {x}=0 in y);"); }).to.throw();
        expect(() => { parseScript("for (var {x}=0 in y);"); }).to.throw();
        expect(() => { parseScript("for (var [p]=0 in q);"); }).to.throw();
        expect(() => { parseScript("\"use strict\"; for (var [p]=1 in q);"); }).to.throw();
    });
});
