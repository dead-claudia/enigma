import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `debugger`", () => {
    it("should parse \"\"debugger;\"", () => {
        expect(parseScript("debugger;")).to.eql({
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
        expect(parseScript("while (false) debugger;")).to.eql({
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
