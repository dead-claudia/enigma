import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - `for ... of`", () => {

it("should parse \"for (const {x, y} of z);\"", () => {
        expect(parseScript("for (const {x, y} of z);")).to.eql({
    type: "Program",
    body: [
        {
            type: "ForOfStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
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
                        init: null,
                    },
                ],
                kind: "const",
            },
            right: {
                type: "Identifier",
                name: "z",
            },
            body: {
                type: "EmptyStatement",
            },
            await: false,
        },
    ],
    sourceType: "script",
});
});

it("should parse \"for (var {x, y} of z);\"", () => {
        expect(parseScript("for (var {x, y} of z);")).to.eql({
    type: "Program",
    body: [
        {
            type: "ForOfStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
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
                        init: null,
                    },
                ],
                kind: "var",
            },
            right: {
                type: "Identifier",
                name: "z",
            },
            body: {
                type: "EmptyStatement",
            },
            await: false,
        },
    ],
    sourceType: "script",
});
});

it("should parse \"for (const y of list);\"", () => {
        expect(parseScript("for (const y of list);")).to.eql({
    type: "Program",
    body: [
        {
            type: "ForOfStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "y",
                        },
                        init: null,
                    },
                ],
                kind: "const",
            },
            right: {
                type: "Identifier",
                name: "list",
            },
            body: {
                type: "EmptyStatement",
            },
            await: false,
        },
    ],
    sourceType: "script",
});
});

it("should parse \"for (var [p, q] of r);\"", () => {
        expect(parseScript("for (var [p, q] of r);")).to.eql({
    type: "Program",
    body: [
        {
            type: "ForOfStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "ArrayPattern",
                            elements: [
                                {
                                    type: "Identifier",
                                    name: "p",
                                },
                                {
                                    type: "Identifier",
                                    name: "q",
                                },
                            ],
                        },
                        init: null,
                    },
                ],
                kind: "var",
            },
            right: {
                type: "Identifier",
                name: "r",
            },
            body: {
                type: "EmptyStatement",
            },
            await: false,
        },
    ],
    sourceType: "script",
});
});

it("should parse \"for (p of q);\"", () => {
        expect(parseScript("for (p of q);")).to.eql({
    type: "Program",
    body: [
        {
            type: "ForOfStatement",
            left: {
                type: "Identifier",
                name: "p",
            },
            right: {
                type: "Identifier",
                name: "q",
            },
            body: {
                type: "EmptyStatement",
            },
            await: false,
        },
    ],
    sourceType: "script",
});
});

it("should parse \"for (let of of xyz);\"", () => {
        expect(parseScript("for (let of of xyz);")).to.eql({
    type: "Program",
    body: [
        {
            type: "ForOfStatement",
            left: {
                type: "VariableDeclaration",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "of",
                        },
                        init: null,
                    },
                ],
                kind: "let",
            },
            right: {
                type: "Identifier",
                name: "xyz",
            },
            body: {
                type: "EmptyStatement",
            },
            await: false,
        },
    ],
    sourceType: "script",
});
});
/*
it('should parse "function f(a = 1) {}"', function() {
        expect(parseScript('function f(a = 1) {}')).to.eql({});
});

it('should parse "function f(a = 1) {}"', function() {
        expect(parseScript('function f(a = 1) {}')).to.eql({});
});

it('should parse "function f(a = 1) {}"', function() {
        expect(parseScript('function f(a = 1) {}')).to.eql({});
});

it('should parse "function f(a = 1) {}"', function() {
        expect(parseScript('function f(a = 1) {}')).to.eql({});
});

it('should parse "function f(a = 1) {}"', function() {
        expect(parseScript('function f(a = 1) {}')).to.eql({});
});*/

});
