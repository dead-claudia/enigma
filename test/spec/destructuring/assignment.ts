import {parseScript, parseModule} from "../../../src";
import {expect} from "chai";

describe.skip("Destructuring - Assignment", () => {
    describe("Object", () => {
        it("should not parse \"({a = 0})\"", () => {
            expect(() => parseScript("({a = 0})")).to.throw();
        });

        it("should not parse \"({a} += 0);\"", () => {
            expect(() => parseScript("({a} += 0);")).to.throw();
        });

        it("should not parse \"({a,,} = 0)\"", () => {
            expect(() => parseScript("({a,,} = 0)")).to.throw();
        });

        it("should not parse \"({,a,} = 0)\"", () => {
            expect(() => parseScript("({,a,} = 0)")).to.throw();
        });

        it("should not parse \"({0} = 0)\"", () => {
            expect(() => parseScript("({0} = 0)")).to.throw();
        });

        it("should not parse \"({a:function} = 0)\"", () => {
            expect(() => parseScript("({a:function} = 0)")).to.throw();
        });

        it("should not parse \"({a:for} = 0)\"", () => {
            expect(() => parseScript("({a:for} = 0)")).to.throw();
        });

        it("should not parse \"({var} = 0)\"", () => {
            expect(() => parseScript("({var} = 0)")).to.throw();
        });

        it("should not parse \"({a:this}=0)\"", () => {
            expect(() => parseScript("({a:this}=0)")).to.throw();
        });

        it("should not parse \"({a: this} = 0);\"", () => {
            expect(() => parseScript("({a: this} = 0);")).to.throw();
        });

        it("should not parse \"({get a(){}})=0\"", () => {
            expect(() => parseScript("({get a(){}})=0")).to.throw();
        });
        it("should parse \"({x} = 0)\"", () => {
            expect(parseScript("({x} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x,} = 0)\"", () => {
            expect(parseScript("({x,} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x,y} = 0)\"", () => {
            expect(parseScript("({x,y} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x,y,} = 0)\"", () => {
            expect(parseScript("({x,y,} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({[a]: a} = 1)\"", () => {
            expect(parseScript("({[a]: a} = 1)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        computed: true,
                                        value: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x = 0} = 1)\"", () => {
            expect(parseScript("({x = 0} = 1)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x = 0,} = 1)\"", () => {
            expect(parseScript("({x = 0,} = 1)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x: y} = 0)\"", () => {
            expect(parseScript("({x: y} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x: y,} = 0)\"", () => {
            expect(parseScript("({x: y,} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({var: x} = 0)\"", () => {
            expect(parseScript("({var: x} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "var",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({\"x\": y} = 0)\"", () => {
            expect(parseScript("({\"x\": y} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Literal",
                                            value: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({0: y} = 0)\"", () => {
            expect(parseScript("({0: y} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Literal",
                                            value: 0,
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({0: x, 1: x} = 0)\"", () => {
            expect(parseScript("({0: x, 1: x} = 0)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Literal",
                                            value: 0,
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Literal",
                                            value: 1,
                                        },
                                        computed: false,
                                        value: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x: y = 0} = 1)\"", () => {
            expect(parseScript("({x: y = 0} = 1)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "y",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x: y = z = 0} = 1)\"", () => {
            expect(parseScript("({x: y = z = 0} = 1)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "y",
                                            },
                                            right: {
                                                type: "AssignmentExpression",
                                                operator: "=",
                                                left: {
                                                    type: "Identifier",
                                                    name: "z",
                                                },
                                                right: {
                                                    type: "Literal",
                                                    value: 0,
                                                },
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({x: [y] = 0} = 1)\"", () => {
            expect(parseScript("({x: [y] = 0} = 1)")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "Identifier",
                                                        name: "y",
                                                    },
                                                ],
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({a:let} = 0);\"", () => {
            expect(parseScript("({a:let} = 0);")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
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
                                            name: "let",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({let} = 0);\"", () => {
            expect(parseScript("({let} = 0);")).to.eql({
                body: [
                    {
                        expression: {
                            left: {
                                properties: [
                                    {
                                        computed: false,
                                        key: {
                                            name: "let",
                                            type: "Identifier",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                        type: "Property",
                                        value: {
                                            name: "let",
                                            type: "Identifier",
                                        },
                                    },
                                ],
                                type: "ObjectPattern",
                            },
                            operator: "=",
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                            type: "AssignmentExpression",
                        },
                        type: "ExpressionStatement",
                    },
                ],
                sourceType: "script",
                type: "Program",
            });
        });

        it("should parse \"({a:yield} = 0);\"", () => {
            expect(parseScript("({a:yield} = 0);")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
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
                                            name: "yield",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({yield} = 0);\"", () => {
            expect(parseScript("({yield} = 0);")).to.eql({
                body: [
                    {
                        expression: {
                            left: {
                                properties: [
                                    {
                                        computed: false,
                                        key: {
                                            name: "yield",
                                            type: "Identifier",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                        type: "Property",
                                        value: {
                                            name: "yield",
                                            type: "Identifier",
                                        },
                                    },
                                ],
                                type: "ObjectPattern",
                            },
                            operator: "=",
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                            type: "AssignmentExpression",
                        },
                        type: "ExpressionStatement",
                    },
                ],
                sourceType: "script",
                type: "Program",
            });
        });

        it("should parse \"({yield = 0} = 0);\"", () => {
            expect(parseScript("({yield = 0} = 0);")).to.eql({
                body: [
                    {
                        expression: {
                            left: {
                                properties: [
                                    {
                                        computed: false,
                                        key: {
                                            name: "yield",
                                            type: "Identifier",
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                        type: "Property",
                                        value: {
                                            left: {
                                                name: "yield",
                                                type: "Identifier",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                            type: "AssignmentPattern",
                                        },
                                    },
                                ],
                                type: "ObjectPattern",
                            },
                            operator: "=",
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                            type: "AssignmentExpression",
                        },
                        type: "ExpressionStatement",
                    },
                ],
                sourceType: "script",
                type: "Program",
            });
        });

        it("should parse \"(function*() { [...{ x = yield }] = 0; })\"", () => {
            expect(parseScript("(function*() { [...{ x = yield }] = 0; })")).to.eql({
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
                                body: [
                                    {
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "AssignmentExpression",
                                            operator: "=",
                                            left: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "RestElement",
                                                        argument: {
                                                            type: "ObjectPattern",
                                                            properties: [
                                                                {
                                                                    type: "Property",
                                                                    key: {
                                                                        type: "Identifier",
                                                                        name: "x",
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: "AssignmentPattern",
                                                                        left: {
                                                                            type: "Identifier",
                                                                            name: "x",
                                                                        },
                                                                        right: {
                                                                            type: "YieldExpression",
                                                                            argument: null,
                                                                            delegate: false,
                                                                        },
                                                                    },
                                                                    kind: "init",
                                                                    method: false,
                                                                    shorthand: true,
                                                                },
                                                            ],
                                                        },
                                                    },
                                                ],
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                        },
                                    },
                                ],
                            },
                            generator: true,
                            expression: false,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse empty object pattern assignment\"", () => {
            expect(parseScript("({} = 0);")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ObjectPattern",
                                properties: [],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });
    });

    describe("Array", () => {

        it("should parse dup assignment\"", () => {
            expect(parseScript("[a,a,,...a]=0;")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    null,
                                    {
                                        type: "RestElement",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse ellison\"", () => {
            expect(parseScript("[,,]=0")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    null,
                                    null,
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse simple assignment\"", () => {
            expect(parseScript("[a] = 0;")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse dup assignment\"", () => {
            expect(parseScript("[a,a,,...a]=0;")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    null,
                                    {
                                        type: "RestElement",
                                        argument: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"[x,] = 0\"", () => {
            expect(parseScript("[x,] = 0")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"[x,,] = 0\"", () => {
            expect(parseScript("[x,,] = 0")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    null,
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"[x] = 0\"", () => {
            expect(parseScript("[x] = 0")).to.eql({
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                ],
                            },
                            right: {
                                type: "Literal",
                                value: 0,
                            },
                        },
                    },
                ],
                sourceType: "script",
            });
        });
    });

    it("should parse \"[x, y, ...z] = 0\"", () => {
        expect(parseScript("[x, y, ...z] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                                {
                                    type: "Identifier",
                                    name: "y",
                                },
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[, x,,] = 0\"", () => {
        expect(parseScript("[, x,,] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                null,
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                                null,
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[[x]] = 0\"", () => {
        expect(parseScript("[[x]] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                    ],
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[...a[0]] = 0;\"", () => {
        expect(parseScript("[...a[0]] = 0;")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "MemberExpression",
                                        computed: true,
                                        object: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        property: {
                                            type: "Literal",
                                            value: 0,
                                        },
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[x, ...{0: y}] = 0\"", () => {
        expect(parseScript("[x, ...{0: y}] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "ObjectPattern",
                                        properties: [
                                            {
                                                type: "Property",
                                                key: {
                                                    type: "Literal",
                                                    value: 0,
                                                },
                                                computed: false,
                                                value: {
                                                    type: "Identifier",
                                                    name: "y",
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
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[...[x]] = 0\"", () => {
        expect(parseScript("[...[x]] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "ArrayPattern",
                                        elements: [
                                            {
                                                type: "Identifier",
                                                name: "x",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[x, x] = 0\"", () => {
        expect(parseScript("[x, x] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[x, ...x] = 0\"", () => {
        expect(parseScript("[x, ...x] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[x.a=a] = b\"", () => {
        expect(parseScript("[x.a=a] = b")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "MemberExpression",
                                        computed: false,
                                        object: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[x[a]=a] = b\"", () => {
        expect(parseScript("[x[a]=a] = b")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "MemberExpression",
                                        computed: true,
                                        object: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        property: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse [...[...a[x]]] = b\"", () => {
        expect(parseScript("[...[...a[x]]] = b")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "ArrayPattern",
                                        elements: [
                                            {
                                                type: "RestElement",
                                                argument: {
                                                    type: "MemberExpression",
                                                    computed: true,
                                                    object: {
                                                        type: "Identifier",
                                                        name: "a",
                                                    },
                                                    property: {
                                                        type: "Identifier",
                                                        name: "x",
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Identifier",
                            name: "b",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[{a=0},{a=0}] = 0\"", () => {
        expect(parseScript("[{a=0},{a=0}] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
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
                                                type: "AssignmentPattern",
                                                left: {
                                                    type: "Identifier",
                                                    name: "a",
                                                },
                                                right: {
                                                    type: "Literal",
                                                    value: 0,
                                                },
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                        },
                                    ],
                                },
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
                                                type: "AssignmentPattern",
                                                left: {
                                                    type: "Identifier",
                                                    name: "a",
                                                },
                                                right: {
                                                    type: "Literal",
                                                    value: 0,
                                                },
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                        },
                                    ],
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[a = 0, ...{b = 0}] = 0\"", () => {
        expect(parseScript("[a = 0, ...{b = 0}] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "AssignmentPattern",
                                    left: {
                                        type: "Identifier",
                                        name: "a",
                                    },
                                    right: {
                                        type: "Literal",
                                        value: 0,
                                    },
                                },
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "ObjectPattern",
                                        properties: [
                                            {
                                                type: "Property",
                                                key: {
                                                    type: "Identifier",
                                                    name: "b",
                                                },
                                                computed: false,
                                                value: {
                                                    type: "AssignmentPattern",
                                                    left: {
                                                        type: "Identifier",
                                                        name: "b",
                                                    },
                                                    right: {
                                                        type: "Literal",
                                                        value: 0,
                                                    },
                                                },
                                                kind: "init",
                                                method: false,
                                                shorthand: true,
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[{a=0}, ...b] = 0\"", () => {
        expect(parseScript("[{a=0}, ...b] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [
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
                                                type: "AssignmentPattern",
                                                left: {
                                                    type: "Identifier",
                                                    name: "a",
                                                },
                                                right: {
                                                    type: "Literal",
                                                    value: 0,
                                                },
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                        },
                                    ],
                                },
                                {
                                    type: "RestElement",
                                    argument: {
                                        type: "Identifier",
                                        name: "b",
                                    },
                                },
                            ],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[] = 0\"", () => {
        expect(parseScript("[] = 0")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
                            type: "ArrayPattern",
                            elements: [],
                        },
                        right: {
                            type: "Literal",
                            value: 0,
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"[a, b] = [b, a]\"", () => {
        expect(parseScript("[a, b] = [b, a]")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "ArrayPattern",
                    elements: [
                        {
                            type: "Identifier",
                            name: "a",
                        },
                        {
                            type: "Identifier",
                            name: "b",
                        },
                    ],
                },
                right: {
                    type: "ArrayExpression",
                    elements: [
                        {
                            type: "Identifier",
                            name: "b",
                        },
                        {
                            type: "Identifier",
                            name: "a",
                        },
                    ],
                },
            },
        },
    ],
    sourceType: "script",
});
    });

    it("should parse \"[a, ...(b = c)] = 0\"", () => {
        expect(parseScript("[a, ...(b = c)] = 0")).to.eql({
    type: "Program",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: {
                    type: "ArrayPattern",
                    elements: [
                        {
                            type: "Identifier",
                            name: "a",
                        },
                        {
                            type: "RestElement",
                            argument: {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                right: {
                                    type: "Identifier",
                                    name: "c",
                                },
                            },
                        },
                    ],
                },
                right: {
                    type: "Literal",
                    value: 0,
                },
            },
        },
    ],
    sourceType: "script",
});
     });

    it("should not parse \"[x] += 0\"", () => {
        expect(() => parseScript("[x] += 0")).to.throw();
    });

    it("should parse \"[, x, ...y,] = 0\"", () => {
        parseScript("[, x, ...y,] = 0");
    });

    it("should parse \"[...x, ...y] = 0\"", () => {
        parseScript("[...x, ...y] = 0");
    });

    it("should parse \"[...x, y] = 0\"", () => {
        parseScript("[...x, y] = 0");
    });

    it("should parse \"[...x,,] = 0\"", () => {
        parseScript("[...x,,] = 0");
    });

    it("should not parse \"[{a=0},{b=0},0] = 0\"", () => {
        expect(() => parseScript("[{a=0},{b=0},0] = 0")).to.throw();
    });

    it("should not parse \"[{a=0},...0]\"", () => {
        expect(() => parseScript("[{a=0},...0]")).to.throw();
    });

    it("should not parse \"[2] = 42\"", () => {
        expect(() => parseScript("[2] = 42")).to.throw();
    });

    it("should parse \"{a = [...b, c]} = 0\"", () => {
        parseScript("{a = [...b, c]} = 0");
    });

    it("should parse \"[a, ...b, {c=0}]\"", () => {
        parseScript("[a, ...b, {c=0}]");
    });

    it("should not parse \"[0] = 0\"", () => {
        expect(() => parseScript("[0] = 0")).to.throw();
    });

    it("should parse \"[...{a=0},]=0\"", () => {
        parseScript("[...{a=0},]=0");
    });

    it("should parse \"{a = [...b, c]} = 0\"", () => {
        parseScript("{a = [...b, c]} = 0");
    });

    it("should parse \"[a, ...b, {c=0}]\"", () => {
        parseScript("[a, ...b, {c=0}]");
    });

});
