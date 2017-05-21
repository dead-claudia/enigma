import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2015 - `for ... of`", () => {

it("should parse \"for (const {x, y} of z);\"", () => {
        assert.match<Program>(parseScript("for (const {x, y} of z);"), {
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
        assert.match<Program>(parseScript("for (var {x, y} of z);"), {
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
        assert.match<Program>(parseScript("for (const y of list);"), {
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
        assert.match<Program>(parseScript("for (var [p, q] of r);"), {
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
        assert.match<Program>(parseScript("for (p of q);"), {
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
        assert.match<Program>(parseScript("for (let of of xyz);"), {
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

});
