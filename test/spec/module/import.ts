import {parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Modules - `import`", () => {
    it("should parse \"export default function* a(){}\"", () => {
        assert.match<Program>(parseModule("import \"a\" "), {
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
        assert.match<Program>(parseModule("import * as a from \"a\""), {
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
        assert.match<Program>(parseModule("import foo, {bar} from \"foo\";"), {
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
        assert.match<Program>(parseModule("import {default as foo} from \"foo\";"), {
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
        assert.match<Program>(parseModule("import foo from \"foo\";"), {
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
        assert.match<Program>(parseModule("import \"foo\";"), {
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
        assert.match<Program>(parseModule("import {bar as baz, xyz} from \"foo\";"), {
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
        assert.match<Program>(parseModule("import {} from \"foo\";"), {
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
        assert.match<Program>(parseModule("import {bar} from \"foo\";"), {
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
        assert.match<Program>(parseModule("import {bar, baz,} from \"foo\";"), {
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
        assert.match<Program>(parseModule("import {bar, baz} from \"foo\";"), {
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
        assert.match<Program>(parseModule("import * as foo from \"foo\";"), {
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
        assert.match<Program>(parseModule("import { null as nil } from \"bar\""), {
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
        assert.throws(SyntaxError, () => { parseModule("import foo, {bar}, foo from \"foo\";"); });
    });

    it("should throw on \"import { true } from \"logic\"\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import { true } from \"logic\""); });
    });

    it("should throw on \"import foo\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import foo"); });
    });

    it("should throw on \"import { foo, bar }\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import { foo, bar }"); });
    });

    it("should throw on \"import { for } from \"iteration\"\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import { for } from \"iteration\""); });
    });

    it("should throw on \"import { foo, bar }\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import { foo, bar }"); });
    });

    it("should throw on \"import {bar}, {foo} from \"foo\";\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import {bar}, {foo} from \"foo\";"); });
    });

    it("should throw on \"import {bar}, {foo} from \"foo\";", () => {
        assert.throws(SyntaxError, () => { parseModule("import {bar}, {foo} from \"foo\";"); });
    });
    it("should throw on \"import {default as foo}\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import {default as foo}"); });
    });

    it("should throw on \"import { null } from \"null\"\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import { null } from \"null\""); });
    });

    it("should throw on \"import foo, from \"bar\";\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import foo, from \"bar\";"); });
    });

    it("should throw on \"import foo, from \"bar\";\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import foo, from \"bar\";"); });
    });

    it("should throw on \"export {foo} from bar\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {foo} from bar"); });
    });

    it("should throw on \"export {foo} from bar\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {foo} from bar"); });
    });

    it("should throw on \"export {foo} from bar\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export {foo} from bar"); });
    });

    it("should throw on \"import {a as function} from bar\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import {a as function} from bar"); });
    });

    it("should throw on \"import a, b from  bar\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import a, b from bar"); });
    });

    it("should throw on \"import {b,,} from from  bar\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import {b,,} from bar"); });
    });

    it("should throw on \"import {};\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import {};"); });
    });

    it("should throw on \"import\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import"); });
    });
});
