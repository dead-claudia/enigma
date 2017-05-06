import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Statements - `with`", () => {

    it("should handle With statement", () => {
        expect(parseScript(`with(1);`)).to.eql({
            body: [
                {
                    body: {
                        type: "EmptyStatement",
                    },
                    object: {
                        type: "Literal",
                        value: 1,
                    },
                    type: "WithStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        expect(parseScript(`with (x) foo`)).to.eql({
            body: [
                {
                    body: {
                        expression: {
                            name: "foo",
                            type: "Identifier",
                        },
                        type: "ExpressionStatement",
                    },
                    object: {
                        name: "x",
                        type: "Identifier",
                    },
                    type: "WithStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        expect(parseScript(`with (x) foo;`)).to.eql({
            body: [
                {
                    body: {
                        expression: {
                            name: "foo",
                            type: "Identifier",
                        },
                        type: "ExpressionStatement",
                    },
                    object: {
                        name: "x",
                        type: "Identifier",
                    },
                    type: "WithStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

        expect(parseScript(`with (x) { foo = bar }`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "WithStatement",
                    object: {
                        type: "Identifier",
                        name: "x",
                    },
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "foo",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "bar",
                                    },
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
