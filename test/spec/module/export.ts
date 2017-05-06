import { parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("Modules - `export`", () => {

    it("should parse \"export default function* a(){}\"", () => {
        expect(parseModule("export default function* a(){}")).to.eql({
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
        expect(parseModule("export default 0;0")).to.eql({
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
        expect(parseModule("export function f(){};0")).to.eql({
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
        expect(parseModule("export default [];")).to.eql({
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
        expect(parseModule("export default (1 + 2);")).to.eql({
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
        expect(parseModule("export default class foo {}")).to.eql({
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
        expect(parseModule("export default 42;")).to.eql({
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
        expect(parseModule("export default { foo: 1 };")).to.eql({
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
        expect(parseModule("export default foo;")).to.eql({
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
        expect(parseModule("export default async x => x")).to.eql({
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
        expect(parseModule("export default async function () {}")).to.eql({
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
        expect(parseModule("export * from \"a\"")).to.eql({
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
        expect(parseModule("export {with} from \"a\"")).to.eql({
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
        expect(parseModule("export {a,} from \"a\"")).to.eql({
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
        expect(parseModule("export {a,b} from \"a\"")).to.eql({
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
        expect(parseModule("export {a as b} from \"a\"")).to.eql({
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
        expect(parseModule("export {with as a} from \"a\"")).to.eql({
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
        expect(parseModule("export {as as as} from \"as\"")).to.eql({
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
        expect(parseModule("export {as as function} from \"as\"")).to.eql({
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
        expect(parseModule("export {if as var} from \"a\";")).to.eql({
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
        expect(parseModule("export {a}\n var a;")).to.eql({
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
        expect(parseModule("export {a,}\n var a;")).to.eql({
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
        expect(parseModule("export var a = 0, b;")).to.eql({
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
        expect(parseModule("export const a = 0, b = 0;")).to.eql({
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
        expect(parseModule("export let a = 0, b = 0;")).to.eql({
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
        expect(parseModule("export let[a] = 0;")).to.eql({
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
        expect(parseModule("export class A{} /* no semi */ false")).to.eql({
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
        expect(parseModule("export function A(){} /* no semi */ false")).to.eql({
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
        expect(parseModule("export default function a(){} let b; export {b as a};")).to.eql({
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
        });
    });

    it("should parse \"export var bar;", () => {
        expect(parseModule("export var bar;")).to.eql({
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
     expect(parseModule("export {foo, bar};")).to.eql({
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
        expect(parseModule("export {};")).to.eql({
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
        expect(parseModule("export {foo as bar};")).to.eql({
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
        expect(parseModule("export default (1 + 2);")).to.eql({
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
        expect(parseModule("export default class foo {}")).to.eql({
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
        expect(parseModule("export const square = async x => x * x")).to.eql({
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
        expect(parseModule("export default async x => x * x")).to.eql({
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
        expect(parseModule("export {foo, bar};")).to.eql({
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
        expect(() => { parseModule("export *"); }).to.throw();
    });

    it("should throw on \"export * +\"", () => {
        expect(() => { parseModule("export * +"); }).to.throw();
    });

    it("should throw on \"export default = 42\"", () => {
        expect(() => { parseModule("export default = 42"); }).to.not.throw();
    });

    it("should throw on \"export default from \"foo\"\"", () => {
        expect(() => { parseModule("export default from \"foo\""); }).to.throw();
    });

    it("should throw on \"export {default}\"", () => {
        expect(() => { parseModule("export {default}"); }).to.throw();
    });

    it("should throw on \"export default function\"", () => {
        expect(() => { parseModule("export default function"); }).to.throw();
    });

    it("should throw on \"export default default\"", () => {
        expect(() => { parseModule("export default default"); }).to.not.throw();
    });

    it("should throw on \"export {default}\"", () => {
        expect(() => { parseModule("export {as b} from a"); }).to.throw();
    });

    it("should throw on \"export {a,b} from a\"", () => {
        expect(() => { parseModule("export {a,b} from a"); }).to.throw();
    });

    it("should throw on \"export {a,,b}\"", () => {
        expect(() => { parseModule("export {a,,b}"); }).to.throw();
    });

    it("should throw on \"export {a,,}\"", () => {
        expect(() => { parseModule("export {a,,}"); }).to.throw();
    });

    it("should throw on \"export {,,}\"", () => {
        expect(() => { parseModule("export {,,}"); }).to.throw();
    });

    it("should throw on \"export;\"", () => {
        expect(() => { parseModule("export;"); }).to.throw();
    });

    it("should throw on \"export \"", () => {
        expect(() => { parseModule("export "); }).to.throw();
    });

    it("should throw on \"export\"", () => {
        expect(() => { parseModule("export"); }).to.throw();
    });

    it("should throw on \"while (1) export default 3\"", () => {
        expect(() => { parseModule("while (1) export default 3"); }).to.throw();
    });

    it("should throw on \"{export {a};}\"", () => {
        expect(() => { parseModule("{export {a};}"); }).to.throw();
    });

    it("should throw on \"{export default 3;}\"", () => {
        expect(() => { parseModule("{export default 3;}"); }).to.throw();
    });

    it("should throw on \"export * from \"a\"\"", () => {
        expect(() => { parseModule("export * from \"a\""); }).to.not.throw();
    });

    it("should throw when the exported name is not an \"IdentifierReference\"", () => {
        expect(() => { parseModule("export {try as bar};"); }).to.throw();
    });

});
