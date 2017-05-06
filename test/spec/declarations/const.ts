import {parseScript, parseModule} from "../../../src";
import {expect} from "chai";
import {n} from "../../../scripts/test-util";

describe.skip("Declarations - `const`", () => {
    it("should throw on invalid \"x; const x = 1;\"", () => {
        expect(() => parseModule(`x; const x = 1;`)).to.throw();
    });

    it("should throw on invalid \"const [...[ x ] = []] = [];\" in module code", () => {
        expect(() => parseModule(`const [...[ x ] = []] = [];;`)).to.throw();
    });

    it("should throw on invalid \"const [...[ x ] = []] = [];\"", () => {
        expect(() => parseScript(`const [...[ x ] = []] = [];;`)).to.throw();
    });

    it("should throw on invalid \"const x = 0,\"", () => {
        expect(() => parseModule(`const x = 0,`)).to.throw();
    });

    it("should throw on invalid \"const x = 0, y = 1,;\"", () => {
        expect(() => parseModule(`const x = 0, y = 1,;`)).to.throw();
    });

    it("should throw on invalid \"const x = 0, y = 1,\"", () => {
        expect(() => parseModule(`const x = 0 = 1,`)).to.throw();
    });

    it("should throw on invalid \"const x = 0,\"", () => {
        expect(() => parseModule(`const x = 0,`)).to.throw();
    });

    it("should throw on invalid \"const x = 0,\"", () => {
        expect(() => parseModule(`const x = 0,`)).to.throw();
    });

    it("should throw on invalid \"const x = 12, y;\"", () => {
        expect(() => parseModule(`const x = 12, y;`)).to.throw();
    });

    it("should throw on invalid \"const x, y = 12;\"", () => {
        expect(() => parseModule(`const x, y = 12;`)).to.throw();
    });

    it("should throw on invalid \"const x, y = 12;\"", () => {
        expect(() => parseScript(`const x, y = 12;`)).to.throw();
    });

    it("should throw on invalid \"const x;\"", () => {
        expect(() => parseModule(`const x;`)).to.throw();
    });

    it("should throw on invalid \"if(true) const a = 1;\"", () => {
        expect(() => parseModule(`if(true) const a = 1;`)).to.throw();
    });

    it("should throw on invalid \"const\"", () => {
        expect(() => parseModule(`const`)).to.throw();
    });

    it("should throw on invalid const const\"", () => {
        expect(() => parseModule(`"const const;`)).to.throw();
    });

    it("should throw on invalid const const\"", () => {
        expect(() => parseModule(`"const const;`)).to.throw();
    });

    it("should throw on invalid const let\"", () => {
        expect(() => parseScript(`"const let`)).to.throw();
    });

    it("should throw on invalid const.const\"", () => {
        expect(() => parseScript(`"const.const`)).to.throw();
    });

    it("should throw on invalid const var\"", () => {
        expect(() => parseModule(`"const var`)).to.throw();
    });

    it("should throw on invalid const let\"", () => {
        expect(() => parseModule(`"const let`)).to.throw();
    });

    it("should throw on \"const x = 0,\"", () => {
        expect(() => parseScript(`const x = 0,`)).to.throw();
    });

    it("should throw on \"const x = 0, y = 1,;\"", () => {
        expect(() => parseScript(`const x = 0, y = 1,;`)).to.throw();
    });

    it("should throw on \"\"use strict\"; const const = 1;\"", () => {
        expect(() => parseScript(`"use strict"; const const = 1;`)).to.throw();
    });

    it("should throw on invalid strict const const\"", () => {
        expect(() => parseModule(`"use strict"; const const = 1;`)).to.throw();
    });

    it("should throw on \"while(true) const a\"", () => {
        expect(() => parseScript(`while(true) const a`)).to.throw();
    });

    it("should throw on \"while(true) const a\"", () => {
        expect(() => parseScript(`with(true) const a`)).to.throw();
    });

    it("should throw on \"a: const a\"", () => {
        expect(() => parseScript(`a: const a`)).to.throw();
    });

    it("should parse \"const x = 42\"", () => {
        expect(parseScript(`const x = 42`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("Identifier", {name: "x"}),
                        init: n("Literal", {value: 42}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"{ const x = 0 }", () => {
        expect(parseScript(`{ const x = 0 }`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("BlockStatement", {body: [
                    n("VariableDeclaration", {declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: n("Literal", 0),
                        }),
                    ]}),
                ]}),
            ],
        }));
    });

    it("should parse \"{ const x = 0, y = 1, z = 2 }\"", () => {
        expect(parseScript(`{ const x = 0, y = 1, z = 2 }`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("BlockStatement", {body: [
                    n("VariableDeclaration", {kind: "const", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: n("Literal", {value: 0}),
                        }),
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "y"}),
                            init: n("Literal", {value: 1}),
                        }),
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "z"}),
                            init: n("Literal", {value:  2}),
                        }),
                    ]}),
                ]}),
            ],
        }));
    });

    it("should parse \"var static;\"", () => {
        expect(parseScript(`var static;`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "var", declarations: [
                    n("VariableDeclarator", {
                        id: n("Identifier", {name: "static"}),
                        init: null,
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"{ const x = 42 }\"", () => {
        expect(parseScript(`{ const x = 42 }`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("BlockStatement", {body: [
                    n("VariableDeclaration", {kind: "const", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: n("Literal", {value: 42}),
                        }),
                    ]}),
                ]}),
            ],
        }));
    });

    it("should parse \"const [x, y, z] = [1, 2, 3];\"", () => {
        expect(parseScript(`const [x, y, z] = [1, 2, 3];`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ArrayPattern", {elements: [
                            n("Identifier", {name: "x"}),
                            n("Identifier", {name: "y"}),
                            n("Identifier", {name: "z"}),
                        ]}),
                        init: n("ArrayExpression", {elements: [
                            n("Literal", {value: 1}),
                            n("Literal", {value: 2}),
                            n("Literal", {value: 3}),
                        ]}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const [[...x] = values] = [];\"", () => {
        expect(parseScript(`const [[...x] = values] = [];`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ArrayPattern", {elements: [
                            n("AssignmentPattern", {
                                left: n("ArrayPattern", {elements: [
                                    n("RestElement", {argument: n("Identifier", {name: "x"})}),
                                ]}),
                                right: n("Identifier", {name: "values"}),
                            }),
                        ]}),
                        init: n("ArrayExpression", {elements: []}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const [[x]] = [null];\"", () => {
        expect(parseScript(`const [[x]] = [null];`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ArrayPattern", {elements: [
                            n("ArrayPattern", {elements: [
                                n("Identifier", {name: "x"}),
                            ]}),
                        ]}),
                        init: n("ArrayExpression", {elements: [
                            n("Literal", {value: null}),
                        ]}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const [_, x] = [];\"", () => {
        expect(parseScript(`const [_, x] = [];`)).to.eql({
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "ArrayPattern",
                                elements: [
                                    {
                                        type: "Identifier",
                                        name: "_",
                                    },
                                    {
                                        type: "Identifier",
                                        name: "x",
                                    },
                                ],
                            },
                            init: {
                                type: "ArrayExpression",
                                elements: [],
                            },
                        },
                    ],
                    kind: "const",
                },
            ],
            sourceType: "script",
        });
    });

    /* tslint:disable max-line-length */
    it("should parse \"const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }];\"", () => {
        expect(parseScript(`const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }];`))
        /* tslint:enable max-line-length */
        .to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ArrayPattern", {elements: [
                            n("AssignmentPattern", {
                                left: n("ObjectPattern", {properties: [
                                    n("Property", {
                                        key: n("Identifier", {name: "u"}),
                                        computed: false,
                                        value: n("Identifier", {name: "v"}),
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    }),
                                    n("Property", {
                                        key: n("Identifier", {name: "w"}),
                                        computed: false,
                                        value: n("Identifier", {name: "x"}),
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    }),
                                    n("Property", {
                                        key: n("Identifier", {name: "y"}),
                                        computed: false,
                                        value: n("Identifier", {name: "z"}),
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    }),
                                ]}),
                                right: n("ObjectExpression", {properties: [
                                    n("Property", {
                                        key: n("Identifier", {name: "u"}),
                                        computed: false,
                                        value: n("Literal", {value: 444}),
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    }),
                                    n("Property", {
                                        key: n("Identifier", {name: "w"}),
                                        computed: false,
                                        value: n("Literal", {value: 555}),
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    }),
                                    n("Property", {
                                        key: n("Identifier", {name: "y"}),
                                        computed: false,
                                        value: n("Literal", {value: 666}),
                                        kind: "init",
                                        method: false,
                                        shorthand: false,
                                    }),
                                ]}),
                            }),
                        ]}),
                        init: n("ArrayExpression", {elements: [
                            n("ObjectExpression", {properties: [
                                n("Property", {
                                    key: n("Identifier", {name: "u"}),
                                    computed: false,
                                    value: n("Literal", {value: 777}),
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                }),
                                n("Property", {
                                    key: n("Identifier", {name: "w"}),
                                    computed: false,
                                    value: n("Literal", {value: 888}),
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                }),
                                n("Property", {
                                    key: n("Identifier", {name: "y"}),
                                    computed: false,
                                    value: n("Literal", {value: 999}),
                                    kind: "init",
                                    method: false,
                                    shorthand: false,
                                }),
                            ]}),
                        ]}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const [,] = g();\"", () => {
        expect(parseScript(`const [,] = g();`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ArrayPattern", {elements: [null]}),
                        init: n("CallExpression", {
                            callee: n("Identifier", {name: "g"}),
                            arguments: [],
                        }),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const [...[...x]] = values;\"", () => {
        expect(parseScript(`const [...[...x]] = values;`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ArrayPattern", {elements: [
                            n("RestElement", {argument: n("ArrayPattern", {elements: [
                                n("RestElement", {argument: n("Identifier", {name: "x"})}),
                            ]})}),
                        ]}),
                        init: n("Identifier", {name: "values"}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const { x: y = 33 } = { };\"", () => {
        expect(parseScript(`const { x: y = 33 } = { };`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ObjectPattern", {properties: [
                            n("Property", {
                                key: n("Identifier", {name: "x"}),
                                computed: false,
                                value: n("AssignmentPattern", {
                                    left: n("Identifier", {name: "y"}),
                                    right: n("Literal", {value: 33}),
                                }),
                                kind: "init",
                                method: false,
                                shorthand: false,
                            }),
                        ]}),
                        init: n("ObjectExpression", {properties: []}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const { x: y } = { x: 23 };\"", () => {
        expect(parseScript(`const { x: y } = { x: 23 };`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ObjectPattern", {properties: [
                            n("Property", {
                                key: n("Identifier", {name: "x"}),
                                computed: false,
                                value: n("AssignmentPattern", {
                                    left: n("Identifier", {name: "y"}),
                                    right: n("Literal", {value: 33}),
                                }),
                                kind: "init",
                                method: false,
                                shorthand: false,
                            }),
                        ]}),
                        init: n("ObjectExpression", {properties: [
                            n("Property", {
                                key: n("Identifier", {name: "x"}),
                                computed: false,
                                value: n("Literal", {value: 23}),
                                kind: "init",
                                method: false,
                                shorthand: false,
                            }),
                        ]}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const arrow = () => {};\"", () => {
        expect(parseScript(`const arrow = () => {};`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("Identifier", {name: "arrow"}),
                        init: n("ArrowFunctionExpression", {
                            id: null,
                            params: [],
                            body: n("BlockStatement", {body: []}),
                            generator: false,
                            expression: false,
                            async: false,
                        }),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const xGen = function* x() {};\"", () => {
        expect(parseScript(`const xGen = function* x() {};`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("Identifier", {name: "xGen"}),
                        init: n("FunctionExpression", {
                            id: n("Identifier", {name: "x"}),
                            params: [],
                            body: n("BlockStatement", {body: []}),
                            generator: true,
                            expression: false,
                            async: false,
                        }),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const gen = function*() {};\"", () => {
        expect(parseScript(`const gen = function*() {};`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("Identifier", {name: "gen"}),
                        init: n("FunctionExpression", {
                            id: null,
                            params: [],
                            body: n("BlockStatement", {body: []}),
                            generator: true,
                            expression: false,
                            async: false,
                        }),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"const {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};\"", () => {
        expect(parseScript(`const {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};`))
        .to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("VariableDeclaration", {kind: "const", declarations: [
                    n("VariableDeclarator", {
                        id: n("ObjectPattern", {properties: [
                            n("Property", {
                                key: n("Identifier", {name: "a"}),
                                computed: false,
                                value: n("Identifier", {name: "a"}),
                                kind: "init",
                                method: false,
                                shorthand: true,
                            }),
                            n("Property", {
                                key: n("Identifier", {name: "b"}),
                                computed: false,
                                value: n("Identifier", {name: "b"}),
                                kind: "init",
                                method: false,
                                shorthand: true,
                            }),
                            n("RestElement", {argument: n("Identifier", {name: "rest"})}),
                        ]}),
                        init: n("ObjectExpression", {properties: [
                            n("Property", {
                                key: n("Identifier", {name: "x"}),
                                computed: false,
                                value: n("Literal", {value: 1}),
                                kind: "init",
                                method: false,
                                shorthand: false,
                            }),
                            n("Property", {
                                key: n("Identifier", {name: "y"}),
                                computed: false,
                                value: n("Literal", {value: 2}),
                                kind: "init",
                                method: false,
                                shorthand: false,
                            }),
                            n("Property", {
                                key: n("Identifier", {name: "a"}),
                                computed: false,
                                value: n("Literal", {value: 5}),
                                kind: "init",
                                method: false,
                                shorthand: false,
                            }),
                            n("Property", {
                                key: n("Identifier", {name: "b"}),
                                computed: false,
                                value: n("Literal", {value: 3}),
                                kind: "init",
                                method: false,
                                shorthand: false,
                            }),
                        ]}),
                    }),
                ]}),
            ],
        }));
    });

    it("should parse \"{ const x = 14, y = 3, z = 1977 }\"", () => {
        expect(parseScript(`{ const x = 14, y = 3, z = 1977 }`)).to.eql(n("Program", {
            sourceType: "script",
            body: [
                n("BlockStatement", {body: [
                    n("VariableDeclaration", {kind: "const", declarations: [
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "x"}),
                            init: n("Literal", {value: 14}),
                        }),
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "y"}),
                            init: n("Literal", {value: 3}),
                        }),
                        n("VariableDeclarator", {
                            id: n("Identifier", {name: "z"}),
                            init: n("Literal", {value: 1977}),
                        }),
                    ]}),
                ]}),
            ],
        }));
    });
});
