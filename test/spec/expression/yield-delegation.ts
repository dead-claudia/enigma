import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - `yield` Delegation", () => {
    it("should parse \"function a(){yield*a}\"", () => {
        expect(parseScript("function a(){yield*a}")).to.eql({
    type: "Program",
    body: [
        {
            type: "FunctionDeclaration",
            id: {
                type: "Identifier",
                name: "a",
            },
            params: [],
            body: {
                type: "BlockStatement",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "BinaryExpression",
                            operator: "*",
                            left: {
                                type: "Identifier",
                                name: "yield",
                            },
                            right: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                    },
                ],
            },
            generator: false,
            expression: false,
            async: false,
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"function*a(){yield*a}\"", () => {
        expect(parseScript("function*a(){yield*a}")).to.eql({
    type: "Program",
    body: [
        {
            type: "FunctionDeclaration",
            id: {
                type: "Identifier",
                name: "a",
            },
            params: [],
            body: {
                type: "BlockStatement",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "YieldExpression",
                            argument: {
                                type: "Identifier",
                                name: "a",
                            },
                            delegate: true,
                        },
                    },
                ],
            },
            generator: true,
            expression: false,
            async: false,
        },
    ],
    sourceType: "script",
});
    });
});
