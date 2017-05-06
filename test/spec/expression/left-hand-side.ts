import { parseScript } from "../../../src";
import {expect} from "chai";

describe.skip("Expressions - Left Hand Side", () => {

    it("should parse \"new new foo", () => {
        expect(parseScript("new new foo")).to.eql({
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
        expect(parseScript('new new foo')).to.eql({});
    });

       it('should parse "new new foo', function() {
        expect(parseScript('new new foo')).to.eql({});
    });

       it('should parse "new new foo', function() {
        expect(parseScript('new new foo')).to.eql({});
    });

       it('should parse "new new foo', function() {
        expect(parseScript('new new foo')).to.eql({});
    });

       it('should parse "new new foo', function() {
        expect(parseScript('new new foo')).to.eql({});
    });

*/

});
