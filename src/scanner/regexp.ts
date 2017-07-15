import {Parser, Context, report, unimplemented} from "../common";
import {isIDStart, isIDContinue} from "../unicode-generated";
import * as Errors from "../errors";
import {Chars} from "../chars";
import {Token} from "../token";
import {
    advanceOne, advance, consumeOpt,
    hasNext, nextChar, nextUnicodeChar,
    fromCodePoint, toHex,
} from "./common";

function unterminated(parser: Parser): never {
    return report(parser, Errors.unterminatedRegExp());
}

// TODO:
// 1. Investigate using slices instead of `String.fromCharCode`
// 2. Do Unicode side, which validates a lot more things.
// 3. RegExp validation can compute the column from `parser.column - start + index` when updating
//    after parsing names, since newlines are disallowed.

function fail(message: string) {
    // TODO
    unimplemented();
}

// TODO: optimize this for real. This is *super* unoptimized.
function verifyRegExpPattern(
    parser: Parser,
    start: number,
    end: number,
    context: Context,
): void {
    const namedGroups = Object.create(null) as {[key: string]: boolean};
    const readGroups = Object.create(null) as {[key: string]: boolean};
    let i = start;

    // Cast required: https://github.com/Microsoft/TypeScript/issues/15835
    // let current = State.NoQuantifier as State;

    const enum TermType {
        TopLevel,
        MaybeQuantifier,
        RestrictDigit,
        NoRightBrace,
        MaybeLazy,
    }

    // TODO: return new index
    function readName(target: {[key: string]: boolean}): void {
        const name = "";
        // TODO
        if (parser.source.charCodeAt(i++) === Chars.GreaterThan) readGroups[name] = true;
        return unimplemented();
    }

    function readTerm(type: TermType, depth: number): void {
        if (i === end) {
            if (depth) return fail("unterminated group");
            return;
        }

        switch (parser.source.charCodeAt(i++)) {
            // `^`, `$`
            case Chars.Caret: case Chars.Dollar:
                return readTerm(TermType.TopLevel, depth);

            // `\`
            case Chars.Backslash: {
                if (i === end) return fail("unterminated regexp literal");
                switch (parser.source.charCodeAt(i++)) {
                    case Chars.LowerU:
                        if (i === end || toHex(parser.source.charCodeAt(i++)) >= 0) {
                            return fail("unterminated escape");
                        }
                        if (i === end || toHex(parser.source.charCodeAt(i++)) >= 0) {
                            return fail("unterminated escape");
                        }
                        // falls through
                    case Chars.LowerX:
                        if (i === end || toHex(parser.source.charCodeAt(i++)) >= 0) {
                            return fail("unterminated escape");
                        }
                        if (i === end || toHex(parser.source.charCodeAt(i++)) >= 0) {
                            return fail("unterminated escape");
                        }
                        break;

                    case Chars.LowerK:
                        if (
                            (context & Context.OptionsNext) &&
                            i !== end && parser.source.charCodeAt(i++) === Chars.LessThan
                        ) {
                            readName(readGroups);
                        }
                        // falls through
                    default:
                }
                return readTerm(TermType.MaybeQuantifier, depth);
            }

            // `(`
            case Chars.LeftParen: {
                let ch = parser.source.charCodeAt(i);

                if (ch !== Chars.QuestionMark) return readTerm(TermType.TopLevel, depth + 1);
                i++;
                ch = parser.source.charCodeAt(i++);

                if (ch === Chars.EqualSign || ch === Chars.Exclamation || ch === Chars.Colon) {
                    return readTerm(TermType.TopLevel, depth + 1);
                }

                if (ch === Chars.LessThan && (context & Context.OptionsNext) && i !== end) {
                    ch = parser.source.charCodeAt(i);
                    if (ch === Chars.EqualSign || ch === Chars.Exclamation) i++;
                    else readName(namedGroups);
                    return readTerm(TermType.TopLevel, depth + 1);
                }

                return fail("invalid group prefix");
            }

            // `)`
            case Chars.RightParen:
                if (depth === 0) return fail("no group to terminate");
                return readTerm(TermType.MaybeQuantifier, depth - 1);

            // `?`
            case Chars.QuestionMark:
                if (type === TermType.MaybeLazy) return readTerm(TermType.TopLevel, depth);
                if (type === TermType.TopLevel) return fail("nothing to repeat");
                return readTerm(TermType.MaybeLazy, depth);

            // `*`, `+`
            case Chars.Asterisk: case Chars.Plus:
                if (type === TermType.MaybeLazy) return fail("nothing to repeat");
                if (type === TermType.TopLevel) return fail("nothing to repeat");
                return readTerm(TermType.MaybeLazy, depth);

            // `}`
            case Chars.RightBrace:
                if (type === TermType.NoRightBrace) return fail("nothing to repeat");
                return readTerm(TermType.MaybeLazy, depth);

            // `{`
            case Chars.LeftBrace:
                return readTerm(TermType.RestrictDigit, depth);

            // `0`...`9`
            case Chars.Zero: case Chars.One: case Chars.Two: case Chars.Three:
            case Chars.Four: case Chars.Five: case Chars.Six: case Chars.Seven:
            case Chars.Eight: case Chars.Nine:
                if (type === TermType.RestrictDigit) return readTerm(TermType.NoRightBrace, depth);
                // falls through
            default:
                return readTerm(TermType.MaybeQuantifier, depth);
        }
    }

    readTerm(TermType.TopLevel, 0);

    for (const key of Object.keys(readGroups)) {
        if (!namedGroups[key]) fail(`unmatched group name: ${key}`);
    }
}

// TODO: optimize this for real. This is *super* unoptimized.
function verifyRegExpPatternUnicode(
    parser: Parser,
    start: number,
    end: number,
    context: Context,
): void {
    // let groups = 0;
    // let maxRef = 0;

    // TODO
    unimplemented();

    // readTerm(TermType.TopLevel, 0);
    // if (maxRef > groups) return fail("invalid backreference");
}

function isFlag(code: number) {
    return isIDContinue(code) ||
        code === Chars.Dollar ||
        code === Chars.Underscore ||
        code === Chars.ZeroWidthJoiner ||
        code === Chars.ZeroWidthNonJoiner;
}

function tryCreate(pattern: string, flags: string) {
    try {
        return new RegExp(pattern, flags);
    } catch (e) {
        return undefined;
    }
}

export function scanRegExp(parser: Parser, context: Context): Token {
    // 1. Preparse the regexp, to see what slice to parse.
    const bodyStart = parser.index;

    if (!hasNext(parser)) return unterminated(parser);

    const enum Preparse {
        Empty = 0,
        Escape = 0x1,
        Class = 0x2,
    }

    // We *know* this can't be a `*`, because comments are tested first. Thus, we just enter the
    // loop.
    let preparseState = Preparse.Empty as number;
    let ch = nextChar(parser);

    while (preparseState || ch !== Chars.Slash) {
        if (preparseState & Preparse.Escape) {
            preparseState &= ~Preparse.Escape;
        } else {
            switch (ch) {
            case Chars.Backslash: preparseState |= Preparse.Escape; break;
            case Chars.LeftBrace: preparseState |= Preparse.Class; break;
            case Chars.RightBrace: preparseState &= ~Preparse.Class; break;
            case Chars.CarriageReturn: case Chars.LineFeed:
            case Chars.LineSeparator: case Chars.ParagraphSeparator:
                return unterminated(parser);
            default: // ignore
            }
        }

        if (!hasNext(parser)) return unterminated(parser);
        advanceOne(parser);
        ch = nextChar(parser);
    }

    const bodyEnd = parser.index;

    advanceOne(parser); // `/`

    // 2. Parse the flags as normal, checking duplicates via a mask, and get them as a string.
    // Note: we can't parse the body as the `u` flag *will* change how we parse it.
    const enum Flags {
        Empty = 0,
        Global = 0x01,
        IgnoreCase = 0x02,
        Multiline = 0x04,
        Unicode = 0x08,
        Sticky = 0x10,
        DotAll = 0x20,
    }

    let mask = Flags.Empty;
    const flagsStart = parser.index;

    while (hasNext(parser)) {
        const code = nextChar(parser);
        if (!isFlag(code)) break;
        advanceOne(parser);
        switch (code) {
        case Chars.LowerG:
            if (mask & Flags.Global) report(parser, Errors.duplicateRegExpFlag("g"));
            mask |= Flags.Global;
            break;

        case Chars.LowerI:
            if (mask & Flags.IgnoreCase) report(parser, Errors.duplicateRegExpFlag("i"));
            mask |= Flags.IgnoreCase;
            break;

        case Chars.LowerM:
            if (mask & Flags.Multiline) report(parser, Errors.duplicateRegExpFlag("m"));
            mask |= Flags.Multiline;
            break;

        case Chars.LowerU:
            if (mask & Flags.Unicode) report(parser, Errors.duplicateRegExpFlag("u"));
            mask |= Flags.Unicode;
            break;

        case Chars.LowerY:
            if (mask & Flags.Sticky) report(parser, Errors.duplicateRegExpFlag("y"));
            mask |= Flags.Sticky;
            break;

        case Chars.LowerS:
            if (context & Context.OptionsNext) {
                if (mask & Flags.DotAll) report(parser, Errors.duplicateRegExpFlag("s"));
                mask |= Flags.DotAll;
                break;
            }
            // falls through

        default:
            report(parser, Errors.unknownRegExpFlagChar(
                fromCodePoint(nextUnicodeChar(parser)),
            ));
        }
    }

    const flagsEnd = parser.index;

    // 3. Verify the inner part against the actual regexp grammar.
    if (mask & Flags.Unicode) {
        verifyRegExpPatternUnicode(parser, bodyStart, bodyEnd, context);
    } else {
        verifyRegExpPattern(parser, bodyStart, bodyEnd, context);
    }

    // 4. Set the token value to the resulting pattern and flags pair.
    const pattern = parser.source.slice(bodyStart, bodyEnd);
    const flags = parser.source.slice(flagsStart, flagsEnd);

    parser.tokenRegExp = {pattern, flags};
    parser.tokenValue = tryCreate(pattern, flags);

    return Token.RegularExpression;
}
