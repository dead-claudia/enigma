import { parseScript, parseModule } from "../../src";
import {Program} from "../../src/estree";
import * as assert from "clean-assert";

describe.skip("Locations", () => {
    it("should parse \"var a = 1;\" with ranges", () => {
        assert.match<Program>(parseScript(`var a = 1;`, { ranges: true}), {
            body: [
                {
                    declarations: [
                        {
                            end: 9,
                            id: {
                                end: 5,
                                name: "a",
                                start: 3,
                                type: "Identifier",
                            },
                            init: {
                                end: 9,
                                start: 7,
                                type: "Literal",
                                value: 1,
                            },
                            start: 3,
                            type: "VariableDeclarator",
                        },
                    ],
                    end: 10,
                    kind: "var",
                    start: 0,
                    type: "VariableDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });
});
