import {parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Modules - `export`", () => {
    it("should parse \"export default function* a(){}\"", () => {
        assert.match<Program>(parseModule("export default function* a(){}"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "a",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        async: false,
                        generator: true,
                        expression: false,
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default 0;0\"", () => {
        assert.match<Program>(parseModule("export default 0;0"), {
            body: [
                {
                    declaration: {
                        type: "Literal",
                        value: 0,
                    },
                    type: "ExportDefaultDeclaration",
                },
                {
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse \"export function f(){};0\"", () => {
        assert.match<Program>(parseModule("export function f(){};0"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "f",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        async: false,
                        generator: false,
                        expression: false,
                    },
                    specifiers: [],
                    source: null,
                },
                {
                    type: "EmptyStatement",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: 0,
                    },
                },
            ],
            sourceType: "module",
        });
    });
    it("should parse \"export default [];\"", () => {
        assert.match<Program>(parseModule("export default [];"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "ArrayExpression",
                        elements: [],
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default (1 + 2);\"", () => {
        assert.match<Program>(parseModule("export default (1 + 2);"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "Literal",
                            value: 1,
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default class foo {}\"", () => {
        assert.match<Program>(parseModule("export default class foo {}"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "ClassDeclaration",
                        id: {
                            type: "Identifier",
                            name: "foo",
                        },
                        superClass: null,
                        body: {
                            type: "ClassBody",
                            body: [],
                        },
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default 42;\"", () => {
        assert.match<Program>(parseModule("export default 42;"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "Literal",
                        value: 42,
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default { foo: 1 };\"", () => {
        assert.match<Program>(parseModule("export default { foo: 1 };"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "foo",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: 1,
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default foo;\"", () => {
        assert.match<Program>(parseModule("export default foo;"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "Identifier",
                        name: "foo",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default async x => x\"", () => {
        assert.match<Program>(parseModule("export default async x => x"), {
            body: [
                {
                    declaration: {
                        async: true,
                        body: {
                            name: "x",
                            type: "Identifier",
                        },
                        expression: true,
                        generator: false,
                        id: null,
                        params: [
                            {
                                name: "x",
                                type: "Identifier",
                            },
                        ],
                        type: "ArrowFunctionExpression",
                    },
                    type: "ExportDefaultDeclaration",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse \"export default async function () {}\"", () => {
        assert.match<Program>(parseModule("export default async function () {}"), {
            body: [
                {
                    declaration: {
                        async: true,
                        body: {
                            body: [],
                            type: "BlockStatement",
                        },
                        expression: false,
                        generator: false,
                        id: null,
                        params: [],
                        type: "FunctionDeclaration",
                    },
                    type: "ExportDefaultDeclaration",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse \"export * from \"a\"", () => {
        assert.match<Program>(parseModule("export * from \"a\""), {
            type: "Program",
            body: [
                {
                    type: "ExportAllDeclaration",
                    source: {
                        type: "Literal",
                        value: "a",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {} from \"a\"", () => {
        assert.match<Program>(parseModule("export {with} from \"a\""), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "with",
                            },
                            local: {
                                type: "Identifier",
                                name: "with",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "a",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {a,} from \"a\"", () => {
        assert.match<Program>(parseModule("export {a,} from \"a\""), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "a",
                            },
                            local: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "a",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {a,b} from \"a\"", () => {
        assert.match<Program>(parseModule("export {a,b} from \"a\""), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "a",
                            },
                            local: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "b",
                            },
                            local: {
                                type: "Identifier",
                                name: "b",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "a",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {a as b} from \"a\"", () => {
        assert.match<Program>(parseModule("export {a as b} from \"a\""), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "b",
                            },
                            local: {
                                type: "Identifier",
                                name: "a",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "a",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {with as a} from \"a\"", () => {
        assert.match<Program>(parseModule("export {with as a} from \"a\""), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "a",
                            },
                            local: {
                                type: "Identifier",
                                name: "with",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "a",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {as as as} from \"as\"", () => {
        assert.match<Program>(parseModule("export {as as as} from \"as\""), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "as",
                            },
                            local: {
                                type: "Identifier",
                                name: "as",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "as",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {as as function} from \"as\"", () => {
        assert.match<Program>(parseModule("export {as as function} from \"as\""), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "function",
                            },
                            local: {
                                type: "Identifier",
                                name: "as",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "as",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {if as var} from \"a\";", () => {
        assert.match<Program>(parseModule("export {if as var} from \"a\";"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "var",
                            },
                            local: {
                                type: "Identifier",
                                name: "if",
                            },
                        },
                    ],
                    source: {
                        type: "Literal",
                        value: "a",
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {a}\n var a;", () => {
        assert.match<Program>(parseModule("export {a}\n var a;"), {
            body: [
                {
                    declaration:  null,
                    source: null,
                    specifiers: [
                        {
                            exported: {
                                name: "a",
                                type: "Identifier",
                            },
                            local: {
                                name: "a",
                                type: "Identifier",
                            },
                            type: "ExportSpecifier",
                        },
                    ],
                    type: "ExportNamedDeclaration",
                },
                {
                    expression: {
                        name: "a",
                        type: "Identifier",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse \"export {a,}\n var a;", () => {
        assert.match<Program>(parseModule("export {a,}\n var a;"), {
            body: [
                {
                    declaration: null,
                    source: null,
                    specifiers: [
                        {
                            exported: {
                                name: "a",
                                type: "Identifier",
                            },
                            local: {
                                name: "a",
                                type: "Identifier",
                            },
                            type: "ExportSpecifier",
                        },
                    ],
                    type: "ExportNamedDeclaration",
                },
                {
                    expression: {
                        name: "a",
                        type: "Identifier",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse \"export var a = 0, b;", () => {
        assert.match<Program>(parseModule("export var a = 0, b;"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
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
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export const a = 0, b = 0;", () => {
        assert.match<Program>(parseModule("export const a = 0, b = 0;"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
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
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "const",
                    },
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export let a = 0, b = 0;", () => {
        assert.match<Program>(parseModule("export let a = 0, b = 0;"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
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
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export let[a] = 0;", () => {
        assert.match<Program>(parseModule("export let[a] = 0;"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    ],
                                },
                                init: {
                                    type: "Literal",
                                    value: 0,
                                },
                            },
                        ],
                        kind: "let",
                    },
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export class A{} /* no semi */ false", () => {
        assert.match<Program>(parseModule("export class A{} /* no semi */ false"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "ClassDeclaration",
                        id: {
                            type: "Identifier",
                            name: "A",
                        },
                        superClass: null,
                        body: {
                            type: "ClassBody",
                            body: [],
                        },
                    },
                    specifiers: [],
                    source: null,
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: false,
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export function A(){} /* no semi */ false\"", () => {
        assert.match<Program>(parseModule("export function A(){} /* no semi */ false"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "A",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        async: false,
                        generator: false,
                        expression: false,
                    },
                    specifiers: [],
                    source: null,
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: false,
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default function a(){} let b; export {b as a};", () => {
        assert.match<Program>(
            parseModule("export default function a(){} let b; export {b as a};"),
            {
                type: "Program",
                body: [
                    {
                        type: "ExportDefaultDeclaration",
                        declaration: {
                            type: "FunctionDeclaration",
                            id: {
                                type: "Identifier",
                                name: "a",
                            },
                            params: [],
                            body: {
                                type: "BlockStatement",
                                body: [],
                            },
                            async: false,
                            generator: false,
                            expression: false,
                        },
                    },
                    {
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
                        kind: "let",
                    },
                    {
                        type: "ExportNamedDeclaration",
                        declaration: null,
                        specifiers: [
                            {
                                type: "ExportSpecifier",
                                exported: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                local: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        ],
                        source: null,
                    },
                ],
                sourceType: "module",
            },
        );
    });

    it("should parse \"export var bar;", () => {
        assert.match<Program>(parseModule("export var bar;"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "bar",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {foo, bar};", () => {
        assert.match<Program>(parseModule("export {foo, bar};"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "foo",
                            },
                            local: {
                                type: "Identifier",
                                name: "foo",
                            },
                        },
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "bar",
                            },
                            local: {
                                type: "Identifier",
                                name: "bar",
                            },
                        },
                    ],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {}\"", () => {
        assert.match<Program>(parseModule("export {};"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export {foo as bar};", () => {
        assert.match<Program>(parseModule("export {foo as bar};"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "bar",
                            },
                            local: {
                                type: "Identifier",
                                name: "foo",
                            },
                        },
                    ],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default (1 + 2);", () => {
        assert.match<Program>(parseModule("export default (1 + 2);"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "Literal",
                            value: 1,
                        },
                        right: {
                            type: "Literal",
                            value: 2,
                        },
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"export default class foo {}", () => {
        assert.match<Program>(parseModule("export default class foo {}"), {
            type: "Program",
            body: [
                {
                    type: "ExportDefaultDeclaration",
                    declaration: {
                        type: "ClassDeclaration",
                        id: {
                            type: "Identifier",
                            name: "foo",
                        },
                        superClass: null,
                        body: {
                            type: "ClassBody",
                            body: [],
                        },
                    },
                },
            ],
            sourceType: "module",
        });
    });
    it("should parse \"export const square = async x => x * x", () => {
        assert.match<Program>(parseModule("export const square = async x => x * x"), {
            body: [
                {
                    declaration: {
                        declarations: [
                            {
                                id: {
                                    name: "square",
                                    type: "Identifier",
                                },
                                init: {
                                    async: true,
                                    body: {
                                        left: {
                                            name: "x",
                                            type: "Identifier",
                                        },
                                        operator: "*",
                                        right: {
                                            name: "x",
                                            type: "Identifier",
                                        },
                                        type: "BinaryExpression",
                                    },
                                    expression: true,
                                    generator: false,
                                    id: null,
                                    params: [
                                        {
                                            name: "x",
                                            type: "Identifier",
                                        },
                                    ],
                                    type: "ArrowFunctionExpression",
                                },
                                type: "VariableDeclarator",
                            },
                        ],
                        kind: "const",
                        type: "VariableDeclaration",
                    },
                    source: null,
                    specifiers: [],
                    type: "ExportNamedDeclaration",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse \"export default async x => x * x", () => {
        assert.match<Program>(parseModule("export default async x => x * x"), {
            body: [
                {
                    declaration: {
                        async: true,
                        body: {
                            left: {
                                name: "x",
                                type: "Identifier",
                            },
                            operator: "*",
                            right: {
                                name: "x",
                                type: "Identifier",
                            },
                            type: "BinaryExpression",
                        },
                        expression: true,
                        generator: false,
                        id: null,
                        params: [
                            {
                                name: "x",
                                type: "Identifier",
                            },
                        ],
                        type: "ArrowFunctionExpression",
                    },
                    type: "ExportDefaultDeclaration",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse \"export {foo, bar};", () => {
        assert.match<Program>(parseModule("export {foo, bar};"), {
            type: "Program",
            body: [
                {
                    type: "ExportNamedDeclaration",
                    declaration: null,
                    specifiers: [
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "foo",
                            },
                            local: {
                                type: "Identifier",
                                name: "foo",
                            },
                        },
                        {
                            type: "ExportSpecifier",
                            exported: {
                                type: "Identifier",
                                name: "bar",
                            },
                            local: {
                                type: "Identifier",
                                name: "bar",
                            },
                        },
                    ],
                    source: null,
                },
            ],
            sourceType: "module",
        });
    });

    it("should throw on \"export *\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export *"); });
    });

    it("should throw on \"export * +\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export * +"); });
    });

    it("should throw on \"export default = 42\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export default = 42"); });
    });

    it("should throw on \"export default from \"foo\"\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export default from \"foo\""); });
    });

    it("should throw on \"export {default}\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {default}"); });
    });

    it("should throw on \"export default function\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export default function"); });
    });

    it("should throw on \"export default default\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export default default"); });
    });

    it("should throw on \"export {default}\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {as b} from a"); });
    });

    it("should throw on \"export {a,b} from a\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {a,b} from a"); });
    });

    it("should throw on \"export {a,,b}\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {a,,b}"); });
    });

    it("should throw on \"export {a,,}\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {a,,}"); });
    });

    it("should throw on \"export {,,}\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {,,}"); });
    });

    it("should throw on \"export;\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export;"); });
    });

    it("should throw on \"export \"", () => {
        assert.throws(SyntaxError, () => { parseModule("export "); });
    });

    it("should throw on \"export\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export"); });
    });

    it("should throw on \"while (1) export default 3\"", () => {
        assert.throws(SyntaxError, () => { parseModule("while (1) export default 3"); });
    });

    it("should throw on \"{export {a};}\"", () => {
        assert.throws(SyntaxError, () => { parseModule("{export {a};}"); });
    });

    it("should throw on \"{export default 3;}\"", () => {
        assert.throws(SyntaxError, () => { parseModule("{export default 3;}"); });
    });

    it("should throw on \"export * from \"a\"\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export * from \"a\""); });
    });

    it("should throw when the exported name is not an \"IdentifierReference\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {try as bar};"); });
    });
});
