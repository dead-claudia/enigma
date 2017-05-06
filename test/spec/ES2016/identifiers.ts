import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("ES2016 - Identifiers", () => {
    it("should pass", () => {
        expect(parseScript("ૹ")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Identifier",
                        name: "ૹ",
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
