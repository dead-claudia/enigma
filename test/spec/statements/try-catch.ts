import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `try ... catch`", () => {

it("should parse \"try { } catch (eval) { }\"", () => {
        expect(parseScript(`try {
    throw [];
  } catch ([ x = unresolvableReference ]) {}`)).to.eql({
    type: "Program",
    body: [
        {
            type: "TryStatement",
            block: {
                type: "BlockStatement",
                body: [
                    {
                        type: "ThrowStatement",
                        argument: {
                            type: "ArrayExpression",
                            elements: [],
                        },
                    },
                ],
            },
            handler: {
                type: "CatchClause",
                param: {
                    type: "ArrayPattern",
                    elements: [
                        {
                            type: "AssignmentPattern",
                            left: {
                                type: "Identifier",
                                name: "x",
                            },
                            right: {
                                type: "Identifier",
                                name: "unresolvableReference",
                            },
                        },
                    ],
                },
                body: {
                    type: "BlockStatement",
                    body: [],
                },
            },
            finalizer: null,
        },
    ],
    sourceType: "script",
});
});

it("should parse \"try { } catch (eval) { }\"", () => {
        expect(parseScript("try { } catch (eval) { }")).to.eql({
    type: "Program",
    body: [
        {
            type: "TryStatement",
            block: {
                type: "BlockStatement",
                body: [],
            },
            handler: {
                type: "CatchClause",
                param: {
                    type: "Identifier",
                    name: "eval",
                },
                body: {
                    type: "BlockStatement",
                    body: [],
                },
            },
            finalizer: null,
        },
    ],
    sourceType: "script",
});
    });

it("should parse \"try { } catch (arguments) { }\"", () => {
        expect(parseScript("try { } catch (arguments) { }")).to.eql({
    type: "Program",
    body: [
        {
            type: "TryStatement",
            block: {
                type: "BlockStatement",
                body: [],
            },
            handler: {
                type: "CatchClause",
                param: {
                    type: "Identifier",
                    name: "arguments",
                },
                body: {
                    type: "BlockStatement",
                    body: [],
                },
            },
            finalizer: null,
        },
    ],
    sourceType: "script",
});
    });

it("should parse \"try { doThat(); } catch (e) { say(e) }\"", () => {
        expect(parseScript("try { doThat(); } catch (e) { say(e) }")).to.eql({
    type: "Program",
    body: [
        {
            type: "TryStatement",
            block: {
                type: "BlockStatement",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "doThat",
                            },
                            arguments: [],
                        },
                    },
                ],
            },
            handler: {
                type: "CatchClause",
                param: {
                    type: "Identifier",
                    name: "e",
                },
                body: {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "say",
                                },
                                arguments: [
                                    {
                                        type: "Identifier",
                                        name: "e",
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            finalizer: null,
        },
    ],
    sourceType: "script",
});
    });

it("should parse \"try { } catch (e) { let a; }\"", () => {
        expect(parseScript("try { } catch (e) { let a; }")).to.eql({
    type: "Program",
    body: [
        {
            type: "TryStatement",
            block: {
                type: "BlockStatement",
                body: [],
            },
            handler: {
                type: "CatchClause",
                param: {
                    type: "Identifier",
                    name: "e",
                },
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
                                        name: "a",
                                    },
                                    init: null,
                                },
                            ],
                            kind: "let",
                        },
                    ],
                },
            },
            finalizer: null,
        },
    ],
    sourceType: "script",
});
    });

it("should parse \"try { } catch (e) { }\"", () => {

        expect(parseScript("try { } catch (e) { }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "TryStatement",
                    block: {
                        type: "BlockStatement",
                        body: [],
                    },
                    handler: {
                        type: "CatchClause",
                        param: {
                            type: "Identifier",
                            name: "e",
                        },
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                    },
                    finalizer: null,
                },
            ],
            sourceType: "script",
        });

        expect(parseScript("try { } catch (e) { say(e) }")).to.eql({
            type: "Program",
            body: [
                {
                    type: "TryStatement",
                    block: {
                        type: "BlockStatement",
                        body: [],
                    },
                    handler: {
                        type: "CatchClause",
                        param: {
                            type: "Identifier",
                            name: "e",
                        },
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "say",
                                        },
                                        arguments: [
                                            {
                                                type: "Identifier",
                                                name: "e",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    finalizer: null,
                },
            ],
            sourceType: "script",
        });

    });

it("should parse strict simple catch\"", () => {
        expect(parseScript(`"use strict";
try {} catch (evil) {}`)).to.eql({
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
            type: "TryStatement",
            block: {
                type: "BlockStatement",
                body: [],
            },
            handler: {
                type: "CatchClause",
                param: {
                    type: "Identifier",
                    name: "evil",
                },
                body: {
                    type: "BlockStatement",
                    body: [],
                },
            },
            finalizer: null,
        },
    ],
    sourceType: "script",
});
    });

});
