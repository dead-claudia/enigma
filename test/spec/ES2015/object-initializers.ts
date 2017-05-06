import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - Object Initalizers", () => {

    it("should parse proto identifier getter setter\"", () => {
        expect(parseScript(`({ __proto__: null, get __proto__(){} })`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
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
                                kind: "get",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse proto identifier method\"", () => {
        expect(parseScript(`({ __proto__: null, __proto__(){}, })`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
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
                                kind: "init",
                                method: true,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });
    /*
     it('should parse proto literal method"', function() {
     expect(parseScript(`({ "__proto__": null, __proto__(){}, })`)).to.eql({
     "type": "Program",
     "body": [
     {
     "type": "ExpressionStatement",
     "expression": {
     "type": "ObjectExpression",
     "properties": [
     {
     "type": "Property",
     "key": {
     "type": "Literal",
     "value": "__proto__"
     },
     "computed": false,
     "value": {
     "type": "Literal",
     "value": null
     },
     "kind": "init",
     "method": false,
     "shorthand": false
     },
     {
     "type": "Property",
     "key": {
     "type": "Identifier",
     "name": "__proto__"
     },
     "computed": false,
     "value": {
     "type": "FunctionExpression",
     "id": null,
     "params": [],
     "body": {
     "type": "BlockStatement",
     "body": []
     },
     "generator": false,
     "expression": false,
     "async": false
     },
     "kind": "init",
     "method": true,
     "shorthand": false
     }
     ]
     }
     }
     ],
     "sourceType": "script"
     });
     });*/

    it("should parse shorthand identifier\"", () => {
        expect(parseScript(`({ __proto__, __proto__: null })`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse proto shorthand literal\"", () => {
        expect(parseScript(`({ __proto__, "__proto__": null })`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Literal",
                                    value: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse proto shorthand\"", () => {
        expect(parseScript(`({ __proto__, __proto__ })`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                kind: "init",
                                method: false,
                                shorthand: true,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse proto identifier getter setter\"", () => {
        expect(parseScript(`({ __proto__: null, get __proto__(){}, set __proto__(x){} })`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "ObjectExpression",
                        properties: [
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "Literal",
                                    value: "null",
                                },
                                kind: "init",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
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
                                kind: "get",
                                method: false,
                                shorthand: false,
                            },
                            {
                                type: "Property",
                                key: {
                                    type: "Identifier",
                                    name: "__proto__",
                                },
                                computed: false,
                                value: {
                                    type: "FunctionExpression",
                                    id: null,
                                    params: [
                                        {
                                            type: "Identifier",
                                            name: "x",
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
                                kind: "set",
                                method: false,
                                shorthand: false,
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
