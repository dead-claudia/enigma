import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - Variable Declarations", () => {
    it("should parse \"var x\"", () => {
        assert.match<Program>(parseScript("var x"), {
            type: "Program",
            body: [
                {
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var a;\"", () => {
        assert.match<Program>(parseScript("var a;"), {
            type: "Program",
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
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var x, y;\"", () => {
        assert.match<Program>(parseScript("var x, y;"), {
            type: "Program",
            body: [
                {
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
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "y",
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

    it("should parse \"var x = 0\"", () => {
        assert.match<Program>(parseScript("var x = 0"), {
            type: "Program",
            body: [
                {
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var eval = 0, arguments = 1\"", () => {
        assert.match<Program>(parseScript("var eval = 0, arguments = 1"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "eval",
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
                                name: "arguments",
                            },
                            init: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var x = 0, y = 1, z = 2\"", () => {
        assert.match<Program>(parseScript("var x = 0, y = 1, z = 2"), {
            type: "Program",
            body: [
                {
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
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "z",
                            },
                            init: {
                                type: "Literal",
                                value: 2,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var implements, interface, package\"", () => {
        assert.match<Program>(parseScript("var implements, interface, package"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "implements",
                            },
                            init: null,
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "interface",
                            },
                            init: null,
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "package",
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

    it("should parse \"var private, protected, public\"", () => {
        assert.match<Program>(parseScript("var private, protected, public"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "private",
                            },
                            init: null,
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "protected",
                            },
                            init: null,
                        },
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "public",
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

    it("should parse \"var yield;\"", () => {
        assert.match<Program>(parseScript("var yield;"), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "yield",
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
        assert.match<Program>(parseScript("var let"), {
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

    it("should parse \"let x\"", () => {
        assert.match<Program>(parseScript("let x"), {
            type: "Program",
            body: [
                {
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
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ let x }\"", () => {
        assert.match<Program>(parseScript("{ let x }"), {
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
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
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ let x = 0 }\"", () => {
        assert.match<Program>(parseScript("{ let x = 0 }"), {
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
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
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ let x = 0, y = 1, z = 2 }\"", () => {
        assert.match<Program>(parseScript("{ let x = 0, y = 1, z = 2 }"), {
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
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
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                    init: {
                                        type: "Literal",
                                        value: 2,
                                    },
                                },
                            ],
                            kind: "let",
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ const x = 0 }\"", () => {
        assert.match<Program>(parseScript("{ const x = 0 }"), {
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
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
                            kind: "const",
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"{ const x = 0, y = 1, z = 2 }\"", () => {
        assert.match<Program>(parseScript("{ const x = 0, y = 1, z = 2 }"), {
            type: "Program",
            body: [
                {
                    type: "BlockStatement",
                    body: [
                        {
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
                                {
                                    type: "VariableDeclarator",
                                    id: {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                    init: {
                                        type: "Literal",
                                        value: 2,
                                    },
                                },
                            ],
                            kind: "const",
                        },
                    ],
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"var static;\"", () => {
        assert.match<Program>(parseScript("var static;"), {
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

    it("should parse \"(let[a])\"", () => {
        assert.match<Program>(parseScript("(let[a])"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "MemberExpression",
                        computed: true,
                        object: {
                            type: "Identifier",
                            name: "let",
                        },
                        property: {
                            type: "Identifier",
                            name: "a",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should throw \"var const\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var const"); });
    });

    it("should throw \"var a[0]=0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var a[0]=0;"); });
    });

    it("should throw \"var (a)=0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var (a)=0;"); });
    });

    it("should throw \"var new A = 0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var new A = 0;"); });
    });

    it("should throw \"var (x)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var (x)"); });
    });

    it("should throw \"var this\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var this"); });
    });

    it("should throw \"var a.b;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var a.b;"); });
    });

    it("should throw \"var [a];\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var [a];"); });
    });

    it("should throw \"var {a};\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var {a};"); });
    });

    it("should throw \"var {a:a};\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var {a:a};"); });
    });
});
