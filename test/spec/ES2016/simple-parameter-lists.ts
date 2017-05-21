import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2016 - Simple Parameter Lists", () => {

    it("expext \"\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function a(options = {}) {
  "use strict";
`);
        });
    });

    it("expect \"\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`async function a(options = {}) {
  "use strict";
}`);
        });
    });

    it("expect \"\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function a({ option1, option2 }) {
  "use strict";
}`);
        });
    });

    it("should parse \"var a = (options = {}) => options;\"", () => {
        assert.match<Program>(parseScript("var a = (options = {}) => options;"), {
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
