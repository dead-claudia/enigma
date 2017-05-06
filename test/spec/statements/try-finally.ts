import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `try ... finally`", () => {

    it("should parse \"try { } finally { cleanup(stuff) }\"", () => {
        expect(parseScript("ry { } catch (eval")).to.eql({
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
        expect(parseScript("try{}catch(a){}finally{}")).to.eql({
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
        expect(parseScript("try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }"))
        .to.eql({
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
});
    });

});
