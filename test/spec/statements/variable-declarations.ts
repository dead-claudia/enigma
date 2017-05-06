import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - Variable Declarations", () => {

    it("should parse \"var x\"", () => {
        expect(parseScript("var x")).to.eql({
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
        expect(parseScript("var a;")).to.eql({
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
        expect(parseScript("var x, y;")).to.eql({
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
        expect(parseScript("var x = 0")).to.eql({
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
        expect(parseScript("var eval = 0, arguments = 1")).to.eql({
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
        expect(parseScript("var x = 0, y = 1, z = 2")).to.eql({
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
        expect(parseScript("var implements, interface, package")).to.eql({
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
        expect(parseScript("var private, protected, public")).to.eql({
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
        expect(parseScript("var yield;")).to.eql({
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
        expect(parseScript("var let")).to.eql({
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
        expect(parseScript("let x")).to.eql({
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
        expect(parseScript("{ let x }")).to.eql({
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
        expect(parseScript("{ let x = 0 }")).to.eql({
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
        expect(parseScript("{ let x = 0, y = 1, z = 2 }")).to.eql({
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
        expect(parseScript("{ const x = 0 }")).to.eql({
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
        expect(parseScript("{ const x = 0, y = 1, z = 2 }")).to.eql({
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
        expect(parseScript("var static;")).to.eql({
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
        expect(parseScript("(let[a])")).to.eql({
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
        expect(() => parseScript("var const")).to.throw();
    });

    it("should throw \"var a[0]=0;\"", () => {
        expect(() => parseScript("var a[0]=0;")).to.throw();
    });

    it("should throw \"var (a)=0;\"", () => {
        expect(() => parseScript("var (a)=0;")).to.throw();
    });

    it("should throw \"var new A = 0;\"", () => {
        expect(() => parseScript("var new A = 0;")).to.throw();
    });

    it("should throw \"var (x)\"", () => {
        expect(() => parseScript("var (x)")).to.throw();
    });

    it("should throw \"var this\"", () => {
        expect(() => parseScript("var this")).to.throw();
    });

    it("should throw \"var a.b;\"", () => {
        expect(() => parseScript("var a.b;")).to.throw();
    });

    it("should throw \"var [a];\"", () => {
        expect(() => parseScript("var [a];")).to.throw();
    });

    it("should throw \"var {a};\"", () => {
        expect(() => parseScript("var {a};")).to.throw();
    });

    it("should throw \"var {a:a};\"", () => {
        expect(() => parseScript("var {a:a};")).to.throw();
    });

});
