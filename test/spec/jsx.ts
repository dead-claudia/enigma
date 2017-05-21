import {parseScript, parseModule} from "../../src";
import {n} from "../../scripts/test-util";
import {Program} from "../../src/estree";
import * as assert from "clean-assert";

describe.skip("JSX", () => {
    it("should parse \"<div {...c}> {...children}{a}{...b}</div>\"", () => {
        assert.match(
            parseScript("<div {...c}> {...children}{a}{...b}</div>", {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [
                    n("ExpressionStatement", {expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            name: n("JSXIdentifier", {name: "div"}),
                            selfClosing: false,
                            attributes: [
                                n("JSXSpreadAttribute", {argument: n("Identifier", {name: "c"})}),
                            ],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "div"}),
                        }),
                        children: [
                            n("JSXText", {value: " "}),
                            n("JSXSpreadChild", {expression: n("Identifier", {name: "children"})}),
                            n("JSXExpressionContainer", {expression: n("Identifier", {name: "a"})}),
                            n("JSXSpreadChild", {expression: n("Identifier", {name: "b"})}),
                        ],
                    })}),
                ],
            }),
        );
    });

    it("should parse \"<div><span><a>Foo</a></span></div>\"", () => {
        assert.match(parseScript(`<div>
          <span>
            <a>
              Foo
            </a>
          </span>
        </div>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                n("ExpressionStatement", {expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        attributes: [],
                        name: n("JSXIdentifier", {name: "div"}),
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "div"}),
                    }),
                    children: [
                        n("Literal", {value: "\n          "}),
                        n("JSXElement", {
                            openingElement: n("JSXOpeningElement", {
                                selfClosing: false,
                                attributes: [],
                                name: n("JSXIdentifier", {name: "span"}),
                            }),
                            closingElement: n("JSXClosingElement", {
                                name: n("JSXIdentifier", {name: "span"}),
                            }),
                            children: [
                                n("JSXText", {value: "\n            "}),
                                n("JSXElement", {
                                    openingElement: n("JSXOpeningElement", {
                                        selfClosing: false,
                                        attributes: [],
                                        name: n("JSXIdentifier", {name: "a"}),
                                    }),
                                    closingElement: n("JSXClosingElement", {
                                        name: n("JSXIdentifier", {name: "a"}),
                                    }),
                                    children: [
                                        n("Literal", {value: "\n              Foo\n            "}),
                                    ],
                                }),
                                n("JSXText", {value: "\n          "}),
                            ],
                        }),
                        n("Literal", {value: "\n        "}),
                    ],
                })}),
            ],
        }));
    });

    it("should parse \"<div {...p1} x={p3} >{p2}</div>\"", () => {
        assert.match(parseScript(`<div {...p1} x={p3} >{p2}</div>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                n("ExpressionStatement", {expression: n("JSXElement", {
                    openingElement: n("JSXElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "div"}),
                        attributes: [
                            n("JSXSpreadAttribute", {argument: n("Identifier", {name: "p1"})}),
                            n("JSXAttribute", {
                                name: n("JSXIdentifier", {name: "x"}),
                                value: n("JSXExpressionContainer", {
                                    expression: n("Identifier", {name: "p3"}),
                                }),
                            }),
                        ],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "div"}),
                    }),
                    children: [
                        n("JSXExpressionContainer", {expression: n("Identifier", {name: "p2"})}),
                    ],
                })}),
            ],
        }));
    });

    it("should parse \"<div x=\"1\" />\"", () => {
        assert.match(parseScript(`<div x="1" />`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                n("ExpressionStatement", {expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "div"}),
                        attributes: [
                            n("JSXAttribute", {
                                name: n("JSXIdentifier", {name: "x"}),
                                value: n("Literal", {value: "1"}),
                            }),
                        ],
                    }),
                    closingElement: null,
                    children: [],
                })}),
            ],
        }));
    });

    it("should parse \"<div x={\"1\"} y=0 />\"", () => {
        assert.match(parseScript(`<div x={"1"} y='0' />`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "JSXElement",
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: true,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "x"}),
                                    value: n("JSXExpressionContainer", {
                                        expression: n("Literal", {value: "1"}),
                                    }),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "y"}),
                                    value: n("Literal", {value: "0"}),
                                }),
                            ],
                            closingElement: null,
                            children: [],
                        }),
                    },
                },
            ],
        }));
    });

    it("should parse \"<div n=m>{p > p}</div>\"", () => {
        assert.match(parseScript(`<div n='m'>{p > p}</div>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "n"}),
                                    value: n("Literal", {value: "m"}),
                                }),
                            ],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "div"}),
                        }),
                        children: [
                            n("JSXExpressionContainer", {
                                expression: n("BinaryExpression", {
                                    left: n("Identifier", {name: "p"}),
                                    operator: ">",
                                    right: n("Identifier", {name: "p"}),
                                }),
                            }),
                        ],
                    }),
                }),
            ],
        }));
    });

    it("should parse \"<div>  {p}    </div>\"", () => {
        assert.match(parseScript(`<div>  {p}    </div>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "div"}),
                        }),
                        children: [
                            n("Literal", {value: "  "}),
                            n("JSXExpressionContainer", {
                                expression: n("Identifier", {name: "p"}),
                            }),
                            n("Literal", {value: "    "}),
                        ],
                    }),
                }),
            ],
        }));
    });

    it("should parse JS Class with JSX", () => {
        assert.match(parseScript(`class SomeClass {
	f() {
		<div>{() => this}</div>;

		var foo = <div a={() => this}></div>;
	}
}`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ClassDeclaration", {
                id: n("Identifier", {name: "SomeClass"}),
                superClass: null,
                body: n("ClassBody", {body: [
                    n("MethodDefinition", {
                        computed: false,
                        key: n("Identifier", {name: "f"}),
                        kind: "method",
                        static: false,
                        value: n("FunctionExpression", {
                            id: null,
                            params: [],
                            async: false,
                            expression: false,
                            generator: false,
                            body: n("BlockStatement", {body: [
                                n("ExpressionStatement", {expression: n("JSXElement", {
                                    openingElement: n("JSXOpeningElement", {
                                        attributes: [],
                                        name: n("JSXIdentifier", {name: "div"}),
                                        selfClosing: false,
                                    }),
                                    closingElement: n("JSXClosingElement", {
                                        name: n("JSXIdentifier", {name: "div"}),
                                    }),
                                    children: [
                                        n("JSXExpressionContainer", {
                                            expression: n("ArrowFunctionExpression", {
                                                async: false,
                                                body: n("ThisExpression"),
                                                expression: true,
                                                generator: false,
                                                id: null,
                                                params: [],
                                            }),
                                        }),
                                    ],
                                })}),
                                n("VariableDeclaration", {kind: "var", declarations: [
                                    n("VariableDeclarator", {
                                        id: n("Identifier", {name: "foo"}),
                                        init: n("JSXElement", {
                                            openingElement: n("JSXOpeningElement", {
                                                selfClosing: false,
                                                name: n("JSXIdentifier", {name: "div"}),
                                                attributes: [n("JSXAttribute", {
                                                    name: n("JSXIdentifier", {name: "a"}),
                                                    value: n("JSXExpressionContainer", {
                                                        expression: n("ArrowFunctionExpression", {
                                                            id: null,
                                                            params: [],
                                                            body: n("ThisExpression"),
                                                            async: false,
                                                            expression: true,
                                                            generator: false,
                                                        }),
                                                    }),
                                                })],
                                            }),
                                            closingElement: n("JSXClosingElement", {
                                                name: n("JSXIdentifier", {name: "div"}),
                                            }),
                                            children: [],
                                        }),
                                    }),
                                ]}),
                            ]}),
                        }),
                    }),
                ]}),
            })],
        }));
    });

    it("should parse \"<div>{x => <div text=\"wat\" />}</div>;\"", () => {
        assert.match(
            parseScript(`<div>{x => <div text="wat" />}</div>;`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [
                    n("ExpressionStatement", {
                        expression: n("JSXElement", {
                            openingElement: n("JSXOpeningElement", {
                                selfClosing: false,
                                name: n("JSXIdentifier", {name: "div"}),
                                attributes: [],
                            }),
                            closingElement: n("JSXClosingElement", {
                                name: n("JSXIdentifier", {name: "div"}),
                            }),
                            children: [
                                n("JSXExpressionContainer", {
                                    expression: n("ArrowFunctionExpression", {
                                        async: false,
                                        id: null,
                                        params: [
                                            n("Identifier", {name: "x"}),
                                        ],
                                        expression: true,
                                        generator: false,
                                        body: n("JSXElement", {
                                            openingElement: n("JSXOpeningElement", {
                                                selfClosing: true,
                                                name: n("JSXIdentifier", {name: "div"}),
                                                attributes: [
                                                    n("JSXAttribute", {
                                                        name: n("JSXIdentifier", {name: "text"}),
                                                        value: n("Literal", {value: "wat"}),
                                                    }),
                                                ],
                                            }),
                                            closingElement: null,
                                            children: [],
                                        }),
                                    }),
                                }),
                            ],
                        }),
                    }),
                ],
            }),
        );
    });

    it("should parse \"var x = <div><div><span><div></div></span></div></div>;\"", () => {
        assert.match(
            parseScript(`var x = <div><div><span><div></div></span></div></div>;`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("VariableDeclaration", {
                    kind: "var",
                    declarations: [n("VariableDeclarator", {
                        id: n("Identifier", {name: "x"}),
                        init: n("JSXElement", {
                            selfClosing: false,
                            openingElement: n("JSXOpeningElement", {
                                name: n("JSXIdentifier", {name: "div"}),
                                attributes: [],
                            }),
                            closingElement: n("JSXClosingElement", {
                                name: n("JSXIdentifier", {name: "div"}),
                            }),
                            children: [n("JSXElement", {
                                selfClosing: false,
                                openingElement: n("JSXOpeningElement", {
                                    name: n("JSXIdentifier", {name: "div"}),
                                    attributes: [],
                                }),
                                closingElement: n("JSXClosingElement", {
                                    name: n("JSXIdentifier", {name: "div"}),
                                }),
                                children: [n("JSXElement", {
                                    selfClosing: false,
                                    openingElement: n("JSXOpeningElement", {
                                        name: n("JSXIdentifier", {name: "span"}),
                                        attributes: [],
                                    }),
                                    closingElement: n("JSXClosingElement", {
                                        name: n("JSXIdentifier", {name: "span"}),
                                    }),
                                    children: [n("JSXElement", {
                                        openingElement: n("JSXOpeningElement", {
                                            selfClosing: false,
                                            name: n("JSXIdentifier", {name: "div"}),
                                            attributes: [],
                                        }),
                                        closingElement: n("JSXClosingElement", {
                                            name: n("JSXIdentifier", {name: "div"}),
                                        }),
                                        children: [],
                                    })],
                                })],
                            })],
                        }),
                    })],
                })],
            }),
        );
    });

    it("should parse \"<A.B.C.D>foo</A . B . C.D>\"", () => {
        assert.match(parseScript(`<A.B.C.D>foo</A . B . C.D>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXMemberExpression", {
                            object: n("JSXMemberExpression", {
                                object: n("JSXMemberExpression", {
                                    object: n("JSXIdentifier", {name: "A"}),
                                    property: n("JSXIdentifier", {name: "B"}),
                                }),
                                property: n("JSXIdentifier", {name: "C"}),
                            }),
                            property: n("JSXIdentifier", {name: "D"}),
                        }),
                        attributes: [],
                    }),
                }),
                closingElement: n("JSXClosingElement", {
                    name: n("JSXMemberExpression", {
                        object: n("JSXMemberExpression", {
                            object: n("JSXMemberExpression", {
                                object: n("JSXIdentifier", {name: "A"}),
                                property: n("JSXIdentifier", {name: "B"}),
                            }),
                            property: n("JSXIdentifier", {name: "C"}),
                        }),
                        property: n("JSXIdentifier", {name: "D"}),
                    }),
                }),
                children: [n("Literal", {value: "foo"})],
            })],
        }));
    });

    it("should parse \"<test1 data-bar={32} />;\"", () => {
        assert.match(parseScript(`<test1 data-bar={32} />;`, {jsx: true}), {
            type: "Program",
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "test1"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "data-bar"}),
                            value: n("JSXExpressionContainer", {
                                expression: n("Literal", {value: 32}),
                            }),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        });
    });

    it("should parse \"<test1 data-bar={\"32\"} />;\"", () => {
        assert.match(parseScript(`<test1 data-bar={'32'} />;`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "test1"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "data-bar"}),
                            value: n("JSXExpressionContainer", {
                                expression: n("Literal", {value: "32"}),
                            }),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse \"<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />;\"", () => {
        assert.match(
            parseScript(`<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />;`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: true,
                            name: n("JSXIdentifier", {name: "LeftRight"}),
                            attributes: [
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "left"}),
                                    value: n("JSXElement", {
                                        openingElement: n("JSXOpeningElement", {
                                            selfClosing: true,
                                            name: n("JSXIdentifier", {name: "a"}),
                                            attributes: [],
                                        }),
                                        closingElement: null,
                                        children: [],
                                    }),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "right"}),
                                    value: n("JSXElement", {
                                        openingElement: n("JSXOpeningElement", {
                                            selfClosing: false,
                                            name: n("JSXIdentifier", {name: "b"}),
                                            attributes: [],
                                        }),
                                        closingElement: n("JSXClosingElement", {
                                            name: n("JSXIdentifier", {name: "b"}),
                                        }),
                                        children: [n("Literal", {value: "monkeys /> gorillas"})],
                                    }),
                                }),
                            ],
                        }),
                        closingElement: null,
                        children: [],
                    }),
                })],
            }),
        );
    });

    it("should parse \"<test1 {...x} />\"", () => {
        assert.match(parseScript(`<test1 {...x} />`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "test1"}),
                        attributes: [n("JSXSpreadAttribute", {
                            argument: n("Identifier", {name: "x"}),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse jsx multiline comment with linebreaks", () => {
        assert.match(
            parseModule(`export default <div {...p1}>{p2}</div>;`, {jsx: true}),
            n("Program", {
                sourceType: "module",
                body: [n("ExportDefaultDeclaration", {
                    declaration: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [n("JSXSpreadAttribute", {
                                argument: n("Identifier", {name: "p1"}),
                            })],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "div"}),
                        }),
                        children: [n("JSXExpressionContainer", {
                            expression: n("Identifier", {name: "p2"}),
                        })],
                    }),
                })],
            }),
        );
    });

    it("should parse jsx multiline comment with linebreaks", () => {
        assert.match(parseScript(`<日本語></日本語>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "日本語"}),
                        attributes: [],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "日本語"}),
                    }),
                    children: [],
                }),
            })],
        }));
    });

    it("should parse jsx multiline comment with linebreaks", () => {
        assert.match(
            parseScript(`
                <a b={" "} c=" " d="&amp;" e="id=1&group=2" f="&#123456789" g="&#123*;" h="&#x;" />
            `, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: true,
                            name: n("JSXIdentifier", {name: "a"}),
                            attributes: [
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "b"}),
                                    value: n("JSXExpressionContainer", {
                                        expression: n("Literal", {value: " "}),
                                    }),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "c"}),
                                    value: n("Literal", {value: " "}),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "d"}),
                                    value: n("Literal", {value: "&amp;"}),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "e"}),
                                    value: n("Literal", {value: "id=1&group=2"}),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "f"}),
                                    value: n("Literal", {value: "&#123456789"}),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "g"}),
                                    value: n("Literal", {value: "&#123*;"}),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "h"}),
                                    value: n("Literal", {value: "&#x;"}),
                                }),
                            ],
                        }),
                        closingElement: null,
                        children: [],
                    }),
                })],
            }),
        );
    });

    it("should parse jsx multiline comment with linebreaks", () => {
        assert.match(parseScript(`<div>@test content</div>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "div"}),
                        attributes: [],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "div"}),
                    }),
                    children: [
                        n("Literal", {value: "@test content"}),
                    ],
                }),
            })],
        }));
    });

    it("should parse jsx multiline comment with linebreaks", () => {
        assert.match(
            parseScript(`<div pre="leading" pre2="attribute" {...props}></div>`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "pre"}),
                                    value: n("Literal", {value: "leading"}),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "pre2"}),
                                    value: n("Literal", {value: "attribute"}),
                                }),
                                n("JSXSpreadAttribute", {
                                    argument: n("Identifier", {name: "props"}),
                                }),
                            ],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "div"}),
                        }),
                        children: [],
                    }),
                })],
            }),
        );
    });

    it("should parse jsx multiline comment with linebreaks", () => {
        assert.match(
            parseScript(`<a>{/* this\nis\na\nmulti-line\ncomment */}</a>`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "a"}),
                            attributes: [],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "a"}),
                        }),
                        children: [n("JSXExpressionContainer", {
                            expression: n("JSXEmptyExpression"),
                        })],
                    }),
                })],
            }),
        );
    });

    it("should parse jsx comment", () => {
        assert.match(parseScript(`<a>{/* this is a comment */}</a>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "a"}),
                        attributes: [],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "a"}),
                    }),
                    children: [n("JSXExpressionContainer", {
                        expression: n("JSXEmptyExpression"),
                    })],
                }),
            })],
        }));
    });

    it("should parse non entity decimal", () => {
        assert.match(parseScript(`<A>&#1f4a9;</A>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "A"}),
                        attributes: [],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "A"}),
                    }),
                    children: [n("Literal", {value: "&#1f4a9;"})],
                }),
            })],
        }));
    });

    it("should parse yield keyword tag\"", () => {
        assert.match(parseScript(`function*it(){
    yield <a></a>;
}`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("FunctionDeclaration", {
                async: false,
                expression: false,
                generator: true,
                id: n("Identifier", {name: "it"}),
                params: [],
                body: n("BlockStatement", {body: [n("ExpressionStatement", {
                    expression: n("YieldExpression", {
                        delegate: false,
                        argument: n("JSXElement", {
                            openingElement: n("JSXOpeningElement", {
                                selfClosing: false,
                                name: n("JSXIdentifier", {name: "a"}),
                                attributes: [],
                            }),
                            closingElement: n("JSXClosingElement", {
                                name: n("JSXIdentifier", {name: "a"}),
                            }),
                            children: [],
                        }),
                    }),
                })]}),
            })],
        }));
    });

    it("should parse function declaration with let", () => {
        assert.match(parseScript(`function x() {
  let x
  <div />
}`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                n("FunctionDeclaration", {
                    async: false,
                    expression: false,
                    generator: false,
                    id: n("Identifier", {name: "x"}),
                    params: [],
                    body: n("BlockStatement", {body: [
                        n("VariableDeclaration", {
                            declarations: [n("VariableDeclarator", {
                                kind: "let",
                                id: n("Identifier", {name: "x"}),
                                init: null,
                            })],
                        }),
                        n("ExpressionStatement", {
                            expression: n("JSXElement", {
                                openingElement: n("JSXOpeningElement", {
                                    selfClosing: true,
                                    name: n("JSXIdentifier", {name: "div"}),
                                    attributes: [],
                                }),
                                closingElement: null,
                                children: [],
                            }),
                        }),
                    ]}),
                }),
            ],
        }));
    });

    it("should parse \"<div>&nbsp;</div>\"", () => {
        assert.match(parseScript(`<div>&nbsp;</div>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "div"}),
                        attributes: [],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "div"}),
                    }),
                    children: [
                        n("Literal", {value: "&nbsp;"}),
                    ],
                }),
            })],
        }));
    });

    it("should parse \"<div pattern=\"^([\w\.\-]+\s)*[\w\.\-]+\s?$\"></div>;\"", () => {
        assert.match(
            parseScript(`<div pattern="^([\w\.\-]+\s)*[\w\.\-]+\s?$"></div>;`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [n("JSXAttribute", {
                                name: n("JSXIdentifier", {name: "pattern"}),
                                value: n("Literal", {value: "^([w.-]+s)*[w.-]+s?$"}),
                            })],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "div"}),
                        }),
                        children: [],
                    }),
                })],
            }),
        );
    });

    it("should parse \"true ? (<div />) : <div />;\"", () => {
        assert.match(parseScript(`true ? (<div />) : <div />;`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("ConditionalExpression", {
                    test: n("Literal", {value: true}),
                    consequent: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: true,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [],
                        }),
                        closingElement: null,
                        children: [],
                    }),
                    alternate: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: true,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [],
                        }),
                        closingElement: null,
                        children: [],
                    }),
                }),
            })],
        }));
    });

    it("should parse \"<div>/text</div\"", () => {
        assert.match(parseScript(`<div>/text</div>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "div"}),
                        attributes: [],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "div"}),
                    }),
                    children: [
                        n("Literal", {value: "/text"}),
                    ],
                }),
            })],
        }));
    });

    it("should parse selfclosing linefeed", () => {
        assert.match<Program>(parseScript(`<a
/>`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse null attribute value", () => {
        assert.match<Program>(parseScript(`<rect option:square />`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: {
                                            name: "square",
                                            type: "JSXIdentifier",
                                        },
                                        namespace: {
                                            name: "option",
                                            type: "JSXIdentifier",
                                        },
                                        type: "JSXNamespacedName",
                                    },
                                    type: "JSXAttribute",
                                    value: null,
                                },
                            ],
                            name: {
                                name: "rect",
                                type: "JSXIdentifier",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<a>    </a>\"", () => {
        assert.match(parseScript("<a>    </a>", {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "a"}),
                        attributes: [],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "a"}),
                    }),
                    children: [n("Literal", {value: "    "})],
                }),
            })],
        }));
    });

    it("should parse \"<a b={x ? <c /> : <d />} />\"", () => {
        assert.match<Program>(parseScript("<a b={x ? <c /> : <d />} />", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "b",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        expression: {
                                            alternate: {
                                                children: [],
                                                closingElement: null,
                                                openingElement: {
                                                    attributes: [],
                                                    name: {
                                                        name: "d",
                                                        type: "JSXIdentifier",
                                                    },
                                                    selfClosing: true,
                                                    type: "JSXOpeningElement",
                                                },
                                                type: "JSXElement",
                                            },
                                            consequent: {
                                                children: [],
                                                closingElement: null,
                                                openingElement: {
                                                    attributes: [],
                                                    name: {
                                                        name: "c",
                                                        type: "JSXIdentifier",
                                                    },
                                                    selfClosing: true,
                                                    type: "JSXOpeningElement",
                                                },
                                                type: "JSXElement",
                                            },
                                            test: {
                                                name: "x",
                                                type: "Identifier",
                                            },
                                            type: "ConditionalExpression",
                                        },
                                        type: "JSXExpressionContainer",
                                    },
                                },
                            ],
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<a\n/>\"", () => {
        assert.match<Program>(parseScript("<a\n/>", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<n:a n:v />\"", () => {
        assert.match<Program>(parseScript("<n:a n:v />", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: {
                                            name: "v",
                                            type: "JSXIdentifier",
                                        },
                                        namespace: {
                                            name: "n",
                                            type: "JSXIdentifier",
                                        },
                                        type: "JSXNamespacedName",
                                    },
                                    type: "JSXAttribute",
                                    value: null,
                                },
                            ],
                            name: {
                                name: {
                                    name: "a",
                                    type: "JSXIdentifier",
                                },
                                namespace: {
                                    name: "n",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXNamespacedName",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse multiline lf text\"", () => {
        assert.match(parseScript("<em>\nOne\nTwo\nThree\n</em>", {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: false,
                        name: n("JSXIdentifier", {name: "em"}),
                        attributes: [],
                    }),
                    closingElement: n("JSXClosingElement", {
                        name: n("JSXIdentifier", {name: "em"}),
                    }),
                    children: [n("Literal", {value: "\nOne\nTwo\nThree\n"})],
                }),
            })],
        }));
    });

    it("should parse multi attribute\"", () => {
        assert.match(
            parseScript(`<home xlink:type="simple" other="foo" ></home>`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "home"}),
                            attributes: [
                                n("JSXAttribute", {
                                    name: n("JSXNamespacedName", {
                                        name: n("JSXIdentifier", {name: "type"}),
                                        namespace: n("JSXIdentifier", {name: "xlink"}),
                                    }),
                                    value: n("Literal", {value: "simple"}),
                                }),
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "other"}),
                                    value: n("Literal", {value: "foo"}),
                                }),
                            ],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "home"}),
                        }),
                        children: [],
                    }),
                })],
            }),
        );
    });

    it("should parse simple namespace\"", () => {
        assert.match<Program>(parseScript(`<svg:path/>`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [],
                            name: {
                                name: {
                                    name: "path",
                                    type: "JSXIdentifier",
                                },
                                namespace: {
                                    name: "svg",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXNamespacedName",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse simple namespace pair\"", () => {
        assert.match<Program>(parseScript(`<svg:path></svg:path>`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: {
                                    name: "path",
                                    type: "JSXIdentifier",
                                },
                                namespace: {
                                    name: "svg",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXNamespacedName",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: {
                                    name: "path",
                                    type: "JSXIdentifier",
                                },
                                namespace: {
                                    name: "svg",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXNamespacedName",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"a => <b></b>;\"", () => {
        assert.match<Program>(parseScript(`a => <b></b>;`, {jsx: true}), {
            body: [
                {
                    expression: {
                        async: false,
                        body: {
                            children: [],
                            closingElement: {
                                name: {
                                    name: "b",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXClosingElement",
                            },
                            openingElement: {
                                attributes: [],
                                name: {
                                    name: "b",
                                    type: "JSXIdentifier",
                                },
                                selfClosing: false,
                                type: "JSXOpeningElement",
                            },
                            type: "JSXElement",
                        },
                        expression: true,
                        generator: false,
                        id: null,
                        params: [
                            {
                                name: "a",
                                type: "Identifier",
                            },
                        ],
                        type: "ArrowFunctionExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<title>{$caption}</title>\"", () => {
        assert.match<Program>(parseScript(`<title>{$caption}</title>`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [
                            {
                                expression: {
                                    name: "$caption",
                                    type: "Identifier",
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "title",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "title",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });

    });

    it("should parse \"parseScript\"", () => {
        assert.match<Program>(parseScript("<strong></strong>", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: "strong",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "strong",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<span {... style}></span>\"", () => {
        assert.match<Program>(parseScript("<span {... style}></span>", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: "span",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [
                                {
                                    argument: {
                                        name: "style",
                                        type: "Identifier",
                                    },
                                    type: "JSXSpreadAttribute",
                                },
                            ],
                            name: {
                                name: "span",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<sample test=\"This is &#0169; by Joe\"></sample>\"", () => {
        assert.match(
            parseScript("<sample test=\"This is &#0169; by Joe\"></sample>", {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "sample"}),
                            attributes: [n("JSXAttribute", {
                                name: n("JSXIdentifier", {name: "test"}),
                                value: n("Literal", {value: "This is &#0169; by Joe"}),
                            })],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "sample"}),
                        }),
                        children: [],
                    }),
                })],
            }),
        );
    });

    it("should parse \"<x y=\"&#x;\" />\"", () => {
        assert.match(parseScript("<x y=\"&#x;\" />", {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: true,
                            name: n("JSXIdentifier", {name: "x"}),
                            attributes: [
                                n("JSXAttribute", {
                                    name: n("JSXIdentifier", {name: "y"}),
                                    value: n("Literal", {value: "&#x;"}),
                                }),
                            ],
                        }),
                        closingElement: null,
                        children: [],
                    }),
                }),
            ],
        }));
    });

    it("should parse \"<america state=<usa.california></usa.california> />\"", () => {
        assert.match<Program>(
            parseScript("<america state=<usa.california></usa.california> />", {jsx: true}),
            {
                body: [
                    {
                        expression: {
                            children: [],
                            closingElement: null,
                            openingElement: {
                                attributes: [
                                    {
                                        name: {
                                            name: "state",
                                            type: "JSXIdentifier",
                                        },
                                        type: "JSXAttribute",
                                        value: {
                                            children: [],
                                            closingElement: {
                                                name: {
                                                    object: {
                                                        name: "usa",
                                                        type: "JSXIdentifier",
                                                    },
                                                    property: {
                                                        name: "california",
                                                        type: "JSXIdentifier",
                                                    },
                                                    type: "JSXMemberExpression",
                                                },
                                                type: "JSXClosingElement",
                                            },
                                            openingElement: {
                                                attributes: [],
                                                name: {
                                                    object: {
                                                        name: "usa",
                                                        type: "JSXIdentifier",
                                                    },
                                                    property: {
                                                        name: "california",
                                                        type: "JSXIdentifier",
                                                    },
                                                    type: "JSXMemberExpression",
                                                },
                                                selfClosing: false,
                                                type: "JSXOpeningElement",
                                            },
                                            type: "JSXElement",
                                        },
                                    },
                                ],
                                name: {
                                    name: "america",
                                    type: "JSXIdentifier",
                                },
                                selfClosing: true,
                                type: "JSXOpeningElement",
                            },
                            type: "JSXElement",
                        },
                        type: "ExpressionStatement",
                    },
                ],
                sourceType: "script",
                type: "Program",
            },
        );
    });

    it("should parse \"<a href={link}></a>\"", () => {
        assert.match<Program>(parseScript("<a href={link}></a>", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "href",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        expression: {
                                            name: "link",
                                            type: "Identifier",
                                        },
                                        type: "JSXExpressionContainer",
                                    },
                                },
                            ],
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<a b=\"&#X41;\"/>\"", () => {
        assert.match(parseScript("<a b=\"&#X41;\"/>", {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "a"}),
                        attributes: [
                            n("JSXAttribute", {
                                name: n("JSXIdentifier", {name: "b"}),
                                value: n("Literal", {value: "&#X41;"}),
                            }),
                        ],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse \"<x y=\"&#x;\" />\"", () => {
        assert.match(parseScript("<x y=\"&#x;\" />", {jsx: true}), n("Program", {
            sourceType: "script",
            body: [
                n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: true,
                            name: n("JSXIdentifier", {name: "x"}),
                            attributes: [n("JSXAttribute", {
                                name: n("JSXIdentifier", {name: "y"}),
                                value: n("Literal", {value: "&#x;"}),
                            })],
                        }),
                        closingElement: null,
                        children: [],
                    }),
                }),
            ],
        }));
    });

    it("should parse \"var el = ( <span /> )\"", () => {
        assert.match<Program>(parseScript(`var el = ( <span /> )`, {jsx: true}), {
            body: [
                {
                    declarations: [
                        {
                            id: {
                                name: "el",
                                type: "Identifier",
                            },
                            init: {
                                children: [],
                                closingElement: null,
                                openingElement: {
                                    attributes: [],
                                    name: {
                                        name: "span",
                                        type: "JSXIdentifier",
                                    },
                                    selfClosing: true,
                                    type: "JSXOpeningElement",
                                },
                                type: "JSXElement",
                            },
                            type: "VariableDeclarator",
                        },
                    ],
                    kind: "var",
                    type: "VariableDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"function *g() { yield <h1>Hello</h1> }\"", () => {
        assert.match(
            parseScript(`function *g() { yield <h1>Hello</h1> }`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [
                    n("FunctionDeclaration", {
                        async: false,
                        expression: false,
                        generator: true,
                        id: n("Identifier", {name: "g"}),
                        params: [],
                        body: n("BlockStatement", {
                            body: [n("ExpressionStatement", {
                                expression: n("YieldExpression", {
                                    argument: n("JSXElement", {
                                        openingElement: n("JSXOpeningElement", {
                                            selfClosing: false,
                                            name: n("JSXIdentifier", {name: "h1"}),
                                            attributes: [],
                                        }),
                                        closingElement: n("JSXClosingElement", {
                                            name: n("JSXIdentifier", {name: "h1"}),
                                        }),
                                        children: [n("Literal", {value: "Hello"})],
                                    }),
                                    delegate: false,
                                }),
                            })],
                        }),
                    }),
                ],
            }),
        );
    });

    // TODO!! This fails because there are an issue with 'Literal' scanning. The child in
    // the middle - 'y' should have been an expression, but looks like 'y}"'. This happen
    // because the scanner does not stop where it should
    it("should parse \"<span>{x}{y}{z}</span>\"", () => {
        assert.match<Program>(parseScript("<span>{x}{y}{z}</span>", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [
                            {
                                expression: {
                                    name: "x",
                                    type: "Identifier",
                                },
                                type: "JSXExpressionContainer",
                            },
                            {
                                expression: {
                                    name: "y",
                                    type: "Identifier",
                                },
                                type: "JSXExpressionContainer",
                            },
                            {
                                expression: {
                                    name: "z",
                                    type: "Identifier",
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "span",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "span",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<x y=\"&#;\" />\"", () => {
        assert.match(parseScript("<x y=\"&#;\" />", {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "x"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "y"}),
                            value: n("Literal", {value: "&#;"}),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse \"<a href=\"/\" />\"", () => {
        assert.match(parseScript("<a href=\"/\" />", {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "a"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "href"}),
                            value: n("Literal", {value: "/"}),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse \"<img alt=\"&copyr; 2016\" />\"", () => {
        assert.match(parseScript(`<img alt="&copyr; 2016" />`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "img"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "alt"}),
                            value: n("Literal", {value: "&copyr; 2016"}),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse attribute single quoted string\"", () => {
        assert.match(parseScript(`<img src='logo.png' />`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    children: [],
                    closingElement: null,
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "img"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "src"}),
                            value: n("Literal", {value: "logo.png"}),
                        })],
                    }),
                }),
            })],
        }));
    });

    it("should parse attribute primary\"", () => {
        assert.match(parseScript(`<img width={320}/>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "img"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "width"}),
                            value: n("JSXExpressionContainer", {
                                expression: n("Literal", {value: 320}),
                            }),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse attribute null value\"", () => {
        assert.match<Program>(parseScript(`<input disabled />`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "disabled",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: null,
                                },
                            ],
                            name: {
                                name: "input",
                                type: "JSXIdentifier",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse attribute non numeric entity\"", () => {
        assert.match(parseScript(`<x y="&#123abc &#123;" />`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "x"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "y"}),
                            value: n("Literal", {value: "&#123abc &#123;"}),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse attribute x\"", () => {
        assert.match(parseScript(`<a b="&#X41;"/>`, {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("JSXElement", {
                    openingElement: n("JSXOpeningElement", {
                        selfClosing: true,
                        name: n("JSXIdentifier", {name: "a"}),
                        attributes: [n("JSXAttribute", {
                            name: n("JSXIdentifier", {name: "b"}),
                            value: n("Literal", {value: "&#X41;"}),
                        })],
                    }),
                    closingElement: null,
                    children: [],
                }),
            })],
        }));
    });

    it("should parse container numeric literal\"", () => {
        assert.match<Program>(parseScript(`<b>{1}</b>`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [
                            {
                                expression: {
                                    type: "Literal",
                                    value: 1,
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "b",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "b",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse empty child comment\"", () => {
        assert.match<Program>(
            parseScript(`<adele>{/* Hello from this side */}</adele>`, {jsx: true}),
            {
                body: [
                    {
                        expression: {
                            children: [
                                {
                                    expression: {
                                        type: "JSXEmptyExpression",
                                    },
                                    type: "JSXExpressionContainer",
                                },
                            ],
                            closingElement: {
                                name: {
                                    name: "adele",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXClosingElement",
                            },
                            openingElement: {
                                attributes: [],
                                name: {
                                    name: "adele",
                                    type: "JSXIdentifier",
                                },
                                selfClosing: false,
                                type: "JSXOpeningElement",
                            },
                            type: "JSXElement",
                        },
                        type: "ExpressionStatement",
                    },
                ],
                sourceType: "script",
                type: "Program",
            },
        );
    });

    it("should parse empty expression container\"", () => {
        assert.match<Program>(parseScript(`<body>{}</body>`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [
                            {
                                expression: {
                                    type: "JSXEmptyExpression",
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "body",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "body",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<img/>\"\"", () => {
        assert.match<Program>(parseScript(`<img/>`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "img",
                                type: "JSXIdentifier",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse simple member\"", () => {
        assert.match<Program>(parseScript(`<earth.america />`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [],
                            name: {
                                object: {
                                    name: "earth",
                                    type: "JSXIdentifier",
                                },
                                property: {
                                    name: "america",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXMemberExpression",
                            },
                            selfClosing: true,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse yield jsx element\"", () => {
        assert.match(
            parseScript(`function *g() { yield <h1>Hello</h1> }`, {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("FunctionDeclaration", {
                    async: false,
                    expression: false,
                    generator: true,
                    id: n("Identifier", {name: "g"}),
                    params: [],
                    body: n("BlockStatement", {
                        body: [n("ExpressionStatement", {
                            expression: n("YieldExpression", {
                                delegate: false,
                                argument: n("JSXElement", {
                                    openingElement: n("JSXOpeningElement", {
                                        selfClosing: false,
                                        name: n("JSXIdentifier", {name: "h1"}),
                                        attributes: [],
                                    }),
                                    closingElement: n("JSXClosingElement", {
                                        name: n("JSXIdentifier", {name: "h1"}),
                                    }),
                                    children: [n("Literal", {value: "Hello"})],
                                }),
                            }),
                        })],
                    }),
                })],
            }),
        );
    });

    // TODO! This is an child issue related to scanning
    it("should parse \"<a n:foo=\"bar\"> {value} <b><c /></b></a>\"", () => {
        assert.match(
            parseScript("<a n:foo=\"bar\"> {value} <b><c /></b></a>", {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "a"}),
                            attributes: [n("JSXAttribute", {
                                name: n("JSXNamespacedName", {
                                    namespace: n("JSXIdentifier", {name: "n"}),
                                    name: n("JSXIdentifier", {name: "foo"}),
                                }),
                                value: n("Literal", {value: "bar"}),
                            })],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "a"}),
                        }),
                        children: [
                            n("Literal", {value: " "}),
                            n("JSXExpressionContainer", {
                                expression: n("Identifier", {
                                    name: "value",
                                }),
                            }),
                            n("Literal", {value: " "}),
                            n("JSXElement", {
                                openingElement: n("JSXOpeningElement", {
                                    selfClosing: false,
                                    name: n("JSXIdentifier", {name: "b"}),
                                    attributes: [],
                                }),
                                closingElement: n("JSXClosingElement", {
                                    name: n("JSXIdentifier", {name: "b"}),
                                }),
                                children: [n("JSXElement", {
                                    openingElement: n("JSXOpeningElement", {
                                        selfClosing: true,
                                        name: n("JSXIdentifier", {name: "c"}),
                                        attributes: [],
                                    }),
                                    closingElement: null,
                                    children: [],
                                })],
                            }),
                        ],
                    }),
                })],
            }),
        );
    });

    it("should parse \"(<div />) < x;\"", () => {
        assert.match(parseScript("(<div />) < x;", {jsx: true}), n("Program", {
            sourceType: "script",
            body: [n("ExpressionStatement", {
                expression: n("BinaryExpression", {
                    left: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: true,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [],
                        }),
                        closingElement: null,
                        children: [],
                    }),
                    operator: "<",
                    right: n("Identifier", {name: "x"}),
                }),
            })],
        }));
    });

    it("should parse \"function f(...[foo]) { 1 }\"\"", () => {
        assert.match<Program>(parseScript(`function f(...[foo]) { 1 }`, {jsx: true}), {
            type: "Program",
            body: [
                {
                    type: "FunctionDeclaration",
                    id: {
                        type: "Identifier",
                        name: "f",
                    },
                    params: [
                        {
                            type: "RestElement",
                            argument: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "foo",
                                    },
                                ],
                            },
                        },
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [
                            {
                                type: "ExpressionStatement",
                                expression: {
                                    type: "Literal",
                                    value: 1,
                                },
                            },
                        ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse simple nested pair\"", () => {
        assert.match<Program>(parseScript(`<strong><em></em></strong>`, {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [
                            {
                                children: [],
                                closingElement: {
                                    name: {
                                        name: "em",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXClosingElement",
                                },
                                openingElement: {
                                    attributes: [],
                                    name: {
                                        name: "em",
                                        type: "JSXIdentifier",
                                    },
                                    selfClosing: false,
                                    type: "JSXOpeningElement",
                                },
                                type: "JSXElement",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "strong",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "strong",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<a.b.c></a.b.c>\"", () => {
        assert.match<Program>(parseScript("<a.b.c></a.b.c>", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                object: {
                                    object: {
                                        name: "a",
                                        type: "JSXIdentifier",
                                    },
                                    property: {
                                        name: "b",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXMemberExpression",
                                },
                                property: {
                                    name: "c",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXMemberExpression",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                object: {
                                    object: {
                                        name: "a",
                                        type: "JSXIdentifier",
                                    },
                                    property: {
                                        name: "b",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXMemberExpression",
                                },
                                property: {
                                    name: "c",
                                    type: "JSXIdentifier",
                                },
                                type: "JSXMemberExpression",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<div><br />7x invalid-js-identifier</div>\"", () => {
        assert.match(
            parseScript("<div><br />7x invalid-js-identifier</div>", {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "div"}),
                            attributes: [],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "div"}),
                        }),
                        children: [
                            n("JSXElement", {
                                openingElement: n("JSXOpeningElement", {
                                    selfClosing: true,
                                    name: n("JSXIdentifier", {name: "br"}),
                                    attributes: [],
                                }),
                                closingElement: null,
                                children: [],
                            }),
                            n("Literal", {value: "7x invalid-js-identifier"}),
                        ],
                    }),
                })],
            }),
        );
    });

    it("should parse \"<a>{}</a>\"", () => {
        assert.match<Program>(parseScript("<a>{}</a>", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [
                            {
                                expression: {
                                    type: "JSXEmptyExpression",
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<div><br />7x invalid-js-identifier</div>\"", () => {
        assert.match<Program>(parseScript("<a>{\r\n}</a>", {jsx: true}), {
            body: [
                {
                    expression: {
                        children: [
                            {
                                expression: {
                                    type: "JSXEmptyExpression",
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "a",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<a n:foo=\"bar\"> {value} <b><c /></b></a>\"", () => {
        assert.match(
            parseScript("<a n:foo=\"bar\"> {value} <b><c /></b></a>", {jsx: true}),
            n("Program", {
                sourceType: "script",
                body: [n("ExpressionStatement", {
                    expression: n("JSXElement", {
                        openingElement: n("JSXOpeningElement", {
                            selfClosing: false,
                            name: n("JSXIdentifier", {name: "a"}),
                            attributes: [n("JSXAttribute", {
                                name: n("JSXNamespacedName", {
                                    namespace: n("JSXIdentifier", {name: "n"}),
                                    name: n("JSXIdentifier", {name: "foo"}),
                                }),
                                value: n("Literal", {value: "bar"}),
                            })],
                        }),
                        closingElement: n("JSXClosingElement", {
                            name: n("JSXIdentifier", {name: "a"}),
                        }),
                        children: [
                            n("Literal", {value: " "}),
                            n("JSXExpressionContainer", {
                                expression: n("Identifier", {name: "value"}),
                            }),
                            n("Literal", {value: " "}),
                            n("JSXElement", {
                                openingElement: n("JSXOpeningElement", {
                                    selfClosing: false,
                                    name: n("JSXIdentifier", {name: "b"}),
                                    attributes: [],
                                }),
                                closingElement: n("JSXClosingElement", {
                                    name: n("JSXIdentifier", {name: "b"}),
                                }),
                                children: [n("JSXElement", {
                                    openingElement: n("JSXOpeningElement", {
                                        selfClosing: true,
                                        name: n("JSXIdentifier", {name: "c"}),
                                        attributes: [],
                                    }),
                                    closingElement: null,
                                    children: [],
                                })],
                            }),
                        ],
                    }),
                })],
            }),
        );
    });

    it("should throw on \"<a b=: />", () => {
        assert.throws(SyntaxError, () => { parseScript("<a b=: />", {jsx: true}); });
    });

    it("should throw on \"</>", () => {
        assert.throws(SyntaxError, () => { parseScript("</>", {jsx: true}); });
    });

    it("should throw on \"<img src={}>", () => {
        assert.throws(SyntaxError, () => { parseScript("<img src={}>", {jsx: true}); });
    });

    it("should throw on \"<foo.bar></foo.baz>", () => {
        assert.throws(SyntaxError, () => { parseScript("<foo.bar></foo.baz>", {jsx: true}); });
    });

    it("should throw on \"<path></svg:path>", () => {
        assert.throws(SyntaxError, () => { parseScript("<path></svg:path>", {jsx: true}); });
    });

    it("should throw on \"node = <strong></em>", () => {
        assert.throws(SyntaxError, () => { parseScript("node = <strong></em>", {jsx: true}); });
    });

    it("should throw on \"<:path />", () => {
        assert.throws(SyntaxError, () => { parseScript("<:path />", {jsx: true}); });
    });

    it("should throw on invalid JSX\"", () => {
        assert.throws(SyntaxError, () => { parseScript("<a[foo]></a[foo]>", {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a: />`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a:b.c></a:b.c>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a: />`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a.></a.>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`</>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a/!`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<svg: />`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`node = <strong></em>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript("<a b={}>", {jsx: true}); });
        /* tslint:disable max-line-length */
        assert.throws(SyntaxError, () => { parseScript("var x = <div>one</div><div>two</div>;", {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`var x = <div>one</div> /* intervening comment */ <div>two</div>;`, {jsx: true}); });
        /* tslint:enable max-line-length */
        assert.throws(SyntaxError, () => { parseScript(`<a>></a>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a> ></a>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a b=<}>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a>}</a>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`node = <strong></em>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<a .../*hai*/asdf/>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<Foo bar=bar() />`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<foo bar="`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<\u{2F804}></\u{2F804}>`, {jsx: true}); });
        assert.throws(SyntaxError, () => { parseScript(`<Foo></Bar>`, {jsx: true}); });
    });
});
