import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2018 - Async Generators", () => {

    it("should throw on async \"for await (;false;);\"", () => {
        expect(() => { parseScript(`async function f() {
  for await (;false;);
}
`, { next: true }); }).to.throw();
    });

    it("should throw on async \"for await (let i = 0;false;);\"", () => {
        expect(() => { parseScript(`async function f() {
  for await (let i = 0;false;);
}`, { next: true }); }).to.throw();
    });

    it("should throw on async \"for await (x = 0;false;);\"", () => {
        expect(() => { parseScript(`async function f() {
  for await (x = 0;false;);
}`, { next: true }); }).to.throw();
    });

// should parse

    it("should parse advance", () => {
        expect(parseScript(`const query = {
    async *queryAll(ids) {
        for (const id of ids) {
            yield await this.query(id);
        }
    }
};`, { next: true })).to.eql({});
    });

    it("should parse async iterator in class instance method\"", () => {
        expect(parseScript(`class A {
     async *a(){}
     }`, { next: true })).to.eql({});
    });

    it("should parse \"async function *a(b, c) {}\"", () => {
        expect(parseScript(`async function *f() {
  for await (let x of y);
}`, { next: true })).to.eql({
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                await: true,
                                body: {
                                    type: "EmptyStatement",
                                },
                                left: {
                                    declarations: [
                                        {
                                            id: {
                                                name: "x",
                                                type: "Identifier",
                                            },
                                            init: null,
                                            type: "VariableDeclarator",
                                        },
                                    ],
                                    kind: "let",
                                    type: "VariableDeclaration",
                                },
                                right: {
                                    name: "y",
                                    type: "Identifier",
                                },
                                type: "ForOfStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "f",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"async function *a(b, c) {}\"", () => {
        expect(parseScript(`function* f() {
     yield 1;
     yield* [2, 3];
     }`, { next: true })).to.eql(
            {
                body: [
                    {
                        async: false,
                        body: {
                            body: [
                                {
                                    expression: {
                                        argument: null,
                                        delegate: false,
                                        type: "YieldExpression",
                                    },
                                    type: "ExpressionStatement",
                                },
                                {
                                    expression: {
                                        type: "Literal",
                                        value: "1",
                                    },
                                    type: "ExpressionStatement",
                                },
                                {
                                    expression: {
                                        argument: null,
                                        delegate: false,
                                        type: "YieldExpression",
                                    },
                                    type: "ExpressionStatement",
                                },
                                {
                                    expression: {
                                        computed: true,
                                        object: {
                                            name: "yield",
                                            type: "Identifier",
                                        },
                                        property: {
                                            expressions: [
                                                {
                                                    type: "Literal",
                                                    value: "2",
                                                },
                                                {
                                                    type: "Literal",
                                                    value: "3",
                                                },
                                            ],
                                            type: "SequenceExpression",
                                        },
                                        type: "MemberExpression",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                            type: "BlockStatement",
                        },
                        expression: false,
                        generator: true,
                        id: {
                            name: "f",
                            type: "Identifier",
                        },
                        params: [],
                        type: "FunctionDeclaration",
                    },
                ],
                sourceType: "script",
                type: "Program",
            });
    });

    it("should parse \"async function *a(b, c) {}\"", () => {
        expect(parseScript("async function *a(b, c) {}", { next: true })).to.eql({
            body: [
                {
                    async: true,
                    body: {
                        body: [],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "a",
                        type: "Identifier",
                    },
                    params: [
                        {
                            name: "b",
                            type: "Identifier",
                        },
                        {
                            name: "c",
                            type: "Identifier",
                        },
                    ],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

});
