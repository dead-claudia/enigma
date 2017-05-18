import {hasNext, scan} from "../../../src/scanner";
import {Context} from "../../../src/common";
import {create} from "../../../src/parser";
import {Token, tokenDesc} from "../../../src/token";
import {expect} from "chai";

describe("src/scanner/scan", () => {
    describe("scan()", () => {
        interface Opts {
            source: string;
            context: Context;
            token: Token;
            hasNext: boolean;
            line: number;
            column: number;
        }

        function pass(name: string, opts: Opts) {
            it(name, () => {
                const parser = create(opts.source, undefined);

                expect(scan(parser, opts.context)).to.equal(opts.token);
                expect(hasNext(parser)).to.equal(opts.hasNext);
                expect(parser.line).to.equal(opts.line);
                expect(parser.column).to.equal(opts.column);
            });
        }

        pass("scans end of source", {
            source: "",
            context: Context.Empty,
            token: Token.EndOfSource,
            hasNext: false,
            line: 1, column: 0,
        });

        const tokens: Array<[Context, Token, string]> = [
            /* Punctuators */
            [Context.Empty,      Token.Arrow,        "=>"],
            [Context.Empty,      Token.LeftParen,    "("],
            [Context.Empty,      Token.LeftBrace,    "{"],
            [Context.Empty,      Token.Period,       "."],
            [Context.Empty,      Token.Ellipsis,     "..."],
            [Context.Empty,      Token.RightBrace,   "}"],
            [Context.Empty,      Token.RightParen,   ")"],
            [Context.Empty,      Token.Semicolon,    ";"],
            [Context.Empty,      Token.Comma,        ","],
            [Context.Empty,      Token.LeftBracket,  "["],
            [Context.Empty,      Token.RightBracket, "]"],
            [Context.Empty,      Token.Colon,        ":"],
            [Context.Empty,      Token.QuestionMark, "?"],
            [Context.OptionsJSX, Token.JSXClose,     "</"],
            [Context.OptionsJSX, Token.JSXAutoClose, "/>"],

            /* Update operators */
            [Context.Empty, Token.Increment, "++"],
            [Context.Empty, Token.Decrement, "--"],

            /* Assign operators */
            [Context.Empty, Token.Assign,                  "="],
            [Context.Empty, Token.ShiftLeftAssign,         "<<="],
            [Context.Empty, Token.ShiftRightAssign,        ">>="],
            [Context.Empty, Token.LogicalShiftRightAssign, ">>>="],
            [Context.Empty, Token.ExponentiateAssign,      "**="],
            [Context.Empty, Token.AddAssign,               "+="],
            [Context.Empty, Token.SubtractAssign,          "-="],
            [Context.Empty, Token.MultiplyAssign,          "*="],
            [Context.Empty, Token.DivideAssign,            "/="],
            [Context.Empty, Token.ModuloAssign,            "%="],
            [Context.Empty, Token.BitwiseXorAssign,        "^="],
            [Context.Empty, Token.BitwiseOrAssign,         "|="],
            [Context.Empty, Token.BitwiseAndAssign,        "&="],

            /* Unary/binary operators */
            [Context.Empty, Token.Negate,             "!"],
            [Context.Empty, Token.Complement,         "~"],
            [Context.Empty, Token.Add,                "+"],
            [Context.Empty, Token.Subtract,           "-"],
            [Context.Empty, Token.Multiply,           "*"],
            [Context.Empty, Token.Modulo,             "%"],
            [Context.Empty, Token.Divide,             "/"],
            [Context.Empty, Token.Exponentiate,       "**"],
            [Context.Empty, Token.LogicalAnd,         "&&"],
            [Context.Empty, Token.LogicalOr,          "||"],
            [Context.Empty, Token.StrictEqual,        "==="],
            [Context.Empty, Token.StrictNotEqual,     "!=="],
            [Context.Empty, Token.LooseEqual,         "=="],
            [Context.Empty, Token.LooseNotEqual,      "!="],
            [Context.Empty, Token.LessThanOrEqual,    "<="],
            [Context.Empty, Token.GreaterThanOrEqual, ">="],
            [Context.Empty, Token.LessThan,           "<"],
            [Context.Empty, Token.GreaterThan,        ">"],
            [Context.Empty, Token.ShiftLeft,          "<<"],
            [Context.Empty, Token.ShiftRight,         ">>"],
            [Context.Empty, Token.LogicalShiftRight,  ">>>"],
            [Context.Empty, Token.BitwiseAnd,         "&"],
            [Context.Empty, Token.BitwiseOr,          "|"],
            [Context.Empty, Token.BitwiseXor,         "^"],
        ];

        for (const [ctx, token, op] of tokens) {
            it(`scans '${op}' at the end`, () => {
                const parser = create(op, undefined);
                const found = scan(parser, ctx);

                expect(found).to.equal(token, `'${tokenDesc(found)}' === '${tokenDesc(token)}'`);
                expect(hasNext(parser)).to.equal(false);
                expect(parser.line).to.equal(1);
                expect(parser.column).to.equal(op.length);
            });

            it(`scans '${op}' with more to go`, () => {
                const parser = create(`${op} rest`, undefined);
                const found = scan(parser, ctx);

                expect(found).to.equal(token, `'${tokenDesc(found)}' === '${tokenDesc(token)}'`);
                expect(hasNext(parser)).to.equal(true);
                expect(parser.line).to.equal(1);
                expect(parser.column).to.equal(op.length);
            });
        }

        // TODO
    });
});
