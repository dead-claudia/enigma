import { parseModule, parseScript } from "../../../src";
import {Program, Pattern, ArrayPattern} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Arrow Functions", () => {
    describe("Array binding pattern", () => {
        it("should parse \"([a]) => [0];\"", () => {
            assert.match<Program>(parseScript("([a]) => [0];"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "ArrowFunctionExpression",
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
                                type: "ArrayExpression",
                                elements: [
                                    {
                                        type: "Literal",
                                        value: 0,
                                    },
                                ],
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"([a,b])=>0;\"", () => {
            assert.match<Program>(parseScript("([a,b])=>0;"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [
                                {
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
                            ],
                            body: {
                                type: "Literal",
                                value: 0,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"([a,...b])=>0;\"", () => {
            assert.match<Program>(parseScript("([a,...b])=>0;"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "ArrayPattern",
                                    elements: [
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
                                },
                            ],
                            body: {
                                type: "Literal",
                                value: 0,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"([])=>0;\"", () => {
            assert.match<Program>(parseScript("([])=>0;"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                            ],
                            body: {
                                type: "Literal",
                                value: 0,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"([,,])=>0\"", () => {
            assert.match<Program>(parseScript("([,,])=>0"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "ArrayPattern",
                                    elements: [
                                        null,
                                        null,
                                    ],
                                },
                            ],
                            body: {
                                type: "Literal",
                                value: 0,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            });
        });
    });

    describe("Object binding pattern", () => {

        it("should parse \"([[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]])=>0;\"", () => {
            function array(elem: Pattern): ArrayPattern {
                return {type: "ArrayPattern", elements: [elem]};
            }

            assert.match<Program>(
                parseScript("([[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]])=>0;"),
                {
                    type: "Program",
                    body: [
                        {
                            type: "ExpressionStatement",
                            expression: {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [
                                    array(array(array(array(array(array(array(
                                        array(array(array(array(array(array(array(
                                            array(array(array(array(array(array({
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
                                                                type: "Identifier",
                                                                name: "b",
                                                            },
                                                        },
                                                        kind: "init",
                                                        method: false,
                                                        shorthand: true,
                                                    },
                                                ],
                                            })))))),
                                        ))))))),
                                    ))))))),
                                ],
                                body: {
                                    type: "Literal",
                                    value: 0,
                                },
                                generator: false,
                                expression: true,
                                async: false,
                            },
                        },
                    ],
                    sourceType: "script",
                },
            );
        });

        it("should parse \"({a,b=b,a:c,[a]:[d]})=>0;\"", () => {
            assert.match<Program>(parseScript("({a,b=b,a:c,[a]:[d]})=>0;"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "ArrowFunctionExpression",
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
                                                    type: "Identifier",
                                                    name: "b",
                                                },
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: true,
                                        },
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                            computed: false,
                                            value: {
                                                type: "Identifier",
                                                name: "c",
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                        {
                                            type: "Property",
                                            key: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                            computed: true,
                                            value: {
                                                type: "ArrayPattern",
                                                elements: [
                                                    {
                                                        type: "Identifier",
                                                        name: "d",
                                                    },
                                                ],
                                            },
                                            kind: "init",
                                            method: false,
                                            shorthand: false,
                                        },
                                    ],
                                },
                            ],
                            body: {
                                type: "Literal",
                                value: 0,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            });
        });

        it("should parse \"({})=>0;\"", () => {
            assert.match<Program>(parseScript("({})=>0;"), {
                type: "Program",
                body: [
                    {
                        type: "ExpressionStatement",
                        expression: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "ObjectPattern",
                                    properties: [],
                                },
                            ],
                            body: {
                                type: "Literal",
                                value: 0,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                    },
                ],
                sourceType: "script",
            });
        });
    });

    it("should parse \"({x = 0}, {y = 0}, {z = 0})=>0\"", () => {
        assert.match<Program>(parseScript("({x = 0}, {y = 0}, {z = 0})=>0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
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
                                                value:  0,
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
                                            name: "y",
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
                                                value:  0,
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
                                            name: "z",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "z",
                                            },
                                            right: {
                                                type: "Literal",
                                                value:  0,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a, {x = 0})=>0\"", () => {
        assert.match<Program>(parseScript("(a, {x = 0})=>0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
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
                                                value:  0,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse arrow with multiple arguments and rest", () => {
        assert.match<Program>(parseScript("(a,b,...c) => 0;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "c",
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse arrow with only rest", () => {
        assert.match<Program>(parseScript("(...a) => 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse arrow concise body in", () => {
        assert.match<Program>(parseScript("for (() => { x in y };;);"), {
            type: "Program",
            body: [
                {
                    type: "ForStatement",
                    init: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "BinaryExpression",
                                        operator: "in",
                                        left: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        right: {
                                            type: "Identifier",
                                            name: "y",
                                        },
                                    },
                                },
                            ],
                        },
                        generator: false,
                        expression: false,
                        async: false,
                    },
                    test: null,
                    update: null,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"() => \"test\"\"", () => {
        assert.match<Program>(parseScript("() => \"test\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "Literal",
                            value: "test",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"e => \"test\"\"", () => {
        assert.match<Program>(parseScript("e => \"test\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "e",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: "test",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(e) => \"test\"\"", () => {
        assert.match<Program>(parseScript("(e) => \"test\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "e",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: "test",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a, b) => \"test\"\"", () => {
        assert.match<Program>(parseScript("(a, b) => \"test\""), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: "test",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"e => { 42; }\"", () => {
        assert.match<Program>(parseScript("e => { 42; }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "e",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "Literal",
                                        value: 42,
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

    it("should parse \"e => { label: 42 }\"", () => {
        assert.match<Program>(parseScript("e => { label: 42 }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "e",
                            },
                        ],
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
                                        type: "ExpressionStatement",
                                        expression: {
                                            type: "Literal",
                                            value: 42,
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
            sourceType: "script",
        });
    });

    it("should parse \"(a, b) => { 42; }\"", () => {
        assert.match<Program>(parseScript("(a, b) => { 42; }"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                        ],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ExpressionStatement",
                                    expression: {
                                        type: "Literal",
                                        value:  42,
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

    it("should parse \"(x=1) => x * x\"", () => {
        assert.match<Program>(parseScript("(x=1) => x * x"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                right: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                        body: {
                            type: "BinaryExpression",
                            operator: "*",
                            left: {
                                type: "Identifier",
                                name: "x",
                            },
                            right: {
                                type: "Identifier",
                                name: "x",
                            },
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"eval => 42\"", () => {
        assert.match<Program>(parseScript("eval => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "eval",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  42,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"arguments => 42\"", () => {
        assert.match<Program>(parseScript("arguments => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "arguments",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  42,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a) => 00\"", () => {
        assert.match<Program>(parseScript("(a) => 00"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(eval, a) => 42\"", () => {
        assert.match<Program>(parseScript("(eval, a) => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "eval",
                            },
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  42,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(eval = 10) => 42\"", () => {
        assert.match<Program>(parseScript("(eval = 10) => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "eval",
                                },
                                right: {
                                    type: "Literal",
                                    value: 10,
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  42,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(eval, a = 10) => 42\"", () => {
        assert.match<Program>(parseScript("(eval, a = 10) => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "eval",
                            },
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                right: {
                                    type: "Literal",
                                    value: 10,
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  42,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(x => x)\"", () => {
        assert.match<Program>(parseScript("(x => x)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "x",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"x => y => 42\"", () => {
        assert.match<Program>(parseScript("x => y => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
                        body: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [
                                {
                                    type: "Identifier",
                                    name: "y",
                                },
                            ],
                            body: {
                                type: "Literal",
                                value:  42,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(x) => ((y, z) => (x, y, z))\"", () => {
        assert.match<Program>(parseScript("(x) => ((y, z) => (x, y, z))"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
                        body: {
                            type: "ArrowFunctionExpression",
                            id: null,
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
                                type: "SequenceExpression",
                                expressions: [
                                    {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "y",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "z",
                                    },
                                ],
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"foo(() => {})\"", () => {
        assert.match<Program>(parseScript("foo(() => {})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
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

    it("should parse \"foo((x, y) => {})\"", () => {
        assert.match<Program>(parseScript("foo((x, y) => {})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
                        },
                        arguments: [
                            {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "y",
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
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(sun) => earth\"", () => {
        assert.match<Program>(parseScript("(sun) => earth"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "sun",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "earth",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(...[]) => 0\"", () => {
        assert.match<Program>(parseScript("(...[]) => 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "RestElement",
                                argument: {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a, ...[]) => 0\"", () => {
        assert.match<Program>(parseScript("(a, ...[]) => 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "RestElement",
                                argument: {
                                    type: "ArrayPattern",
                                    elements: [],
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"() => () => 0\"", () => {
        assert.match<Program>(parseScript("() => () => 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "ArrowFunctionExpression",
                            id: null,
                            params: [],
                            body: {
                                type: "Literal",
                                value:  0,
                            },
                            generator: false,
                            expression: true,
                            async: false,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"() => 0, 1\"", () => {
        assert.match<Program>(parseScript("() => 0, 1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "SequenceExpression",
                        expressions: [
                            {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [],
                                body: {
                                    type: "Literal",
                                    value:  0,
                                },
                                generator: false,
                                expression: true,
                                async: false,
                            },
                            {
                                type: "Literal",
                                value: 1,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"() => 0 + 1\"", () => {
        assert.match<Program>(parseScript("() => 0 + 1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "BinaryExpression",
                            operator: "+",
                            left: {
                                type: "Literal",
                                value:  0,
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a,b) => 0 + 1\"", () => {
        assert.match<Program>(parseScript("(a,b) => 0 + 1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                        ],
                        body: {
                            type: "BinaryExpression",
                            operator: "+",
                            left: {
                                type: "Literal",
                                value:  0,
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(a,b,...c) => 0 + 1\"", () => {
        assert.match<Program>(parseScript("(a,b,...c) => 0 + 1"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "a",
                            },
                            {
                                type: "Identifier",
                                name: "b",
                            },
                            {
                                type: "RestElement",
                                argument: {
                                    type: "Identifier",
                                    name: "c",
                                },
                            },
                        ],
                        body: {
                            type: "BinaryExpression",
                            operator: "+",
                            left: {
                                type: "Literal",
                                value:  0,
                            },
                            right: {
                                type: "Literal",
                                value: 1,
                            },
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"() => (a) = 0\"", () => {
        assert.match<Program>(parseScript("() => (a) = 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [],
                        body: {
                            type: "AssignmentExpression",
                            operator: "=",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "Literal",
                                value:  0,
                            },
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse (x)=>{'use strict';}", () => {
        assert.match<Program>(parseScript("(x)=>{'use strict';}"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                                        type: "Literal",
                                        value: "use strict",
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

    it("should parse \"eval => 'use strict'\"", () => {
        assert.match<Program>(parseScript("eval => 'use strict'"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "eval",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: "use strict"                },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"([x=0], [])=>0\"", () => {
        assert.match<Program>(parseScript("([x=0], [])=>0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "x",
                                        },
                                        right: {
                                            type: "Literal",
                                            value:  0,
                                        },
                                    },
                                ],
                            },
                            {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"yield => 0", () => {
        assert.match<Program>(parseScript("yield => 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "yield",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(x=1) => x * x\"", () => {
        assert.match<Program>(parseScript("(eval, a) => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "eval",
                            },
                            {
                                type: "Identifier",
                                name: "a",
                            },
                        ],
                        body: {
                            type: "Literal",
                            value:  42,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(sun) => earth\"", () => {
        assert.match<Program>(parseScript("([a]) => [0];"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                            type: "ArrayExpression",
                            elements: [
                                {
                                    type: "Literal",
                                    value:  0,
                                },
                            ],
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"([a,b])=>0;\"", () => {
        assert.match<Program>(parseScript("([a,b])=>0;"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
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
                        ],
                        body: {
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"([,,])=>0\"", () => {
        assert.match<Program>(parseScript("(...a) => 0"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
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
                            type: "Literal",
                            value:  0,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"e => ({ property: 42 })\"", () => {
        assert.match<Program>(parseScript("e => ({ property: 42 })"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "e",
                            },
                        ],
                        body: {
                            type: "ObjectExpression",
                            properties: [
                                {
                                    type: "Property",
                                    key: {
                                        type: "Identifier",
                                        name: "property",
                                    },
                                    computed: false,
                                    value: {
                                        type: "Literal",
                                        value: 42,
                                    },
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                },
                            ],
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(eval = 10) => 42\"", () => {
        assert.match<Program>(parseScript("(eval = 10) => 42"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "AssignmentPattern",
                                left: {
                                    type: "Identifier",
                                    name: "eval",
                                },
                                right: {
                                    type: "Literal",
                                    value: 10,
                                },
                            },
                        ],
                        body: {
                            type: "Literal",
                            value: 42,
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"(x => x)\"", () => {
        assert.match<Program>(parseScript("(x => x)"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "x",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "x",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"foo(() => {})", () => {
        assert.match<Program>(parseScript("foo(() => {})"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "foo",
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

    it("should parse \"(sun) => earth\"", () => {
        assert.match<Program>(parseScript("(sun) => earth"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: [
                            {
                                type: "Identifier",
                                name: "sun",
                            },
                        ],
                        body: {
                            type: "Identifier",
                            name: "earth",
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should throw on \"(a)\n=> 0\"", () => {
        parseScript("(a)\n=> 0");
    });

    it("should throw on \"a\n=> 0\"", () => {
        parseScript("a\n=> 0");
    });

    it("should throw on \"((a)) => 1\"", () => {
        parseScript("((a)) => 1");
    });

    it("should throw on \"((a),...a) => 1\"", () => {
        assert.throws(SyntaxError, () => { parseScript("((a),...a) => 1"); });
    });

    it("should throw on \"(a,...a)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(a,...a)"); });
    });

    it("should throw on \"(a,...a)\n\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(a,...a)\n"); });
    });

    it("should throw on \"(a,...a)/*\n*/ => 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(a,...a)/*\n*/ => 0"); });
    });

    it("should throw on \"[]=>0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("1 + ()"); });
    });

    it("should throw on \"(10, 20) => 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("1 + ()"); });
    });

    it("should throw on \"() ? 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("() ? 0"); });
    });

    it("should throw on \"() <= 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("() <= 0"); });
    });
});
