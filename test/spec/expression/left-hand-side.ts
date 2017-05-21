import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Left Hand Side", () => {
    it("should parse \"new new foo", () => {
        assert.match<Program>(parseScript("new new foo"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "NewExpression",
                            callee: {
                                type: "Identifier",
                                name: "foo",
                            },
                            arguments: [],
                        },
                        arguments: [],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    /*
    it('should parse "new new foo', function() {
        assert.match<Program>(parseScript('new new foo'), {});
    });

    it('should parse "new new foo', function() {
        assert.match<Program>(parseScript('new new foo'), {});
    });

    it('should parse "new new foo', function() {
        assert.match<Program>(parseScript('new new foo'), {});
    });

    it('should parse "new new foo', function() {
        assert.match<Program>(parseScript('new new foo'), {});
    });

    it('should parse "new new foo', function() {
        assert.match<Program>(parseScript('new new foo'), {});
    });
    */
});
