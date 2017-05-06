import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("ES2018 - Dynamic `import()`", () => {
it("should parse import at top level", () => {
        expect(parseScript(`import('testing.js');

const test = 'hello';
import('interesting');

import('testing.js').then(() => {});
`, {next: true})).to.eql({
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
        expect(parseModule(`function loadImport(file) {
  return import('test');
}
`, {next: true})).to.eql({
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
        expect(parseScript(`function loadImport(file) {
  return import('test');
}
`, {next: true})).to.eql({
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
        expect(parseModule(`function* a() {
   yield import('http');
}
`, {next: true})).to.eql({
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
        expect(parseModule(`const m = 'library.js';
import(m).then(() => {});
`, {next: true})).to.eql({
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
        expect(parseModule(`import('lib.js').then(doThis);`, {next: true})).to.eql({
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
        expect(parseModule("import(\"test.js\");", {next: true})).to.eql({
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
        expect(parseScript("import(\"test.js\");", {next: true})).to.eql({
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
        expect(parseModule(`function load(f) { return import('lib/' + f) }
`, {next: true})).to.eql({
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
        expect(parseModule(`const importResult = import('test.js');
`, {next: true})).to.eql({
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
        expect(parseModule(`"use strict";

import('test.js');`, {next: true})).to.eql({
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
        expect(parseScript(`"use strict";

import('test.js');`, {next: true})).to.eql({
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
        expect(parseModule(`function* a() {
  yield import('http');
}`, {next: true})).to.eql({
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
        expect(parseModule(`async function f(x) { await import(x) }`, {next: true})).to.eql({
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
});
   });

it("should parse import call string", () => {
        expect(parseModule(`const m = 'library.js';
import(m).then(() => {});`, {next: true})).to.eql({
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
        expect(parseModule("import(\"lib.js\").then(doThis);", {next: true})).to.eql({
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
        expect(() => {
            parseScript("import(\"hello\", \"world\");");
        }).to.throw();

    });

it("should throw if no arguments", () => {
        expect(() => {
            parseScript("import();");
        }).to.throw();

    });

it("should throw if invalid import call with too many arguments", () => {
        expect(() => {
            parseScript("import(x, y).then(z);");
        }).to.throw();

    });

it("should throw if invalid import call with no arguments", () => {
        expect(() => {
            parseScript("import().then(doThat);");
        }).to.throw();

    });

it("should throw if invalid new import call", () => {
        expect(() => {
            parseScript("new import(x);");
        }).to.throw();

    });

it("should throw if invalid non callee", () => {
        expect(() => {
            parseScript("import.then(doLoad);");
        }).to.throw();

    });

it("should parse coexist import call import declaration module", () => {
        expect(parseModule(`
        import $ from "a";
        import("b").then(c);
`, {next: true})).to.eql({
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
