import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("ES2016 - `\"use strict\"` directive", () => {
    it("should throw on invalid strict arrow expression array destructing", () => {
        expect(() => {
            parseScript(`([]) => { "use strict" }`);
        }).to.throw();
    });

    it("should throw on invalid strict arrow expression default value", () => {
        expect(() => {
            parseScript(`(a=1) => { "use strict" }`);
        }).to.throw();
    });

    it("should throw on invalid strict arrow expression object  destructing", () => {
        expect(() => {
            parseScript(`({a}) => { "use strict" }`);
        }).to.throw();
    });

    it("should throw on invalid strict arrow expression rest", () => {
        expect(() => {
            parseScript(`(...x) => { "use strict" }`);
        }).to.throw();
    });

    it("should throw on invalid strict function declaration array destructing", () => {
        expect(() => {
            parseScript(`function f([]){ "use strict"; }`);
        }).to.throw();
    });

    it("should throw on invalid strict arrow expression default value", () => {
        expect(() => {
            parseScript(`function f(a = 1){ "use strict"; }`);
        }).to.throw();
    });

    it("should throw on invalid strict function declaration object destructing", () => {
        expect(() => {
            parseScript(`function f({x, y}) { "use strict"; }`);
        }).to.throw();
    });

    it("should throw on invalid strict generator default value", () => {
        expect(() => {
            parseScript(`function *g(a = 1){ "use strict"; }`);
        }).to.throw();
    });

    it("should throw on invalid strict generator array destructing", () => {
        expect(() => {
            parseScript(`function *g([]){ "use strict"; }`);
        }).to.throw();
    });

    it("should throw on invalid strict generator rest", () => {
        expect(() => {
            parseScript(`function *g(...x) { "use strict"; }`);
        }).to.throw();
    });

    it("should throw on invalid strict generator rest", () => {
        expect(() => {
            parseScript(`function *g(...x) { "use strict"; }`);
        }).to.throw();
    });

    it("should throw on invalid strict setter array destructing", () => {
        expect(() => {
            parseScript(`({ set f([a]) { "use strict" } })`);
        }).to.throw();
    });

    it("should throw on invalid strict setter default value", () => {
        expect(() => {
            parseScript(`({ set f(a = 1) { "use strict" } })`);
        }).to.throw();
    });

    it("should throw on invalid strict setter object destructing", () => {
        expect(() => {
            parseScript(`({ set f({a}) { "use strict" } })`);
        }).to.throw();
    });

    it("should throw on invalid strict method rest", () => {
        expect(() => {
            parseScript(`class X { f(...a) { "use strict" } }`);
        }).to.throw();
    });

    it("should throw on invalid strict generator rest", () => {
        expect(() => {
            parseScript(`function *g(...x) { "use strict"; }`);
        }).to.throw();
    });

    it("should throw on invalid strict generator object destructing", () => {
        expect(() => {
            parseScript(`function *g({x, y}) { "use strict"; }`);
        }).to.throw();
    });
});
