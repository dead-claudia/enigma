import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `for`", () => {
    it("should throw if missing initializers", () => {
        assert.throws(SyntaxError, () => { parseScript("for (let [x = let];;) {}"); });
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(;;) function a(){}`); });
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(;;) function a(){}`); });
    });

    it("should throw on \"for(let of 0);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(let of 0);`); });
    });

    it("should throw on \"for(this of 0);\"\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(this of 0);`); });
    });

    it("should throw on \"for(var a = 0 of b);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(var a = 0 of b);`); });
    });

    it("should throw on \"for(([a]) of 0);", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(([a]) of 0);`); });
    });

    it("should throw on \"for(var a of b, c);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(var a of b, c);`); });
    });

    it("should throw on \"for(a of b, c);", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(a of b, c);`); });
    });

    it("should parse \"for(const a of b);\"", () => {
        assert.match<Program>(parseScript(`for(x, y;;);`), {
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
        assert.match<Program>(parseScript(`for(x = 0;;);`), {
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
        assert.match<Program>(parseScript(`for(var x = 0;;);`), {
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
        assert.match<Program>(parseScript(`for(let x = 0;;);`), {
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
        assert.match<Program>(parseScript(`for(var x = 0, y = 1;;);`), {
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
        assert.match<Program>(parseScript(`for(x; x < 0;);`), {
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
        assert.match<Program>(parseScript(`for(x; x < 0; x++);`), {
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
        assert.match<Program>(parseScript(`for(x; x < 0; x++) process(x);`), {
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
        assert.match<Program>(parseScript(`for(a;b;c);`), {
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
        assert.match<Program>(parseScript(`for(var a;b;c);`), {
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
        assert.match<Program>(parseScript(`for(var a = 0;b;c);`), {
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
        assert.match<Program>(parseScript(`for(var a = 0;;) { let a; }`), {
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
        assert.match<Program>(parseScript(`for(;b;c);`), {
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
        assert.match<Program>(parseScript(`for(let of;;);`), {
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
        assert.match<Program>(parseScript(`for(let a;;); let a;`), {
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
        assert.match<Program>(parseScript(`for (() => { this in null };;);`), {
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
