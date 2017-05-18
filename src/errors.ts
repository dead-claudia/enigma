/**
 * Report an error with an appropriate index, line, column, and description string. This currently
 * throws.
 */
export function report(index: number, line: number, column: number, description: string): never {
    const error: any = new SyntaxError(
        `Line ${line}, column ${column}: ${description}`,
    );
    error.index = index;
    error.line = line;
    error.column = column;
    error.description = description;
    throw error;
}

export const adjacentJSXElements = () => (
    "Adjacent JSX elements must be wrapped in an enclosing tag"
);

export const badGetterArity = () => (
    "Getter must not have any formal parameters"
);

export const badImportCallArity = () => (
    "Dynamic import must have one specifier as an argument"
);

export const badSetterArity = () => (
    "Setter must have exactly one formal parameter"
);

export const badSetterRestParameter = () => (
    "Setter function argument must not be a rest parameter"
);

export const constructorIsAsync = () => (
    "Setter function argument must not be a rest parameter"
);

export const constructorSpecialMethod = () => (
    "Class constructor may not be an accessor"
);

export const declarationMissingInitializer = (kind: string) => (
    `Missing initializer in ${kind} declaration`
);

export const defaultRestParameter = () => (
    "Unexpected token ="
);

export const defaultRestProperty = () => (
    "Unexpected token ="
);

export const duplicateConstructor = () => (
    "A class may only have one constructor"
);

export const emptyVariableDeclList = () => (
    "Variable declaration list cannot be empty"
);

export const expectedDigits = () => (
    "Digit expected"
);

export const expectedJSXClosingTag = (name: string) => (
    `Expected corresponding JSX closing tag for ${name}`
);

export const illegalBreak = () => (
    "Illegal break statement"
);

export const illegalContinue = () => (
    "Illegal continue statement"
);

export const illegalExportDeclaration = (name: string) => (
    `Unexpected token ${name}`
);

export const illegalImportDeclaration = (name: string) => (
    `Unexpected token ${name}`
);

export const illegalReturn = () => (
    "Illegal return statement"
);

export const illegalUseStrict = () => (
    "Illegal 'use strict' directive in function with non-simple parameter list"
);

export const invalidBinaryDigit = () => (
    "Invalid binary digit"
);

export const invalidEightAndNine = () => (
    "Escapes \\8 or \\9 are not syntactically valid escapes"
);

export const invalidStringLineTerminator = () => (
    "Strings may not contain line terminators"
);

export const invalidStringOctal = () => (
    "Invalid string octal escape"
);

export const invalidStringHex = () => (
    "Invalid string hex escape"
);

export const invalidJSXAttributeValue = () => (
    "JSX value should be either an expression or a quoted JSX text"
);

export const invalidLHSInAssignment = () => (
    "Invalid left-hand side in assignment"
);

export const invalidLHSInForIn = () => (
    "Invalid left-hand side in for-in loop"
);

export const invalidLHSInForLoop = () => (
    "Invalid left-hand side in for loop"
);

export const invalidModuleSpecifier = () => (
    "Invalid module specifier"
);

export const invalidOctalDigit = () => (
    "Invalid octal digit"
);

export const invalidPatternExpr = () => (
    "Invalid expression detected in pattern"
);

export const invalidVarInitForIn = () => (
    "Invalid variable declaration in for-in statement"
);

export const invalidVarInitForOf = () => (
    "Invalid variable declaration in for-of statement"
);

export const invalidYieldDelegate = () => (
    "Invalid yield expression delegate"
);

export const letInLexicalBinding = (name: string) => (
    `${name} is disallowed as a lexically bound name`
);

export const metaNotInFunctionBody = () => (
    "new.target must be in the body of a function"
);

export const missingAsImportSpecifier = () => (
    "Missing 'as' keyword in import namespace specifier"
);

export const multipleDefaultsInSwitch = () => (
    "More than one default clause in switch statement"
);

export const newlineAfterThrow = () => (
    "Illegal newline after throw"
);

export const noAsAfterImportNamespace = () => (
    "Unexpected token"
);

export const noCatchOrFinally = () => (
    "Missing catch or finally after try"
);

export const nonEmptyJSXExpression = () => (
    "JSX attributes must only be assigned a non-empty 'expression'"
);

export const parameterAfterRestParameter = () => (
    "Rest parameter must be last formal parameter"
);

export const propertyAfterRestProperty = () => (
    "Unexpected token"
);

export const staticPrototype = () => (
    "Classes may not have static property named prototype"
);

export const strictCatchVariable = () => (
    "Catch variable may not be eval or arguments in strict mode"
);

export const strictDelete = () => (
    "Delete of an unqualified identifier in strict mode."
);

export const strictFunction = () => (
    "In strict mode code, functions can only be declared at top level or inside a block"
);

export const strictFunctionName = () => (
    "Function name may not be eval or arguments in strict mode"
);

export const strictLHSAssignment = () => (
    "Assignment to eval or arguments is not allowed in strict mode"
);

export const strictLHSPostfix = () => (
    "Postfix increment/decrement may not have eval or arguments operand in strict mode"
);

export const strictLHSPrefix = () => (
    "Prefix increment/decrement may not have eval or arguments operand in strict mode"
);

export const strictModeWith = () => (
    "Strict mode code may not include a with statement"
);

export const strictOctalEscape = () => (
    "Octal escapes are not allowed in strict mode"
);

export const strictOctalLiteral = () => (
    "Octal literals are not allowed in strict mode"
);

export const strictReservedWord = () => (
    "Use of future reserved word in strict mode"
);

export const strictVarName = (name: string) => (
    `Variable name may not be ${name} in strict mode`
);

export const unexpected = () => (
    "Unexpected token"
);

export const unexpectedChar = (ch: string) => (
    `Unexpected character ${ch}`
);

export const unexpectedEOS = () => (
    "Unexpected end of input"
);

export const unexpectedNewTarget = () => (
    "new.target expression is not allowed here"
);

export const unexpectedToken = (name: string) => (
    `Unexpected token '${name}'`
);

export const unicodeOutOfRange = () => (
    "Unicode escape code point out of range"
);

export const uninitalizedBindingPatternForInit = () => (
    "Binding pattern appears without initializer in for statement init"
);

export const unknownJSXChildKind = (kind: string) => (
    `Unknown JSX child kind ${kind}`
);

export const unterminatedComment = () => (
    "Unterminated comment"
);

export const unterminatedString = () => (
    "Unterminated string literal"
);

export const varDeclNeitherOfOrOIn = () => (
    "Variable declaration neither 'of' or 'in'"
);
