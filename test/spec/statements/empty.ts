import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - Empty", () => {
    it("should parse \";\"", () => {
        expect(parseScript(";")).to.eql({
            type: "Program",
            body: [
                {
                    type: "EmptyStatement",
                },
            ],
            sourceType: "script",
        });
    });
});
