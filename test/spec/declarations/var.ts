import {parseScript, parseModule} from "../../../src";
import {expect} from "chai";

describe.skip("Declarations - `var`", () => {
    it("should throw on invalid \"var catch = 123;\"", () => {
        expect(() => parseModule(`var catch = 123;`)).to.throw();
    });

    it("should throw on invalid \"var break = 123;;\"", () => {
        expect(() => parseModule(`var break = 123;;`)).to.throw();
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        expect(() => parseModule(`var class = 123;`)).to.throw();
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        expect(() => parseModule(`var delete = 123;`)).to.throw();
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        expect(() => parseModule(`var do = 123;`)).to.throw();
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        expect(() => parseScript(`var delete = 123;`)).to.throw();
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        expect(() => parseScript(`var do = 123;`)).to.throw();
    });

    it("should throw on invalid \"var class = 123;\"", () => {
        expect(() => parseScript(`var else  = 123;`)).to.throw();
    });

    it("should throw on invalid \"var typeof = 123;\"", () => {
        expect(() => parseScript(`var typeof = 123;`)).to.throw();
    });

    it("should throw on invalid \"var throw = 123;\"", () => {
        expect(() => parseScript(`var throw = 123;`)).to.throw();
    });
    it("should throw on invalid \"var class = 123;\"", () => {
        expect(() => parseModule(`var import = 123;`)).to.throw();
    });

    it("should throw on invalid \"var catch = 123;\"", () => {
        expect(() => parseModule(`var catch = 123;`)).to.throw();
    });

    it("should throw on invalid \"var let\"", () => {
        expect(() => parseModule(`var let`)).to.throw();
    });
    it("should parse \"var static;\"", () => {
        expect(parseScript(`var static;`)).to.eql({
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
        expect(parseScript(`var let`)).to.eql({
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
