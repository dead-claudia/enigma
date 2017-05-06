import {parseScript, parseModule} from "../../src";
import {expect} from "chai";
import {n} from "../../scripts/test-util";

describe.skip("JSX", () => {
    it("should parse \"<div {...c}> {...children}{a}{...b}</div>\"", () => {
        expect(parseScript("<div {...c}> {...children}{a}{...b}</div>", {jsx: true}))
        .to.eql(n("Program", {
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
        }));
    });

    it("should parse \"<div><span><a>Foo</a></span></div>\"", () => {
        expect(parseScript(`<div>
          <span>
            <a>
              Foo
            </a>
          </span>
        </div>`, {jsx: true})).to.eql(n("Program", {
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
        expect(parseScript(`<div {...p1} x={p3} >{p2}</div>`, {jsx: true}))
        .to.eql(n("Program", {
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
        expect(parseScript(`<div x="1" />`, {jsx: true})).to.eql(n("Program", {
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
        expect(parseScript(`<div x={"1"} y='0' />`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "x",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        expression: {
                                            type: "Literal",
                                            value: "1",
                                        },
                                        type: "JSXExpressionContainer",
                                    },
                                },
                                {
                                    name: {
                                        name: "y",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "0",
                                    },
                                },
                            ],
                            name: {
                                name: "div",
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

    it("should parse \"<div n=m>{p > p}</div>\"", () => {
        expect(parseScript(`<div n='m'>{p > p}</div>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                expression: {
                                    left: {
                                        name: "p",
                                        type: "Identifier",
                                    },
                                    operator: ">",
                                    right: {
                                        name: "p",
                                        type: "Identifier",
                                    },
                                    type: "BinaryExpression",
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "n",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "m",
                                    },
                                },
                            ],
                            name: {
                                name: "div",
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

    it("should parse \"<div>  {p}    </div>\"", () => {
        expect(parseScript(`<div>  {p}    </div>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: "  ",
                            },
                            {
                                expression: {
                                    name: "p",
                                    type: "Identifier",
                                },
                                type: "JSXExpressionContainer",
                            },
                            {
                                type: "Literal",
                                value: "    ",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "div",
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

    it("should parse JS Class with JSX", () => {
        expect(parseScript(`class SomeClass {
	f() {
		<div>{() => this}</div>;

		var foo = <div a={() => this}></div>;
	}
}`, {jsx: true})).to.eql(n("Program", {
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
        expect(parseScript(`<div>{x => <div text="wat" />}</div>;`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                expression: {
                                    async: false,
                                    body: {
                                        children: [],
                                        closingElement: null,
                                        openingElement: {
                                            attributes: [
                                                {
                                                    name: {
                                                        name: "text",
                                                        type: "JSXIdentifier",
                                                    },
                                                    type: "JSXAttribute",
                                                    value: {
                                                        type: "Literal",
                                                        value: "wat",
                                                    },
                                                },
                                            ],
                                            name: {
                                                name: "div",
                                                type: "JSXIdentifier",
                                            },
                                            selfClosing: true,
                                            type: "JSXOpeningElement",
                                        },
                                        type: "JSXElement",
                                    },
                                    expression: true,
                                    generator: false,
                                    id: null,
                                    params: [
                                        {
                                            name: "x",
                                            type: "Identifier",
                                        },
                                    ],
                                    type: "ArrowFunctionExpression",
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "div",
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

    /* tslint:disable max-line-length */
    it("should parse \"var x = <div><div><span><div></div></span></div></div>;\"", () => {
        expect(parseScript(`var x = <div><div><span><div></div></span></div></div>;`, {jsx: true}))
        /* tslint:enable max-line-length */
        .to.eql({
            body: [
                {
                    declarations: [
                        {
                            id: {
                                name: "x",
                                type: "Identifier",
                            },
                            init: {
                                children: [
                                    {
                                        children: [
                                            {
                                                children: [
                                                    {
                                                        children: [],
                                                        closingElement: {
                                                            name: {
                                                                name: "div",
                                                                type: "JSXIdentifier",
                                                            },
                                                            type: "JSXClosingElement",
                                                        },
                                                        openingElement: {
                                                            attributes: [],
                                                            name: {
                                                                name: "div",
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
                                        ],
                                        closingElement: {
                                            name: {
                                                name: "div",
                                                type: "JSXIdentifier",
                                            },
                                            type: "JSXClosingElement",
                                        },
                                        openingElement: {
                                            attributes: [],
                                            name: {
                                                name: "div",
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
                                        name: "div",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXClosingElement",
                                },
                                openingElement: {
                                    attributes: [],
                                    name: {
                                        name: "div",
                                        type: "JSXIdentifier",
                                    },
                                    selfClosing: false,
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

    it("should parse \"<A.B.C.D>foo</A . B . C.D>\"", () => {
        expect(parseScript(`<A.B.C.D>foo</A . B . C.D>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: "foo",
                            },
                        ],
                        closingElement: {
                            name: {
                                object: {
                                    object: {
                                        object: {
                                            name: "A",
                                            type: "JSXIdentifier",
                                        },
                                        property: {
                                            name: "B",
                                            type: "JSXIdentifier",
                                        },
                                        type: "JSXMemberExpression",
                                    },
                                    property: {
                                        name: "C",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXMemberExpression",
                                },
                                property: {
                                    name: "D",
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
                                        object: {
                                            name: "A",
                                            type: "JSXIdentifier",
                                        },
                                        property: {
                                            name: "B",
                                            type: "JSXIdentifier",
                                        },
                                        type: "JSXMemberExpression",
                                    },
                                    property: {
                                        name: "C",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXMemberExpression",
                                },
                                property: {
                                    name: "D",
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

    it("should parse \"<test1 data-bar={32} />;\"", () => {
        expect(parseScript(`<test1 data-bar={32} />;`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "data-bar",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        expression: {
                                            type: "Literal",
                                            value: 32,
                                        },
                                        type: "JSXExpressionContainer",
                                    },
                                },
                            ],
                            name: {
                                name: "test1",
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

    it("should parse \"<test1 data-bar={\"32\"} />;\"", () => {
        expect(parseScript(`<test1 data-bar={'32'} />;`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "data-bar",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        expression: {
                                            type: "Literal",
                                            value: "32",
                                        },
                                        type: "JSXExpressionContainer",
                                    },
                                },
                            ],
                            name: {
                                name: "test1",
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

    it("should parse \"<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />;\"", () => {
        /* tslint:disable max-line-length */
        expect(parseScript(`<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />;`, {jsx: true}))
        /* tslint:enable max-line-length */
        .to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "left",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
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
                                },
                                {
                                    name: {
                                        name: "right",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        children: [
                                            {
                                                type: "Literal",
                                                value: "monkeys /> gorillas",
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
                                },
                            ],
                            name: {
                                name: "LeftRight",
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

    it("should parse \"<test1 {...x} />\"", () => {
        expect(parseScript(`<test1 {...x} />`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    argument: {
                                        name: "x",
                                        type: "Identifier",
                                    },
                                    type: "JSXSpreadAttribute",
                                },
                            ],
                            name: {
                                name: "test1",
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

    it("should parse jsx multiline comment with linebreaks", () => {
        expect(parseModule(`export default <div {...p1}>{p2}</div>;`, {jsx: true})).to.eql({
            body: [
                {
                    declaration: {
                        children: [
                            {
                                expression: {
                                    name: "p2",
                                    type: "Identifier",
                                },
                                type: "JSXExpressionContainer",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [
                                {
                                    argument: {
                                        name: "p1",
                                        type: "Identifier",
                                    },
                                    type: "JSXSpreadAttribute",
                                },
                            ],
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            selfClosing: false,
                            type: "JSXOpeningElement",
                        },
                        type: "JSXElement",
                    },
                    type: "ExportDefaultDeclaration",
                },
            ],
            sourceType: "module",
            type: "Program",
        });
    });
    it("should parse jsx multiline comment with linebreaks", () => {
        expect(parseScript(`<日本語></日本語>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: "日本語",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "日本語",
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

    it("should parse jsx multiline comment with linebreaks", () => {
        /* tslint:disable max-line-length */
        expect(parseScript(`<a b={" "} c=" " d="&amp;" e="id=1&group=2" f="&#123456789" g="&#123*;" h="&#x;" />`, {jsx: true}))
        /* tslint:enable max-line-length */
        .to.eql({
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
                                            type: "Literal",
                                            value: " ",
                                        },
                                        type: "JSXExpressionContainer",
                                    },
                                },
                                {
                                    name: {
                                        name: "c",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: " ",
                                    },
                                },
                                {
                                    name: {
                                        name: "d",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "&amp;",
                                    },
                                },
                                {
                                    name: {
                                        name: "e",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "id=1&group=2",
                                    },
                                },
                                {
                                    name: {
                                        name: "f",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "&#123456789",
                                    },
                                },
                                {
                                    name: {
                                        name: "g",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "&#123*;",
                                    },
                                },
                                {
                                    name: {
                                        name: "h",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "&#x;",
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

    it("should parse jsx multiline comment with linebreaks", () => {
        expect(parseScript(`<div>@test content</div>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: "@test content",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "div",
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

    it("should parse jsx multiline comment with linebreaks", () => {
        expect(parseScript(`<div pre="leading" pre2="attribute" {...props}></div>`, {jsx: true}))
        .to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "pre",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "leading",
                                    },
                                },
                                {
                                    name: {
                                        name: "pre2",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "attribute",
                                    },
                                },
                                {
                                    argument: {
                                        name: "props",
                                        type: "Identifier",
                                    },
                                    type: "JSXSpreadAttribute",
                                },
                            ],
                            name: {
                                name: "div",
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

    it("should parse jsx multiline comment with linebreaks", () => {
        expect(parseScript(`<a>{/* this\nis\na\nmulti-line\ncomment */}</a>`, {jsx: true})).to.eql({
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

    it("should parse jsx comment", () => {
        expect(parseScript(`
<a>{/* this is a comment */}</a>`, {jsx: true})).to.eql({
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

    it("should parse non entity decimal", () => {
        expect(parseScript(`<A>&#1f4a9;</A>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: "&#1f4a9;",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "A",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "A",
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

    it("should parse yield keyword tag\"", () => {
        expect(parseScript(`function*it(){
    yield <a></a>;
}`, {jsx: true})).to.eql({
            body: [
                {
                    async: false,
                    body: {
                        body: [
                            {
                                expression: {
                                    argument: {
                                        children: [],
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
                                    delegate: false,
                                    type: "YieldExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "it",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse function declaration with let", () => {
        expect(parseScript(`function x() {
  let x
  <div />
}`, {jsx: true})).to.eql({
            body: [
                {
                    async: false,
                    body: {
                        body: [
                            {
                                declarations: [
                                    {
                                        id: {
                                            name: "x",
                                            type: "Identifier",
                                        },
                                        init: null,
                                        type: "VariableDeclarator",
                                    },
                                ],
                                kind: "let",
                                type: "VariableDeclaration",
                            },
                            {
                                expression: {
                                    children: [],
                                    closingElement: null,
                                    openingElement: {
                                        attributes: [],
                                        name: {
                                            name: "div",
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
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "x",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<div>&nbsp;</div>\"", () => {
        expect(parseScript(`<div>&nbsp;</div>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: "&nbsp;",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "div",
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

    it("should parse \"<div pattern=\"^([\w\.\-]+\s)*[\w\.\-]+\s?$\"></div>;\"", () => {
        expect(parseScript(`<div pattern="^([\w\.\-]+\s)*[\w\.\-]+\s?$"></div>;`, {jsx: true}))
        .to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "pattern",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "^([w.-]+s)*[w.-]+s?$",
                                    },
                                },
                            ],
                            name: {
                                name: "div",
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

    it("should parse \"true ? (<div />) : <div />;\"", () => {
        expect(parseScript(`true ? (<div />) : <div />;`, {jsx: true})).to.eql({

            body: [
                {
                    expression: {
                        alternate: {
                            children: [],
                            closingElement: null,
                            openingElement: {
                                attributes: [],
                                name: {
                                    name: "div",
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
                                    name: "div",
                                    type: "JSXIdentifier",
                                },
                                selfClosing: true,
                                type: "JSXOpeningElement",
                            },
                            type: "JSXElement",
                        },
                        test: {
                            type: "Literal",
                            value: true,
                        },
                        type: "ConditionalExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"<div>/text</div\"", () => {
        expect(parseScript(`<div>/text</div>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: "/text",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "div",
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

    it("should parse selfclosing linefeed", () => {
        expect(parseScript(`<a
/>`, {jsx: true})).to.eql({
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
        expect(parseScript(`<rect option:square />`, {jsx: true})).to.eql({
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
        expect(parseScript("<a>    </a>", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: "    ",
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

    it("should parse \"<a b={x ? <c /> : <d />} />\"", () => {
        expect(parseScript("<a b={x ? <c /> : <d />} />", {jsx: true})).to.eql({
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
        expect(parseScript("<a\n/>", {jsx: true})).to.eql({
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
        expect(parseScript("<n:a n:v />", {jsx: true})).to.eql({
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

    it("should parse multiline crlf text\"", () => {
        expect(parseScript(`<em>
One
Two
Three
</em>`, {jsx: true})).to.eql({

            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: "\nOne\nTwo\nThree\n",
                            },
                        ],
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
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse multi attribute\"", () => {
        expect(parseScript(`<home xlink:type="simple" other="foo" ></home>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: "home",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: {
                                            name: "type",
                                            type: "JSXIdentifier",
                                        },
                                        namespace: {
                                            name: "xlink",
                                            type: "JSXIdentifier",
                                        },
                                        type: "JSXNamespacedName",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "simple",
                                    },
                                },
                                {
                                    name: {
                                        name: "other",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "foo",
                                    },
                                },
                            ],
                            name: {
                                name: "home",
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

    it("should parse simple namespace\"", () => {
        expect(parseScript(`<svg:path/>`, {jsx: true})).to.eql({
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
        expect(parseScript(`<svg:path></svg:path>`, {jsx: true})).to.eql({
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
        expect(parseScript(`a => <b></b>;`, {jsx: true})).to.eql({
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
        expect(parseScript(`<title>{$caption}</title>`, {jsx: true})).to.eql({
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
        expect(parseScript("<strong></strong>", {jsx: true})).to.eql({
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
        expect(parseScript("<span {... style}></span>", {jsx: true})).to.eql({
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
        expect(parseScript("<sample test=\"This is &#0169; by Joe\"></sample>", {jsx: true}))
        .to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: {
                            name: {
                                name: "sample",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "test",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "This is &#0169; by Joe",
                                    },
                                },
                            ],
                            name: {
                                name: "sample",
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

    it("should parse \"<x y=\"&#x;\" />\"", () => {
        expect(parseScript("<x y=\"&#x;\" />", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "y",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "&#x;",
                                    },
                                },
                            ],
                            name: {
                                name: "x",
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

    it("should parse \"<america state=<usa.california></usa.california> />\"", () => {
        expect(parseScript("<america state=<usa.california></usa.california> />", {jsx: true}))
        .to.eql({
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
        });
    });

    it("should parse \"<a href={link}></a>\"", () => {
        expect(parseScript("<a href={link}></a>", {jsx: true})).to.eql({
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
        expect(parseScript("<a b=\"&#X41;\"/>", {jsx: true})).to.eql({
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
                                        type: "Literal",
                                        value: "&#X41;",
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

    it("should parse \"<x y=\"&#x;\" />\"", () => {
        expect(parseScript("<x y=\"&#x;\" />", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "y",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "&#x;",
                                    },
                                },
                            ],
                            name: {
                                name: "x",
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

    it("should parse \"var el = ( <span /> )\"", () => {
        expect(parseScript(`var el = ( <span /> )`, {jsx: true})).to.eql({
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
        expect(parseScript(`function *g() { yield <h1>Hello</h1> }`, {jsx: true})).to.eql({
            body: [
                {
                    async: false,
                    body: {
                        body: [
                            {
                                expression: {
                                    argument: {
                                        children: [
                                            {
                                                type: "Literal",
                                                value: "Hello",
                                            },
                                        ],
                                        closingElement: {
                                            name: {
                                                name: "h1",
                                                type: "JSXIdentifier",
                                            },
                                            type: "JSXClosingElement",
                                        },
                                        openingElement: {
                                            attributes: [],
                                            name: {
                                                name: "h1",
                                                type: "JSXIdentifier",
                                            },
                                            selfClosing: false,
                                            type: "JSXOpeningElement",
                                        },
                                        type: "JSXElement",
                                    },
                                    delegate: false,
                                    type: "YieldExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "g",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    // TODO!! This fails because there are an issue with 'Literal' scanning. The child in
    // the middle - 'y' should have been an expression, but looks like 'y}"'. This happen
    // because the scanner does not stop where it should
    it("should parse \"<span>{x}{y}{z}</span>\"", () => {
        expect(parseScript("<span>{x}{y}{z}</span>", {jsx: true})).to.eql({
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
        expect(parseScript("<x y=\"&#;\" />", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "y",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "&#;",
                                    },
                                },
                            ],
                            name: {
                                name: "x",
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

    it("should parse \"<a href=\"/\" />\"", () => {
        expect(parseScript("<a href=\"/\" />", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "href",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "/",
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

    it("should parse \"<img alt=\"&copyr; 2016\" />\"", () => {
        expect(parseScript(`<img alt="&copyr; 2016" />`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "alt",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "&copyr; 2016",
                                    },
                                },
                            ],
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

    it("should parse attribute single quoted string\"", () => {
        expect(parseScript(`<img src='logo.png' />`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "src",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "logo.png",
                                    },
                                },
                            ],
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

    it("should parse attribute primary\"", () => {
        expect(parseScript(`<img width={320}/>`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "width",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        expression: {
                                            type: "Literal",
                                            value: 320,
                                        },
                                        type: "JSXExpressionContainer",
                                    },
                                },
                            ],
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

    it("should parse attribute null value\"", () => {
        expect(parseScript(`<input disabled />`, {jsx: true})).to.eql({
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
        expect(parseScript(`<x y="&#123abc &#123;" />`, {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [],
                        closingElement: null,
                        openingElement: {
                            attributes: [
                                {
                                    name: {
                                        name: "y",
                                        type: "JSXIdentifier",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        value: "&#123abc &#123;",
                                        type: "Literal",
                                    },
                                },
                            ],
                            name: {
                                name: "x",
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

    it("should parse attribute x\"", () => {
        expect(parseScript(`<a b="&#X41;"/>`, {jsx: true})).to.eql({
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
                                        type: "Literal",
                                        value: "&#X41;",
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

    it("should parse container numeric literal\"", () => {
        expect(parseScript(`<b>{1}</b>`, {jsx: true})).to.eql({
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
        expect(parseScript(`<adele>{/* Hello from this side */}</adele>`, {jsx: true})).to.eql({
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
        });
    });

    it("should parse empty expression container\"", () => {
        expect(parseScript(`<body>{}</body>`, {jsx: true})).to.eql({
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
        expect(parseScript(`<img/>`, {jsx: true})).to.eql({
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
        expect(parseScript(`<earth.america />`, {jsx: true})).to.eql({
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
        expect(parseScript(`function *g() { yield <h1>Hello</h1> }`, {jsx: true})).to.eql({
            body: [
                {
                    async: false,
                    body: {
                        body: [
                            {
                                expression: {
                                    argument: {
                                        children: [
                                            {
                                                type: "Literal",
                                                value: "Hello",
                                            },
                                        ],
                                        closingElement: {
                                            name: {
                                                name: "h1",
                                                type: "JSXIdentifier",
                                            },
                                            type: "JSXClosingElement",
                                        },
                                        openingElement: {
                                            attributes: [],
                                            name: {
                                                name: "h1",
                                                type: "JSXIdentifier",
                                            },
                                            selfClosing: false,
                                            type: "JSXOpeningElement",
                                        },
                                        type: "JSXElement",
                                    },
                                    delegate: false,
                                    type: "YieldExpression",
                                },
                                type: "ExpressionStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: "g",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

// TODO! This is an child issue related to scanning
    it("should parse \"<a n:foo=\"bar\"> {value} <b><c /></b></a>\"", () => {
        expect(parseScript("<a n:foo=\"bar\"> {value} <b><c /></b></a>", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: " ",
                            },
                            {
                                expression: {
                                    name: "value",
                                    type: "Identifier",
                                },
                                type: "JSXExpressionContainer",
                            },
                            {
                                type: "Literal",
                                value: " ",
                            },
                            {
                                children: [
                                    {
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
                        ],
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
                                        name: {
                                            name: "foo",
                                            type: "JSXIdentifier",
                                        },
                                        namespace: {
                                            name: "n",
                                            type: "JSXIdentifier",
                                        },
                                        type: "JSXNamespacedName",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "bar",
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

    it("should parse \"(<div />) < x;\"", () => {
        expect(parseScript("(<div />) < x;", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        left: {
                            children: [],
                            closingElement: null,
                            openingElement: {
                                attributes: [],
                                name: {
                                    name: "div",
                                    type: "JSXIdentifier",
                                },
                                selfClosing: true,
                                type: "JSXOpeningElement",
                            },
                            type: "JSXElement",
                        },
                        operator: "<",
                        right: {
                            name: "x",
                            type: "Identifier",
                        },
                        type: "BinaryExpression",
                    },
                    type: "ExpressionStatement",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"function f(...[foo]) { 1 }\"\"", () => {
        expect(parseScript(`function f(...[foo]) { 1 }`, {jsx: true})).to.eql({
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
        expect(parseScript(`<strong><em></em></strong>`, {jsx: true})).to.eql({
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
        expect(parseScript("<a.b.c></a.b.c>", {jsx: true})).to.eql({
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
        expect(parseScript("<div><br />7x invalid-js-identifier</div>", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                children: [],
                                closingElement: null,
                                openingElement: {
                                    attributes: [],
                                    name: {
                                        name: "br",
                                        type: "JSXIdentifier",
                                    },
                                    selfClosing: true,
                                    type: "JSXOpeningElement",
                                },
                                type: "JSXElement",
                            },
                            {
                                type: "Literal",
                                value: "7x invalid-js-identifier",
                            },
                        ],
                        closingElement: {
                            name: {
                                name: "div",
                                type: "JSXIdentifier",
                            },
                            type: "JSXClosingElement",
                        },
                        openingElement: {
                            attributes: [],
                            name: {
                                name: "div",
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

    it("should parse \"<a>{}</a>\"", () => {
        expect(parseScript("<a>{}</a>", {jsx: true})).to.eql({
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
        expect(parseScript("<a>{\r\n}</a>", {jsx: true})).to.eql({
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
        expect(parseScript("<a n:foo=\"bar\"> {value} <b><c /></b></a>", {jsx: true})).to.eql({
            body: [
                {
                    expression: {
                        children: [
                            {
                                type: "Literal",
                                value: " ",
                            },
                            {
                                expression: {
                                    name: "value",
                                    type: "Identifier",
                                },
                                type: "JSXExpressionContainer",
                            },
                            {
                                type: "Literal",
                                value: " ",
                            },
                            {
                                children: [
                                    {
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
                        ],
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
                                        name: {
                                            name: "foo",
                                            type: "JSXIdentifier",
                                        },
                                        namespace: {
                                            name: "n",
                                            type: "JSXIdentifier",
                                        },
                                        type: "JSXNamespacedName",
                                    },
                                    type: "JSXAttribute",
                                    value: {
                                        type: "Literal",
                                        value: "bar",
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

    it("should throw on \"<a b=: />", () => {
        expect(() => parseScript("<a b=: />", {jsx: true})).to.throw();
    });

    it("should throw on \"</>", () => {
        expect(() => parseScript("</>", {jsx: true})).to.throw();
    });

    it("should throw on \"<img src={}>", () => {
        expect(() => parseScript("<img src={}>", {jsx: true})).to.throw();
    });

    it("should throw on \"<foo.bar></foo.baz>", () => {
        expect(() => parseScript("<foo.bar></foo.baz>", {jsx: true})).to.throw();
    });

    it("should throw on \"<path></svg:path>", () => {
        expect(() => parseScript("<path></svg:path>", {jsx: true})).to.throw();
    });

    it("should throw on \"node = <strong></em>", () => {
        expect(() => parseScript("node = <strong></em>", {jsx: true})).to.throw();
    });

    it("should throw on \"<:path />", () => {
        expect(() => parseScript("<:path />", {jsx: true})).to.throw();
    });

    it("should throw on invalid JSX\"", () => {
        expect(() => parseScript("<a[foo]></a[foo]>", {jsx: true})).to.throw();
        expect(() => parseScript(`<a: />`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a:b.c></a:b.c>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a: />`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a.></a.>`, {jsx: true})).to.throw();
        expect(() => parseScript(`</>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a/!`, {jsx: true})).to.throw();
        expect(() => parseScript(`<svg: />`, {jsx: true})).to.throw();
        expect(() => parseScript(`node = <strong></em>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a>`, {jsx: true})).to.throw();
        expect(() => parseScript("<a b={}>", {jsx: true})).to.throw();
        expect(() => parseScript("var x = <div>one</div><div>two</div>;", {jsx: true})).to.throw();
        /* tslint:disable max-line-length */
        expect(() => parseScript(`var x = <div>one</div> /* intervening comment */ <div>two</div>;`, {jsx: true})).to.throw();
        /* tslint:enable max-line-length */
        expect(() => parseScript(`<a>></a>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a> ></a>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a b=<}>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a>}</a>`, {jsx: true})).to.throw();
        expect(() => parseScript(`node = <strong></em>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<a .../*hai*/asdf/>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<Foo bar=bar() />`, {jsx: true})).to.throw();
        expect(() => parseScript(`<foo bar="`, {jsx: true})).to.throw();
        expect(() => parseScript(`<\u{2F804}></\u{2F804}>`, {jsx: true})).to.throw();
        expect(() => parseScript(`<Foo></Bar>`, {jsx: true})).to.throw();
    });
});
