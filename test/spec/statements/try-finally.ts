import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `try ... finally`", () => {
    it("should parse \"try { } finally { cleanup(stuff) }\"", () => {
        assert.match<Program>(parseScript("try { } finally { cleanup(stuff) }"), {
            type: "Program",
            body: [
                {
                    type: "TryStatement",
                    block: {
                        type: "BlockStatement",
                        body: [],
                    },
                    handler: null,
                    finalizer: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Identifier",
                                        name: "cleanup",
                                    },
                                    arguments: [
                                        {
                                            type: "Identifier",
                                            name: "stuff",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"try{}catch(a){}finally{}\"", () => {
        assert.match<Program>(parseScript("try{}catch(a){}finally{}"), {
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
                            name: "a",
                        },
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                    },
                    finalizer: {
                        type: "BlockStatement",
                        body: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }\"", () => {
        assert.match<Program>(
            parseScript("try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }"),
            {
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
                        finalizer: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "cleanup",
                                        },
                                        arguments: [
                                            {
                                                type: "Identifier",
                                                name: "stuff",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
                sourceType: "script",
            },
        );
    });
});
