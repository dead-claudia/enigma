import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `debugger`", () => {
    it("should parse \"\"debugger;\"", () => {
        assert.match<Program>(parseScript("debugger;"), {
            type: "Program",
            body: [
                {
                    type: "DebuggerStatement",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"while (false) debugger;\"", () => {
        assert.match<Program>(parseScript("while (false) debugger;"), {
            type: "Program",
            body: [
                {
                    type: "WhileStatement",
                    test: {
                        type: "Literal",
                        value: false,
                    },
                    body: {
                        type: "DebuggerStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
