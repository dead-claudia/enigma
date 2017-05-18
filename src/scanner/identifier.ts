import {Parser, Context, unimplemented} from "../common";
import {Token} from "../token";
import {isIDStart, isIDContinue} from "../unicode-generated";

// Notes:
//
// - Check for unicode escapes via a local boolean, and validate the escaped names separately from
//   the unescaped names. That way, I'm only (unlikely) branching once.
// - Check the resulting codes for `isIDStart` and `isIDContinue` for raw characters and escapes
//   identically.

export function scanKnownIdentifier(parser: Parser, context: Context): Token {
    // TODO
    return unimplemented();
}

export function scanMaybeIdentifier(parser: Parser, context: Context): Token {
    // TODO
    return unimplemented();
}
