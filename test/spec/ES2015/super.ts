import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - `super`", () => {

    it("should parse empty function", () => {
        assert.match<Program>(parseScript(`class A extends B {
    constructor() {
        super();
    }
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "B",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "CallExpression",
                                                    callee: {
                                                        type: "Super",
                                                    },
                                                    arguments: [],
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "constructor",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse new super", () => {
        assert.match<Program>(parseScript(`class A extends B {
    foo() {
        new super.bar()
    }
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "B",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "foo",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "NewExpression",
                                                    callee: {
                                                        type: "MemberExpression",
                                                        computed: false,
                                                        object: {
                                                            type: "Super",
                                                        },
                                                        property: {
                                                            type: "Identifier",
                                                            name: "bar",
                                                        },
                                                    },
                                                    arguments: [],
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "init",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse empty function", () => {
        assert.match<Program>(parseScript(`class A extends B {
    X() {
        return super.y
    }
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "B",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "X",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ReturnStatement",
                                                argument: {
                                                    type: "MemberExpression",
                                                    computed: false,
                                                    object: {
                                                        type: "Super",
                                                    },
                                                    property: {
                                                        type: "Identifier",
                                                        name: "y",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "init",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse empty function", () => {
        assert.match<Program>(parseScript(`class A extends B {
    X() {
        return super[1]
    }
}`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "B",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "X",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ReturnStatement",
                                                argument: {
                                                    type: "MemberExpression",
                                                    computed: true,
                                                    object: {
                                                        type: "Super",
                                                    },
                                                    property: {
                                                        type: "Literal",
                                                        value: 1,
                                                        raw: "1",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "init",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A extends B { constructor() { super() } }\"", () => {
        assert.match<Program>(parseScript(`class A extends B { constructor() { super() } }`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "B",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "CallExpression",
                                                    callee: {
                                                        type: "Super",
                                                    },
                                                    arguments: [],
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "constructor",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A extends B { \"constructor\"() { super() } }\"", () => {
        assert.match<Program>(parseScript(`class A extends B { "constructor"() { super() } }`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "B",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Literal",
                                    value: "constructor",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "CallExpression",
                                                    callee: {
                                                        type: "Super",
                                                    },
                                                    arguments: [],
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "constructor",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"class A extends B { constructor(a = super()){} }\"", () => {
        assert.match<Program>(parseScript(`class A extends B { constructor(a = super()){} }`), {
            body: [
                {
                    body: {
                        body: [
                            {
                                computed: false,
                                key: {
                                    name: "constructor",
                                    type: "Identifier",
                                },
                                kind: "constructor",
                                static: false,
                                type: "MethodDefinition",
                                value: {
                                    async: false,
                                    body: {
                                        body: [],
                                        type: "BlockStatement",
                                    },
                                    generator: false,
                                    id: null,
                                    params: [
                                        {
                                            left: {
                                                name: "a",
                                                type: "Identifier",
                                            },
                                            right: {
                                                arguments: [],
                                                callee: {
                                                    type: "Super",
                                                },
                                                type: "CallExpression",
                                            },
                                            type: "AssignmentPattern",
                                        },
                                    ],
                                    type: "FunctionExpression",
                                },
                            },
                        ],
                        type: "ClassBody",
                    },
                    id: {
                        name: "A",
                        type: "Identifier",
                    },
                    superClass: {
                        name: "B",
                        type: "Identifier",
                    },
                    type: "ClassDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"class A extends B { constructor() { ({a: super()}); } }\"", () => {
        assert.match<Program>(
            parseScript(`class A extends B { constructor() { ({a: super()}); } }`),
            {
                type: "Program",
                body: [
                    {
                        type: "ClassDeclaration",
                        id: {
                            type: "Identifier",
                            name: "A",
                        },
                        superClass: {
                            type: "Identifier",
                            name: "B",
                        },
                        body: {
                            type: "ClassBody",
                            body: [
                                {
                                    type: "MethodDefinition",
                                    key: {
                                        type: "Identifier",
                                        name: "constructor",
                                    },
                                    computed: false,
                                    value: {
                                        type: "FunctionExpression",
                                        id: null,
                                        params: [],
                                        body: {
                                            type: "BlockStatement",
                                            body: [
                                                {
                                                    type: "ExpressionStatement",
                                                    expression: {
                                                        type: "ObjectExpression",
                                                        properties: [
                                                            {
                                                                type: "Property",
                                                                key: {
                                                                    type: "Identifier",
                                                                    name: "a",
                                                                },
                                                                computed: false,
                                                                value: {
                                                                    type: "CallExpression",
                                                                    callee: {
                                                                        type: "Super",
                                                                    },
                                                                    arguments: [],
                                                                },
                                                                kind: "init",
                                                                method: false,
                                                                shorthand: false,
                                                            },
                                                        ],
                                                    },
                                                },
                                            ],
                                        },
                                        generator: false,
                                        async: false,
                                    },
                                    kind: "constructor",
                                    static: false,
                                },
                            ],
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"class A extends B { constructor() { () => super(); } }\"", () => {
        assert.match<Program>(
            parseScript(`class A extends B { constructor() { () => super(); } }`),
            {
                type: "Program",
                body: [
                    {
                        type: "ClassDeclaration",
                        id: {
                            type: "Identifier",
                            name: "A",
                        },
                        superClass: {
                            type: "Identifier",
                            name: "B",
                        },
                        body: {
                            type: "ClassBody",
                            body: [
                                {
                                    type: "MethodDefinition",
                                    key: {
                                        type: "Identifier",
                                        name: "constructor",
                                    },
                                    computed: false,
                                    value: {
                                        type: "FunctionExpression",
                                        id: null,
                                        params: [],
                                        body: {
                                            type: "BlockStatement",
                                            body: [
                                                {
                                                    type: "ExpressionStatement",
                                                    expression: {
                                                        type: "ArrowFunctionExpression",
                                                        id: null,
                                                        params: [],
                                                        body: {
                                                            type: "CallExpression",
                                                            callee: {
                                                                type: "Super",
                                                            },
                                                            arguments: [],
                                                        },
                                                        generator: false,
                                                        expression: true,
                                                        async: false,
                                                    },
                                                },
                                            ],
                                        },
                                        generator: false,
                                        async: false,
                                    },
                                    kind: "constructor",
                                    static: false,
                                },
                            ],
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"class A extends B { constructor() { () => { super(); } } }\"", () => {
        assert.match<Program>(
            parseScript(`class A extends B { constructor() { () => { super(); } } }`),
            {
                type: "Program",
                body: [
                    {
                        type: "ClassDeclaration",
                        id: {
                            type: "Identifier",
                            name: "A",
                        },
                        superClass: {
                            type: "Identifier",
                            name: "B",
                        },
                        body: {
                            type: "ClassBody",
                            body: [
                                {
                                    type: "MethodDefinition",
                                    key: {
                                        type: "Identifier",
                                        name: "constructor",
                                    },
                                    computed: false,
                                    value: {
                                        type: "FunctionExpression",
                                        id: null,
                                        params: [],
                                        body: {
                                            type: "BlockStatement",
                                            body: [
                                                {
                                                    type: "ExpressionStatement",
                                                    expression: {
                                                        type: "ArrowFunctionExpression",
                                                        id: null,
                                                        params: [],
                                                        body: {
                                                            type: "BlockStatement",
                                                            body: [
                                                                {
                                                                    type: "ExpressionStatement",
                                                                    expression: {
                                                                        type: "CallExpression",
                                                                        callee: {
                                                                            type: "Super",
                                                                        },
                                                                        arguments: [],
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                        generator: false,
                                                        expression: false,
                                                        async: false,
                                                    },
                                                },
                                            ],
                                        },
                                        generator: false,
                                        async: false,
                                    },
                                    kind: "constructor",
                                    static: false,
                                },
                            ],
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });

    it("should parse \"({ a() { super.b(); } });\"", () => {
        assert.match<Program>(parseScript(`({ a() { super.b(); } });`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "CallExpression",
                                                    callee: {
                                                        type: "MemberExpression",
                                                        computed: false,
                                                        object: {
                                                            type: "Super",
                                                        },
                                                        property: {
                                                            type: "Identifier",
                                                            name: "b",
                                                        },
                                                    },
                                                    arguments: [],
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "init",
                                method: true,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    /*
     it('should parse "({ *a() { super.b = 0; } });"', function() {
     assert.match<Program>(parseScript(`({ *a() { super.b = 0; } });`), {});
     });
     */
    /*
     it('should parse "({ get a() { super[0] = 1; } });"', function() {
     assert.match<Program>(parseScript(`({ get a() { super[0] = 1; } });`), {});
     });*/

    it("should parse \"({ set a(x) { super.b[0] = 1; } });\"", () => {
        assert.match<Program>(parseScript(`({ set a(x) { super.b[0] = 1; } });`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
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
                                                    type: "AssignmentExpression",
                                                    operator: "=",
                                                    left: {
                                                        type: "MemberExpression",
                                                        computed: true,
                                                        object: {
                                                            type: "MemberExpression",
                                                            computed: false,
                                                            object: {
                                                                type: "Super",
                                                            },
                                                            property: {
                                                                type: "Identifier",
                                                                name: "b",
                                                            },
                                                        },
                                                        property: {
                                                            type: "Literal",
                                                            value: 0,
                                                        },
                                                    },
                                                    right: {
                                                        type: "Literal",
                                                        value: 1,
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    expression: false,
                                    async: false,
                                },
                                kind: "set",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(class extends B { constructor() { super() } });\"", () => {
        assert.match<Program>(parseScript(`(class extends B { constructor() { super() } });`), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ClassExpression",
                        id: null,
                        superClass: {
                            type: "Identifier",
                            name: "B",
                        },
                        body: {
                            type: "ClassBody",
                            body: [
                                {
                                    type: "MethodDefinition",
                                    key: {
                                        type: "Identifier",
                                        name: "constructor",
                                    },
                                    computed: false,
                                    value: {
                                        type: "FunctionExpression",
                                        id: null,
                                        params: [],
                                        body: {
                                            type: "BlockStatement",
                                            body: [
                                                {
                                                    type: "ExpressionStatement",
                                                    expression: {
                                                        type: "CallExpression",
                                                        callee: {
                                                            type: "Super",
                                                        },
                                                        arguments: [],
                                                    },
                                                },
                                            ],
                                        },
                                        generator: false,
                                        async: false,
                                    },
                                    kind: "constructor",
                                    static: false,
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse empty function", () => {
        assert.match<Program>(parseScript(`class A extends B {
     constructor() {
         super();
     }
 }`), {
            type: "Program",
            body: [
                {
                    type: "ClassDeclaration",
                    id: {
                        type: "Identifier",
                        name: "A",
                    },
                    superClass: {
                        type: "Identifier",
                        name: "B",
                    },
                    body: {
                        type: "ClassBody",
                        body: [
                            {
                                type: "MethodDefinition",
                                key: {
                                    type: "Identifier",
                                    name: "constructor",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "CallExpression",
                                                    callee: {
                                                        type: "Super",
                                                    },
                                                    arguments: [],
                                                },
                                            },
                                        ],
                                    },
                                    generator: false,
                                    async: false,
                                },
                                kind: "constructor",
                                static: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

});
