import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Declarations - `var`", () => {
    it("should throw on invalid \"var catch = 123;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`var catch = 123;`));
    });

    it("should throw on invalid \"var break = 123;;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`var break = 123;;`));
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`var class = 123;`));
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`var delete = 123;`));
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`var do = 123;`));
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        assert.throws(SyntaxError, () => parseScript(`var delete = 123;`));
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        assert.throws(SyntaxError, () => parseScript(`var do = 123;`));
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        assert.throws(SyntaxError, () => parseScript(`var else  = 123;`));
    });

    it("should throw on invalid \"var typeof = 123;\"", () => {
        assert.throws(SyntaxError, () => parseScript(`var typeof = 123;`));
    });

    it("should throw on invalid \"var throw = 123;\"", () => {
        assert.throws(SyntaxError, () => parseScript(`var throw = 123;`));
    });
    it("should throw on invalid \"var class = 123;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`var import = 123;`));
    });

    it("should throw on invalid \"var catch = 123;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`var catch = 123;`));
    });

    it("should throw on invalid \"var let\"", () => {
        assert.throws(SyntaxError, () => parseModule(`var let`));
    });
    it("should parse \"var static;\"", () => {
        assert.match<Program>(parseScript(`var static;`), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "static",
                            },
                            init: null,
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var let\"", () => {
        assert.match<Program>(parseScript(`var let`), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "let",
                            },
                            init: null,
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });
});
