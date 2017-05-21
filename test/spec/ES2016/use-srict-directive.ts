import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("ES2016 - `\"use strict\"` directive", () => {
    it("should throw on invalid strict arrow expression array destructing", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`([]) => { "use strict" }`);
        });
    });

    it("should throw on invalid strict arrow expression default value", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(a=1) => { "use strict" }`);
        });
    });

    it("should throw on invalid strict arrow expression object  destructing", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a}) => { "use strict" }`);
        });
    });

    it("should throw on invalid strict arrow expression rest", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(...x) => { "use strict" }`);
        });
    });

    it("should throw on invalid strict function declaration array destructing", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function f([]){ "use strict"; }`);
        });
    });

    it("should throw on invalid strict arrow expression default value", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function f(a = 1){ "use strict"; }`);
        });
    });

    it("should throw on invalid strict function declaration object destructing", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function f({x, y}) { "use strict"; }`);
        });
    });

    it("should throw on invalid strict generator default value", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g(a = 1){ "use strict"; }`);
        });
    });

    it("should throw on invalid strict generator array destructing", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g([]){ "use strict"; }`);
        });
    });

    it("should throw on invalid strict generator rest", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g(...x) { "use strict"; }`);
        });
    });

    it("should throw on invalid strict generator rest", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g(...x) { "use strict"; }`);
        });
    });

    it("should throw on invalid strict setter array destructing", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ set f([a]) { "use strict" } })`);
        });
    });

    it("should throw on invalid strict setter default value", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ set f(a = 1) { "use strict" } })`);
        });
    });

    it("should throw on invalid strict setter object destructing", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ set f({a}) { "use strict" } })`);
        });
    });

    it("should throw on invalid strict method rest", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class X { f(...a) { "use strict" } }`);
        });
    });

    it("should throw on invalid strict generator rest", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g(...x) { "use strict"; }`);
        });
    });

    it("should throw on invalid strict generator object destructing", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g({x, y}) { "use strict"; }`);
        });
    });
});
