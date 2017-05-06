import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `for ... in`", () => {

  it("should parse \"1; for (var a in { x: 0 }) { }\"", () => {
        expect(parseScript(`1; for (var a in { x: 0 }) { }`)).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: 1,
            },
        },
        {
            type: "ForInStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "a",
                        },
                        init: null,
                    },
                ],
                kind: "var",
            },
            right: {
                type: "ObjectExpression",
                properties: [
                    {
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "x",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: 0,
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
            body: {
                type: "BlockStatement",
                body: [],
            },
        },
    ],
    sourceType: "script",
});
  });

  it("should parse \"for (var b in { x: 0 }) { 3; };\"", () => {
        expect(parseScript(`for (var b in { x: 0 }) { 3; }`)).to.eql({
    type: "Program",
    body: [
        {
            type: "ForInStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "b",
                        },
                        init: null,
                    },
                ],
                kind: "var",
            },
            right: {
                type: "ObjectExpression",
                properties: [
                    {
                        type: "Property",
                        key: {
                            type: "Identifier",
                            name: "x",
                        },
                        computed: false,
                        value: {
                            type: "Literal",
                            value: 0,
                        },
                        kind: "init",
                        method: false,
                        shorthand: false,
                    },
                ],
            },
            body: {
                type: "BlockStatement",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "Literal",
                            value: 3,
                        },
                    },
                ],
            },
        },
    ],
    sourceType: "script",
});
  });

  it("should parse \"for (var x in {}) class C {}\"", () => {
        expect(parseScript(`for (var x in {}) class C {}`)).to.eql({
    type: "Program",
    body: [
        {
            type: "ForInStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "x",
                        },
                        init: null,
                    },
                ],
                kind: "var",
            },
            right: {
                type: "ObjectExpression",
                properties: [],
            },
            body: {
                type: "ExpressionStatement",
                expression: {
                    type: "ClassExpression",
                    id: {
                        type: "Identifier",
                        name: "C",
                    },
                    superClass: null,
                    body: {
                        type: "ClassBody",
                        body: [],
                    },
                },
            },
        },
    ],
    sourceType: "script",
});
  });

  it("should parse \"for (const x of [1, 2, 3]) {}\"", () => {
        expect(parseScript(`for (const x of [1, 2, 3]) {}`)).to.eql({
    type: "Program",
    body: [
        {
            type: "ForOfStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "x",
                        },
                        init: null,
                    },
                ],
                kind: "const",
            },
            right: {
                type: "ArrayExpression",
                elements: [
                    {
                        type: "Literal",
                        value: 1,
                    },
                    {
                        type: "Literal",
                        value: 2,
                    },
                    {
                        type: "Literal",
                        value: 3,
                    },
                ],
            },
            body: {
                type: "BlockStatement",
                body: [],
            },
            await: false,
        },
    ],
    sourceType: "script",
});
  });

  it("should parse \"for(()=>{a in b};;);\"", () => {
        expect(parseScript(`for(()=>{a in b};;);`)).to.eql({
            body: [
                {
                    body: {
                        type: "EmptyStatement",
                    },
                    init: {
                        async: false,
                        body: {
                            body: [
                                {
                                    expression: {
                                        left: {
                                            name: "a",
                                            type: "Identifier",
                                        },
                                        operator: "in",
                                        right: {
                                            name: "b",
                                            type: "Identifier",
                                        },
                                        type: "BinaryExpression",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                            type: "BlockStatement",
                        },
                        expression: false,
                        generator: false,
                        id: null,
                        params: [],
                        type: "ArrowFunctionExpression",
                    },
                    test: null,
                    type: "ForStatement",
                    update: null,
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

  it("should parse \"for(x in list) process(x);\"", () => {
        expect(parseScript(`for ([...foo, bar].baz in qux);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "ArrayExpression",
                            elements: [
                                {
                                    type: "SpreadElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "foo",
                                    },
                                },
                                {
                                    type: "Identifier",
                                    name: "bar",
                                },
                            ],
                        },
                        property: {
                            type: "Identifier",
                            name: "baz",
                        },
                    },
                    right: {
                        type: "Identifier",
                        name: "qux",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(x in list) process(x);\"", () => {
        expect(parseScript(`for(x in list) process(x);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "Identifier",
                        name: "x",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "process",
                            },
                            arguments: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });

    });

  it("should parse \"for (var x in list) process(x);\"", () => {
        expect(parseScript(`for (var x in list) process(x);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "process",
                            },
                            arguments: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for (let x in list) process(x);\"", () => {
        expect(parseScript(`for (let x in list) process(x);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: null,
                            },
                        ],
                        kind: "let",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "process",
                            },
                            arguments: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(var a in b);\"", () => {
        expect(parseScript(`for(var a in b);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(a in b);\"", () => {
        expect(parseScript(`for(a in b);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(a in b);\"", () => {
        expect(parseScript(`for(a in b);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(a.b in c);\"", () => {
        expect(parseScript(`for(a.b in c);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "MemberExpression",
                        computed: false,
                        object: {
                            type: "Identifier",
                            name: "a",
                        },
                        property: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                    right: {
                        type: "Identifier",
                        name: "c",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(let of in of);\"", () => {
        expect(parseScript(`for(let of in of);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "of",
                                },
                                init: null,
                            },
                        ],
                        kind: "let",
                    },
                    right: {
                        type: "Identifier",
                        name: "of",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(const a in b);\"", () => {
        expect(parseScript(`for(const a in b);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: null,
                            },
                        ],
                        kind: "const",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(var a in b, c);\"", () => {
        expect(parseScript(`for(var a in b, c);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "SequenceExpression",
                        expressions: [
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
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for(a in b, c);\"", () => {
        expect(parseScript(`for(a in b, c);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "SequenceExpression",
                        expressions: [
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
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should parse \"for (x in [], []) {}\"", () => {
        expect(parseScript(`for (x in [], []) {}`)).to.eql({
    type: "Program",
    body: [
        {
            type: "ForInStatement",
            left: {
                type: "Identifier",
                name: "x",
            },
            right: {
                type: "SequenceExpression",
                expressions: [
                    {
                        type: "ArrayExpression",
                        elements: [],
                    },
                    {
                        type: "ArrayExpression",
                        elements: [],
                    },
                ],
            },
            body: {
                type: "BlockStatement",
                body: [],
            },
        },
    ],
    sourceType: "script",
});
      });

  it("should parse \"for([{a=0}] in b);\"", () => {
        expect(parseScript(`for([{a=0}] in b);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForInStatement",
                    left: {
                        type: "ArrayPattern",
                        elements: [
                            {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                        ],
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

  it("should throw \"for ([...x, y] in [[]]) ;\"", () => {
        expect(() => { parseScript("for ([...x, y] in [[]]) ;"); }).to.throw();
    });

  it("should throw \"for ({ eval = 0 } in [{}]) ;\"", () => {
        expect(() => { parseModule("for ({ eval = 0 } in [{}]) ;"); }).to.throw();
    });

  it("should throw \"for ({ x: [(x, y)] } in [{ x: [] }]) ;\"", () => {
        expect(() => { parseScript("for ({ x: [(x, y)] } in [{ x: [] }]) ;"); }).to.throw();
    });

  it("should throw \"for ({ x: { x = yield } } in [{ x: {} }]) ;\"", () => {
        expect(() => { parseScript("for ({ x: { x = yield } } in [{ x: {} }]) ;"); }).to.throw();
    });

  it("should throw \"for ([ x = yield ] in [[]]) ;\"", () => {
        expect(() => { parseScript("for ([ x = yield ] in [[]]) ;"); }).to.throw();
    });

  it("should throw \"for ([ x = yield ] in [[]]) ;\"", () => {
        expect(() => { parseScript("for ([ x = yield ] in [[]]) ;"); }).to.throw();
    });

  it("should throw \"for(let a = 0 in b);\"", () => {
        expect(() => { parseScript("for(let a = 0 in b);"); }).to.throw();
    });

  it("should throw \"for(const a = 0 in b);\"", () => {
        expect(() => { parseScript("for(const a = 0 in b);"); }).to.throw();
    });

  it("should throw \"for(let ? b : c in 0);", () => {
        expect(() => { parseScript("for(let ? b : c in 0);"); }).to.throw();
    });

  it("should throw \"for(({a}) in 0);\"", () => {
        expect(() => { parseScript("for(({a}) in 0);"); }).to.throw();
    });

  it("should throw \"for(([a]) in 0);\"", () => {
        expect(() => { parseScript("for(([a]) in 0);"); }).to.throw();
    });

  it("should throw \"for(let [a=b in c] in null);\"", () => {
        expect(() => { parseScript("for(let [a=b in c] in null);"); }).to.throw();
    });

  it("should throw \"for({a=0};;);\"", () => {
        expect(() => { parseScript("for({a=0};;);"); }).to.throw();
    });

  it("should throw on \"for(a in b) function c(){}\"", () => {
        expect(() => {
            parseScript(`for(a in b) function c(){}`);
        }).to.throw();
    });
});
