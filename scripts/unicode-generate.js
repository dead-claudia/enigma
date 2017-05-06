#!/usr/bin/env node
"use strict"

// TODO: add tests for this
//
// Note: when editing the output, check the output to ensure it's actually valid asm.js:
// https://anvaka.github.io/asmalidator/

// This generates delta-encoded tables with a common lookup function aware of the encoding to
// minimize the number of comparisons required, especially for the common case. I'd rather not have
// a very slow runtime test.
//
// Note that this has a dependency on `unicode-9.0.0` if executed directly.
//
// `generate(opts)`, default-exported, generates a source from one or more lists of code points and
// associated exports.
//
// It accepts these named options:
//
// - `eval` - (optional) boolean, `true` if this should emit a JS body
// - `write` - promise-returning function called on each written string
// - `exports` - mapping of name + list of functions returning code points
//
// To use this, you do something like this:
//
// ```js
// import {isIDContinue} from "./unicode-generated";
//
// if (isIDContinue(charCode)) {
//     doThings();
// }
// ```
//
// The format used for the code lists (stored as a shared typed array) is this:
//
// - `prev`: implicit counter starting at `0`
// - `-code`: equality with `prev + code`
// - `start, delta`: between `prev + start` and `prev + start + delta`
//
// The `test` helper does this in a very highly optimized way, with some various hacks to reduce
// branching.
//
// The entire process is done asynchronously and in serial, to avoid blowing up the RAM. It has a
// few GC hints, too, to keep memory down.

exports.generate = generate
async function generate(opts) {
    const js = opts.eval
    const exportNames = Object.keys(opts.exports)
    const ts = str => opts.eval ? "" : str
    const codes = []
    const offsets = []

    for (let i = 0; i < exportNames.length; i++) {
        const exported = exportNames[i]
        const items = opts.exports[exported]
        const values = new Set()

        for (const makeList of items) {
            const list = makeList()
            for (const item of list) values.add(item)
            // GC hint
            await new Promise(resolve => setTimeout(resolve, 10))
        }

        const table = Array.from(values).sort((a, b) => a - b)
        // GC hint
        await new Promise(resolve => setTimeout(resolve, 10))
        let count = 0
        let prev

        for (let i = 0; i < table.length; i++) {
            const child = table[i]

            if (prev != null && child === prev.end + 1) {
                prev.end = child
            } else {
                prev = table[count++] = {start: child, end: child}
            }
        }

        table.length = count
        const offset = codes.length
        let acc = 0

        for (const {start, end} of table) {
            if (start === end) {
                codes.push(acc - start)
            } else {
                codes.push(start - acc)
                codes.push(end - start + 1)
            }

            acc = end
        }

        offsets.push({
            offset: offset * Int32Array.BYTES_PER_ELEMENT,
            count: (codes.length - offset) * Int32Array.BYTES_PER_ELEMENT,
        })

        // GC hint
        await new Promise(resolve => setTimeout(resolve, 10))
    }

    const size = Math.max(4096, 1 << (32 - Math.clz32(codes.length) + 4))

    // The generated module is intentionally in asm.js for speed.
    await opts.write(`/* tslint:disable */
"use strict";
var _b=new ArrayBuffer(${size}),
_=(function(s${ts(":any")}, f${ts(":any")}, h${ts(":any")}) {
    "use asm";
    var t${ts(":Int32Array")}=new s.Int32Array(h);

    function test(i${ts(":number")},l${ts(":number")},s${ts(":number")}) {
        i=i|0; l=l|0; s=s|0;
        var r=0;
        l=l+i|0;
        while ((i|0)<(l|0)) {
            r=t[i>>2]|0;
            i=i+4|0;
            s=s-(r&0x7fffffff)|0;
            if ((s|0)==0) return 1;
            if ((s|0)<0) return 0;
            if ((r|0)>0) {
                s=s-(t[i>>2]|0)|0;
                if ((s|0)<0) return 1;
                i=i+4|0;
            }
        }
        return 0;
    }

    return {test: test};
})(global,{},_b),
_v=new Int32Array(_b),
_c=[${codes}],
_i=0;
for(;_i<${codes.length};_v[_i]=_c[_i++]);
`)

        for (let i = 0; i < exportNames.length; i++) {
            const exported = exportNames[i]
            const {offset, count} = offsets[i]
            await opts.write(`
function ${exported}(code${ts(": number")}) {
    return _.test(${offset},${count},code)!==0;
}
`)
        }

    await opts.write(`\n${js ? "return" : "export"} {${exportNames}};\n`)
}

// Edit these here to change the options when run directly.

if (require.main === module) {
    const path = require("path")
    const load = name => () => {
        const mod = require.resolve(`unicode-9.0.0/${name}/code-points`)
        const list = require(mod)

        // Keep this out of persistent memory
        delete require.cache[mod]
        return list
    }

    const stream = require("fs").createWriteStream(
        path.resolve(__dirname, "../src/unicode-generated.js")
    )

    generate({
        eval: true,
        write: str => new Promise((resolve, reject) => {
            stream.write(str, err => err != null ? reject(err) : resolve())
        }),
        exports: {
            isIDContinue: [load("Binary_Property/ID_Continue")],
            isIDStart: [load("Binary_Property/ID_Start")],
        },
    })
    // Node only started exiting on collected rejections in v8
    .catch(e => process.nextTick(() => { throw e }))
}
