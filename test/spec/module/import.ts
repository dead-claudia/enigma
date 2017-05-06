import { parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("Modules - `import`", () => {

    it("should parse \"export default function* a(){}\"", () => {
        expect(parseModule("import \"a\" ")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [],
            source: {
                type: "Literal",
                value: "a",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import * as a from a\"", () => {
        expect(parseModule("import * as a from \"a\"")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportNamespaceSpecifier",
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

    it("should parse \"import foo, {bar} from \"foo\";\"", () => {
        expect(parseModule("import foo, {bar} from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportDefaultSpecifier",
                    local: {
                        type: "Identifier",
                        name: "foo",
                    },
                },
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "bar",
                    },
                    imported: {
                        type: "Identifier",
                        name: "bar",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import {default as foo} from \"foo\";\"", () => {
        expect(parseModule("import {default as foo} from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "foo",
                    },
                    imported: {
                        type: "Identifier",
                        name: "default",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import foo from \"foo\";\"", () => {
        expect(parseModule("import foo from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportDefaultSpecifier",
                    local: {
                        type: "Identifier",
                        name: "foo",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import \"foo\";\"", () => {
        expect(parseModule("import \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import {bar as baz, xyz} from \"foo\";\"", () => {
        expect(parseModule("import {bar as baz, xyz} from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "baz",
                    },
                    imported: {
                        type: "Identifier",
                        name: "bar",
                    },
                },
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "xyz",
                    },
                    imported: {
                        type: "Identifier",
                        name: "xyz",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import {} from \"foo\";\"", () => {
        expect(parseModule("import {} from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import {bar} from \"foo\";\"", () => {
        expect(parseModule("import {bar} from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "bar",
                    },
                    imported: {
                        type: "Identifier",
                        name: "bar",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import {bar, baz,} from \"foo\";\"", () => {
        expect(parseModule("import {bar, baz,} from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "bar",
                    },
                    imported: {
                        type: "Identifier",
                        name: "bar",
                    },
                },
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "baz",
                    },
                    imported: {
                        type: "Identifier",
                        name: "baz",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });
    it("should parse \"import {bar, baz} from \"foo\";\"", () => {
        expect(parseModule("import {bar, baz} from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "bar",
                    },
                    imported: {
                        type: "Identifier",
                        name: "bar",
                    },
                },
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "baz",
                    },
                    imported: {
                        type: "Identifier",
                        name: "baz",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should parse \"import * as foo from \"foo\";\"", () => {
        expect(parseModule("import * as foo from \"foo\";")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportNamespaceSpecifier",
                    local: {
                        type: "Identifier",
                        name: "foo",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "foo",
            },
        },
    ],
    sourceType: "module",
});
    });
    it("should parse \"import { null as nil } from \"bar\"\"", () => {
        expect(parseModule("import { null as nil } from \"bar\"")).to.eql({
    type: "Program",
    body: [
        {
            type: "ImportDeclaration",
            specifiers: [
                {
                    type: "ImportSpecifier",
                    local: {
                        type: "Identifier",
                        name: "nil",
                    },
                    imported: {
                        type: "Identifier",
                        name: "null",
                    },
                },
            ],
            source: {
                type: "Literal",
                value: "bar",
            },
        },
    ],
    sourceType: "module",
});
    });

    it("should throw on \"import foo, {bar}, foo from \"foo\";\"", () => {
        expect(() => { parseModule("import foo, {bar}, foo from \"foo\";"); }).to.throw();
    });

    it("should throw on \"import { true } from \"logic\"\"", () => {
        expect(() => { parseModule("import { true } from \"logic\""); }).to.throw();
    });

    it("should throw on \"import foo\"", () => {
        expect(() => { parseModule("import foo"); }).to.throw();
    });

    it("should throw on \"import { foo, bar }\"", () => {
        expect(() => { parseModule("import { foo, bar }"); }).to.throw();
    });

    it("should throw on \"import { for } from \"iteration\"\"", () => {
        expect(() => { parseModule("import { for } from \"iteration\""); }).to.throw();
    });

    it("should throw on \"import { foo, bar }\"", () => {
        expect(() => { parseModule("import { foo, bar }"); }).to.throw();
    });

    it("should throw on \"import {bar}, {foo} from \"foo\";\"", () => {
        expect(() => { parseModule("import {bar}, {foo} from \"foo\";"); }).to.throw();
    });

    it("should throw on \"import {bar}, {foo} from \"foo\";", () => {
        expect(() => { parseModule("import {bar}, {foo} from \"foo\";"); }).to.throw();
    });
    it("should throw on \"import {default as foo}\"", () => {
        expect(() => { parseModule("import {default as foo}"); }).to.throw();
    });

    it("should throw on \"import { null } from \"null\"\"", () => {
        expect(() => { parseModule("import { null } from \"null\""); }).to.throw();
    });

    it("should throw on \"import foo, from \"bar\";\"", () => {
        expect(() => { parseModule("import foo, from \"bar\";"); }).to.throw();
    });

    it("should throw on \"import foo, from \"bar\";\"", () => {
        expect(() => { parseModule("import foo, from \"bar\";"); }).to.throw();
    });

    it("should throw on \"export {foo} from bar\"", () => {
        expect(() => { parseModule("export {foo} from bar"); }).to.throw();
    });

    it("should throw on \"export {foo} from bar\"", () => {
        expect(() => { parseModule("export {foo} from bar"); }).to.throw();
    });

    it("should throw on \"export {foo} from bar\"", () => {
        expect(() => { parseModule("export {foo} from bar"); }).to.throw();
    });

    it("should throw on \"import {a as function} from bar\"", () => {
        expect(() => { parseModule("import {a as function} from bar"); }).to.throw();
    });

    it("should throw on \"import a, b from  bar\"", () => {
        expect(() => { parseModule("import a, b from bar"); }).to.throw();
    });

    it("should throw on \"import {b,,} from from  bar\"", () => {
        expect(() => { parseModule("import {b,,} from bar"); }).to.throw();
    });

    it("should throw on \"import {};\"", () => {
        expect(() => { parseModule("import {};"); }).to.throw();
    });

    it("should throw on \"import\"", () => {
        expect(() => { parseModule("import"); }).to.throw();
    });

});
