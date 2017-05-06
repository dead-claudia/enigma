import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("Test262 - Line Terminators", () => {
    it("should parse \"/*\u2028 multi line \u2028 comment \u2028 x = 1;*/\"", () => {
        expect(parseScript(`/*\u2028 multi line \u2028 comment \u2028 x = 1;*/`)).to.eql({
            type: "Program",
            sourceType: "script",
            body: [],
        });
    });

    it("should parse \"\u2029var\u2029x\u2029=\u2029y\u2029%\u2029z\u2029; result = x;\"", () => {
        expect(parseScript(`\u2029var\u2029x\u2029=\u2029y\u2029%\u2029z\u2029; result = x;`))
        .to.eql({
            body: [
                {
                    declarations: [
                        {
                            id: {
                                name: "x",
                                type: "Identifier",
                            },
                            init: {
                                left: {
                                    name: "y",
                                    type: "Identifier",
                                },
                                operator: "%",
                                right: {
                                    name: "z",
                                    type: "Identifier",
                                },
                                type: "BinaryExpression",
                            },
                            type: "VariableDeclarator",
                        },
                    ],
                    kind: "var",
                    type: "VariableDeclaration",
                },
                {
                    expression: {
                        left: {
                            name: "result",
                            type: "Identifier",
                        },
                        operator: "=",
                        right: {
                            name: "x",
                            type: "Identifier",
                        },
                        type: "AssignmentExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should throw on \"var\u2028x;\"", () => {
        expect(() => { parseScript(`var\u2028x;`); }).to.throw();
    });

    it("should throw on \"var\\nx\\n=\\ny\\n<\\nz\\n; x === true\"", () => {
        expect(() => { parseScript(`var\\nx\\n=\\ny\\n<\\nz\\n; x === true`); }).to.throw();
    });

});
