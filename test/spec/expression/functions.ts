import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Functions", () => {

    it("should parse \"(function(){})\"", () => {
        expect(parseScript("(function(){})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
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
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function x() { y; z() });\"", () => {
        expect(parseScript("(function x() { y; z() });")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "x",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                },
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "CallExpression",
                                        callee: {
                                            type: "Identifier",
                                            name: "z",
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
            sourceType: "script",
        });
    });

    it("should parse \"(function eval() { });\"", () => {
        expect(parseScript("(function eval() { });")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "eval",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function arguments() { });\"", () => {
        expect(parseScript("(function arguments() { });")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "arguments",
                        },
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function x(y, z) { })\"", () => {
        expect(parseScript("(function x(y, z) { })")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: {
                            type: "Identifier",
                            name: "x",
                        },
                        params: [
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(a = b){})\"", () => {
        expect(parseScript("(function(a = b){})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                right: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(...a){})\"", () => {
        expect(parseScript("(function(...a){})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "a",
                                },
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(a, ...b){})\"", () => {
        expect(parseScript("(function(a, ...b){})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "b",
                                },
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function({a}){})\"", () => {
        expect(parseScript("(function({a}){})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function([a]){})\"", () => {
        expect(parseScript("(function([a]){})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                ],
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"label: !function(){ label:; };\"", () => {
        expect(parseScript("label: !function(){ label:; };")).to.eql({
            type: "Program",
            body: [
                {
                    type: "LabeledStatement",
                    label: {
                        type: "Identifier",
                        name: "label",
                    },
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "UnaryExpression",
                            operator: "!",
                            argument: {
                                type: "FunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "LabeledStatement",
                                            label: {
                                                type: "Identifier",
                                                name: "label",
                                            },
                                            body: {
                                                type: "EmptyStatement",
                                            },
                                        },
                                    ],
                                },
                                generator: false,
                                expression: false,
                                async: false,
                            },
                            prefix: true,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function([]){})\"", () => {
        expect(parseScript("(function([]){})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function(a){\"use strict\"})\"", () => {
        expect(parseScript("(function(a){\"use strict\"})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    expression: {
                                        value: "use strict",
                                        type: "Literal",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(function([]){\"use strict\"})\"", () => {
        expect(parseScript("(function([]){\"use strict\"})")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    expression: {
                                        value: "use strict",
                                        type: "Literal",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse \"(function(a){\"use strict\"})\"", () => {
        expect(() => {
            parseScript("(function(a, ...rest){\"use strict\"})");
        }).to.throw();
    });

    it("should not parse \"(function(a){\"use strict\"})\"", () => {
        expect(() => {
            parseScript("(function(a, ...[foo]){\"use strict\"})");
        }).to.throw();
    });

    it("should not parse \"(function([]){\"use strict\"})\"", () => {
        expect(() => {
            parseScript("(function([], ...rest){\"use strict\"})");
        }).to.throw();
    });

    it("should not parse \"(function([]){\"use strict\"})\"", () => {
        expect(() => {
            parseScript("(function([], ...[foo]){\"use strict\"})");
        }).to.throw();
    });

    it("should parse \"\"use strict\";(function([]){})\"", () => {
        expect(parseScript("\"use strict\";(function([]){})")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        value: "use strict",
                        type: "Literal",
                    },
                    type: "ExpressionStatement",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\"use strict\";(function(a){\"use strict\"})\"", () => {
        expect(parseScript("\"use strict\";(function(a){\"use strict\"})")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        value: "use strict",
                        type: "Literal",
                    },
                    type: "ExpressionStatement",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    expression: {
                                        value: "use strict",
                                        type: "Literal",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"\"use strict\";(function([]){\"use strict\"})\"", () => {
        expect(parseScript("\"use strict\";(function([]){\"use strict\"})")).to.eql({
            type: "Program",
            body: [
                {
                    expression: {
                        value: "use strict",
                        type: "Literal",
                    },
                    type: "ExpressionStatement",
                },
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "FunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    expression: {
                                        value: "use strict",
                                        type: "Literal",
                                    },
                                    type: "ExpressionStatement",
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should not parse \"\"use strict\";(function(a){\"use strict\"})\"", () => {
        expect(() => {
            parseScript("\"use strict\";(function(a, ...rest){\"use strict\"})");
        }).to.throw();
    });

    it("should not parse \"\"use strict\";(function(a){\"use strict\"})\"", () => {
        expect(() => {
            parseScript("\"use strict\";(function(a, ...[foo]){\"use strict\"})");
        }).to.throw();
    });

    it("should not parse \"\"use strict\";(function([]){\"use strict\"})\"", () => {
        expect(() => {
            parseScript("\"use strict\";(function([], ...rest){\"use strict\"})");
        }).to.throw();
    });

    it("should not parse \"\"use strict\";(function([]){\"use strict\"})\"", () => {
        expect(() => {
            parseScript("\"use strict\";(function([], ...[foo]){\"use strict\"})");
        }).to.throw();
    });
});
