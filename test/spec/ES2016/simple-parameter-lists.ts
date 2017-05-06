import { parseScript, parseModule } from "../../../src";

import {expect} from "chai";

describe.skip("ES2016 - Simple Parameter Lists", () => {

    it("expext \"\" to throw", () => {
        expect(() => {
            parseScript(`function a(options = {}) {
  "use strict";
`);
        }).to.throw();
    });

    it("expect \"\" to throw", () => {
        expect(() => {
            parseScript(`async function a(options = {}) {
  "use strict";
}`);
        }).to.throw();
    });

    it("expect \"\" to throw", () => {
        expect(() => {
            parseScript(`function a({ option1, option2 }) {
  "use strict";
}`);
        }).to.throw();
    });

    it("should parse \"var a = (options = {}) => options;\"", () => {
        expect(parseScript("var a = (options = {}) => options;")).to.eql({
            type: "Program",
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
                            init: {
                                type: "ArrowFunctionExpression",
                                id: null,
                                params: [
                                    {
                                        type: "AssignmentPattern",
                                        left: {
                                            type: "Identifier",
                                            name: "options",
                                        },
                                        right: {
                                            type: "ObjectExpression",
                                            properties: [],
                                        },
                                    },
                                ],
                                body: {
                                    type: "Identifier",
                                    name: "options",
                                },
                                generator: false,
                                expression: true,
                                async: false,
                            },
                        },
                    ],
                    kind: "var",
                },
            ],
            sourceType: "script",
        });
    });
});
