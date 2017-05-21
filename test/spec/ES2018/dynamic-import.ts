import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2018 - Dynamic `import()`", () => {
    it("should parse import at top level", () => {
        assert.match<Program>(parseScript(`import('testing.js');

        const test = 'hello';
        import('interesting');

        import('testing.js').then(() => {});
        `, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Import",
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: "testing.js",
                            },
                        ],
                    },
                },
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "test",
                            },
                            init: {
                                type: "Literal",
                                value: "hello",
                            },
                        },
                    ],
                    kind: "const",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Import",
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: "interesting",
                            },
                        ],
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "CallExpression",
                                callee: {
                                    type: "Import",
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "testing.js",
                                    },
                                ],
                            },
                            property: {
                                type: "Identifier",
                                name: "then",
                            },
                        },
                        arguments: [
                            {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                generator: false,
                                expression: false,
                                async: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse import inside an function body", () => {
        assert.match<Program>(parseModule(`function loadImport(file) {
            return import('test');
        }
        `, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "loadImport",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "file",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ReturnStatement",
                                argument: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Import",
                                    },
                                    arguments: [
                                        {
                                            type: "Literal",
                                            value: "test",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse import inside an function body in sloppy mode", () => {
        assert.match<Program>(parseScript(`function loadImport(file) {
            return import('test');
        }
        `, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "loadImport",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "file",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ReturnStatement",
                                argument: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Import",
                                    },
                                    arguments: [
                                        {
                                            type: "Literal",
                                            value: "test",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse import generator", () => {
        assert.match<Program>(parseModule(`function* a() {
            yield import('http');
        }
        `, {next: true}), {
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
                                    arguments: [
                                        {
                                            type: "Literal",
                                            value: "http",
                                        },
                                    ],
                                    callee: {
                                        type: "Import",
                                    },
                                    type: "CallExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "a",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse import call var", () => {
        assert.match<Program>(parseModule(`const m = 'library.js';
        import(m).then(() => {});
        `, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "m",
                            },
                            init: {
                                type: "Literal",
                                value: "library.js",
                            },
                        },
                    ],
                    kind: "const",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "CallExpression",
                                callee: {
                                    type: "Import",
                                },
                                arguments: [
                                    {
                                        type: "Identifier",
                                        name: "m",
                                    },
                                ],
                            },
                            property: {
                                type: "Identifier",
                                name: "then",
                            },
                        },
                        arguments: [
                            {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [],
                                },
                                generator: false,
                                expression: false,
                                async: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse import call string", () => {
        assert.match<Program>(parseModule(`import('lib.js').then(doThis);`, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "CallExpression",
                                callee: {
                                    type: "Import",
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "lib.js",
                                    },
                                ],
                            },
                            property: {
                                type: "Identifier",
                                name: "then",
                            },
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "doThis",
                            },
                        ],
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse module", () => {
        assert.match<Program>(parseModule("import(\"test.js\");", {next: true}), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Import",
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: "test.js",
                            },
                        ],
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse module in sloppy mode", () => {
        assert.match<Program>(parseScript("import(\"test.js\");", {next: true}), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Import",
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: "test.js",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse module", () => {
        assert.match<Program>(parseModule(`function load(f) { return import('lib/' + f) }
        `, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "load",
                    },
                    params: [
                        {
                            type: "Identifier",
                            name: "f",
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ReturnStatement",
                                argument: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Import",
                                    },
                                    arguments: [
                                        {
                                            type: "BinaryExpression",
                                            operator: "+",
                                            left: {
                                                type: "Literal",
                                                value: "lib/",
                                            },
                                            right: {
                                                type: "Identifier",
                                                name: "f",
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse \"onst importResult = import(test.js)\"", () => {
        assert.match<Program>(parseModule(`const importResult = import('test.js');
        `, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "importResult",
                            },
                            init: {
                                type: "CallExpression",
                                callee: {
                                    type: "Import",
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "test.js",
                                    },
                                ],
                            },
                        },
                    ],
                    kind: "const",
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse strict", () => {
        assert.match<Program>(parseModule(`"use strict";

        import('test.js');`, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "use strict",
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Import",
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: "test.js",
                            },
                        ],
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should parse strict in sloppy mode", () => {
        assert.match<Program>(parseScript(`"use strict";

        import('test.js');`, {next: true}), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "Literal",
                        value: "use strict",
                    },
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Import",
                        },
                        arguments: [
                            {
                                type: "Literal",
                                value: "test.js",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse import call string", () => {
        assert.match<Program>(parseModule(`function* a() {
            yield import('http');
        }`, {next: true}), {
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
                                    arguments: [
                                        {
                                            type: "Literal",
                                            value: "http",
                                        },
                                    ],
                                    callee: {
                                        type: "Import",
                                    },
                                    type: "CallExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "a",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });

    it("should parse await import", () => {
        assert.match<Program>(
            parseModule(`async function f(x) { await import(x) }`, {next: true}),
            {
                type: "Program",
                body: [
                    {
                        type: "FunctionDeclaration",
                        id: {
                            type: "Identifier",
                            name: "f",
                        },
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "AwaitExpression",
                                        argument: {
                                            type: "CallExpression",
                                            callee: {
                                                type: "Import",
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
                        },
                        generator: false,
                        expression: false,
                        async: true,
                    },
                ],
                sourceType: "module",
            },
        );
    });

    it("should parse import call string", () => {
        assert.match<Program>(
            parseModule(`const m = 'library.js'; import(m).then(() => {});`, {next: true}),
            {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "m",
                                },
                                init: {
                                    type: "Literal",
                                    value: "library.js",
                                },
                            },
                        ],
                        kind: "const",
                    },
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "MemberExpression",
                                computed: false,
                                object: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Import",
                                    },
                                    arguments: [
                                        {
                                            type: "Identifier",
                                            name: "m",
                                        },
                                    ],
                                },
                                property: {
                                    type: "Identifier",
                                    name: "then",
                                },
                            },
                            arguments: [
                                {
                                    type: "ArrowFunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                            ],
                        },
                    },
                ],
                sourceType: "module",
            },
        );
    });
    it("should parse import call string", () => {
        assert.match<Program>(parseModule("import(\"lib.js\").then(doThis);", {next: true}), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            computed: false,
                            object: {
                                type: "CallExpression",
                                callee: {
                                    type: "Import",
                                },
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "lib.js",
                                    },
                                ],
                            },
                            property: {
                                type: "Identifier",
                                name: "then",
                            },
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "doThis",
                            },
                        ],
                    },
                },
            ],
            sourceType: "module",
        });
    });

    it("should throw if too many arguments", () => {
        assert.throws(SyntaxError, () => {
            parseScript("import(\"hello\", \"world\");");
        });
    });

    it("should throw if no arguments", () => {
        assert.throws(SyntaxError, () => {
            parseScript("import();");
        });
    });

    it("should throw if invalid import call with too many arguments", () => {
        assert.throws(SyntaxError, () => {
            parseScript("import(x, y).then(z);");
        });
    });

    it("should throw if invalid import call with no arguments", () => {
        assert.throws(SyntaxError, () => {
            parseScript("import().then(doThat);");
        });
    });

    it("should throw if invalid new import call", () => {
        assert.throws(SyntaxError, () => {
            parseScript("new import(x);");
        });
    });

    it("should throw if invalid non callee", () => {
        assert.throws(SyntaxError, () => {
            parseScript("import.then(doLoad);");
        });
    });

    it("should parse coexist import call import declaration module", () => {
        assert.match<Program>(parseModule(`
            import $ from "a";
            import("b").then(c);
        `, {next: true}), {
            body: [
                {
                    source: {
                        type: "Literal",
                        value: "a",
                    },
                    specifiers: [
                        {
                            local: {
                                name: "$",
                                type: "Identifier",
                            },
                            type: "ImportDefaultSpecifier",
                        },
                    ],
                    type: "ImportDeclaration",
                },
                {
                    expression: {
                        arguments: [
                            {
                                name: "c",
                                type: "Identifier",
                            },
                        ],
                        callee: {
                            computed: false,
                            object: {
                                arguments: [
                                    {
                                        type: "Literal",
                                        value: "b",
                                    },
                                ],
                                callee: {
                                    type: "Import",
                                },
                                type: "CallExpression",
                            },
                            property: {
                                name: "then",
                                type: "Identifier",
                            },
                            type: "MemberExpression",
                        },
                        type: "CallExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });
});
