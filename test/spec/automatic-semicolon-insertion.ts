import {parseScript, parseModule} from "../../src";
import {expect} from "chai";
import {n} from "../../scripts/test-util";

describe.skip("ASI", () => {
    describe("Script", () => {
        it("should parse `1 * {}`", () => {
            expect(parseScript(`1 * {}`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("ExpressionStatement", {expression: n("BinaryExpression", {
                        operator: "*",
                        left: n("Literal", {value: 1}),
                        right: n("ObjectExpression", {properties: []}),
                    })}),
                ],
            }));
        });

        it("should parse \"var x=0, y=2;\"", () => {
            expect(parseScript(`var x=0, y=2;`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("VariableDeclaration", {kind: "var", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: n("Literal", {value: 0}),
                        }),
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "y"}),
                            init: n("Literal", {value: 2}),
                        }),
                    ]}),
                ],
            }));
        });

        it("should parse \"throw 0\n;\"", () => {
            expect(parseScript(`for(false\n    ;;false\n) {\n  break;\n}`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("ForStatement", {
                        init: n("Literal", {value: false}),
                        test: null,
                        update: n("Literal", {value: false}),
                        body: n("BlockStatement", {body: [
                            n("BreakStatement", {label: null}),
                        ]}),
                    }),
                ],
            }));
        });

        it("should parse \"throw 0\n;\"", () => {
            expect(parseScript(`for(;\n  ;\n) {\n  break;\n}`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("ForStatement", {
                        init: null,
                        test: null,
                        update: null,
                        body: n("BlockStatement", {body: [
                            n("BreakStatement", {label: null}),
                        ]}),
                    }),
                ],
            }));
        });

        it("should parse \"var x = 1\"", () => {
            expect(parseScript(`var x =\n1`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("VariableDeclaration", {kind: "var", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: n("Literal", {value: 1}),
                        }),
                    ]}),
                ],
            }));
        });

        it("should parse \"throw 0\n;\"", () => {
            expect(parseScript(`var x\ny`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("VariableDeclaration", {kind: "var", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: null,
                        }),
                    ]}),
                    n("ExpressionStatement", {expression: n("Identifier", {name: "y"})}),
                ],
            }));
        });

        it("should parse \" ;1; ;1; ;1;;1;\"", () => {
            expect(parseScript(`;1;\n;1\n;1;\n;1`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("EmptyStatement"),
                    n("ExpressionStatement", {expression: n("Literal", {value: 1})}),
                    n("EmptyStatement"),
                    n("ExpressionStatement", {expression: n("Literal", {value: 1})}),
                    n("ExpressionStatement", {expression: n("Literal", {value: 1})}),
                    n("EmptyStatement"),
                    n("ExpressionStatement", {expression: n("Literal", {value: 1})}),
                ],
            }));
        });

        it("should parse \"var x = 1\"", () => {
            expect(parseScript(`var\nx\n=\n1`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("VariableDeclaration", {kind: "var", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: n("Literal", {value: 1}),
                        }),
                    ]}),
                ],
            }));
        });

        it("should parse \"var x = 1\"", () => {
            expect(parseScript(`var x =\n1`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("VariableDeclaration", {kind: "var", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: n("Literal", {value: 1}),
                        }),
                    ]}),
                ],
            }));
        });

        it("should parse \"do while (false)\"", () => {
            expect(parseScript(`do\n\nwhile (false)`)).to.eql({});
        });

        it("should parse \"throw 0\n;\"", () => {
            expect(parseScript(`throw 0\n;`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("ThrowStatement", {argument: n("Literal", {value: 0})}),
                ],
            }));
        });

        it("should parse \"var x /* comment */;\"", () => {
            expect(parseScript(`var x /* comment */;`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("VariableDeclaration", {kind: "var", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: null,
                        }),
                    ]}),
                ],
            }));
        });

        it("should parse \"0\n;\"", () => {
            expect(parseScript(`0\n;`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("ExpressionStatement", {expression: n("Literal", {value: 0})}),
                ],
            }));
        });

        it("should parse \"debugger\n;\"", () => {
            expect(parseScript(`debugger\n;`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("DebuggerStatement"),
                ],
            }));
        });

        it("should parse \"while(true) { break\n; }\"", () => {
            expect(parseScript(`while(true) { break\n; }`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("WhileStatement", {
                        test: n("Literal", {value: true}),
                        body: n("BlockStatement", {body: [
                            n("BreakStatement", {label: null}),
                        ]}),
                    }),
                ],
            }));
        });

        it("should parse \"if(a)b\n;else c;\"", () => {
            expect(parseScript(`var x /* comment */;`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("VariableDeclaration", {kind: "var", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: null,
                        }),
                    ]}),
                ],
            }));
        });

        it("should parse \"x: while(true) { continue x\n; }\"", () => {
            expect(parseScript(`x: while(true) { continue x\n; }`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("LabeledStatement", {
                        label: n("Identifier", {name: "x"}),
                        body: n("WhileStatement", {
                            test: n("Literal", {value: true}),
                            body: n("BlockStatement", {body: [
                                n("ContinueStatement", {label: n("Identifier", {name: "x"})}),
                            ]}),
                        }),
                    }),
                ],
            }));
        });

    });

    describe("Module", () => {
        it("should parse \"var x\n;\"", () => {
            expect(parseModule(`var x\n;`)).to.eql(n("Program", {
                sourceType: "script",
                body: [
                    n("VariableDeclaration", {kind: "var", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: null,
                        }),
                    ]}),
                ],
            }));
        });
    });
});
