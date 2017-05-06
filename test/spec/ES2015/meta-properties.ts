import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - Meta Properties", () => {

    it("should parse new new target\"", () => {

        expect(parseScript(`function f() {
    new new.target;
}`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "NewExpression",
                                    callee: {
                                        type: "MetaProperty",
                                        meta: {
                                            type: "Identifier",
                                            name: "new",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "target",
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
            ],
            sourceType: "script",
        });
    });

    it("should parse assign new target\"", () => {

        expect(parseScript(`function f() {
    let x = new.target;
}`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
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
                                            name: "x",
                                        },
                                        init: {
                                            type: "MetaProperty",
                                            meta: {
                                                type: "Identifier",
                                                name: "new",
                                            },
                                            property: {
                                                type: "Identifier",
                                                name: "target",
                                            },
                                        },
                                    },
                                ],
                                kind: "let",
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

    it("should parse new target precedence\"", () => {

        expect(parseScript(`function f() {
    new new.target()();
}`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "NewExpression",
                                        callee: {
                                            type: "MetaProperty",
                                            meta: {
                                                type: "Identifier",
                                                name: "new",
                                            },
                                            property: {
                                                type: "Identifier",
                                                name: "target",
                                            },
                                        },
                                        arguments: [],
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
            ],
            sourceType: "script",
        });
    });

    it("should parse new target expression\"", () => {

        expect(parseScript(`var f = function() { new.target; }`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "Identifier",
                                name: "f",
                            },
                            init: {
                                type: "FunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "MetaProperty",
                                                meta: {
                                                    type: "Identifier",
                                                    name: "new",
                                                },
                                                property: {
                                                    type: "Identifier",
                                                    name: "target",
                                                },
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
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse new target invoke\"", () => {

        expect(parseScript(`function f() {
    new.target();
}`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "MetaProperty",
                                        meta: {
                                            type: "Identifier",
                                            name: "new",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "target",
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
            ],
            sourceType: "script",
        });
    });

});
