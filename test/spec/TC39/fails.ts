import {parseScript, parseModule} from "../../../src";
import * as assert from "clean-assert";

describe.skip("TC39 - Fails", () => {
    it("should throw on \"use strict; (\\00)\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`'use strict'; ('\\00')`); });
    });

    it("should throw on \"(\\1)\"", () => {
        assert.throws(SyntaxError, () => { parseModule(`('\\1')`); });
    });

    it("should throw on \"export let[a] = 0 export let[b] = 0\"", () => {
        assert.throws(SyntaxError, () => { parseModule(`export let[a] = 0 export let[b] = 0`); });
    });

    it("should throw on \"{\" with linebreak", () => {
        assert.throws(SyntaxError, () => { parseScript(`


{`); });
    });

    it("should throw on \"function* f() { [yield* {a = 0}]; }\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`function* f() { [yield* {a = 0}]; }`); });
    });

    it("should throw on \"＊\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`＊`); });
    });

    it("should throw on \"class A {a:0}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`class A {a:0}`); });
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(;;) function a(){}`); });
    });

    it("should throw on \"function* y({yield}) {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`function* y({yield}) {}`); });
    });

    it("should throw on \"for(let[a]().b of 0);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(let[a]().b of 0);`); });
    });

    it("should throw on \"1 / %\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`1 / %`); });
    });

    it("should throw on \"var {a:a};\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`var {a:a};`); });
    });

    it("should throw on \"(class {a:0})\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`(class {a:0})`); });
    });

    it("should throw on \"function*g(yield = 0){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`function*g(yield = 0){}`); });
    });

    it("should throw on \"switch (cond) { case 10: let a = 20; \"", () => {
        assert.throws(SyntaxError, () => { parseScript(`switch (cond) { case 10: let a = 20; `); });
    });

    it("should throw on \"var default\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`var default`); });
    });

    it("should throw on \"var if = 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`var if = 42`); });
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function*() {
    function({[yield 3]: y}) {}
})`);
        });
    });

    it("should throw on \"use strict; 07\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`'use strict'; 07`); });
    });

    it("should throw on \"({a: this} = 0);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`({a: this} = 0);`); });
    });

    it("should throw on \"let [...a,] = 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`let [...a,] = 0`); });
    });

    it("should throw on \"class A { set prop(x, y) {} }\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`class A { set prop(x, y) {} }`); });
    });

    it("should throw on \"a => {}()\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`a => {}()`); });
    });

    it("should throw on \"console.log(typeof () => {});\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`console.log(typeof () => {});`); });
    });

    it("should throw on \"(b, ...a) + 1\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`(b, ...a) + 1`); });
    });

    it("should throw on \"var a[0]=0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`var a[0]=0;`); });
    });

    it("should throw on \"({ \"chance\" }) = obj\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`({ "chance" }) = obj`); });
    });

    it("should throw on \"for(let a = 0 in b);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(let a = 0 in b);`); });
    });

    it("should throw on \"[{a=0},{b=0},0] = 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`[{a=0},{b=0},0] = 0`); });
    });

    it("should throw on \"var {a};\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`var {a};`); });
    });

    it("should throw on \"p = { q/ }\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`p = { q/ }`); });
    });

    it("should throw on \"1.e+\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`1.e+`); });
    });

    it("should throw on \"(...[ 5 ]) => {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`(...[ 5 ]) => {}`); });
    });

    it("should throw on \"({,a,} = 0)\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`({,a,} = 0)`); });
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(;;) function a(){}`); });
    });

    it("should throw on \"for(a in b) function c(){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(a in b) function c(){}`); });
    });

    it("should throw on \"for(a of b) function c(){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(a of b) function c(){}`); });
    });

    it("should throw on \"var {...{z}} = { z: 1}; console.log(z);\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var {...{z}} = { z: 1}; console.log(z);`);
        });
    });

    it("should throw on \"[v] += ary\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`[v] += ary`); });
    });

    it("should throw on \"([a]) = 0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`([a]) = 0;`); });
    });

    it("should throw on \"([a]) = 0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`([a]) = 0;`); });
    });

    it("should throw on \"{import a from b;}\"", () => {
        assert.throws(SyntaxError, () => { parseModule(`{import a from 'b';}`); });
    });

    it("should throw on \"{export default 3;}\"", () => {
        assert.throws(SyntaxError, () => { parseModule(`{import a from 'b';}`); });
    });

    it("should throw on \"{export {a};}\"", () => {
        assert.throws(SyntaxError, () => { parseModule(`{import a from 'b';}`); });
    });

    it("should throw on \"({a}) = 0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`({a}) = 0;`); });
    });

    it("should throw on \"with(true) class a {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`with(true) class a {}`); });
    });

    it("should throw on \"[a, ...(b = c)] = 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`[a, ...(b = c)] = 0`); });
    });

    it("should throw on \"[x] += 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`[x] += 0`); });
    });

    it("should throw on \"({a:(b = 0)} = 1)\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`({a:(b = 0)} = 1)`); });
    });

    it("should throw on \"({a:(b = 0)} = 1)\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`({a:(b = 0)} = 1)`); });
    });

    it("should throw on \"if(0) break\"", () => {
        assert.throws(SyntaxError, () => { parseScript("if(0) break"); });
    });

    it("should throw on \"({ set a(b = new.target){} })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({ set a(b = new.target){} })"); });
    });

    it("should throw on \"({ a(b = new.target){} })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({ a(b = new.target){} })"); });
    });

    it("should throw on \"(function a(b = new.target){})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(function a(b = new.target){})"); });
    });

    it("should throw on \"const a;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("const a;"); });
    });

    it("should throw on \"({ get prop(x) {} })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({ get prop(x) {} })"); });
    });

    it("should throw on \"function(){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({ set prop() {} }))"); });
    });

    it("should throw on \"}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("}"); });
    });

    it("should throw on \"3in []\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3in []"); });
    });

    it("should throw on \"3e\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3e"); });
    });

    it("should throw on \"3e-\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3e-"); });
    });

    it("should throw on \"3x\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3x"); });
    });

    it("should throw on \"3x0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3x0"); });
    });

    it("should throw on \"use strict; 09\"", () => {
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; 09"); });
    });

    it("should throw on \"0x3in[]\"", () => {
        assert.throws(SyntaxError, () => { parseScript("0x3in[]"); });
    });

    it("should throw on \"(1 + 1) = 10\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(1 + 1) = 10"); });
    });

    it("should throw on \"3 = 4\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3 = 4"); });
    });

    it("should throw on \"({ set s(.) { } })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({ set s(.) { } })"); });
    });

    it("should throw on \"a b;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("a b;"); });
    });

    it("should throw on \"a b;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("}"); });
    });

    it("should throw on \"{\"", () => {
        assert.throws(SyntaxError, () => { parseScript("{"); });
    });

    it("should throw on \"var {(a)} = 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var {(a)} = 0"); });
    });

    it("should throw on \"var {a:(b)} = 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var {a:(b)} = 0"); });
    });

    it("should throw on \"({(a)} = 0)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({(a)} = 0)"); });
    });

    it("should throw on \"\\\"", () => {
        assert.throws(SyntaxError, () => { parseScript("\\"); });
    });

    it("should throw on \" new.target = b;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(" new.target = b;"); });
    });

    it("should throw on \" new.target++;\"", () => {
        assert.throws(SyntaxError, () => { parseScript(" new.target++;"); });
    });

    it("should throw on invalid binding\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function f() { (new.target) => b; }`);
        });
    });

    it("should throw on \"let default\"", () => {
        assert.throws(SyntaxError, () => { parseScript("let default"); });
    });

    it("should throw on \"var a = 0123.;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var a = 0123.;"); });
    });

    it("should throw on \"const default\"", () => {
        assert.throws(SyntaxError, () => { parseScript("const default"); });
    });

    it("should throw on \"class a extends 07 {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("class a extends 07 {}"); });
    });

    it("should throw on \"\"use strict\"; ({ v: eval }) = obj\"", () => {
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; ({ v: eval }) = obj"); });
    });

    it("should throw on \"\"use strict\"; ({ v: arguments }) = obj\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\"use strict\"; ({ v: arguments }) = obj");
        });
    });

    it("should throw on \"--1\"", () => {
        assert.throws(SyntaxError, () => { parseScript("--1"); });
    });

    it("should throw on \"for (let x = 42 in list) process(x);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (let x = 42 in list) process(x);"); });
    });

    it("should throw on \"for (let x = 42 of list) process(x);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (let x = 42 of list) process(x);"); });
    });

    it("should throw on \"import foo\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import foo"); });
    });

    it("should throw on \"import { foo, bar }\"", () => {
        assert.throws(SyntaxError, () => { parseModule("import { foo, bar }"); });
    });

    it("should throw on \"\"use strict\"; (a) => 00\"", () => {
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; (a) => 00"); });
    });

    it("should throw on \"() <= 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript("() <= 42"); });
    });

    it("should throw on \"(10) => 00\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(10) => 00"); });
    });

    it("should throw on \"([ 5 ]) => {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("([ 5 ]) => {}"); });
    });

    it("should throw on \"[...a, ] = b\"", () => {
        assert.throws(SyntaxError, () => { parseScript("[...a, ] = b"); });
    });

    it("should throw on \"{\"", () => {
        assert.throws(SyntaxError, () => { parseScript("{"); });
    });

    it("should throw on \"obj = {x = 0}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("obj = {x = 0}"); });
    });

    it("should throw on \"var 𫠞_ = 12;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var 𫠞_ = 12;"); });
    });

    it("should throw on \"if (1) let x = 10;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("if (1) let x = 10;"); });
    });

    it("should throw on \"+i = 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript("+i = 42"); });
    });

    it("should throw on \"{ get 2 }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("{"); });
    });

    it("should throw on \"function true() { }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function true() { }"); });
    });

    it("should throw on \"a class;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("a class;"); });
    });

    it("should throw on \"continue 2;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("continue 2;"); });
    });

    it("should throw on \"throw\"", () => {
        assert.throws(SyntaxError, () => { parseScript("throw"); });
    });

    it("should throw on \"3in[]\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3in[]"); });
    });

    it("should throw on \"3x0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3x0"); });
    });

    it("should throw on \"for (i + 1 in {});\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (i + 1 in {});"); });
    });

    it("should throw on \"for (+i in {});\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (+i in {});"); });
    });

    it("should throw on \"for(;;)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for(;;)"); });
    });

    it("should throw on \"with(x)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("with(x)"); });
    });

    it("should throw on \"with()\"", () => {
        assert.throws(SyntaxError, () => { parseScript("with()"); });
    });

    it("should throw on \"if(true) let a = 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("if(true) let a = 1;"); });
    });

    it("should throw on \"‿ = 10\"", () => {
        assert.throws(SyntaxError, () => { parseScript("‿ = 10"); });
    });

    it("should throw on \"switch (c) { default: default: }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("switch (c) { default: default: }"); });
    });

    it("should throw on \"/*hello  *\"", () => {
        assert.throws(SyntaxError, () => { parseScript("/*hello  *"); });
    });

    it("should throw on \"(...a, ...b) => 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(...a, ...b) => 0"); });
    });

    it("should throw on \"(a,...[a]) => 0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(a,...[a]) => 0;"); });
    });

    it("should throw on \"([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;");
        });
    });

    it("should throw on \"({a,...b}) => 0;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({a,...b}) => 0;"); });
    });

    it("should throw on \"(b, ...a) + 1\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(b, ...a) + 1"); });
    });

    it("should throw on \"(...a) + 1\"", () => {
        assert.throws(SyntaxError, () => { parseScript("(...a) + 1 "); });
    });

    it("should throw on \"for (var [p]=q of r);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (var [p]=q of r);"); });
    });

    it("should throw on \"for (this of that);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (this of that);"); });
    });

    it("should throw on \"for (var x = 1 of y);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (var x = 1 of y);"); });
    });

    it("should throw on \"for (const x = 0 in y){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (const x = 0 in y){}"); });
    });

    it("should throw on \"const const;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("const const;"); });
    });

    it("should throw on \"for (const let = 1;;;) {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (const let = 1;;;) {}"); });
    });

    it("should throw on \"for (let x, y, z, let;;;) {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (let x, y, z, let;;;) {}"); });
    });

    it("should throw on \"{\"", () => {
        assert.throws(SyntaxError, () => { parseScript("{"); });
    });

    it("should throw on \"{\"", () => {
        assert.throws(SyntaxError, () => { parseModule("{"); });
    });

    it("should throw on \"for (let x, y, z, let = 1;;;) {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (let x, y, z, let = 1;;;) {}"); });
    });

    it("should throw on \"for (let let;;;) {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (let let;;;) {}"); });
    });

    it("should throw on \"for (let let;;;) {}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (let let;;;) {}"); });
    });

    it("should throw on \"f(....g);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("f(....g);"); });
    });

    it("should throw on \"f(... ... g);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("f(... ... g);"); });
    });

    it("should throw on \"function *g() { function *yield(){} }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function *g() { function *yield(){} }"); });
    });

    it("should throw on \"function *g(a, b, c, ...yield){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function *g(a, b, c, ...yield){}"); });
    });

    it("should throw on \"0O1a\"", () => {
        assert.throws(SyntaxError, () => { parseScript("0O1a"); });
    });

    it("should throw on \"/\"", () => {
        assert.throws(SyntaxError, () => { parseScript("/"); });
    });

    it("should throw on \"1 + { t:t,\"", () => {
        assert.throws(SyntaxError, () => { parseScript("1 + { t:t,"); });
    });

    it("should throw on \"i + 2 = 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript("i + 2 = 42"); });
    });

    it("should throw on \"1 + (\"", () => {
        assert.throws(SyntaxError, () => { parseScript("1 + ("); });
    });

    it("should throw on \"{ set 1 }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("{ set 1 }"); });
    });

    it("should throw on \"({ set: s(if) { } })", () => {
        assert.throws(SyntaxError, () => { parseScript("({ set: s(if) { } })"); });
    });

    it("should throw on \"({ set s() { } })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({ set s() { } })"); });
    });

    it("should throw on \"({ set: s(a, b) { } })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({ set: s(a, b) { } })"); });
    });

    it("should throw on \"({get[a,b]:0})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({get[a,b]:0})"); });
    });

    it("should throw on \"({get{a}:0})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({get{a}:0})"); });
    });

    it("should throw on \"((a)) => 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript("((a)) => 42"); });
    });

    it("should throw on \"() ? 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript("() ? 42"); });
    });

    it("should throw on \"() + 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript("() + 42"); });
    });

    it("should throw on \"function true() { }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function true() { }"); });
    });

    it("should throw on \"if.a;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("if.a;"); });
    });

    it("should throw on \"for ((i in {}));\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for ((i in {}));"); });
    });

    it("should throw on \"if(false) doThis(); else\"", () => {
        assert.throws(SyntaxError, () => { parseScript("if(false) doThis(); else"); });
    });

    it("should throw on \"switch (c) { default: default: }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("switch (c) { default: default: }"); });
    });

    it("should throw on \"try {} catch (42) {} \"", () => {
        assert.throws(SyntaxError, () => { parseScript("try {} catch (42) {} "); });
    });

    it("should throw on \"function hello() { \"use strict\"; ({ 021: 42 }); }\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("unction hello() { \"use strict\"; ({ 021: 42 }); }");
        });
    });

    /* tslint:disable max-line-length */
    it("should throw on octal directives within strict-mode functions", () => {
        /* tslint:enable max-line-length */
        assert.throws(SyntaxError, () => {
            parseScript(`function hello() {
                "use strict";
                function inner() { "octal directive\\1"; }
            }`);
        });
    });

    it("should throw on \"var\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var"); });
    });

    it("should throw on \"function t() { ;  ;  \"", () => {
        assert.throws(SyntaxError, () => { parseScript("function t() { ;  ;  "); });
    });

    it("should throw on \"function x(...a = 1){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function x(...a = 1){}"); });
    });

    it("should throw on \"class\"", () => {
        assert.throws(SyntaxError, () => { parseScript("class"); });
    });

    it("should throw on \"export { if }\"", () => {
        assert.throws(SyntaxError, () => { parseModule("export { if }"); });
    });

    it("should throw on \"var x,\"", () => {
        assert.throws(SyntaxError, () => { parseScript("var x,"); });
    });

    it("should throw on \"01a\"", () => {
        assert.throws(SyntaxError, () => { parseScript("01a"); });
    });

    it("should throw on \"({ set: s(if) { } })\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({ set: s(if) { } })"); });
    });

    it("should throw on \"function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript("function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}");
        });
    });

    it("should throw on \"for(let x=1 of [1,2,3]) 0\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for(let x=1 of [1,2,3]) 0"); });
    });

    it("should throw on \"({a: b += 0} = {})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("({a: b += 0} = {})"); });
    });

    it("should throw on \"for(let of 0);\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for(let of 0);"); });
    });

    it("should throw on \"3ea\"", () => {
        assert.throws(SyntaxError, () => { parseScript("3ea"); });
    });

    it("should throw on \"use strict\"; arguments => 42", () => {
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; arguments => 42"); });
    });

    it("should throw on \"\"use strict\"; (eval, a) => 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; (eval, a) => 42"); });
    });

    it("should throw on \"f(a, a) => 42", () => {
        assert.throws(SyntaxError, () => { parseScript("(a, a) => 42"); });
    });

    it("should throw on \"({[a,b]:0})\"", () => {
        assert.throws(SyntaxError, () => { parseScript("{"); });
    });

    it("should throw on \"\"use strict\"; (eval) => 42\"", () => {
        assert.throws(SyntaxError, () => { parseScript("\"use strict\"; (eval) => 42"); });
    });

    it("should throw on \"function t(false) { }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function t(false) { }"); });
    });

    it("should throw on \"function t(null) { }\"", () => {
        assert.throws(SyntaxError, () => { parseScript("function t(null) { }"); });
    });

    it("should throw on \"break 1;\"", () => {
        assert.throws(SyntaxError, () => { parseScript("break 1;"); });
    });

    it("should throw on \"for (var i, i2 in {});\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (var i, i2 in {});"); });
    });

    it("should throw on \"for (i + 1 in {});\"", () => {
        assert.throws(SyntaxError, () => { parseScript("for (i + 1 in {});"); });
    });

    it("should throw on \"if(false)\"", () => {
        assert.throws(SyntaxError, () => { parseScript("if(false)"); });
    });

    it("expect \"`a` = b;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("`a ` = b;");
        });
    });

    it("expect \"for (`a` in b);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for (`a` in b);");
        });
    });

    it("expect \"for (`a` of b);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for (`a` of b);");
        });
    });

    it("expect \"(a = b)++;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(a = b)++;");
        });
    });

    it("expect \"for (`a` of b);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for (`a` of b);");
        });
    });

    it("expect \"(a = b) = c;", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(a = b) = c;");
        });
    });

    it("expect \"function l(w,[w]) { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function l(w,[w]) { }`);
        });
    });

    it("expect \"function l(w,[w]) { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function l(w,[w]) { }`);
        });
    });

    it("expect \"function l(w,[w]) { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function l(w,[w]) { }`);
        });
    });

    it("expect \"function l(w,w=12) { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function l(w,w=12) { }`);
        });
    });

    it("expect \"`abel${e 12}`\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("`abel${e 12}`");
        });
    });

    it("expect \"`abel\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("`abel");
        });
    });

    it("expect \"-a**e\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("-a**e");
        });
    });

    it("expect \"({ obj:20 }) = 42\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("({ obj:20 }) = 42");
        });
    });

    it("expect \"( { get x() {} } ) = 0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("( { get x() {} } ) = 0");
        });
    });

    it("expect \"++1\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("++1");
        });
    });
    it("expect \"function default() {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("function default() {}");
        });
    });

    it("expect \"\\\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\\");
        });
    });
    it("expect \"const default\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("const default");
        });
    });

    it("expect \"\"use strict\"; ({ v: eval }) = obj\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\"use strict\"; ({ v: eval }) = obj");
        });
    });
    it("expect \"import foo from bar\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("import foo from bar");
        });
    });

    it("expect \"(a, (b)) => 42\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(a, (b)) => 42");
        });
    });

    it("expect \"for((1 + 1) in list) process(x);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for((1 + 1) in list) process(x);");
        });
    });
    it("expect \"use strict\"; (a) => 00 to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\"use strict\"; (a) => 00");
        });
    });

    it("expect \"() <= 42\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("() <= 42");
        });
    });
    it("expect \"(10) => 00\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(10) => 00");
        });
    });

    it("expect \"(10, 20) => 00\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(10, 20) => 00");
        });
    });
    it("expect \"yield v\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("yield v");
        });
    });

    it("expect \"void { [1, 2]: 3 };\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("void { [1, 2]: 3 };");
        });
    });

    it("expect \"(function () { yield 10 })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(function () { yield 10 })");
        });
    });
    it("expect (function() { \"use strict\"; f(yield v) }) to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(function() { \"use strict\"; f(yield v) })");
        });
    });

    it("expect \"var obj = { *test** }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("var obj = { *test** }");
        });
    });
    it("expect \"class A extends yield B { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("class A extends yield B { }");
        });
    });

    it("expect \"function* y({yield}) {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("function* y({yield}) {}");
        });
    });
    it("expect \"new.prop\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("new.prop");
        });
    });

    it("expect \"super\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("super");
        });
    });

    it("expect \"void { [1, 2]: 3 };\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("void { [1, 2]: 3 };");
        });
    });

    it("expect \"(function () { yield 10 })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(function () { yield 10 })");
        });
    });
    it("expect \"function f(a, ...b, c)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("function f(a, ...b, c)");
        });
    });

    it("expect \"({ \"chance\" }) = obj\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("({ \"chance\" }) = obj");
        });
    });

    it("expect \"({ 42 }) = obj\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("({ 42 }) = obj");
        });
    });

    it("expect \"function f(a, ...b, c)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("function f(a, ...b, c)");
        });
    });

    it("expect \"1 + {\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("1 + {");
        });
    });

    it("expect \"\"use strict\"; function x(a, ...[a]){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("\"use strict\"; function x(a, ...[a]){}");
        });
    });

    it("expect \"([ 5 ]) => {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("([ 5 ]) => {}");
        });
    });

    it("expect \"(...[ 5 ]) => {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(...[ 5 ]) => {}");
        });
    });
    it("expect \"[...a, b] = c\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("[...a, b] = c");
        });
    });

    it("expect \"[...a, ] = b\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("[...a, ] = b");
        });
    });

    it("expect \"if (b,...a, );\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("if (b,...a, );");
        });
    });

    it("expect \"(b, ...a)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(b, ...a)");
        });
    });

    it("expect \"switch (cond) { case 10: let a = 20; \" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("switch (cond) { case 10: let a = 20; ");
        });
    });

    it("expect \"({ get test() { } }) => 42\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("({ get test() { } }) => 42");
        });
    });
    it("expect \"obj = {x = 0}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("obj = {x = 0}");
        });
    });

    it("expect \"f({x = 0})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("f({x = 0})");
        });
    });

    it("expect \"1 + { t:t,\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("1 + { t:t,");
        });
    });

    it("expect \"var 𫠞_ = 12;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("var 𫠞_ = 12;");
        });
    });

    it("expect \"if (1) let x = 10;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("if (1) let x = 10;");
        });
    });

    it("expect \"for (;;) const x = 10;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for (;;) const x = 10;");
        });
    });

    it("expect \"3e-", () => {
        assert.throws(SyntaxError, () => {
            parseScript("3e-");
        });
    });

    it("expect \"function if() { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("function if() { }");
        });
    });

    it("expect \"if.a;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("if.a;");
        });
    });
    it("expect \"a if;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("a if;");
        });
    });

    it("expect \"for ((i in {}));\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for ((i in {}));");
        });
    });
    it("expect \"for (var i, i2 in {});\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for (var i, i2 in {});");
        });
    });

    it("expect \"for (i + 1 in {});\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for (i + 1 in {});");
        });
    });

    it("expect \"for (+i in {});\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("for (+i in {});");
        });
    });

    it("expect \"if(false)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("if(false)");
        });
    });

    it("expect \"‿ = 10\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("‿ = 10");
        });
    });

    it("expect \"if(true) let a = 1;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("if(true) let a = 1;");
        });
    });
    it("expect \"switch (c) { default: default: }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("switch (c) { default: default: }");
        });
    });

    it("expect \"/*\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("/*");
        });
    });
    it("expect \"/*hello\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("/*hello");
        });
    });

    it("expect \"(a ...b) => 0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("(a ...b) => 0");
        });
    });

    it("expect \"({}=>0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("({}=>0)");
        });
    });

    it("expect \"(b, ...a) + 1\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(b, ...a) + 1`);
        });
    });

    it("expect \"(...a) + 1\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(...a) + 1`);
        });
    });

    it("expect \"let [...a,] = 0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`let [...a,] = 0`);
        });
    });

    it("expect \"try { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`try { }}`);
        });
    });

    it("expect \"throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`throw`);
        });
    });

    it("expect \"break", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`break`);
        });
    });

    it("expect \"(eval) => { \"use strict\"; 42 }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(eval) => { "use strict"; 42 }`);
        });
    });

    it("expect \"(10) => 00\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(10) => 00`);
        });
    });

    it("expect \"\"use strict\"; (arguments, a) => 42", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`"use strict"; (arguments, a) => 42`);
        });
    });

    it("expect \"\"use strict\"; eval => 42", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`"use strict"; eval => 42`);
        });
    });

    it("expect \"({get ", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({get `);
        });
    });

    it("expect \"({get{a}:0})", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({get{a}:0})`);
        });
    });

    it("expect \"({get{a}:0})", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({get{a}:0})`);
        });
    });
    it("expect \"({get{a}:0})", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({get{a}:0})`);
        });
    });
    it("expect \"({ set: s() { } })", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ set: s() { } })`);
        });
    });
    it("expect \"i #= 42", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`i #= 42)`);
        });
    });
    it("expect \"var x = \"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var x = "`);
        });
    });
    it("expect \"3e+", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`3e+`);
        });
    });
    it("expect \"\"\8\";", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`"\8";`);
        });
    });

    it("expect \"\\u00\";", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`"\\u00";`);
        });
    });

    it("expect \"\\xx\";", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`"\\xx";`);
        });
    });

    it("expect \"function hello() {use strict; arguments = 10; }\";", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function hello() {'use strict'; arguments = 10; }`);
        });
    });

    it("expect \"function hello() {\"use strict\"\"; try { } catch (arguments) { } }\";", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function hello() {'use strict'; try { } catch (arguments) { } }`);
        });
    });

    it("expect \"function hello() {\"use strict\"; arguments--; }\";", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function hello() {"use strict"; arguments--; }`);
        });
    });

    it("expect \"function hello() {\"use strict\"; arguments-++; }\";", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function hello() {"use strict"; arguments++; }`);
        });
    });

    it("expect \"function hello() {\"use strict\"; ({ i: 10, set s(eval) { } }); }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function hello() {'use strict'; ({ i: 10, set s(eval) { } }); }`);
        });
    });

    it("expect \"function hello(eval) {\"use strict\";}", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function hello(eval) {'use strict';}`);
        });
    });

    it("expect \"function eval(a) { \"use strict\"; }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function eval(a) { "use strict"; }`);
        });
    });

    it("expect \"(function a(t, t) { \"use strict\"; })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function a(t, t) { "use strict"; })`);
        });
    });

    it("expect \"function a() { \"use strict\"; (function b(t, t) { }); }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function a() { "use strict"; (function b(t, t) { }); }`);
        });
    });

    it("expect \"const", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`const`);
        });
    });

    it("expect \"class A extends a + b {}", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A extends a + b {}`);
        });
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static prototype(){}}`);
        });
    });

    it("expect \"class A {static \"prototype\"(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static "prototype"(){}}`);
        });
    });

    it("expect \"class A {get constructor(){}}", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {get constructor(){}}`);
        });
    });

    it("class A {static [static](){};}", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static [static](){};}`);
        });
    });

    it("expect \"function hello() { \"use strict\"; private = 1; }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function hello() { "use strict"; private = 1; }`);
        });
    });

    it("function hello() { \"use strict\"; yield = 1; }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function hello() { "use strict"; yield = 1; }`);
        });
    });

    it("expect \"function*g() { let yield; }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function*g() { let yield; }`);
        });
    });

    it("expect \"function*g() { try {} catch (yield) {} }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function*g() { try {} catch (yield) {} }`);
        });
    });

    it("expect \"while(true) let a", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`while(true) let a`);
        });
    });

    it("expect \"[...x,,] = 0", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[...x,,] = 0`);
        });
    });

    it("expect \"[...{a=0},]=0", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[...{a=0},]=0`);
        });
    });

    it("expect \"({function} = 0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({function} = 0)`);
        });
    });

    it("expect \"({0} = 0)", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({0} = 0)`);
        });
    });

    it("expect \"[]=>0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[]=>0`);
        });
    });

    it("expect \"function f() { new.anythingElse; }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function f() { new.anythingElse; }`);
        });
    });

    it("expect \"\"\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`/* `);
        });
    });

    it("expect \"\\o\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`\o`);
        });
    });

    it("expect \"class A {a(){},b(){}}", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {a(){},b(){}}`);
        });
    });

    it("expect \"var []", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var []`);
        });
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static prototype(){}}`);
        });
    });
    it("expect \"class A {static prototype(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static prototype(){}}`);
        });
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static prototype(){}}`);
        });
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static prototype(){}}`);
        });
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static prototype(){}}`);
        });
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static prototype(){}}`);
        });
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {static prototype(){}}`);
        });
    });

    it("expect \"try { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`try { }}`);
        });
    });
    it("expect \"try { } catch ([a] = []) { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`try { } catch ([a] = []) { }`);
        });
    });
    it("expect \"[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]`);
        });
    });

    it("expect \"(a,b)=(c,d);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(a,b)=(c,d);`);
        });
    });
    it("expect \"for (const x = 1 of y);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (const x = 1 of y);`);
        });
    });

    it("expect \"for (var [p]=q of r);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (var [p]=q of r);`);
        });
    });
    it("expect \"for (var {x} = y of z);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (var {x} = y of z);`);
        });
    });

    it("expect \"for (let x = 1 of y);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (let x = 1 of y);`);
        });
    });
    it("expect \"for (this of that);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (this of that);`);
        });
    });

    it("expect \"for (var x = 1 of y);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (var x = 1 of y);`);
        });
    });
    it("expect \"for (const of 42);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (const of 42);`);
        });
    });

    it("expect \"({ *[yield iter]() {} })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ *[yield iter]() {} })`);
        });
    });

    it("expect \"(function*({yield}) {})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function*({yield}) {})`);
        });
    });

    it("expect \"{\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function*() {
    function({x: y = yield 3}) {}
})`);
        });
    });

    it("expect \"class Foo { * }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class Foo { * }`);
        });
    });

    it("expect \"({ * })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ * })`);
        });
    });

    it("expect \"var \\u{1f012}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var \u{1f012}`);
        });
    });

    it("expect \"�!\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`�!`);
        });
    });
    it("expect \"const const;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`const const;`);
        });
    });

    it("expect \"for (const x = 0 in y){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (const x = 0 in y){}`);
        });
    });

    it("expect \"for (let [let];;;) {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (let [let];;;) {}`);
        });
    });

    it("expect \"for (let x = 0 in y){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (let x = 0 in y){}`);
        });
    });

    it("expect \"var x = function() { y = new..target; }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var x = function() { y = new..target; }`);
        });
    });

    it("expect \"const x = 0, y = 1,;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`const x = 0, y = 1,;`);
        });
    });

    it("expect \"(function*() { yield* })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function*() { yield* })`);
        });
    });
    it("expect \"f(..g);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`f(..g);`);
        });
    });

    it("expect \"new f(....g);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`new f(....g);`);
        });
    });
    it("expect \"new f(... ... g);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`new f(... ... g);`);
        });
    });

    it("expect \"{\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A extends B {
    constructor() {
        (super)();
    }
}`);
        });
    });
    it("expect \"{\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A {
    foo() { new super + 3 }
}`);
        });
    });

    it("expect \"function *g(){ (a, b, c, yield) => 42 }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g(){ (a, b, c, yield) => 42 }`);
        });
    });
    it("expect \"(function *(yield){})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function *(yield){})`);
        });
    });

    it("expect \"(function *(x, ...yield){})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function *(x, ...yield){})`);
        });
    });
    it("expect \"function *g() { let yield; }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g() { let yield; }`);
        });
    });

    it("expect \"function *g() { return yield.x; }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g() { return yield.x; }`);
        });
    });
    it("expect \"function *g(yield){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g(yield){}`);
        });
    });

    it("expect \"function *g(a, b, c, ...yield){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g(a, b, c, ...yield){}`);
        });
    });

    it("expect \"(a, ...b);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(a, ...b);`);
        });
    });
    it("expect \"(a,);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(a,);`);
        });
    });

    it("expect \" [ a -= 12 ] = 12; \" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(` [ a -= 12 ] = 12; `);
        });
    });

    it("expect \"[([a])] = 12;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[([a])] = 12;`);
        });
    });

    it("expect \"{ a = 12 };\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`{ a = 12 };`);
        });
    });

    it("expect \"while (false) break L;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`while (false) break L;`);
        });
    });

    it("expect \"try { 12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`try { 12`);
        });
    });

    it("expect \"try {} catch (a) { 12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`try {} catch (a) { 12`);
        });
    });
    it("expect \"try{} catch(){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`try{} catch(){}`);
        });
    });

    it("expect \"class A{constructor(){} constructor(){}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A{constructor(){} constructor(){}}`);
        });
    });

    it("expect \"class {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class {}`);
        });
    });

    it("expect \"L: class A{}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`L: class A{}`);
        });
    });
    it("expect \"class L 12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class L 12`);
        });
    });

    it("expect \"class A{static prototype() {}}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A{static prototype() {}}`);
        });
    });
    it("expect \"class A{constructor(){var a = super()}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A{constructor(){var a = super()}`);
        });
    });

    it("expect \"(a-=12)=>12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(a-=12)=>12`);
        });
    });
    it("expect \"a ? b 5\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`a ? b 5`);
        });
    });

    it("expect \"while (false) continue L;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`while (false) continue L;`);
        });
    });

    it("expect \"L: const a = 12;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`L: const a = 12;`);
        });
    });

    it("expect \"do {};\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`do {};`);
        });
    });
    it("expect \"export * not '12'\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule("export * not '12'");
        });
    });

    it("expect \"export - from '12'\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule("export - from '12'");
        });
    });

    it("expect \"export - from '12'\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule("export {a, if as l};");
        });
    });

    it("expect \"export {a 12 e}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`export {a 12 e}`);
        });
    });
    it("expect \"for (var a, b in e) break;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (var a, b in e) break;`);
        });
    });

    it("expect \"for (var [a];;) break;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (var [a];;) break;`);
        });
    });

    it("expect \"for (a=12 in e) break;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (a=12 in e) break;`);
        });
    });

    it("expect \"for (a in b 5\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (a in b 5`);
        });
    });
    it("expect \"try {} catch (a) { for (var a of l) break;}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`try {} catch (a) { for (var a of l) break;}`);
        });
    });

    it("expect \"for (a 12 b; 12) break;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for (a 12 b; 12) break;`);
        });
    });
    it("expect \"function l([a,a]) {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function l([a,a]) {}`);
        });
    });

    it("expect \"L:function* l() {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`L:function* l() {}`);
        });
    });

    it("expect \"import * as a from 12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import * as a from 12`);
        });
    });

    it("expect \"import {a as b, e as l 12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import {a as b, e as l 12`);
        });
    });

    it("expect \"a: a: for (;false;) break;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("a: a: for (;false;) break;");
        });
    });

    it("expect \"if (false) const a = 12;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`if (false) const a = 12;`);
        });
    });

    it("expect \"let [[let=let]=let*let] = 12;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`let [[let=let]=let*let] = 12;`);
        });
    });

    it("expect \"({**() {}} })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({**() {}} })`);
        });
    });

    // FIXME: this is valid
    // it("expect \"a.this\" to throw", () => {
    //     assert.throws(SyntaxError, () => {
    //         parseScript(`a.this`);
    //     });
    // });

    it("expect \"a.12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`a.12`);
        });
    });

    it("expect \"var\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var`);
        });
    });
    it("expect \"use strict; a package\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`'use strict'; a package`);
        });
    });

    it("expect \"function f(a, ...b, c){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function f(a, ...b, c){}`);
        });
    });
    it("expect \"class A\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A`);
        });
    });

    it("expect \"export {a,,}\"", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export {a,,}`);
        });
    });

    it("expect \"({ set: s(a, b) { } })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ set: s(a, b) { } })`);
        });
    });
    it("expect \"a class;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`a class;`);
        });
    });

    it("expect \"a if;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`a if;`);
        });
    });
    it("expect \"for(;;)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for(;;)`);
        });
    });

    it("expect \"({get +:3})\" to throw", () => {
        assert.throws(SyntaxError, () => {            parseScript(`
({get +:3})`);
        });
    });

    it("expect \"([a.a]) => 42\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`([a.a]) => 42`);
        });
    });

    it("expect \"a => {}()\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`a => {}()`);
        });
    });
    it("expect \"export var await\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export var await`);
        });
    });

    it("expect \"\"export new Foo()\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`"export new Foo()`);
        });
    });

    it("expect \"export typeof foo;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export typeof foo;`);
        });
    });

    it("expect \"export *\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export *`);
        });
    });

    it("expect \"import { class } from foo", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import { class } from 'foo'`);
        });
    });

    it("expect \"import * as class from foo\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import * as class from 'foo'`);
        });
    });

    it("expect \"class A { constructor() {} constructor() }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A { constructor() {} 'constructor'() }`);
        });
    });
    it("expect \"class A { get constructor() {} }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A { get constructor() {} }`);
        });
    });

    it("expect \"class A { *constructor() {} }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A { *constructor() {} }`);
        });
    });

    // FIXME: this is valid
    // it("expect \"function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}\" to throw", () => {
    //     assert.throws(SyntaxError, () => {
    //         parseScript(`function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}`);
    //     });
    // });

    // FIXME: this is valid
    // it("expect \"function x(...[ a, b ]){}\" to throw", () => {
    //     assert.throws(SyntaxError, () => {
    //         parseScript(`function x(...[ a, b ]){}`);
    //     });
    // });

    it("expect \"var a = { set foo(...v) {} };\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var a = { set foo(...v) {} };`);
        });
    });

    it("expect \"class a { set foo(...v) {} };\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class a { set foo(...v) {} };`);
        });
    });

    // FIXME: this is valid
    // it("expect \"(...[a, b]) => {}\" to throw", () => {
    //     assert.throws(SyntaxError, () => {
    //         parseScript(`(...[a, b]) => {}`);
    //     });
    // });

    it("expect \"let [function] = x\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`let [function] = x`);
        });
    });

    it("expect \"([this] = [10])\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`([this] = [10])`);
        });
    });

    it("expect \"var x = {this}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var x = {this}`);
        });
    });

    it("expect \"({this} = x)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({this} = x)`);
        });
    });
    it("expect \"(function () { yield 10 })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function () { yield 10 })`);
        });
    });

    it("expect \"class default\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class default`);
        });
    });
    it("expect \"class A extends yield B { }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A extends yield B { }`);
        });
    });

    it("expect \"var obj = { *test** }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var obj = { *test** }`);
        });
    });

    it("expect \"({ 5 }) => {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ 5 }) => {}`);
        });
    });

    it("expect \"[...a, b] = c\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[...a, b] = c`);
        });
    });

    it("expect \"function *a(){yield*}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *a(){yield*}`);
        });
    });
    it("expect \"([(a = b)] = []{\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`([(a = b)] = []`);
        });
    });

    it("expect \"({a: (b = 0)} = {})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a: (b = 0)} = {})`);
        });
    });

    it("expect \"\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("`${a}a${b}");
        });
    });

    it("expect \"`${a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("`${a");
        });
    });

    it("expect \"a++``\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("a++``");
        });
    });
    it("expect \"{\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript("`");
        });
    });

    it("expect \"class A extends B { constructor() { (super).a(); } }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A extends B { constructor() { (super).a(); } }`);
        });
    });
    it("expect \"({ a() { (super).b(); } });\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ a() { (super).b(); } });`);
        });
    });

    it("expect \"class A extends B { constructor() { new super(); } }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A extends B { constructor() { new super(); } }`);
        });
    });
    it("expect \"class A extends B { constructor() { (super)(); } }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A extends B { constructor() { (super)(); } }`);
        });
    });

    it("expect \"class A extends B { constructor() { super; } }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class A extends B { constructor() { super; } }`);
        });
    });
    it("expect \"function f() { (super)() }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function f() { (super)() }`);
        });
    });

    it("expect \"0O9\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`0O9`);
        });
    });
    it("expect \"0o18\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`0o18`);
        });
    });

    it("expect \"0o1a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`0o1a`);
        });
    });
    it("expect \"0b12\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`0b12`);
        });
    });

    it("expect \"use strict; 019\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`'use strict'; 019`);
        });
    });

    it("expect \"for(let[a]().b of 0);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for(let[a]().b of 0);`);
        });
    });

    it("expect \"function f() { var await }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`function f() { var await }`);
        });
    });
    it("expect \"await\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`await`);
        });
    });

    it("expect \"({a = 0}, {a = 0}, 0) => 0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a = 0}, {a = 0}, 0) => 0`);
        });
    });
    it("expect \"(0, {a = 0}) => 0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(0, {a = 0}) => 0`);
        });
    });

    it("expect \"({a = 0})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a = 0})`);
        });
    });
    it("expect \"(function(...a, b){})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function(...a, b){})`);
        });
    });

    it("expect \"(class [a] {})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(class [a] {})`);
        });
    });
    it("expect \"(class {)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(class {)`);
        });
    });

    it("expect \"(class {[3]:0}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(class {[3]:0}`);
        });
    });
    it("expect \"(class {a})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(class {a})`);
        });
    });

    it("expect \"(class {a=0})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(class {a=0})`);
        });
    });
    it("expect \"f(... ... a)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`f(... ... a)`);
        });
    });

    it("expect \"f(....a)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`f(....a)`);
        });
    });
    it("expect \"f(..a)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`f(..a)`);
        });
    });

    it("expect \"(([a])=0);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(([a])=0);`);
        });
    });

    it("expect \"(({a})=0);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(({a})=0);`);
        });
    });

    it("expect \"(a,...a)/*‪*/\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(a,...a)/*‪*/`);
        });
    });
    it("expect \"\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(a,...a)/* */ => 0`);
        });
    });

    it("expect \"function* a({e: a.b}) {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function* a({e: a.b}) {}`);
        });
    });
    it("expect \"function a({e: a.b}) {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function a({e: a.b}) {}`);
        });
    });

    it("expect \"({e: a.b}) => 0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({e: a.b}) => 0`);
        });
    });
    it("expect \"var {a: b.c} = 0;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var {a: b.c} = 0;`);
        });
    });

    it("expect \"({a([a.b]){}})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a([a.b]){}})`);
        });
    });
    it("expect \"(function ([a.b]) {})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`(function ([a.b]) {})`);
        });
    });

    it("expect \"({0} = 0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({0} = 0)`);
        });
    });
    it("expect \"({var} = 0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({var} = 0)`);
        });
    });

    it("expect \"({\"a\"} = 0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({'a'} = 0)`);
        });
    });
    it("expect \"({a:for} = 0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a:for} = 0)`);
        });
    });

    it("expect \"({a,,} = 0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a,,} = 0)`);
        });
    });
    it("expect \"({,a,} = 0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({,a,} = 0)`);
        });
    });

    it("expect \"({a,,a} = 0)\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a,,a} = 0)`);
        });
    });
    it("expect \"({a = 0});\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({a = 0});`);
        });
    });

    it("expect \"[a, ...b, {c=0}]\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[a, ...b, {c=0}]`);
        });
    });
    it("expect \"[...{a=0},]=0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[...{a=0},]=0`);
        });
    });

    it("expect \"[...{a=0},]\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[...{a=0},]`);
        });
    });
    it("expect \"[...0,...{a=0}]=0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[...0,...{a=0}]=0`);
        });
    });

    it("expect \"[...0,{a=0}]=0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[...0,{a=0}]=0`);
        });
    });
    it("expect \"[...0,a]=0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[...0,a]=0`);
        });
    });

    it("expect \"[, x, ...y,] = 0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[, x, ...y,] = 0`);
        });
    });
    it("expect \"[{a=0},{b=0},0] = 0\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`[{a=0},{b=0},0] = 0`);
        });
    });

    it("expect \"a: let a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`a: let a`);
        });
    });
    it("expect \"with(true) class a {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`with(true) class a {}`);
        });
    });

    it("expect \"while(true) const a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`while(true) const a`);
        });
    });
    it("expect \"function*g() { var yield; }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function*g() { var yield; }`);
        });
    });

    it("expect \"function*g(yield){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function*g(yield){}`);
        });
    });
    it("expect \"a: function* a(){}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`a: function* a(){}`);
        });
    });

    it("expect \"class extends A{}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`class extends A{}`);
        });
    });
    it("expect \"var new A = 0;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var new A = 0;`);
        });
    });

    it("expect \"var (a)=0;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var (a)=0;`);
        });
    });
    it("expect \"var const\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`var const`);
        });
    });

    it("expect \"try {} catch ((e)) {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`try {} catch ((e)) {}`);
        });
    });
    it("expect \"for({a=0};;);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for({a=0};;);`);
        });
    });

    it("expect \"for(([a]) of 0);\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for(([a]) of 0);`);
        });
    });

    // FIXME: this is valid
    // it("expect \"(a, ...[b]) => {}\" to throw", () => {
    //     assert.throws(SyntaxError, () => {
    //         parseScript(`(a, ...[b]) => {}`);
    //     });
    // });

    it("expect \"({ *a: 0 })\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ *a: 0 })`);
        });
    });
    it("expect \"({ *a }\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({ *a }`);
        });
    });

    it("expect \"({[1,2]:3})\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`({[1,2]:3})`);
        });
    });
    it("expect \"import {b as,} from a;", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import {b as,} from 'a';`);
        });
    });

    it("expect \"import {b,,} from a;", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import {b,,} from 'a';`);
        });
    });

    it("expect \"import a, b from a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import a, b from 'a'`);
        });
    });

    it("expect \"import a, b from a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import a, b from 'a'`);
        });
    });

    it("expect \"import {function} from a;\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import {function} from 'a';`);
        });
    });

    it("expect \"import a, b from a\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import {b as,} from 'a';`);
        });
    });

    it("expect \"import\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`import`);
        });
    });
    it("expect \"{import a from b;}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`{import a from 'b';}`);
        });
    });

    it("expect \"export function () {}\" to throw", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export function () {}`);
        });
    });

    it("expect \"export 3", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export 3`);
        });
    });

    it("expect \"export {a,b} from", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export {a,b} from`);
        });
    });

    it("expect \"export 3", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export 3`);
        });
    });

    it("expect \"export 3", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export 3`);
        });
    });

    it("expect \"export {as b} from a", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export {as b} from a`);
        });
    });

// 14.2.1 Arrow parameters must not contain yield expressions

    it("expect \"function *g() { (x = yield) => {} ", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *g() { (x = yield) => {} }`);
        });
    });
    it("expect \"function *a(b = yield){}", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function *a(b = yield){}`);
        });
    });

    it("expect \"function* g(){ (a = x + f(yield)) => 0; }", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`function* g(){ (a = x + f(yield)) => 0; }`);
        });
    });

    it("expect \"export;", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export;`);
        });
    });

    it("expect \"{", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`{`);
        });
    });

    it("expect \"{", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`{`);
        });
    });

    it("expect \"{export {a};}", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`{export {a};}`);
        });
    });

    it("expect \"export;", () => {
        assert.throws(SyntaxError, () => {
            parseModule(`export;`);
        });
    });

    it("should throw \"for(f() in myObject) { /* ... */ }\"", () => {
        assert.throws(SyntaxError, () => {
            parseScript(`for(f() in myObject) { /* ... */ }`);
        });
    });

    it("should throw \"({a: 0} = 0);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`({a: 0} = 0);`); });
    });
});
