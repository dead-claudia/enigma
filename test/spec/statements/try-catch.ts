import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `try ... catch`", () => {
    it("should parse \"try { } catch (eval) { }\"", () => {
        assert.match<Program>(
            parseScript(`try { throw []; } catch ([ x = unresolvableReference ]) {}`),
            {
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
            },
        );
    });

    it("should parse \"try { } catch (eval) { }\"", () => {
        assert.match<Program>(parseScript("try { } catch (eval) { }"), {
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
        assert.match<Program>(parseScript("try { } catch (arguments) { }"), {
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
        assert.match<Program>(parseScript("try { doThat(); } catch (e) { say(e) }"), {
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
        assert.match<Program>(parseScript("try { } catch (e) { let a; }"), {
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

        assert.match<Program>(parseScript("try { } catch (e) { }"), {
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

        assert.match<Program>(parseScript("try { } catch (e) { say(e) }"), {
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
        assert.match<Program>(parseScript(`"use strict"; try {} catch (evil) {}`), {
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
