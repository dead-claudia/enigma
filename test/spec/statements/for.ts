import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `for`", () => {

    it("should throw if missing initializers", () => {
        expect(() => { parseScript("for (let [x = let];;) {}"); }).to.throw();
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        expect(() => {
            parseScript(`for(;;) function a(){}`);
        }).to.throw();
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        expect(() => {
            parseScript(`for(;;) function a(){}`);
        }).to.throw();
    });

    it("should throw on \"for(let of 0);\"", () => {
        expect(() => {
            parseScript(`for(let of 0);`);
        }).to.throw();
    });

    it("should throw on \"for(this of 0);\"\"", () => {
        expect(() => {
            parseScript(`for(this of 0);`);
        }).to.throw();
    });

    it("should throw on \"for(var a = 0 of b);\"", () => {
        expect(() => {
            parseScript(`for(var a = 0 of b);`);
        }).to.throw();
    });

    it("should throw on \"for(([a]) of 0);", () => {
        expect(() => {
            parseScript(`for(([a]) of 0);`);
        }).to.throw();
    });

    it("should throw on \"for(var a of b, c);\"", () => {
        expect(() => {
            parseScript(`for(var a of b, c);`);
        }).to.throw();
    });

    it("should throw on \"for(a of b, c);", () => {
        expect(() => {
            parseScript(`for(a of b, c);`);
        }).to.throw();
    });

    it("should parse \"for(const a of b);\"", () => {
        expect(parseScript(`for(x, y;;);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "SequenceExpression",
                        expressions: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                        ],
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });

    });

    it("should parse \"for(x = 0;;);\"", () => {
        expect(parseScript(`for(x = 0;;);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });

    });

    it("should parse \"for(var x = 0;;);\"", () => {
        expect(parseScript(`for(var x = 0;;);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });

    });

    it("should parse \"for(let x = 0;;);\"", () => {
        expect(parseScript(`for(let x = 0;;);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });

    });

    it("should parse \"for(var x = 0, y = 1;;);\"", () => {
        expect(parseScript(`for(var x = 0, y = 1;;);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "y",
                                },
                                init: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });

    });

    it("should parse \"for(x; x < 0;);\"", () => {
        expect(parseScript(`for(x; x < 0;);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "Identifier",
                        name: "x",
                    },
                    test: {
                        type: "BinaryExpression",
                        operator: "<",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });

    });

    it("should parse \"for(x; x < 0; x++);\"", () => {
        expect(parseScript(`for(x; x < 0; x++);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "Identifier",
                        name: "x",
                    },
                    test: {
                        type: "BinaryExpression",
                        operator: "<",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                    update: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: false,
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(x; x < 0; x++) process(x);\"", () => {
        expect(parseScript(`for(x; x < 0; x++) process(x);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "Identifier",
                        name: "x",
                    },
                    test: {
                        type: "BinaryExpression",
                        operator: "<",
                        left: {
                            type: "Identifier",
                            name: "x",
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                    update: {
                        type: "UpdateExpression",
                        operator: "++",
                        argument: {
                            type: "Identifier",
                            name: "x",
                        },
                        prefix: false,
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

    it("should parse \"for(a;b;c);\"", () => {
        expect(parseScript(`for(a;b;c);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "Identifier",
                        name: "a",
                    },
                    test: {
                        type: "Identifier",
                        name: "b",
                    },
                    update: {
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

    it("should parse \"for(var a;b;c);\"", () => {
        expect(parseScript(`for(var a;b;c);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
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
                    test: {
                        type: "Identifier",
                        name: "b",
                    },
                    update: {
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

    it("should parse \"for(var a = 0;b;c);\"", () => {
        expect(parseScript(`for(var a = 0;b;c);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    test: {
                        type: "Identifier",
                        name: "b",
                    },
                    update: {
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

    it("should parse \"for(var a = 0;;) { let a; }\"", () => {
        expect(parseScript(`for(var a = 0;;) { let a; }`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "var",
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
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
                                kind: "let",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(;b;c);\"", () => {
        expect(parseScript(`for(;b;c);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: null,
                    test: {
                        type: "Identifier",
                        name: "b",
                    },
                    update: {
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

    it("should parse \"for(let of;;);\"", () => {
        expect(parseScript(`for(let of;;);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
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
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(let a;;); let a;\"", () => {
        expect(parseScript(`for(let a;;); let a;`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
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
                        kind: "let",
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
                {
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
                    kind: "let",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (() => { this in null };;);\"", () => {
        expect(parseScript(`for (() => { this in null };;);`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "BinaryExpression",
                                        operator: "in",
                                        left: {
                                            type: "ThisExpression",
                                        },
                                        right: {
                                            type: "Literal",
                                            value: "null",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

});
