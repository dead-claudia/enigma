import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - `new`", () => {

    it("should parse \"new a(b,c)\"", () => {
        expect(parseScript("new a(b,c)")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "Identifier",
                    name: "a",
                },
                arguments: [
                    {
                        type: "Identifier",
                        name: "b",
                    },
                    {
                        type: "Identifier",
                        name: "c",
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"new Button\"", () => {
        expect(parseScript("new Button")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "Identifier",
                    name: "Button",
                },
                arguments: [],
            },
        },
    ],
    sourceType: "script",
});
      });

    it("should parse \"new Button()\"", () => {
        expect(parseScript("new Button()")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "Identifier",
                    name: "Button",
                },
                arguments: [],
            },
        },
    ],
    sourceType: "script",
});
      });

    it("should parse \"new Button(a)\"", () => {
        expect(parseScript("new Button(a)")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "Identifier",
                    name: "Button",
                },
                arguments: [
                    {
                        type: "Identifier",
                        name: "a",
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
      });

    it("should parse new new foo\"", () => {
        expect(parseScript("new new foo")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "NewExpression",
                    callee: {
                        type: "Identifier",
                        name: "foo",
                    },
                    arguments: [],
                },
                arguments: [],
            },
        },
    ],
    sourceType: "script",
});
      });

    it("should parse \"new new foo()\"", () => {
        expect(parseScript("new new foo()")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "NewExpression",
                    callee: {
                        type: "Identifier",
                        name: "foo",
                    },
                    arguments: [],
                },
                arguments: [],
            },
        },
    ],
    sourceType: "script",
});
      });

    it("should parse \"new f(...a)\"", () => {
        expect(parseScript("new f(...a)")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "Identifier",
                    name: "f",
                },
                arguments: [
                    {
                        type: "SpreadElement",
                        argument: {
                            type: "Identifier",
                            name: "a",
                        },
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
      });

    it("should parse \"new f(...a = b)\"", () => {
        expect(parseScript("new f(...a = b)")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "NewExpression",
                callee: {
                    type: "Identifier",
                    name: "f",
                },
                arguments: [
                    {
                        type: "SpreadElement",
                        argument: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
      });

});
