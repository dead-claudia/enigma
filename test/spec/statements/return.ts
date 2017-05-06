import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `return`", () => {

    it("should parse \"(function(){ return })\"", () => {
        expect(parseScript("(function(){ return })")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "ReturnStatement",
                            argument: null,
                        },
                    ],
                },
                generator: false,
                expression: false,
                async: false,
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"(function(){ return; })\"", () => {
        expect(parseScript("(function(){ return; })")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "ReturnStatement",
                            argument: null,
                        },
                    ],
                },
                generator: false,
                expression: false,
                async: false,
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"(function(){ return x * y })\"", () => {
        expect(parseScript("(function(){ return x * y })")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "FunctionExpression",
                id: null,
                params: [],
                body: {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "ReturnStatement",
                            argument: {
                                type: "BinaryExpression",
                                operator: "*",
                                left: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                right: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
                        },
                    ],
                },
                generator: false,
                expression: false,
                async: false,
            },
        },
    ],
    sourceType: "script",
});
    });

});
