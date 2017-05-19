import {generate, GenerateOpts} from "../../scripts/unicode-generate";
import {expect} from "chai";

describe("(slow) scripts/unicode-generate", () => {
    const methods = {
        empty: [() => []],
        singleItem: [() => [1]],
        singleRange: [() => [1, 2, 3, 4, 5, 6]],
        multiItem: [
            () => [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16],
            () => [21, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36],
            () => [41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56],
            () => [61, 62, 63, 64, 65, 66, 71, 72, 73, 74, 75, 76],
            () => [81, 82, 83, 84, 85, 86, 91, 92, 93, 94, 95, 96],
            () => [101, 102, 103, 104, 105, 106, 111, 112, 113, 114, 115, 116],
            () => [121, 122, 123, 124, 125, 126, 131, 132, 133, 134, 135, 136],
            () => [141, 142, 143, 144, 145, 146, 151, 152, 153, 154, 155, 156],
        ],
        multiSingle: [
            () => [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
            () => [21, 23, 25, 27, 29, 31, 33, 35, 37, 39],
            () => [41, 43, 45, 47, 49, 51, 53, 55, 57, 59],
            () => [61, 63, 65, 67, 69, 71, 73, 75, 77, 79],
            () => [81, 83, 85, 87, 89, 91, 93, 95, 97, 99],
            () => [101, 103, 105, 107, 109, 111, 113, 115, 117, 119],
            () => [121, 123, 125, 127, 129, 131, 133, 135, 137, 139],
            () => [141, 143, 145, 147, 149, 151, 153, 155, 157, 159],
        ],
        multiMixed: [
            () => [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
            () => [21, 23, 25, 27, 29, 31, 33, 35, 37, 39],
            () => [41, 43, 45, 47, 49, 51, 53, 55, 57, 59],
            () => [61, 63, 65, 67, 69, 71, 73, 75, 77, 79],
            () => [81, 83, 85, 87, 89, 91, 93, 95, 97, 99],
            () => [101, 103, 105, 107, 109, 111, 113, 115, 117, 119],
            () => [121, 123, 125, 127, 129, 131, 133, 135, 137, 139],
            () => [141, 143, 145, 147, 149, 151, 153, 155, 157, 159],

            () => [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16],
            () => [21, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36],
            () => [41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56],
            () => [61, 62, 63, 64, 65, 66, 71, 72, 73, 74, 75, 76],
            () => [81, 82, 83, 84, 85, 86, 91, 92, 93, 94, 95, 96],
            () => [101, 102, 103, 104, 105, 106, 111, 112, 113, 114, 115, 116],
            () => [121, 122, 123, 124, 125, 126, 131, 132, 133, 134, 135, 136],
            () => [141, 142, 143, 144, 145, 146, 151, 152, 153, 154, 155, 156],
        ],
    };
    const tables = Object.create(null) as {
        [P in keyof typeof methods]: number[];
    };
    let mod: {
        [P in keyof typeof methods]: (code: number) => boolean;
    };

    before(async () => {
        let source = "";

        await generate({
            eval: true,
            write(str: string) { source += str; },
            tables, exports: methods,
        });

        mod = new Function(source)();
    });

    it("works with zero codes", async () => {
        expect(tables.empty).to.eql([]);
        expect(mod.empty(0)).to.equal(false, "(code = 0)");
        expect(mod.empty(1)).to.equal(false, "(code = 1)");
        expect(mod.empty(2)).to.equal(false, "(code = 2)");
        expect(mod.empty(3)).to.equal(false, "(code = 3)");
        expect(mod.empty(4)).to.equal(false, "(code = 4)");
        expect(mod.empty(5)).to.equal(false, "(code = 5)");
    });

    it("works with one code", async () => {
        expect(tables.singleItem).to.eql([-1]);
        expect(mod.singleItem(0)).to.equal(false, "(code = 0)");
        expect(mod.singleItem(1)).to.equal(true, "(code = 1)");
        expect(mod.singleItem(2)).to.equal(false, "(code = 2)");
        expect(mod.singleItem(3)).to.equal(false, "(code = 3)");
        expect(mod.singleItem(4)).to.equal(false, "(code = 4)");
        expect(mod.singleItem(5)).to.equal(false, "(code = 5)");
    });

    it("works with small data sets", async () => {
        expect(tables.singleRange).to.eql([1, 5]);
        expect(mod.singleRange(0)).to.equal(false, "(code = 0)");
        for (let i = 1; i < 7; i++) {
            expect(mod.singleRange(i)).to.equal(true, `(code = ${i})`);
        }
        expect(mod.singleRange(7)).to.equal(false, "(code = 7)");
        expect(mod.singleRange(8)).to.equal(false, "(code = 8)");
        expect(mod.singleRange(9)).to.equal(false, "(code = 9)");
        expect(mod.singleRange(10)).to.equal(false, "(code = 10)");
        expect(mod.singleRange(11)).to.equal(false, "(code = 11)");
        expect(mod.singleRange(12)).to.equal(false, "(code = 12)");
    });

    it("works with multiple ranges", async () => {
        expect(tables.multiItem).to.eql([
            1, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5,
        ]);
        expect(mod.multiItem(0)).to.equal(false, "(code = 0)");
        for (let i = 0; i < 160; i += 10) {
            for (let j = i + 1; j < i + 7; j++) {
                expect(mod.multiItem(j)).to.equal(true, `(code = ${j})`);
            }
            for (let j = i + 7; j < i + 11; j++) {
                expect(mod.multiItem(j)).to.equal(false, `(code = ${j})`);
            }
        }
        for (let i = 171; i < 181; i++) {
            expect(mod.multiItem(i)).to.equal(false, `(code = ${i})`);
        }
    });

    it("works with multiple individual values", async () => {
        expect(tables.multiSingle).to.eql([
            -1, -2, -2, -2, -2, -2, -2, -2, -2, -2,
            -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
            -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
            -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
            -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
            -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
            -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
            -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,
        ]);
        expect(mod.multiSingle(0)).to.equal(false, "(code = 0)");
        for (let i = 1; i < 160; i++) {
            expect(mod.multiSingle(i)).to.equal(i % 2 === 1, `(code = ${i})`);
        }
        expect(mod.multiSingle(160)).to.equal(false, "(code = 160)");
        expect(mod.multiSingle(161)).to.equal(false, "(code = 161)");
        expect(mod.multiSingle(162)).to.equal(false, "(code = 162)");
        expect(mod.multiSingle(163)).to.equal(false, "(code = 163)");
        expect(mod.multiSingle(164)).to.equal(false, "(code = 164)");
        expect(mod.multiSingle(165)).to.equal(false, "(code = 165)");
    });

    it("works with multiple mixed, non-unique values", async () => {
        expect(tables.multiMixed).to.eql([
            1, 6, -2, 2, 6, -2, 2, 6, -2, 2, 6, -2,
            2, 6, -2, 2, 6, -2, 2, 6, -2, 2, 6, -2,
            2, 6, -2, 2, 6, -2, 2, 6, -2, 2, 6, -2,
            2, 6, -2, 2, 6, -2, 2, 6, -2, 2, 6, -2,
        ]);
        expect(mod.multiMixed(0)).to.equal(false, "(code = 0)");
        for (let i = 0; i < 160; i += 10) {
            for (let j = i + 1; j < i + 7; j++) {
                expect(mod.multiMixed(j)).to.equal(true, `(code = ${j})`);
            }
            for (let j = i + 7; j < i + 11; j++) {
                expect(mod.multiMixed(j)).to.equal(j % 2 === 1, `(code = ${j})`);
            }
        }
        for (let i = 171; i < 181; i++) {
            expect(mod.multiMixed(i)).to.equal(false, `(code = ${i})`);
        }
    });
});
