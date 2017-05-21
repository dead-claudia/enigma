import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2016 - Identifiers", () => {
    it("should pass", () => {
        assert.match<Program>(parseScript("ૹ"), {
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
