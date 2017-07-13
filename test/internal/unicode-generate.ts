import * as G from "../../scripts/unicode-generate";
import * as assert from "clean-assert";

describe("(slow) scripts/unicode-generate", () => {
    context("compressor", () => {
        function test(name: string, data: {
            list: number[];
            dict: number[];
            result: number[];
        }) {
            it(name, () => {
                const compressor = G.compressorCreate();

                for (const item of data.list) {
                    G.compressorSend(compressor, item);
                }

                G.compressorEnd(compressor);
                assert.match(compressor.size, data.list.length);
                assert.match(compressor.dict, data.dict);
                assert.match(compressor.result, data.result);
            });
        }

        test("compresses a single 0", {
            list: [0],
            dict: [],
            result: [-1],
        });

        test("compresses a single 0 range", {
            list: [0, 0, 0],
            dict: [],
            result: [-3],
        });

        test("compresses a single item", {
            list: [1],
            dict: [],
            result: [G.DataInst.Empty, 1],
        });

        test("compresses a single item range", {
            list: [1, 1, 1],
            dict: [],
            result: [G.DataInst.Many, 1, 3],
        });

        test("compresses two items", {
            list: [1, 2],
            dict: [],
            result: [
                G.DataInst.Empty, 1,
                G.DataInst.Empty, 2,
            ],
        });

        test("compresses two ranges", {
            list: [1, 1, 1, 2, 2, 2, 2],
            dict: [],
            result: [
                G.DataInst.Many, 1, 3,
                G.DataInst.Many, 2, 4,
            ],
        });

        test("compresses complex stuff", {
            list: [
                1, 1, 1, 1, 1, 6, 11, 11, 11, 11, 5, 5,
                0, 0, 0, 0, 0, 1, 21, 21, 21, 24, 24, 24,
                1, 1, 1, 1, 1, 6, 11, 11, 11, 11, 5, 5,
                31, 31, 33, 33, 33, 33, 41, 41, 43, 43, 43, 43,
                21, 24, 24, 24, 24, 24, 20, 20, 20, 20, 20, 0,
            ],
            dict: [11, 21, 24],
            result: [
                G.DataInst.Many, 1, 5,
                G.DataInst.Empty, 6,
                G.DataInst.Link | G.DataInst.Many, 0, 4,
                G.DataInst.Many, 5, 2,
                -5,
                G.DataInst.Empty, 1,
                G.DataInst.Link | G.DataInst.Many, 1, 3,
                G.DataInst.Link | G.DataInst.Many, 2, 3,
                G.DataInst.Many, 1, 5,
                G.DataInst.Empty, 6,
                G.DataInst.Link | G.DataInst.Many, 0, 4,
                G.DataInst.Many, 5, 2,
                G.DataInst.Many, 31, 2,
                G.DataInst.Many, 33, 4,
                G.DataInst.Many, 41, 2,
                G.DataInst.Many, 43, 4,
                G.DataInst.Link, 1,
                G.DataInst.Link | G.DataInst.Many, 2, 5,
                G.DataInst.Many, 20, 5,
                -1,
            ],
        });
    });

    context("decompressor", () => {
        function test(name: string, data: {
            dict: number[];
            result: number[];
            expected: number[];
        }) {
            it(name, () => {
                assert.match(G.decompress({
                    size: data.expected.length,
                    dict: data.dict,
                    result: data.result,
                }), new Uint32Array(data.expected));
            });
        }

        test("decompresses a single 0", {
            dict: [],
            result: [-1],
            expected: [0],
        });

        test("decompresses a single 0 range", {
            dict: [],
            result: [-3],
            expected: [0, 0, 0],
        });

        test("decompresses a single item", {
            dict: [],
            result: [G.DataInst.Empty, 1],
            expected: [1],
        });

        test("decompresses a single item range", {
            dict: [],
            result: [G.DataInst.Many, 1, 3],
            expected: [1, 1, 1],
        });

        test("decompresses two items", {
            dict: [],
            result: [
                G.DataInst.Empty, 1,
                G.DataInst.Empty, 2,
            ],
            expected: [1, 2],
        });

        test("decompresses two ranges", {
            dict: [],
            result: [
                G.DataInst.Many, 1, 3,
                G.DataInst.Many, 2, 4,
            ],
            expected: [1, 1, 1, 2, 2, 2, 2],
        });

        test("decompresses complex stuff", {
            dict: [11, 21, 24],
            result: [
                G.DataInst.Many, 1, 5,
                G.DataInst.Empty, 6,
                G.DataInst.Link | G.DataInst.Many, 0, 4,
                G.DataInst.Many, 5, 2,
                -5,
                G.DataInst.Empty, 1,
                G.DataInst.Link | G.DataInst.Many, 1, 3,
                G.DataInst.Link | G.DataInst.Many, 2, 3,
                G.DataInst.Many, 1, 5,
                G.DataInst.Empty, 6,
                G.DataInst.Link | G.DataInst.Many, 0, 4,
                G.DataInst.Many, 5, 2,
                G.DataInst.Many, 31, 2,
                G.DataInst.Many, 33, 4,
                G.DataInst.Many, 41, 2,
                G.DataInst.Many, 43, 4,
                G.DataInst.Link, 1,
                G.DataInst.Link | G.DataInst.Many, 2, 5,
                G.DataInst.Many, 20, 5,
                -1,
            ],
            expected: [
                1, 1, 1, 1, 1, 6, 11, 11, 11, 11, 5, 5,
                0, 0, 0, 0, 0, 1, 21, 21, 21, 24, 24, 24,
                1, 1, 1, 1, 1, 6, 11, 11, 11, 11, 5, 5,
                31, 31, 33, 33, 33, 33, 41, 41, 43, 43, 43, 43,
                21, 24, 24, 24, 24, 24, 20, 20, 20, 20, 20, 0,
            ],
        });
    });

    context("module", () => {
        function assertEqual(a: boolean, b: boolean, message: string) {
            if (a !== b) {
                assert.fail(
                    "{message}: Expected {actual} to equal {expected}",
                    {message, actual: a, expected: b},
                );
            }
        }

        const methods = {
            empty: [[]],
            singleItem: [[1]],
            singleRange: [[1, 2, 3, 4, 5, 6]],
            multiItem: [
                [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16],
                [21, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36],
                [41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56],
                [61, 62, 63, 64, 65, 66, 71, 72, 73, 74, 75, 76],
                [81, 82, 83, 84, 85, 86, 91, 92, 93, 94, 95, 96],
                [101, 102, 103, 104, 105, 106, 111, 112, 113, 114, 115, 116],
                [121, 122, 123, 124, 125, 126, 131, 132, 133, 134, 135, 136],
                [141, 142, 143, 144, 145, 146, 151, 152, 153, 154, 155, 156],
            ],
            multiSingle: [
                [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
                [21, 23, 25, 27, 29, 31, 33, 35, 37, 39],
                [41, 43, 45, 47, 49, 51, 53, 55, 57, 59],
                [61, 63, 65, 67, 69, 71, 73, 75, 77, 79],
                [81, 83, 85, 87, 89, 91, 93, 95, 97, 99],
                [101, 103, 105, 107, 109, 111, 113, 115, 117, 119],
                [121, 123, 125, 127, 129, 131, 133, 135, 137, 139],
                [141, 143, 145, 147, 149, 151, 153, 155, 157, 159],
            ],
            multiMixed: [
                [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
                [21, 23, 25, 27, 29, 31, 33, 35, 37, 39],
                [41, 43, 45, 47, 49, 51, 53, 55, 57, 59],
                [61, 63, 65, 67, 69, 71, 73, 75, 77, 79],
                [81, 83, 85, 87, 89, 91, 93, 95, 97, 99],
                [101, 103, 105, 107, 109, 111, 113, 115, 117, 119],
                [121, 123, 125, 127, 129, 131, 133, 135, 137, 139],
                [141, 143, 145, 147, 149, 151, 153, 155, 157, 159],

                [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16],
                [21, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36],
                [41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56],
                [61, 62, 63, 64, 65, 66, 71, 72, 73, 74, 75, 76],
                [81, 82, 83, 84, 85, 86, 91, 92, 93, 94, 95, 96],
                [101, 102, 103, 104, 105, 106, 111, 112, 113, 114, 115, 116],
                [121, 122, 123, 124, 125, 126, 131, 132, 133, 134, 135, 136],
                [141, 142, 143, 144, 145, 146, 151, 152, 153, 154, 155, 156],
            ],
        };
        let mod: {
            [P in keyof typeof methods]: (code: number) => boolean;
        };

        before(async () => {
            let source = "";

            await G.generate({
                eval: true,
                write(str: string) { source += str; },
                exports: methods,
            });

            mod = new Function(source)();
        });

        it("works with zero codes", () => {
            assertEqual(mod.empty(0), false, "(code = 0)");
            assertEqual(mod.empty(1), false, "(code = 1)");
            assertEqual(mod.empty(2), false, "(code = 2)");
            assertEqual(mod.empty(3), false, "(code = 3)");
            assertEqual(mod.empty(4), false, "(code = 4)");
            assertEqual(mod.empty(5), false, "(code = 5)");
        });

        it("works with one code", () => {
            assertEqual(mod.singleItem(0), false, "(code = 0)");
            assertEqual(mod.singleItem(1), true, "(code = 1)");
            assertEqual(mod.singleItem(2), false, "(code = 2)");
            assertEqual(mod.singleItem(3), false, "(code = 3)");
            assertEqual(mod.singleItem(4), false, "(code = 4)");
            assertEqual(mod.singleItem(5), false, "(code = 5)");
        });

        it("works with small data sets", () => {
            assertEqual(mod.singleRange(0), false, "(code = 0)");
            for (let i = 1; i < 7; i++) {
                assertEqual(mod.singleRange(i), true, `(code = ${i})`);
            }
            assertEqual(mod.singleRange(7), false, "(code = 7)");
            assertEqual(mod.singleRange(8), false, "(code = 8)");
            assertEqual(mod.singleRange(9), false, "(code = 9)");
            assertEqual(mod.singleRange(10), false, "(code = 10)");
            assertEqual(mod.singleRange(11), false, "(code = 11)");
            assertEqual(mod.singleRange(12), false, "(code = 12)");
        });

        it("works with multiple ranges", () => {
            assertEqual(mod.multiItem(0), false, "(code = 0)");
            for (let i = 0; i < 160; i += 10) {
                for (let j = i + 1; j < i + 7; j++) {
                    assertEqual(mod.multiItem(j), true, `(code = ${j})`);
                }
                for (let j = i + 7; j < i + 11; j++) {
                    assertEqual(mod.multiItem(j), false, `(code = ${j})`);
                }
            }
            for (let i = 171; i < 181; i++) {
                assertEqual(mod.multiItem(i), false, `(code = ${i})`);
            }
        });

        it("works with multiple individual values", () => {
            assertEqual(mod.multiSingle(0), false, "(code = 0)");
            for (let i = 1; i < 160; i++) {
                assertEqual(mod.multiSingle(i), i % 2 === 1, `(code = ${i})`);
            }
            assertEqual(mod.multiSingle(160), false, "(code = 160)");
            assertEqual(mod.multiSingle(161), false, "(code = 161)");
            assertEqual(mod.multiSingle(162), false, "(code = 162)");
            assertEqual(mod.multiSingle(163), false, "(code = 163)");
            assertEqual(mod.multiSingle(164), false, "(code = 164)");
            assertEqual(mod.multiSingle(165), false, "(code = 165)");
        });

        it("works with multiple mixed, non-unique values", () => {
            assertEqual(mod.multiMixed(0), false, "(code = 0)");
            for (let i = 0; i < 160; i += 10) {
                for (let j = i + 1; j < i + 7; j++) {
                    assertEqual(mod.multiMixed(j), true, `(code = ${j})`);
                }
                for (let j = i + 7; j < i + 11; j++) {
                    assertEqual(mod.multiMixed(j), j % 2 === 1, `(code = ${j})`);
                }
            }
            for (let i = 171; i < 181; i++) {
                assertEqual(mod.multiMixed(i), false, `(code = ${i})`);
            }
        });
    });
});
