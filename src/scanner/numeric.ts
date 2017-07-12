import {Parser, Context, unimplemented} from "../common";
import {Token} from "../token";

// TODO
// - Split into strict/sloppy (performance)
// - Handle initial 0 and 1-9 separately

export function scanNumeric(parser: Parser, context: Context) {
    // TODO
    unimplemented();
    return Token.NumericLiteral;
}
