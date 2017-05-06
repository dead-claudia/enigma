import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `while`", () => {

  it("should parse \"while (x < 10) { x++; y--; }\"", () => {
        expect(parseScript("while (x < 10) { x++; y--; }")).to.eql({
    type: "Program",
    body: [
        {
            type: "WhileStatement",
            test: {
                type: "BinaryExpression",
                operator: "<",
                left: {
                    type: "Identifier",
                    name: "x",
                },
                right: {
                    type: "Literal",
                    value: 10,
                },
            },
            body: {
                type: "BlockStatement",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "UpdateExpression",
                            operator: "++",
                            argument: {
                                type: "Identifier",
                                name: "x",
                            },
                            prefix: false,
                        },
                    },
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "UpdateExpression",
                            operator: "--",
                            argument: {
                                type: "Identifier",
                                name: "y",
                            },
                            prefix: false,
                        },

                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
        });

  it("should handle While statement", () => {

        expect(parseScript(`while(1);`)).to.eql({
        body: [
          {
           body: {
              type: "EmptyStatement",
           },
            test: {
              type: "Literal",
              value: 1,
            },
            type: "WhileStatement",
          },
        ],
        sourceType: "script",
        type: "Program",
      });

        expect(parseScript(`while (true) {}`)).to.eql({
        body: [
          {
            body: {
              body: [],
              type: "BlockStatement",
            },
            test: {
              type: "Literal",
              value: true,
            },
            type: "WhileStatement",
          },
        ],
        sourceType: "script",
        type: "Program",
      });

        expect(parseScript(`while (true) doSomething()`)).to.eql({
        body: [
          {
            body: {
              expression: {
                arguments: [],
                callee: {
                  name: "doSomething",
                  type: "Identifier",
                },
                type: "CallExpression",
              },
              type: "ExpressionStatement",
            },
            test: {
              type: "Literal",
              value: true,
            },
            type: "WhileStatement",
          },
        ],
        sourceType: "script",
        type: "Program",
      });

        expect(parseScript(`while (x < 10) { x++; y--; }`)).to.eql({
    type: "Program",
    body: [
        {
            type: "WhileStatement",
            test: {
                type: "BinaryExpression",
                operator: "<",
                left: {
                    type: "Identifier",
                    name: "x",
                },
                right: {
                    type: "Literal",
                    value: 10,
                },
            },
            body: {
                type: "BlockStatement",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "UpdateExpression",
                            operator: "++",
                            argument: {
                                type: "Identifier",
                                name: "x",
                            },
                            prefix: false,
                        },
                    },
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "UpdateExpression",
                            operator: "--",
                            argument: {
                                type: "Identifier",
                                name: "y",
                            },
                            prefix: false,
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
