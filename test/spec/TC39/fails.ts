import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("TC39 - Fails", () => {
    it("should throw on \"use strict; (\\00)\"", () => {
        expect(() => { parseScript(`'use strict'; ('\\00')`); }).throw();
    });

    it("should throw on \"(\\1)\"", () => {
        expect(() => { parseModule(`('\\1')`); }).throw();
    });

    it("should throw on \"export let[a] = 0 export let[b] = 0\"", () => {
        expect(() => { parseModule(`export let[a] = 0 export let[b] = 0`); }).throw();
    });

    it("should throw on \"{\" with linebreak", () => {
        expect(() => { parseScript(`


{`); }).to.throw();
    });

    it("should throw on \"function* f() { [yield* {a = 0}]; }\"", () => {
        expect(() => { parseScript(`function* f() { [yield* {a = 0}]; }`); }).throw();
    });

    it("should throw on \"＊\"", () => {
        expect(() => { parseScript(`＊`); }).throw();
    });

    it("should throw on \"class A {a:0}\"", () => {
        expect(() => { parseScript(`class A {a:0}`); }).throw();
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        expect(() => { parseScript(`for(;;) function a(){}`); }).throw();
    });

    it("should throw on \"function* y({yield}) {}\"", () => {
        expect(() => { parseScript(`function* y({yield}) {}`); }).throw();
    });

    it("should throw on \"for(let[a]().b of 0);\"", () => {
        expect(() => { parseScript(`for(let[a]().b of 0);`); }).throw();
    });

    it("should throw on \"1 / %\"", () => {
        expect(() => { parseScript(`1 / %`); }).throw();
    });

    it("should throw on \"var {a:a};\"", () => {
        expect(() => { parseScript(`var {a:a};`); }).throw();
    });

    it("should throw on \"(class {a:0})\"", () => {
        expect(() => { parseScript(`(class {a:0})`); }).throw();
    });

    it("should throw on \"function*g(yield = 0){}\"", () => {
        expect(() => { parseScript(`function*g(yield = 0){}`); }).throw();
    });

    it("should throw on \"switch (cond) { case 10: let a = 20; \"", () => {
        expect(() => { parseScript(`switch (cond) { case 10: let a = 20; `); }).throw();
    });

    it("should throw on \"var default\"", () => {
        expect(() => { parseScript(`var default`); }).throw();
    });

    it("should throw on \"var if = 42\"", () => {
        expect(() => { parseScript(`var if = 42`); }).throw();
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        expect(() => { parseScript(`(function*() {
    function({[yield 3]: y}) {}
})`); }).throw();
    });

    it("should throw on \"use strict; 07\"", () => {
        expect(() => { parseScript(`'use strict'; 07`); }).throw();
    });

    it("should throw on \"({a: this} = 0);\"", () => {
        expect(() => { parseScript(`({a: this} = 0);`); }).throw();
    });

    it("should throw on \"let [...a,] = 0\"", () => {
        expect(() => { parseScript(`let [...a,] = 0`); }).throw();
    });

    it("should throw on \"class A { set prop(x, y) {} }\"", () => {
        expect(() => { parseScript(`class A { set prop(x, y) {} }`); }).throw();
    });

    it("should throw on \"a => {}()\"", () => {
        expect(() => { parseScript(`a => {}()`); }).throw();
    });

    it("should throw on \"console.log(typeof () => {});\"", () => {
        expect(() => { parseScript(`console.log(typeof () => {});`); }).throw();
    });

    it("should throw on \"(b, ...a) + 1\"", () => {
        expect(() => { parseScript(`(b, ...a) + 1`); }).throw();
    });

    it("should throw on \"var a[0]=0;\"", () => {
        expect(() => { parseScript(`var a[0]=0;`); }).throw();
    });

    it("should throw on \"({ \"chance\" }) = obj\"", () => {
        expect(() => { parseScript(`({ "chance" }) = obj`); }).throw();
    });

    it("should throw on \"for(let a = 0 in b);\"", () => {
        expect(() => { parseScript(`for(let a = 0 in b);`); }).throw();
    });

    it("should throw on \"[{a=0},{b=0},0] = 0\"", () => {
        expect(() => { parseScript(`[{a=0},{b=0},0] = 0`); }).throw();
    });

    it("should throw on \"var {a};\"", () => {
        expect(() => { parseScript(`var {a};`); }).throw();
    });

    it("should throw on \"p = { q/ }\"", () => {
        expect(() => { parseScript(`p = { q/ }`); }).throw();
    });

    it("should throw on \"1.e+\"", () => {
        expect(() => { parseScript(`1.e+`); }).throw();
    });

    it("should throw on \"(...[ 5 ]) => {}\"", () => {
        expect(() => { parseScript(`(...[ 5 ]) => {}`); }).throw();
    });

    it("should throw on \"({,a,} = 0)\"", () => {
        expect(() => { parseScript(`({,a,} = 0)`); }).throw();
    });

    it("should throw on \"for(;;) function a(){}\"", () => {
        expect(() => { parseScript(`for(;;) function a(){}`); }).throw();
    });

    it("should throw on \"for(a in b) function c(){}\"", () => {
        expect(() => { parseScript(`for(a in b) function c(){}`); }).throw();
    });

    it("should throw on \"for(a of b) function c(){}\"", () => {
        expect(() => { parseScript(`for(a of b) function c(){}`); }).throw();
    });

    it("should throw on \"var {...{z}} = { z: 1}; console.log(z);\"", () => {
        expect(() => { parseScript(`var {...{z}} = { z: 1}; console.log(z);`); }).throw();
    });

    it("should throw on \"[v] += ary\"", () => {
        expect(() => { parseScript(`[v] += ary`); }).throw();
    });

    it("should throw on \"([a]) = 0;\"", () => {
        expect(() => { parseScript(`([a]) = 0;`); }).throw();
    });

    it("should throw on \"([a]) = 0;\"", () => {
        expect(() => { parseScript(`([a]) = 0;`); }).throw();
    });

    it("should throw on \"{import a from b;}\"", () => {
        expect(() => { parseModule(`{import a from 'b';}`); }).throw();
    });

    it("should throw on \"{export default 3;}\"", () => {
        expect(() => { parseModule(`{import a from 'b';}`); }).throw();
    });

    it("should throw on \"{export {a};}\"", () => {
        expect(() => { parseModule(`{import a from 'b';}`); }).throw();
    });

    it("should throw on \"({a}) = 0;\"", () => {
        expect(() => { parseScript(`({a}) = 0;`); }).throw();
    });

    it("should throw on \"with(true) class a {}\"", () => {
        expect(() => { parseScript(`with(true) class a {}`); }).throw();
    });

    it("should throw on \"[a, ...(b = c)] = 0\"", () => {
        expect(() => { parseScript(`[a, ...(b = c)] = 0`); }).throw();
    });

    it("should throw on \"[x] += 0\"", () => {
        expect(() => { parseScript(`[x] += 0`); }).throw();
    });

    it("should throw on \"({a:(b = 0)} = 1)\"", () => {
        expect(() => { parseScript(`({a:(b = 0)} = 1)`); }).throw();
    });

    it("should throw on \"({a:(b = 0)} = 1)\"", () => {
        expect(() => { parseScript(`({a:(b = 0)} = 1)`); }).throw();
    });

    it("should throw on \"if(0) break\"", () => {
        expect(() => { parseScript("if(0) break"); }).to.throw();
    });

    it("should throw on \"({ set a(b = new.target){} })\"", () => {
        expect(() => { parseScript("({ set a(b = new.target){} })"); })
        .to.throw("new.target expression is not allowed here");
    });

    it("should throw on \"({ a(b = new.target){} })\"", () => {
        expect(() => { parseScript("({ a(b = new.target){} })"); })
        .to.throw("new.target expression is not allowed here");
    });

    it("should throw on \"(function a(b = new.target){})\"", () => {
        expect(() => { parseScript("(function a(b = new.target){})"); }).to.throw();
    });

    it("should throw on \"const a;\"", () => {
        expect(() => { parseScript("const a;"); }).to.throw();
    });
    it("should throw on \"for(x of a);\"", () => {
        expect(() => { parseScript("for(x of a);"); }).to.not.throw();
    });

    it("should throw on \"({ get prop(x) {} })\"", () => {
        expect(() => { parseScript("({ get prop(x) {} })"); }).to.throw();
    });

    it("should throw on \"function(){}\"", () => {
        expect(() => { parseScript("({ set prop() {} }))"); }).to.throw();
    });

    it("should throw on \"(foo = [])[0] = 4;\"", () => {
        expect(() => { parseScript("(foo = [])[0] = 4;"); }).to.not.throw();
    });

    it("should throw on \"}\"", () => {
        expect(() => { parseScript("}"); }).to.not.throw();
    });

    it("should throw on \"3in []\"", () => {
        expect(() => { parseScript("3in []"); }).to.not.throw();
    });

    it("should throw on \"3e\"", () => {
        expect(() => { parseScript("3e"); }).to.throw();
    });

    it("should throw on \"3e-\"", () => {
        expect(() => { parseScript("3e-"); }).to.throw();
    });

    it("should throw on \"3x\"", () => {
        expect(() => { parseScript("3x"); }).to.not.throw();
    });

    it("should throw on \"3x0\"", () => {
        expect(() => { parseScript("3x0"); }).to.not.throw();
    });

    it("should throw on \"use strict; 09\"", () => {
        expect(() => { parseScript("\"use strict\"; 09"); }).to.not.throw();
    });

    it("should throw on \"0x3in[]\"", () => {
        expect(() => { parseScript("0x3in[]"); }).to.not.throw();
    });

    it("should throw on \"(1 + 1) = 10\"", () => {
        expect(() => { parseScript("(1 + 1) = 10"); }).to.throw();
    });

    it("should throw on \"3 = 4\"", () => {
        expect(() => { parseScript("3 = 4"); }).to.throw();
    });

    it("should throw on \"({ set s(.) { } })\"", () => {
        expect(() => { parseScript("({ set s(.) { } })"); }).to.throw();
    });

    it("should throw on \"a b;\"", () => {
        expect(() => { parseScript("a b;"); }).to.not.throw();
    });

    it("should throw on \"a b;\"", () => {
        expect(() => { parseScript("}"); }).to.not.throw();
    });

    it("should throw on \"{\"", () => {
        expect(() => { parseScript("{"); }).to.throw();
    });

    it("should throw on \"var {(a)} = 0\"", () => {
        expect(() => { parseScript("var {(a)} = 0"); }).to.throw();
    });

    it("should throw on \"var {a:(b)} = 0\"", () => {
        expect(() => { parseScript("var {a:(b)} = 0"); }).to.throw();
    });

    it("should throw on \"({(a)} = 0)\"", () => {
        expect(() => { parseScript("({(a)} = 0)"); }).to.throw();
    });

    it("should throw on \"\\\"", () => {
        expect(() => { parseScript("\\"); }).to.throw();
    });

    it("should throw on \" new.target = b;\"", () => {
        expect(() => { parseScript(" new.target = b;"); }).to.throw();
    });

    it("should throw on \" new.target++;\"", () => {
        expect(() => { parseScript(" new.target++;"); }).to.throw();
    });

    it("should throw on invalid binding\"", () => {
        expect(() => { parseScript(`function f() {
  (new.target) => b;
}`); }).to.throw();
    });

    it("should throw on \"let default\"", () => {
        expect(() => { parseScript("let default"); }).to.throw();
    });

    it("should throw on \"var a = 0123.;\"", () => {
        expect(() => { parseScript("var a = 0123.;"); }).to.throw();
    });

    it("should throw on \"const default\"", () => {
        expect(() => { parseScript("const default"); }).to.throw();
    });

    it("should throw on \"class a extends 07 {}\"", () => {
        expect(() => { parseScript("class a extends 07 {}"); }).to.throw();
    });

    it("should throw on \"\"use strict\"; ({ v: eval }) = obj\"", () => {
        expect(() => { parseScript("\"use strict\"; ({ v: eval }) = obj"); }).to.throw();
    });

    it("should throw on \"\"use strict\"; ({ v: arguments }) = obj\"", () => {
        expect(() => { parseScript("\"use strict\"; ({ v: arguments }) = obj"); }).to.throw();
    });

    it("should throw on \"--1\"", () => {
        expect(() => { parseScript("--1"); }).to.throw();
    });

    it("should throw on \"for (let x = 42 in list) process(x);\"", () => {
        expect(() => { parseScript("for (let x = 42 in list) process(x);"); }).to.throw();
    });

    it("should throw on \"for (let x = 42 of list) process(x);\"", () => {
        expect(() => { parseScript("for (let x = 42 of list) process(x);"); }).to.throw();
    });

    it("should throw on \"import foo\"", () => {
        expect(() => { parseModule("import foo"); }).to.throw();
    });

    it("should throw on \"import { foo, bar }\"", () => {
        expect(() => { parseModule("import { foo, bar }"); }).to.throw();
    });

    it("should throw on \"\"use strict\"; (a) => 00\"", () => {
        expect(() => { parseScript("\"use strict\"; (a) => 00"); }).to.throw();
    });

    it("should throw on \"() <= 42\"", () => {
        expect(() => { parseScript("() <= 42"); }).to.throw();
    });

    it("should throw on \"(10) => 00\"", () => {
        expect(() => { parseScript("(10) => 00"); }).to.throw();
    });

    it("should throw on \"([ 5 ]) => {}\"", () => {
        expect(() => { parseScript("([ 5 ]) => {}"); }).to.throw();
    });

    it("should throw on \"[...a, ] = b\"", () => {
        expect(() => { parseScript("[...a, ] = b"); }).to.throw();
    });

    it("should throw on \"{\"", () => {
        expect(() => { parseScript("{"); }).to.throw();
    });

    it("should throw on \"obj = {x = 0}\"", () => {
        expect(() => { parseScript("obj = {x = 0}"); }).to.throw();
    });

    it("should throw on \"var 𫠞_ = 12;\"", () => {
        expect(() => { parseScript("var 𫠞_ = 12;"); }).to.throw();
    });

    it("should throw on \"if (1) let x = 10;\"", () => {
        expect(() => { parseScript("if (1) let x = 10;"); }).to.throw();
    });

    it("should throw on \"+i = 42\"", () => {
        expect(() => { parseScript("+i = 42"); }).to.throw();
    });

    it("should throw on \"{ get 2 }\"", () => {
        expect(() => { parseScript("{"); }).to.throw();
    });

    it("should throw on \"function true() { }\"", () => {
        expect(() => { parseScript("function true() { }"); }).to.throw();
    });

    it("should throw on \"a class;\"", () => {
        expect(() => { parseScript("a class;"); }).to.throw();
    });

    it("should throw on \"continue 2;\"", () => {
        expect(() => { parseScript("continue 2;"); }).to.throw();
    });

    it("should throw on \"throw\"", () => {
        expect(() => { parseScript("throw"); }).to.throw();
    });

    it("should throw on \"3in[]\"", () => {
        expect(() => { parseScript("3in[]"); }).to.throw();
    });

    it("should throw on \"3x0\"", () => {
        expect(() => { parseScript("3x0"); }).to.throw();
    });

    it("should throw on \"for (i + 1 in {});\"", () => {
        expect(() => { parseScript("for (i + 1 in {});"); }).to.throw();
    });

    it("should throw on \"for (+i in {});\"", () => {
        expect(() => { parseScript("for (+i in {});"); }).to.throw();
    });

    it("should throw on \"for(;;)\"", () => {
        expect(() => { parseScript("for(;;)"); }).to.throw();
    });

    it("should throw on \"with(x)\"", () => {
        expect(() => { parseScript("with(x)"); }).to.throw();
    });

    it("should throw on \"with()\"", () => {
        expect(() => { parseScript("with()"); }).to.throw();
    });

    it("should throw on \"if(true) let a = 1;\"", () => {
        expect(() => { parseScript("if(true) let a = 1;"); }).to.throw();
    });

    it("should throw on \"‿ = 10\"", () => {
        expect(() => { parseScript("‿ = 10"); }).to.throw();
    });

    it("should throw on \"switch (c) { default: default: }\"", () => {
        expect(() => { parseScript("switch (c) { default: default: }"); }).to.throw();
    });

    it("should throw on \"/*hello  *\"", () => {
        expect(() => { parseScript("/*hello  *"); }).to.throw();
    });

    it("should throw on \"(...a, ...b) => 0\"", () => {
        expect(() => { parseScript("(...a, ...b) => 0"); }).to.throw();
    });

    it("should throw on \"(a,...[a]) => 0;\"", () => {
        expect(() => { parseScript("(a,...[a]) => 0;"); }).to.throw();
    });

    it("should throw on \"([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;\"", () => {
        expect(() => { parseScript("([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;"); })
        .to.throw();
    });

    it("should throw on \"({a,...b}) => 0;\"", () => {
        expect(() => { parseScript("({a,...b}) => 0;"); }).to.throw();
    });

    it("should throw on \"(b, ...a) + 1\"", () => {
        expect(() => { parseScript("(b, ...a) + 1"); }).to.throw();
    });

    it("should throw on \"(...a) + 1\"", () => {
        expect(() => { parseScript("(...a) + 1 "); }).to.throw();
    });

    it("should throw on \"for (var [p]=q of r);\"", () => {
        expect(() => { parseScript("for (var [p]=q of r);"); }).to.throw();
    });

    it("should throw on \"for (this of that);\"", () => {
        expect(() => { parseScript("for (this of that);"); }).to.throw();
    });

    it("should throw on \"for (var x = 1 of y);\"", () => {
        expect(() => { parseScript("for (var x = 1 of y);"); }).to.throw();
    });

    it("should throw on \"for (const x = 0 in y){}\"", () => {
        expect(() => { parseScript("for (const x = 0 in y){}"); }).to.throw();
    });

    it("should throw on \"const const;\"", () => {
        expect(() => { parseScript("const const;"); }).to.throw();
    });

    it("should throw on \"for (const let = 1;;;) {}\"", () => {
        expect(() => { parseScript("for (const let = 1;;;) {}"); }).to.throw();
    });

    it("should throw on \"for (let x, y, z, let;;;) {}\"", () => {
        expect(() => { parseScript("for (let x, y, z, let;;;) {}"); }).to.throw();
    });

    it("should throw on \"{\"", () => {
        expect(() => { parseScript("{"); }).to.throw();
    });

    it("should throw on \"{\"", () => {
        expect(() => { parseModule("{"); }).to.throw();
    });

    it("should throw on \"for (let x, y, z, let = 1;;;) {}\"", () => {
        expect(() => { parseScript("for (let x, y, z, let = 1;;;) {}"); }).to.throw();
    });

    it("should throw on \"for (let let;;;) {}\"", () => {
        expect(() => { parseScript("for (let let;;;) {}"); }).to.throw();
    });

    it("should throw on \"for (let let;;;) {}\"", () => {
        expect(() => { parseScript("for (let let;;;) {}"); }).to.throw();
    });

    it("should throw on \"f(....g);\"", () => {
        expect(() => { parseScript("f(....g);"); }).to.throw();
    });

    it("should throw on \"f(... ... g);\"", () => {
        expect(() => { parseScript("f(... ... g);"); }).to.throw();
    });

    it("should throw on \"function *g() { function *yield(){} }\"", () => {
        expect(() => { parseScript("function *g() { function *yield(){} }"); }).to.throw();
    });

    it("should throw on \"function *g(a, b, c, ...yield){}\"", () => {
        expect(() => { parseScript("function *g(a, b, c, ...yield){}"); }).to.throw();
    });

    it("should throw on \"0O1a\"", () => {
        expect(() => { parseScript("0O1a"); }).to.throw();
    });

    it("should throw on \"/\"", () => {
        expect(() => { parseScript("/"); }).to.throw();
    });

    it("should throw on \"1 + { t:t,\"", () => {
        expect(() => { parseScript("1 + { t:t,"); }).to.throw();
    });

    it("should throw on \"i + 2 = 42\"", () => {
        expect(() => { parseScript("i + 2 = 42"); }).to.throw();
    });

    it("should throw on \"1 + (\"", () => {
        expect(() => { parseScript("1 + ("); }).to.throw();
    });

    it("should throw on \"{ set 1 }\"", () => {
        expect(() => { parseScript("{ set 1 }"); }).to.throw();
    });

    it("should throw on \"({ set: s(if) { } })", () => {
        expect(() => { parseScript("({ set: s(if) { } })"); }).to.throw();
    });

    it("should throw on \"({ set s() { } })\"", () => {
        expect(() => { parseScript("({ set s() { } })"); }).to.throw();
    });

    it("should throw on \"({ set: s(a, b) { } })\"", () => {
        expect(() => { parseScript("({ set: s(a, b) { } })"); }).to.throw();
    });

    it("should throw on \"({get[a,b]:0})\"", () => {
        expect(() => { parseScript("({get[a,b]:0})"); }).to.throw();
    });

    it("should throw on \"({get{a}:0})\"", () => {
        expect(() => { parseScript("({get{a}:0})"); }).to.throw();
    });

    it("should throw on \"((a)) => 42\"", () => {
        expect(() => { parseScript("((a)) => 42"); }).to.throw();
    });

    it("should throw on \"() ? 42\"", () => {
        expect(() => { parseScript("() ? 42"); }).to.throw();
    });

    it("should throw on \"() + 42\"", () => {
        expect(() => { parseScript("() + 42"); }).to.throw();
    });

    it("should throw on \"function true() { }\"", () => {
        expect(() => { parseScript("function true() { }"); }).to.throw();
    });

    it("should throw on \"if.a;\"", () => {
        expect(() => { parseScript("if.a;"); }).to.throw();
    });

    it("should throw on \"for ((i in {}));\"", () => {
        expect(() => { parseScript("for ((i in {}));"); }).to.throw();
    });

    it("should throw on \"if(false) doThis(); else\"", () => {
        expect(() => { parseScript("if(false) doThis(); else"); }).to.throw();
    });

    it("should throw on \"switch (c) { default: default: }\"", () => {
        expect(() => { parseScript("switch (c) { default: default: }"); }).to.throw();
    });

    it("should throw on \"try {} catch (42) {} \"", () => {
        expect(() => { parseScript("try {} catch (42) {} "); }).to.throw();
    });

    it("should throw on \"function hello() { \"use strict\"; ({ 021: 42 }); }\"", () => {
        expect(() => { parseScript("unction hello() { \"use strict\"; ({ 021: 42 }); }"); })
        .to.throw();
    });

    /* tslint:disable max-line-length */
    it("should throw on \"function hello() { \"use strict\"; function inner() { \"octal directive\\1\"; } }\"", () => {
        expect(() => {
            parseScript("function hello() { \"use strict\"; function inner() { \"octal directive\\1\"; } }");
        }).to.throw();
    });
    /* tslint:enable max-line-length */

    it("should throw on \"var\"", () => {
        expect(() => { parseScript("var"); }).to.throw();
    });

    it("should throw on \"function t() { ;  ;  \"", () => {
        expect(() => { parseScript("function t() { ;  ;  "); }).to.throw();
    });

    it("should throw on \"function x(...a = 1){}\"", () => {
        expect(() => { parseScript("function x(...a = 1){}"); }).to.throw();
    });

    it("should throw on \"class\"", () => {
        expect(() => { parseScript("class"); }).to.throw();
    });

    it("should throw on \"export { if }\"", () => {
        expect(() => { parseModule("export { if }"); }).to.throw();
    });

    it("should throw on \"var x,\"", () => {
        expect(() => { parseScript("var x,"); }).to.throw();
    });

    it("should throw on \"01a\"", () => {
        expect(() => { parseScript("01a"); }).to.throw();
    });

    it("should throw on \"({ set: s(if) { } })\"", () => {
        expect(() => { parseScript("({ set: s(if) { } })"); }).to.throw();
    });

    it("should throw on \"function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}\"", () => {
        expect(() => { parseScript("function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}"); })
        .to.throw();
    });

    it("should throw on \"for(let x=1 of [1,2,3]) 0\"", () => {
        expect(() => { parseScript("for(let x=1 of [1,2,3]) 0"); }).to.throw();
    });

    it("should throw on \"({a: b += 0} = {})\"", () => {
        expect(() => { parseScript("({a: b += 0} = {})"); }).to.throw();
    });

    it("should throw on \"for(let of 0);\"", () => {
        expect(() => { parseScript("for(let of 0);"); }).to.throw();
    });

    it("should throw on \"3ea\"", () => {
        expect(() => { parseScript("3ea"); }).to.throw();
    });

    it("should throw on \"use strict\"; arguments => 42", () => {
        expect(() => { parseScript("\"use strict\"; arguments => 42"); }).to.throw();
    });

    it("should throw on \"\"use strict\"; (eval, a) => 42\"", () => {
        expect(() => { parseScript("\"use strict\"; (eval, a) => 42"); }).to.throw();
    });

    it("should throw on \"f(a, a) => 42", () => {
        expect(() => { parseScript("(a, a) => 42"); }).to.throw();
    });

    it("should throw on \"({[a,b]:0})\"", () => {
        expect(() => { parseScript("{"); }).to.throw();
    });

    it("should throw on \"\"use strict\"; (eval) => 42\"", () => {
        expect(() => { parseScript("\"use strict\"; (eval) => 42"); }).to.throw();
    });

    it("should throw on \"function t(false) { }\"", () => {
        expect(() => { parseScript("function t(false) { }"); }).to.throw();
    });

    it("should throw on \"function t(null) { }\"", () => {
        expect(() => { parseScript("function t(null) { }"); }).to.throw();
    });

    it("should throw on \"break 1;\"", () => {
        expect(() => { parseScript("break 1;"); }).to.throw();
    });

    it("should throw on \"for (var i, i2 in {});\"", () => {
        expect(() => { parseScript("for (var i, i2 in {});"); }).to.throw();
    });

    it("should throw on \"for (i + 1 in {});\"", () => {
        expect(() => { parseScript("for (i + 1 in {});"); }).to.throw();
    });

    it("should throw on \"if(false)\"", () => {
        expect(() => { parseScript("if(false)"); }).to.throw();
    });

    it("expect \"`a` = b;\" to throw", () => {
        expect(() => {
            parseScript("`a ` = b;");
        }).to.throw();
    });

    it("expect \"for (`a` in b);\" to throw", () => {
        expect(() => {
            parseScript("for (`a` in b);");
        }).to.throw();
    });

    it("expect \"for (`a` of b);\" to throw", () => {
        expect(() => {
            parseScript("for (`a` of b);");
        }).to.throw();
    });

    it("expect \"(a = b)++;\" to throw", () => {
        expect(() => {
            parseScript("(a = b)++;");
        }).to.not.throw();
    });

    it("expect \"for (`a` of b);\" to throw", () => {
        expect(() => {
            parseScript("for (`a` of b);");
        }).to.throw();
    });

    it("expect \"(a = b) = c;", () => {
        expect(() => {
            parseScript("(a = b) = c;");
        }).to.throw();
    });

    it("expect \"function l(w,[w]) { }\" to throw", () => {
        expect(() => {
            parseScript(`function l(w,[w]) { }`);
        }).to.throw();
    });

    it("expect \"function l(w,[w]) { }\" to throw", () => {
        expect(() => {
            parseScript(`function l(w,[w]) { }`);
        }).to.not.throw();
    });

    it("expect \"function l(w,[w]) { }\" to throw", () => {
        expect(() => {
            parseScript(`function l(w,[w]) { }`);
        }).to.throw();
    });

    it("expect \"function l(w,w=12) { }\" to throw", () => {
        expect(() => {
            parseScript(`function l(w,w=12) { }`);
        }).to.throw();
    });

    it("expect \"`abel${e 12}`\" to throw", () => {
        expect(() => {
            parseScript("`abel${e 12}`");
        }).to.throw("Expected a } at the end of the current interpolated expression");
    });

    it("expect \"`abel\" to throw", () => {
        expect(() => {
            parseScript("`abel");
        }).to.throw();
    });

    it("expect \"-a**e\" to throw", () => {
        expect(() => {
            parseScript("-a**e");
        }).to.throw();
    });

    it("expect \"({ obj:20 }) = 42\" to throw", () => {
        expect(() => {
            parseScript("({ obj:20 }) = 42");
        }).to.throw();
    });

    it("expect \"( { get x() {} } ) = 0\" to throw", () => {
        expect(() => {
            parseScript("( { get x() {} } ) = 0");
        }).to.throw();
    });

    it("expect \"++1\" to throw", () => {
        expect(() => {
            parseScript("++1");
        }).to.throw();
    });
    it("expect \"function default() {}\" to throw", () => {
        expect(() => {
            parseScript("function default() {}");
        }).to.throw();
    });

    it("expect \"\\\" to throw", () => {
        expect(() => {
            parseScript("\\");
        }).to.throw();
    });
    it("expect \"const default\" to throw", () => {
        expect(() => {
            parseScript("const default");
        }).to.throw();
    });

    it("expect \"\"use strict\"; ({ v: eval }) = obj\" to throw", () => {
        expect(() => {
            parseScript("\"use strict\"; ({ v: eval }) = obj");
        }).to.not.throw();
    });
    it("expect \"import foo from bar\" to throw", () => {
        expect(() => {
            parseScript("import foo from bar");
        }).to.throw();
    });

    it("expect \"(a, (b)) => 42\" to throw", () => {
        expect(() => {
            parseScript("(a, (b)) => 42");
        }).to.throw();
    });

    it("expect \"for((1 + 1) in list) process(x);\" to throw", () => {
        expect(() => {
            parseScript("for((1 + 1) in list) process(x);");
        }).to.throw();
    });
    it("expect \"use strict\"; (a) => 00 to throw", () => {
        expect(() => {
            parseScript("\"use strict\"; (a) => 00");
        }).to.throw();
    });

    it("expect \"() <= 42\" to throw", () => {
        expect(() => {
            parseScript("() <= 42");
        }).to.throw();
    });
    it("expect \"(10) => 00\" to throw", () => {
        expect(() => {
            parseScript("(10) => 00");
        }).to.throw();
    });

    it("expect \"(10, 20) => 00\" to throw", () => {
        expect(() => {
            parseScript("(10, 20) => 00");
        }).to.throw();
    });
    it("expect \"yield v\" to throw", () => {
        expect(() => {
            parseScript("yield v");
        }).to.throw();
    });

    it("expect \"void { [1, 2]: 3 };\" to throw", () => {
        expect(() => {
            parseScript("void { [1, 2]: 3 };");
        }).to.throw();
    });

    it("expect \"(function () { yield 10 })\" to throw", () => {
        expect(() => {
            parseScript("(function () { yield 10 })");
        }).to.throw();
    });
    it("expect (function() { \"use strict\"; f(yield v) }) to throw", () => {
        expect(() => {
            parseScript("(function() { \"use strict\"; f(yield v) })");
        }).to.throw();
    });

    it("expect \"var obj = { *test** }\" to throw", () => {
        expect(() => {
            parseScript("var obj = { *test** }");
        }).to.throw();
    });
    it("expect \"class A extends yield B { }\" to throw", () => {
        expect(() => {
            parseScript("class A extends yield B { }");
        }).to.throw();
    });

    it("expect \"function* y({yield}) {}\" to throw", () => {
        expect(() => {
            parseScript("function* y({yield}) {}");
        }).to.throw();
    });
    it("expect \"new.prop\" to throw", () => {
        expect(() => {
            parseScript("new.prop");
        }).to.throw();
    });

    it("expect \"super\" to throw", () => {
        expect(() => {
            parseScript("super");
        }).to.throw();
    });

    it("expect \"void { [1, 2]: 3 };\" to throw", () => {
        expect(() => {
            parseScript("void { [1, 2]: 3 };");
        }).to.throw();
    });

    it("expect \"(function () { yield 10 })\" to throw", () => {
        expect(() => {
            parseScript("(function () { yield 10 })");
        }).to.throw();
    });
    it("expect \"function f(a, ...b, c)\" to throw", () => {
        expect(() => {
            parseScript("function f(a, ...b, c)");
        }).to.throw();
    });

    it("expect \"({ \"chance\" }) = obj\" to throw", () => {
        expect(() => {
            parseScript("({ \"chance\" }) = obj");
        }).to.throw();
    });

    it("expect \"({ 42 }) = obj\" to throw", () => {
        expect(() => {
            parseScript("({ 42 }) = obj");
        }).to.throw();
    });

    it("expect \"function f(a, ...b, c)\" to throw", () => {
        expect(() => {
            parseScript("function f(a, ...b, c)");
        }).to.throw();
    });

    it("expect \"1 + {\" to throw", () => {
        expect(() => {
            parseScript("1 + {");
        }).to.throw();
    });

    it("expect \"\"use strict\"; function x(a, ...[a]){}\" to throw", () => {
        expect(() => {
            parseScript("\"use strict\"; function x(a, ...[a]){}");
        }).to.throw();
    });

    it("expect \"([ 5 ]) => {}\" to throw", () => {
        expect(() => {
            parseScript("([ 5 ]) => {}");
        }).to.throw();
    });

    it("expect \"(...[ 5 ]) => {}\" to throw", () => {
        expect(() => {
            parseScript("(...[ 5 ]) => {}");
        }).to.throw();
    });
    it("expect \"[...a, b] = c\" to throw", () => {
        expect(() => {
            parseScript("[...a, b] = c");
        }).to.throw();
    });

    it("expect \"[...a, ] = b\" to throw", () => {
        expect(() => {
            parseScript("[...a, ] = b");
        }).to.throw();
    });

    it("expect \"if (b,...a, );\" to throw", () => {
        expect(() => {
            parseScript("if (b,...a, );");
        }).to.throw();
    });

    it("expect \"(b, ...a)\" to throw", () => {
        expect(() => {
            parseScript("(b, ...a)");
        }).to.throw();
    });

    it("expect \"switch (cond) { case 10: let a = 20; \" to throw", () => {
        expect(() => {
            parseScript("switch (cond) { case 10: let a = 20; ");
        }).to.throw();
    });

    it("expect \"({ get test() { } }) => 42\" to throw", () => {
        expect(() => {
            parseScript("({ get test() { } }) => 42");
        }).to.throw();
    });
    it("expect \"obj = {x = 0}\" to throw", () => {
        expect(() => {
            parseScript("obj = {x = 0}");
        }).to.throw();
    });

    it("expect \"f({x = 0})\" to throw", () => {
        expect(() => {
            parseScript("f({x = 0})");
        }).to.throw();
    });

    it("expect \"1 + { t:t,\" to throw", () => {
        expect(() => {
            parseScript("1 + { t:t,");
        }).to.throw();
    });

    it("expect \"var 𫠞_ = 12;\" to throw", () => {
        expect(() => {
            parseScript("var 𫠞_ = 12;");
        }).to.throw();
    });

    it("expect \"if (1) let x = 10;\" to throw", () => {
        expect(() => {
            parseScript("if (1) let x = 10;");
        }).to.throw();
    });

    it("expect \"for (;;) const x = 10;\" to throw", () => {
        expect(() => {
            parseScript("for (;;) const x = 10;");
        }).to.throw();
    });

    it("expect \"while (1) function foo(){}\" to throw", () => {
        expect(() => {
            parseScript("while (1) function foo(){}");
        }).to.not.throw();
    });

    it("expect \"3e-", () => {
        expect(() => {
            parseScript("3e-");
        }).to.throw();
    });

    it("expect \"function if() { }\" to throw", () => {
        expect(() => {
            parseScript("function if() { }");
        }).to.throw();
    });

    it("expect \"if.a;\" to throw", () => {
        expect(() => {
            parseScript("if.a;");
        }).to.throw();
    });
    it("expect \"a if;\" to throw", () => {
        expect(() => {
            parseScript("a if;");
        }).to.throw();
    });

    it("expect \"for ((i in {}));\" to throw", () => {
        expect(() => {
            parseScript("for ((i in {}));");
        }).to.throw();
    });
    it("expect \"for (var i, i2 in {});\" to throw", () => {
        expect(() => {
            parseScript("for (var i, i2 in {});");
        }).to.throw();
    });

    it("expect \"for (i + 1 in {});\" to throw", () => {
        expect(() => {
            parseScript("for (i + 1 in {});");
        }).to.throw();
    });

    it("expect \"for (+i in {});\" to throw", () => {
        expect(() => {
            parseScript("for (+i in {});");
        }).to.throw();
    });

    it("expect \"if(false)\" to throw", () => {
        expect(() => {
            parseScript("if(false)");
        }).to.throw();
    });

    it("expect \"‿ = 10\" to throw", () => {
        expect(() => {
            parseScript("‿ = 10");
        }).to.throw();
    });

    it("expect \"if(true) let a = 1;\" to throw", () => {
        expect(() => {
            parseScript("if(true) let a = 1;");
        }).to.throw();
    });
    it("expect \"switch (c) { default: default: }\" to throw", () => {
        expect(() => {
            parseScript("switch (c) { default: default: }");
        }).to.throw();
    });

    it("expect \"/*\" to throw", () => {
        expect(() => {
            parseScript("/*");
        }).to.throw();
    });
    it("expect \"/*hello\" to throw", () => {
        expect(() => {
            parseScript("/*hello");
        }).to.throw();
    });

    it("expect \"(a ...b) => 0\" to throw", () => {
        expect(() => {
            parseScript("(a ...b) => 0");
        }).to.throw();
    });

    it("expect \"({}=>0)\" to throw", () => {
        expect(() => {
            parseScript("({}=>0)");
        }).to.throw();
    });

    it("expect \"({a,...b}) => 0;\" to throw", () => {
        expect(() => {
            parseScript(`({a,...b}) => 0;`);
        }).to.not.throw();
    });
    it("expect \"(b, ...a) + 1\" to throw", () => {
        expect(() => {
            parseScript(`(b, ...a) + 1`);
        }).to.throw();
    });

    it("expect \"(...a) + 1\" to throw", () => {
        expect(() => {
            parseScript(`(...a) + 1`);
        }).to.throw();
    });

    it("expect \"let [...a,] = 0\" to throw", () => {
        expect(() => {
            parseScript(`let [...a,] = 0`);
        }).to.throw();
    });

    it("expect \"try { }\" to throw", () => {
        expect(() => {
            parseScript(`try { }}`);
        }).to.throw();
    });

    it("expect \"throw", () => {
        expect(() => {
            parseScript(`throw`);
        }).to.throw();
    });

    it("expect \"break", () => {
        expect(() => {
            parseScript(`break`);
        }).to.throw();
    });

    it("expect \"(eval) => { \"use strict\"; 42 }", () => {
        expect(() => {
            parseScript(`(eval) => { "use strict"; 42 }`);
        }).to.throw();
    });

    it("expect \"(10) => 00\" to throw", () => {
        expect(() => {
            parseScript(`(10) => 00`);
        }).to.throw();
    });

    it("expect \"\"use strict\"; (arguments, a) => 42", () => {
        expect(() => {
            parseScript(`"use strict"; (arguments, a) => 42`);
        }).to.throw();
    });

    it("expect \"\"use strict\"; eval => 42", () => {
        expect(() => {
            parseScript(`"use strict"; eval => 42`);
        }).to.throw();
    });

    it("expect \"({get ", () => {
        expect(() => {
            parseScript(`({get `);
        }).to.throw();
    });

    it("expect \"({get{a}:0})", () => {
        expect(() => {
            parseScript(`({get{a}:0})`);
        }).to.throw();
    });

    it("expect \"({get{a}:0})", () => {
        expect(() => {
            parseScript(`({get{a}:0})`);
        }).to.throw();
    });
    it("expect \"({get{a}:0})", () => {
        expect(() => {
            parseScript(`({get{a}:0})`);
        }).to.throw();
    });
    it("expect \"({ set: s() { } })", () => {
        expect(() => {
            parseScript(`({ set: s() { } })`);
        }).to.throw();
    });
    it("expect \"i #= 42", () => {
        expect(() => {
            parseScript(`i #= 42)`);
        }).to.throw();
    });
    it("expect \"var x = \"", () => {
        expect(() => {
            parseScript(`var x = "`);
        }).to.throw();
    });
    it("expect \"3e+", () => {
        expect(() => {
            parseScript(`3e+`);
        }).to.throw();
    });
    it("expect \"\"\8\";", () => {
        expect(() => {
            parseScript(`"\8";`);
        }).to.throw();
    });

    it("expect \"\\u00\";", () => {
        expect(() => {
            parseScript(`"\\u00";`);
        }).to.throw();
    });

    it("expect \"\\xx\";", () => {
        expect(() => {
            parseScript(`"\\xx";`);
        }).to.throw();
    });

    it("expect \"function hello() {use strict; arguments = 10; }\";", () => {
        expect(() => {
            parseScript(`function hello() {'use strict'; arguments = 10; }`);
        }).to.throw();
    });

    it("expect \"function hello() {\"use strict\"\"; try { } catch (arguments) { } }\";", () => {
        expect(() => {
            parseScript(`function hello() {'use strict'; try { } catch (arguments) { } }`);
        }).to.throw();
    });

    it("expect \"function hello() {\"use strict\"; arguments--; }\";", () => {
        expect(() => {
            parseScript(`function hello() {"use strict"; arguments--; }`);
        }).to.throw();
    });

    it("expect \"function hello() {\"use strict\"; arguments-++; }\";", () => {
        expect(() => {
            parseScript(`function hello() {"use strict"; arguments++; }`);
        }).to.throw();
    });

    it("expect \"function hello() {\"use strict\"; ({ i: 10, set s(eval) { } }); }", () => {
        expect(() => {
            parseScript(`function hello() {'use strict'; ({ i: 10, set s(eval) { } }); }`);
        }).to.throw();
    });

    it("expect \"function hello(eval) {\"use strict\";}", () => {
        expect(() => {
            parseScript(`function hello(eval) {'use strict';}`);
        }).to.throw();
    });

    it("expect \"function eval(a) { \"use strict\"; }", () => {
        expect(() => {
            parseScript(`function eval(a) { "use strict"; }`);
        }).to.throw();
    });

    it("expect \"(function a(t, t) { \"use strict\"; })\" to throw", () => {
        expect(() => {
            parseScript(`(function a(t, t) { "use strict"; })`);
        }).to.throw();
    });

    it("expect \"function a() { \"use strict\"; (function b(t, t) { }); }", () => {
        expect(() => {
            parseScript(`function a() { "use strict"; (function b(t, t) { }); }`);
        }).to.throw();
    });

    it("expect \"const", () => {
        expect(() => {
            parseScript(`const`);
        }).to.throw();
    });

    it("expect \"class A extends a + b {}", () => {
        expect(() => {
            parseScript(`class A extends a + b {}`);
        }).to.throw();
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static prototype(){}}`);
        }).to.throw();
    });

    it("expect \"class A {static \"prototype\"(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static "prototype"(){}}`);
        }).to.throw();
    });

    it("expect \"class A {get constructor(){}}", () => {
        expect(() => {
            parseScript(`class A {get constructor(){}}`);
        }).to.throw();
    });

    it("class A {static [static](){};}", () => {
        expect(() => {
            parseScript(`class A {static [static](){};}`);
        }).to.throw();
    });

    it("expect \"function hello() { \"use strict\"; private = 1; }", () => {
        expect(() => {
            parseScript(`function hello() { "use strict"; private = 1; }`);
        }).to.throw();
    });

    it("function hello() { \"use strict\"; yield = 1; }", () => {
        expect(() => {
            parseScript(`function hello() { "use strict"; yield = 1; }`);
        }).to.throw();
    });

    it("expect \"function*g() { let yield; }", () => {
        expect(() => {
            parseScript(`function*g() { let yield; }`);
        }).to.throw();
    });

    it("expect \"function*g() { try {} catch (yield) {} }", () => {
        expect(() => {
            parseScript(`function*g() { try {} catch (yield) {} }`);
        }).to.throw();
    });

    it("expect \"while(true) let a", () => {
        expect(() => {
            parseScript(`while(true) let a`);
        }).to.throw();
    });

    it("expect \"[...x,,] = 0", () => {
        expect(() => {
            parseScript(`[...x,,] = 0`);
        }).to.throw();
    });

    it("expect \"[...{a=0},]=0", () => {
        expect(() => {
            parseScript(`[...{a=0},]=0`);
        }).to.throw();
    });

    it("expect \"({function} = 0)\" to throw", () => {
        expect(() => {
            parseScript(`({function} = 0)`);
        }).to.throw();
    });

    it("expect \"({0} = 0)", () => {
        expect(() => {
            parseScript(`({0} = 0)`);
        }).to.throw();
    });

    it("expect \"[]=>0\" to throw", () => {
        expect(() => {
            parseScript(`[]=>0`);
        }).to.throw();
    });

    it("expect \"function f() { new.anythingElse; }", () => {
        expect(() => {
            parseScript(`function f() { new.anythingElse; }`);
        }).to.throw();
    });

    it("expect \"\"\"", () => {
        expect(() => {
            parseScript(`/* `);
        }).to.throw();
    });

    it("expect \"\\o\"", () => {
        expect(() => {
            parseScript(`\o`);
        }).to.throw();
    });

    it("expect \"class A {a(){},b(){}}", () => {
        expect(() => {
            parseScript(`class A {a(){},b(){}}`);
        }).to.throw();
    });

    it("expect \"var []", () => {
        expect(() => {
            parseScript(`var []`);
        }).to.throw();
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static prototype(){}}`);
        }).to.throw();
    });
    it("expect \"class A {static prototype(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static prototype(){}}`);
        }).to.throw();
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static prototype(){}}`);
        }).to.throw();
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static prototype(){}}`);
        }).to.throw();
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static prototype(){}}`);
        }).to.throw();
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static prototype(){}}`);
        }).to.throw();
    });

    it("expect \"class A {static prototype(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A {static prototype(){}}`);
        }).to.throw();
    });

    it("expect \"try { }\" to throw", () => {
        expect(() => {
            parseScript(`try { }}`);
        }).to.throw();
    });
    it("expect \"try { } catch ([a] = []) { }\" to throw", () => {
        expect(() => {
            parseScript(`try { } catch ([a] = []) { }`);
        }).to.throw();
    });
    it("expect \"[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]\" to throw", () => {
        expect(() => {
            parseScript(`[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]`);
        }).to.throw();
    });

    it("expect \"(a,b)=(c,d);\" to throw", () => {
        expect(() => {
            parseScript(`(a,b)=(c,d);`);
        }).to.throw();
    });
    it("expect \"for (const x = 1 of y);\" to throw", () => {
        expect(() => {
            parseScript(`for (const x = 1 of y);`);
        }).to.throw();
    });

    it("expect \"for (var [p]=q of r);\" to throw", () => {
        expect(() => {
            parseScript(`for (var [p]=q of r);`);
        }).to.throw();
    });
    it("expect \"for (var {x} = y of z);\" to throw", () => {
        expect(() => {
            parseScript(`for (var {x} = y of z);`);
        }).to.throw();
    });

    it("expect \"for (let x = 1 of y);\" to throw", () => {
        expect(() => {
            parseScript(`for (let x = 1 of y);`);
        }).to.throw();
    });
    it("expect \"for (this of that);\" to throw", () => {
        expect(() => {
            parseScript(`for (this of that);`);
        }).to.throw();
    });

    it("expect \"for (var x = 1 of y);\" to throw", () => {
        expect(() => {
            parseScript(`for (var x = 1 of y);`);
        }).to.throw();
    });
    it("expect \"for (const of 42);\" to throw", () => {
        expect(() => {
            parseScript(`for (const of 42);`);
        }).to.throw();
    });

    it("expect \"({ *[yield iter]() {} })\" to throw", () => {
        expect(() => {
            parseScript(`({ *[yield iter]() {} })`);
        }).to.throw();
    });

    it("expect \"(function*({yield}) {})\" to throw", () => {
        expect(() => {
            parseScript(`(function*({yield}) {})`);
        }).to.throw();
    });

    it("expect \"{\" to throw", () => {
        expect(() => {
            parseScript(`(function*() {
    function({x: y = yield 3}) {}
})`);
        }).to.throw();
    });

    it("expect \"class Foo { * }\" to throw", () => {
        expect(() => {
            parseScript(`class Foo { * }`);
        }).to.throw();
    });

    it("expect \"({ * })\" to throw", () => {
        expect(() => {
            parseScript(`({ * })`);
        }).to.throw();
    });

    it("expect \"var \\u{1f012}\" to throw", () => {
        expect(() => {
            parseScript(`var \u{1f012}`);
        }).to.throw();
    });

    it("expect \"�!\" to throw", () => {
        expect(() => {
            parseScript(`�!`);
        }).to.throw();
    });
    it("expect \"const const;\" to throw", () => {
        expect(() => {
            parseScript(`const const;`);
        }).to.throw();
    });

    it("expect \"for (const x = 0 in y){}\" to throw", () => {
        expect(() => {
            parseScript(`for (const x = 0 in y){}`);
        }).to.throw();
    });

    it("expect \"for (let [let];;;) {}\" to throw", () => {
        expect(() => {
            parseScript(`for (let [let];;;) {}`);
        }).to.throw();
    });

    it("expect \"for (let x = 0 in y){}\" to throw", () => {
        expect(() => {
            parseScript(`for (let x = 0 in y){}`);
        }).to.throw();
    });

    it("expect \"var x = function() { y = new..target; }\" to throw", () => {
        expect(() => {
            parseScript(`var x = function() { y = new..target; }`);
        }).to.throw();
    });

    it("expect \"const x = 0, y = 1,;\" to throw", () => {
        expect(() => {
            parseScript(`const x = 0, y = 1,;`);
        }).to.throw();
    });

    it("expect \"(function*() { yield* })\" to throw", () => {
        expect(() => {
            parseScript(`(function*() { yield* })`);
        }).to.throw();
    });
    it("expect \"f(..g);\" to throw", () => {
        expect(() => {
            parseScript(`f(..g);`);
        }).to.throw();
    });

    it("expect \"new f(....g);\" to throw", () => {
        expect(() => {
            parseScript(`new f(....g);`);
        }).to.throw();
    });
    it("expect \"new f(... ... g);\" to throw", () => {
        expect(() => {
            parseScript(`new f(... ... g);`);
        }).to.throw();
    });

    it("expect \"{\" to throw", () => {
        expect(() => {
            parseScript(`class A extends B {
    constructor() {
        (super)();
    }
}`);
        }).to.throw();
    });
    it("expect \"{\" to throw", () => {
        expect(() => {
            parseScript(`class A {
    foo() { new super + 3 }
}`);
        }).to.throw();
    });

    it("expect \"function *g(){ (a, b, c, yield) => 42 }\" to throw", () => {
        expect(() => {
            parseScript(`function *g(){ (a, b, c, yield) => 42 }`);
        }).to.throw();
    });
    it("expect \"(function *(yield){})\" to throw", () => {
        expect(() => {
            parseScript(`(function *(yield){})`);
        }).to.throw();
    });

    it("expect \"(function *(x, ...yield){})\" to throw", () => {
        expect(() => {
            parseScript(`(function *(x, ...yield){})`);
        }).to.throw();
    });
    it("expect \"function *g() { let yield; }\" to throw", () => {
        expect(() => {
            parseScript(`function *g() { let yield; }`);
        }).to.throw();
    });

    it("expect \"function *g() { return yield.x; }\" to throw", () => {
        expect(() => {
            parseScript(`function *g() { return yield.x; }`);
        }).to.throw();
    });
    it("expect \"function *g(yield){}\" to throw", () => {
        expect(() => {
            parseScript(`function *g(yield){}`);
        }).to.throw();
    });

    it("expect \"function *g(a, b, c, ...yield){}\" to throw", () => {
        expect(() => {
            parseScript(`function *g(a, b, c, ...yield){}`);
        }).to.throw();
    });

    it("expect \"function* l() { ([e=yield])=>12 };\" to throw", () => {
        expect(() => {
            parseScript(`function* l() { ([e=yield])=>12 };`);
        }).not.to.throw();
    });

    it("expect \"(a, ...b);\" to throw", () => {
        expect(() => {
            parseScript(`(a, ...b);`);
        }).to.throw();
    });
    it("expect \"(a,);\" to throw", () => {
        expect(() => {
            parseScript(`(a,);`);
        }).to.throw();
    });

    it("expect \" [ a -= 12 ] = 12; \" to throw", () => {
        expect(() => {
            parseScript(` [ a -= 12 ] = 12; `);
        }).to.throw();
    });
    it("expect \"[([a])] = 12;\" to throw", () => {
        expect(() => {
            parseScript(`[([a])] = 12;`);
        }).not.to.throw();
    });

    it("expect \"{ a = 12 };\" to throw", () => {
        expect(() => {
            parseScript(`{ a = 12 };`);
        }).not.to.throw();
    });

    it("expect \"while (false) break L;\" to throw", () => {
        expect(() => {
            parseScript(`while (false) break L;`);
        }).to.throw();
    });

    it("expect \"try { 12\" to throw", () => {
        expect(() => {
            parseScript(`try { 12`);
        }).to.throw();
    });
    it("expect \"(arguments)=>12\" to throw", () => {
        expect(() => {
            parseScript(`(arguments)=>12`);
        }).not.to.throw();
    });

    it("expect \"try {} catch (a) { 12\" to throw", () => {
        expect(() => {
            parseScript(`try {} catch (a) { 12`);
        }).to.throw();
    });
    it("expect \"try{} catch(){}\" to throw", () => {
        expect(() => {
            parseScript(`try{} catch(){}`);
        }).to.throw();
    });

    it("expect \"class A{constructor(){} constructor(){}}\" to throw", () => {
        expect(() => {
            parseScript(`class A{constructor(){} constructor(){}}`);
        }).to.throw();
    });

    it("expect \"class {}\" to throw", () => {
        expect(() => {
            parseScript(`class {}`);
        }).to.throw();
    });

    it("expect \"L: class A{}\" to throw", () => {
        expect(() => {
            parseScript(`L: class A{}`);
        }).to.throw();
    });
    it("expect \"class L 12\" to throw", () => {
        expect(() => {
            parseScript(`class L 12`);
        }).to.throw();
    });

    it("expect \"class A{static prototype() {}}\" to throw", () => {
        expect(() => {
            parseScript(`class A{static prototype() {}}`);
        }).to.throw();
    });
    it("expect \"class A{constructor(){var a = super()}\" to throw", () => {
        expect(() => {
            parseScript(`class A{constructor(){var a = super()}`);
        }).to.throw();
    });

    it("expect \"(a-=12)=>12\" to throw", () => {
        expect(() => {
            parseScript(`(a-=12)=>12`);
        }).to.throw();
    });
    it("expect \"a ? b 5\" to throw", () => {
        expect(() => {
            parseScript(`a ? b 5`);
        }).to.throw();
    });

    it("expect \"while (false) continue L;\" to throw", () => {
        expect(() => {
            parseScript(`while (false) continue L;`);
        }).to.throw();
    });

    it("expect \"L: const a = 12;\" to throw", () => {
        expect(() => {
            parseScript(`L: const a = 12;`);
        }).to.throw();
    });

    it("expect \"do {};\" to throw", () => {
        expect(() => {
            parseScript(`do {};`);
        }).to.throw();
    });
    it("expect \"export * not '12'\" to throw", () => {
        expect(() => {
            parseModule("export * not '12'");
        }).to.throw();
    });

    it("expect \"export - from '12'\" to throw", () => {
        expect(() => {
            parseModule("export - from '12'");
        }).to.throw();
    });

    it("expect \"export - from '12'\" to throw", () => {
        expect(() => {
            parseModule("export {a, if as l};");
        }).not.to.throw();
    });

    it("expect \"export.all.no.from", () => {
        expect(() => {
            parseModule("export.all.no.from");
        }).to.throw();
    });

    it("expect \"export.all.source.not.str\" to throw", () => {
        expect(() => {
            parseScript("export.all.source.not.str");
        }).to.throw();
    });

    it("expect \"export {a 12 e}\" to throw", () => {
        expect(() => {
            parseScript(`export {a 12 e}`);
        }).to.throw();
    });
    it("expect \"for (var a, b in e) break;\" to throw", () => {
        expect(() => {
            parseScript(`for (var a, b in e) break;`);
        }).to.throw();
    });

    it("expect \"for (var [a];;) break;\" to throw", () => {
        expect(() => {
            parseScript(`for (var [a];;) break;`);
        }).to.throw();
    });

    it("expect \"for (a=12 in e) break;\" to throw", () => {
        expect(() => {
            parseScript(`for (a=12 in e) break;`);
        }).to.throw();
    });

    it("expect \"for (a in b 5\" to throw", () => {
        expect(() => {
            parseScript(`for (a in b 5`);
        }).to.throw();
    });
    it("expect \"try {} catch (a) { for (var a of l) break;}\" to throw", () => {
        expect(() => {
            parseScript(`try {} catch (a) { for (var a of l) break;}`);
        }).to.throw();
    });

    it("expect \"for (a 12 b; 12) break;\" to throw", () => {
        expect(() => {
            parseScript(`for (a 12 b; 12) break;`);
        }).to.throw();
    });
    it("expect \"function l([a,a]) {}\" to throw", () => {
        expect(() => {
            parseScript(`function l([a,a]) {}`);
        }).to.not.throw();
    });

    it("expect \"L:function* l() {}\" to throw", () => {
        expect(() => {
            parseScript(`L:function* l() {}`);
        }).to.throw();
    });

    it("expect \"import * as a from 12\" to throw", () => {
        expect(() => {
            parseModule(`import * as a from 12`);
        }).to.throw();
    });

    it("expect \"import {a as b, e as l 12\" to throw", () => {
        expect(() => {
            parseModule(`import {a as b, e as l 12`);
        }).to.throw();
    });

    it("expect \"a: a: for (;false;) break;\" to throw", () => {
        expect(() => {
            parseScript("a: a: for (;false;) break;");
        }).to.throw();
    });

    it("expect \"if (false) const a = 12;\" to throw", () => {
        expect(() => {
            parseScript(`if (false) const a = 12;`);
        }).to.throw();
    });

    it("expect \"let [[let=let]=let*let] = 12;\" to throw", () => {
        expect(() => {
            parseScript(`let [[let=let]=let*let] = 12;`);
        }).to.throw();
    });

    it("expect \"({**() {}} })\" to throw", () => {
        expect(() => {
            parseScript(`({**() {}} })`);
        }).to.throw();
    });
    it("expect \"a.this\" to throw", () => {
        expect(() => {
            parseScript(`a.this`);
        }).not.to.throw();
    });

    it("expect \"a.12\" to throw", () => {
        expect(() => {
            parseScript(`a.12`);
        }).to.throw();
    });

    it("expect \"var\" to throw", () => {
        expect(() => {
            parseScript(`var`);
        }).to.throw();
    });
    it("expect \"use strict; a package\" to throw", () => {
        expect(() => {
            parseScript(`'use strict'; a package`);
        }).to.throw();
    });

    it("expect \"function f(a, ...b, c){}\" to throw", () => {
        expect(() => {
            parseScript(`function f(a, ...b, c){}`);
        }).to.throw();
    });
    it("expect \"class A\" to throw", () => {
        expect(() => {
            parseScript(`class A`);
        }).to.throw();
    });

    it("expect \"export {a,,}\"", () => {
        expect(() => {
            parseModule(`export {a,,}`);
        }).to.throw();
    });

    it("expect \"({ set: s(a, b) { } })\" to throw", () => {
        expect(() => {
            parseScript(`({ set: s(a, b) { } })`);
        }).to.throw();
    });
    it("expect \"a class;\" to throw", () => {
        expect(() => {
            parseScript(`a class;`);
        }).to.throw();
    });

    it("expect \"a if;\" to throw", () => {
        expect(() => {
            parseScript(`a if;`);
        }).to.throw();
    });
    it("expect \"for(;;)\" to throw", () => {
        expect(() => {
            parseScript(`for(;;)`);
        }).to.throw();
    });

    it("expect \"({get +:3})\" to throw", () => {
        expect(() => {            parseScript(`
({get +:3})`);
        }).to.throw();
    });

    it("expect \"([a.a]) => 42\" to throw", () => {
        expect(() => {
            parseScript(`([a.a]) => 42`);
        }).to.throw();
    });

    it("expect \"a => {}()\" to throw", () => {
        expect(() => {
            parseScript(`a => {}()`);
        }).to.throw();
    });
    it("expect \"export var await\" to throw", () => {
        expect(() => {
            parseModule(`export var await`);
        }).to.throw();
    });

    it("expect \"\"export new Foo()\" to throw", () => {
        expect(() => {
            parseModule(`"export new Foo()`);
        }).to.throw();
    });

    it("expect \"export typeof foo;\" to throw", () => {
        expect(() => {
            parseModule(`export typeof foo;`);
        }).to.throw();
    });

    it("expect \"export *\" to throw", () => {
        expect(() => {
            parseModule(`export *`);
        }).to.throw();
    });

    it("expect \"import { class } from foo", () => {
        expect(() => {
            parseModule(`import { class } from 'foo'`);
        }).to.throw();
    });

    it("expect \"import * as class from foo\" to throw", () => {
        expect(() => {
            parseModule(`import * as class from 'foo'`);
        }).to.throw();
    });

    it("expect \"class A { constructor() {} constructor() }\" to throw", () => {
        expect(() => {
            parseScript(`class A { constructor() {} 'constructor'() }`);
        }).to.throw();
    });
    it("expect \"class A { get constructor() {} }\" to throw", () => {
        expect(() => {
            parseScript(`class A { get constructor() {} }`);
        }).to.throw();
    });

    it("expect \"class A { *constructor() {} }\" to throw", () => {
        expect(() => {
            parseScript(`class A { *constructor() {} }`);
        }).to.throw();
    });
    it("expect \"function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}\" to throw", () => {
        expect(() => {
            parseScript(`function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}`);
        }).not.to.throw();
    });

    it("expect \"function x(...[ a, b ]){}\" to throw", () => {
        expect(() => {
            parseScript(`function x(...[ a, b ]){}`);
        }).not.to.throw();
    });
    it("expect \"var a = { set foo(...v) {} };\" to throw", () => {
        expect(() => {
            parseScript(`var a = { set foo(...v) {} };`);
        }).to.throw();
    });

    it("expect \"class a { set foo(...v) {} };\" to throw", () => {
        expect(() => {
            parseScript(`class a { set foo(...v) {} };`);
        }).to.throw();
    });

    it("expect \"(...[a, b]) => {}\" to throw", () => {
        expect(() => {
            parseScript(`(...[a, b]) => {}`);
        }).to.not.throw();
    });

    it("expect \"let [function] = x\" to throw", () => {
        expect(() => {
            parseScript(`let [function] = x`);
        }).to.throw();
    });

    it("expect \"([this] = [10])\" to throw", () => {
        expect(() => {
            parseScript(`([this] = [10])`);
        }).to.throw();
    });

    it("expect \"var x = {this}\" to throw", () => {
        expect(() => {
            parseScript(`var x = {this}`);
        }).to.throw();
    });

    it("expect \"({this} = x)\" to throw", () => {
        expect(() => {
            parseScript(`({this} = x)`);
        }).to.throw();
    });
    it("expect \"(function () { yield 10 })\" to throw", () => {
        expect(() => {
            parseScript(`(function () { yield 10 })`);
        }).to.throw();
    });

    it("expect \"class default\" to throw", () => {
        expect(() => {
            parseScript(`class default`);
        }).to.throw();
    });
    it("expect \"class A extends yield B { }\" to throw", () => {
        expect(() => {
            parseScript(`class A extends yield B { }`);
        }).to.throw();
    });

    it("expect \"var obj = { *test** }\" to throw", () => {
        expect(() => {
            parseScript(`var obj = { *test** }`);
        }).to.throw();
    });

    it("expect \"({ 5 }) => {}\" to throw", () => {
        expect(() => {
            parseScript(`({ 5 }) => {}`);
        }).to.throw();
    });

    it("expect \"[...a, b] = c\" to throw", () => {
        expect(() => {
            parseScript(`[...a, b] = c`);
        }).to.throw();
    });

    it("expect \"function *a(){yield*}\" to throw", () => {
        expect(() => {
            parseScript(`function *a(){yield*}`);
        }).to.throw();
    });
    it("expect \"([(a = b)] = []{\" to throw", () => {
        expect(() => {
            parseScript(`([(a = b)] = []`);
        }).to.throw();
    });

    it("expect \"({a: (b = 0)} = {})\" to throw", () => {
        expect(() => {
            parseScript(`({a: (b = 0)} = {})`);
        }).to.throw();
    });

    it("expect \"\" to throw", () => {
        expect(() => {
            parseScript("`${a}a${b}");
        }).to.throw();
    });

    it("expect \"`${a\" to throw", () => {
        expect(() => {
            parseScript("`${a");
        }).to.throw();
    });

    it("expect \"a++``\" to throw", () => {
        expect(() => {
            parseScript("a++``");
        }).to.throw();
    });
    it("expect \"{\" to throw", () => {
        expect(() => {
            parseScript("`");
        }).to.throw();
    });

    it("expect \"class A extends B { constructor() { (super).a(); } }\" to throw", () => {
        expect(() => {
            parseScript(`class A extends B { constructor() { (super).a(); } }`);
        }).to.throw();
    });
    it("expect \"({ a() { (super).b(); } });\" to throw", () => {
        expect(() => {
            parseScript(`({ a() { (super).b(); } });`);
        }).to.throw();
    });

    it("expect \"class A extends B { constructor() { new super(); } }\" to throw", () => {
        expect(() => {
            parseScript(`class A extends B { constructor() { new super(); } }`);
        }).to.throw();
    });
    it("expect \"class A extends B { constructor() { (super)(); } }\" to throw", () => {
        expect(() => {
            parseScript(`class A extends B { constructor() { (super)(); } }`);
        }).to.throw();
    });

    it("expect \"class A extends B { constructor() { super; } }\" to throw", () => {
        expect(() => {
            parseScript(`class A extends B { constructor() { super; } }`);
        }).to.throw();
    });
    it("expect \"function f() { (super)() }\" to throw", () => {
        expect(() => {
            parseScript(`function f() { (super)() }`);
        }).to.throw();
    });

    it("expect \"0O9\" to throw", () => {
        expect(() => {
            parseScript(`0O9`);
        }).to.throw();
    });
    it("expect \"0o18\" to throw", () => {
        expect(() => {
            parseScript(`0o18`);
        }).to.throw();
    });

    it("expect \"0o1a\" to throw", () => {
        expect(() => {
            parseScript(`0o1a`);
        }).to.throw();
    });
    it("expect \"0b12\" to throw", () => {
        expect(() => {
            parseScript(`0b12`);
        }).to.throw();
    });

    it("expect \"use strict; 019\" to throw", () => {
        expect(() => {
            parseScript(`'use strict'; 019`);
        }).to.throw();
    });

    it("expect \"for(let[a]().b of 0);\" to throw", () => {
        expect(() => {
            parseScript(`for(let[a]().b of 0);`);
        }).to.throw();
    });

    it("expect \"function f() { var await }\" to throw", () => {
        expect(() => {
            parseModule(`function f() { var await }`);
        }).to.throw();
    });
    it("expect \"await\" to throw", () => {
        expect(() => {
            parseModule(`await`);
        }).to.throw();
    });

    it("expect \"({a = 0}, {a = 0}, 0) => 0\" to throw", () => {
        expect(() => {
            parseScript(`({a = 0}, {a = 0}, 0) => 0`);
        }).to.throw();
    });
    it("expect \"(0, {a = 0}) => 0\" to throw", () => {
        expect(() => {
            parseScript(`(0, {a = 0}) => 0`);
        }).to.throw();
    });

    it("expect \"({a = 0})\" to throw", () => {
        expect(() => {
            parseScript(`({a = 0})`);
        }).to.throw();
    });
    it("expect \"(function(...a, b){})\" to throw", () => {
        expect(() => {
            parseScript(`(function(...a, b){})`);
        }).to.throw();
    });

    it("expect \"(class [a] {})\" to throw", () => {
        expect(() => {
            parseScript(`(class [a] {})`);
        }).to.throw();
    });
    it("expect \"(class {)\" to throw", () => {
        expect(() => {
            parseScript(`(class {)`);
        }).to.throw();
    });

    it("expect \"(class {[3]:0}\" to throw", () => {
        expect(() => {
            parseScript(`(class {[3]:0}`);
        }).to.throw();
    });
    it("expect \"(class {a})\" to throw", () => {
        expect(() => {
            parseScript(`(class {a})`);
        }).to.throw();
    });

    it("expect \"(class {a=0})\" to throw", () => {
        expect(() => {
            parseScript(`(class {a=0})`);
        }).to.throw();
    });
    it("expect \"f(... ... a)\" to throw", () => {
        expect(() => {
            parseScript(`f(... ... a)`);
        }).to.throw();
    });

    it("expect \"f(....a)\" to throw", () => {
        expect(() => {
            parseScript(`f(....a)`);
        }).to.throw();
    });
    it("expect \"f(..a)\" to throw", () => {
        expect(() => {
            parseScript(`f(..a)`);
        }).to.throw();
    });

    it("expect \"(([a])=0);\" to throw", () => {
        expect(() => {
            parseScript(`(([a])=0);`);
        }).to.not.throw();
    });
    it("expect \"(({a})=0);\" to throw", () => {
        expect(() => {
            parseScript(`(({a})=0);`);
        }).not.to.throw();
    });

    it("expect \"(a,...a)/*‪*/\" to throw", () => {
        expect(() => {
            parseScript(`(a,...a)/*‪*/`);
        }).to.throw();
    });
    it("expect \"\" to throw", () => {
        expect(() => {
            parseScript(`(a,...a)/* */ => 0`);
        }).to.throw();
    });

    it("expect \"function* a({e: a.b}) {}\" to throw", () => {
        expect(() => {
            parseScript(`function* a({e: a.b}) {}`);
        }).to.throw();
    });
    it("expect \"function a({e: a.b}) {}\" to throw", () => {
        expect(() => {
            parseScript(`function a({e: a.b}) {}`);
        }).to.throw();
    });

    it("expect \"({e: a.b}) => 0\" to throw", () => {
        expect(() => {
            parseScript(`({e: a.b}) => 0`);
        }).to.throw();
    });
    it("expect \"var {a: b.c} = 0;\" to throw", () => {
        expect(() => {
            parseScript(`var {a: b.c} = 0;`);
        }).to.throw();
    });

    it("expect \"({a([a.b]){}})\" to throw", () => {
        expect(() => {
            parseScript(`({a([a.b]){}})`);
        }).to.throw();
    });
    it("expect \"(function ([a.b]) {})\" to throw", () => {
        expect(() => {
            parseScript(`(function ([a.b]) {})`);
        }).to.throw();
    });

    it("expect \"({0} = 0)\" to throw", () => {
        expect(() => {
            parseScript(`({0} = 0)`);
        }).to.throw();
    });
    it("expect \"({var} = 0)\" to throw", () => {
        expect(() => {
            parseScript(`({var} = 0)`);
        }).to.throw();
    });

    it("expect \"({\"a\"} = 0)\" to throw", () => {
        expect(() => {
            parseScript(`({'a'} = 0)`);
        }).to.throw();
    });
    it("expect \"({a:for} = 0)\" to throw", () => {
        expect(() => {
            parseScript(`({a:for} = 0)`);
        }).to.throw();
    });

    it("expect \"({a,,} = 0)\" to throw", () => {
        expect(() => {
            parseScript(`({a,,} = 0)`);
        }).to.throw();
    });
    it("expect \"({,a,} = 0)\" to throw", () => {
        expect(() => {
            parseScript(`({,a,} = 0)`);
        }).to.throw();
    });

    it("expect \"({a,,a} = 0)\" to throw", () => {
        expect(() => {
            parseScript(`({a,,a} = 0)`);
        }).to.throw();
    });
    it("expect \"({a = 0});\" to throw", () => {
        expect(() => {
            parseScript(`({a = 0});`);
        }).to.throw();
    });

    it("expect \"[a, ...b, {c=0}]\" to throw", () => {
        expect(() => {
            parseScript(`[a, ...b, {c=0}]`);
        }).to.throw();
    });
    it("expect \"[...{a=0},]=0\" to throw", () => {
        expect(() => {
            parseScript(`[...{a=0},]=0`);
        }).to.throw();
    });

    it("expect \"[...{a=0},]\" to throw", () => {
        expect(() => {
            parseScript(`[...{a=0},]`);
        }).to.throw();
    });
    it("expect \"[...0,...{a=0}]=0\" to throw", () => {
        expect(() => {
            parseScript(`[...0,...{a=0}]=0`);
        }).to.throw();
    });

    it("expect \"[...0,{a=0}]=0\" to throw", () => {
        expect(() => {
            parseScript(`[...0,{a=0}]=0`);
        }).to.throw();
    });
    it("expect \"[...0,a]=0\" to throw", () => {
        expect(() => {
            parseScript(`[...0,a]=0`);
        }).to.throw();
    });

    it("expect \"[, x, ...y,] = 0\" to throw", () => {
        expect(() => {
            parseScript(`[, x, ...y,] = 0`);
        }).to.throw();
    });
    it("expect \"[{a=0},{b=0},0] = 0\" to throw", () => {
        expect(() => {
            parseScript(`[{a=0},{b=0},0] = 0`);
        }).to.throw();
    });

    it("expect \"a: let a\" to throw", () => {
        expect(() => {
            parseScript(`a: let a`);
        }).to.throw();
    });
    it("expect \"with(true) class a {}\" to throw", () => {
        expect(() => {
            parseScript(`with(true) class a {}`);
        }).to.throw();
    });

    it("expect \"while(true) const a\" to throw", () => {
        expect(() => {
            parseScript(`while(true) const a`);
        }).to.throw();
    });
    it("expect \"function*g() { var yield; }\" to throw", () => {
        expect(() => {
            parseScript(`function*g() { var yield; }`);
        }).to.throw();
    });

    it("expect \"function*g(yield){}\" to throw", () => {
        expect(() => {
            parseScript(`function*g(yield){}`);
        }).to.throw();
    });
    it("expect \"a: function* a(){}\" to throw", () => {
        expect(() => {
            parseScript(`a: function* a(){}`);
        }).to.throw();
    });

    it("expect \"class extends A{}\" to throw", () => {
        expect(() => {
            parseScript(`class extends A{}`);
        }).to.throw();
    });
    it("expect \"var new A = 0;\" to throw", () => {
        expect(() => {
            parseScript(`var new A = 0;`);
        }).to.throw();
    });

    it("expect \"var (a)=0;\" to throw", () => {
        expect(() => {
            parseScript(`var (a)=0;`);
        }).to.throw();
    });
    it("expect \"var const\" to throw", () => {
        expect(() => {
            parseScript(`var const`);
        }).to.throw();
    });

    it("expect \"try {} catch ((e)) {}\" to throw", () => {
        expect(() => {
            parseScript(`try {} catch ((e)) {}`);
        }).to.throw();
    });
    it("expect \"for({a=0};;);\" to throw", () => {
        expect(() => {
            parseScript(`for({a=0};;);`);
        }).to.not.throw();
    });

    it("expect \"for(([a]) of 0);\" to throw", () => {
        expect(() => {
            parseScript(`for(([a]) of 0);`);
        }).not.to.throw();
    });
    it("expect \"(a, ...[b]) => {}\" to throw", () => {
        expect(() => {
            parseScript(`(a, ...[b]) => {}`);
        }).not.to.throw();
    });

    it("expect \"({ *a: 0 })\" to throw", () => {
        expect(() => {
            parseScript(`({ *a: 0 })`);
        }).to.throw();
    });
    it("expect \"({ *a }\" to throw", () => {
        expect(() => {
            parseScript(`({ *a }`);
        }).to.throw();
    });

    it("expect \"({[1,2]:3})\" to throw", () => {
        expect(() => {
            parseScript(`({[1,2]:3})`);
        }).to.throw();
    });
    it("expect \"import {b as,} from a;", () => {
        expect(() => {
            parseModule(`import {b as,} from 'a';`);
        }).to.throw();
    });

    it("expect \"import {b,,} from a;", () => {
        expect(() => {
            parseModule(`import {b,,} from 'a';`);
        }).to.throw();
    });

    it("expect \"import a, b from a\" to throw", () => {
        expect(() => {
            parseModule(`import a, b from 'a'`);
        }).to.throw();
    });

    it("expect \"import a, b from a\" to throw", () => {
        expect(() => {
            parseModule(`import a, b from 'a'`);
        }).to.throw();
    });

    it("expect \"import {function} from a;\" to throw", () => {
        expect(() => {
            parseModule(`import {function} from 'a';`);
        }).to.throw();
    });

    it("expect \"import a, b from a\" to throw", () => {
        expect(() => {
            parseModule(`import {b as,} from 'a';`);
        }).to.throw();
    });

    it("expect \"import\" to throw", () => {
        expect(() => {
            parseModule(`import`);
        }).to.throw();
    });
    it("expect \"{import a from b;}\" to throw", () => {
        expect(() => {
            parseModule(`{import a from 'b';}`);
        }).not.to.throw();
    });

    it("expect \"export function () {}\" to throw", () => {
        expect(() => {
            parseModule(`export function () {}`);
        }).to.throw();
    });

    it("expect \"export 3", () => {
        expect(() => {
            parseModule(`export 3`);
        }).to.throw();
    });

    it("expect \"export {a,b} from", () => {
        expect(() => {
            parseModule(`export {a,b} from`);
        }).to.throw();
    });

    it("expect \"export 3", () => {
        expect(() => {
            parseModule(`export 3`);
        }).to.throw();
    });

    it("expect \"export 3", () => {
        expect(() => {
            parseModule(`export 3`);
        }).to.throw();
    });

    it("expect \"export {as b} from a", () => {
        expect(() => {
            parseModule(`export {as b} from a`);
        }).to.throw();
    });

// 14.2.1 Arrow parameters must not contain yield expressions

    it("expect \"function *g() { (x = yield) => {} ", () => {
        expect(() => {
            parseScript(`function *g() { (x = yield) => {} }`);
        }).to.throw();
    });
    it("expect \"function *a(b = yield){}", () => {
        expect(() => {
            parseScript(`function *a(b = yield){}`);
        }).to.throw();
    });

    it("expect \"function* g(){ (a = x + f(yield)) => 0; }", () => {
        expect(() => {
            parseScript(`function* g(){ (a = x + f(yield)) => 0; }`);
        }).to.throw();
    });

    it("expect \"export;", () => {
        expect(() => {
            parseModule(`export;`);
        }).to.throw();
    });

    it("expect \"{", () => {
        expect(() => {
            parseScript(`{`);
        }).to.throw();
    });

    it("expect \"{", () => {
        expect(() => {
            parseModule(`{`);
        }).to.throw();
    });

    it("expect \"{export {a};}", () => {
        expect(() => {
            parseModule(`{export {a};}`);
        }).to.throw();
    });

    it("expect \"export;", () => {
        expect(() => {
            parseModule(`export;`);
        }).to.throw();
    });

    it("should throw \"for(f() in myObject) { /* ... */ }\"", () => {
        expect(() => {
            parseScript(`for(f() in myObject) { /* ... */ }`);
        }).to.throw();
    });

    it("should throw \"({a: 0} = 0);\"", () => {
        expect(() => { parseScript(`({a: 0} = 0);`); }).to.throw();
    });
});
