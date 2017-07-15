import {Parser, Context, unimplemented} from "../common";
import {Token} from "../token";
import {isIDStart, isIDContinue} from "../unicode-generated";

// Notes:
//
// - Check for unicode escapes via a local boolean, and validate the escaped names separately from
//   the unescaped names. That way, I'm only (unlikely) branching once.
// - Check the resulting codes for `isIDStart` and `isIDContinue` for raw characters and escapes
//   identically.
// - Investigate how to avoid string comparison for keyword checking. Complicating factors include:
//   - Suffix tree checking will have potentially poor branch prediction.
//   - String comparison could be O(mn) worst case, but won't have the JIT boilerplate.
//   - Branch prediction will suffer regardless.

export function scanKnownIdentifier(parser: Parser, context: Context): Token {
    // TODO
    return unimplemented();
}

export function scanMaybeIdentifier(parser: Parser, context: Context): Token {
    // TODO
    return unimplemented();
}
