import {parseScript, parseModule} from "../../../src";
import {n} from "../../../scripts/test-util";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Declarations - `const`", () => {
    it("should throw on invalid \"x; const x = 1;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`x; const x = 1;`));
    });

    it("should throw on invalid \"const [...[ x ] = []] = [];\" in module code", () => {
        assert.throws(SyntaxError, () => parseModule(`const [...[ x ] = []] = [];;`));
    });

    it("should throw on invalid \"const [...[ x ] = []] = [];\"", () => {
        assert.throws(SyntaxError, () => parseScript(`const [...[ x ] = []] = [];;`));
    });

    it("should throw on invalid \"const x = 0,\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const x = 0,`));
    });

    it("should throw on invalid \"const x = 0, y = 1,;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const x = 0, y = 1,;`));
    });

    it("should throw on invalid \"const x = 0, y = 1,\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const x = 0 = 1,`));
    });

    it("should throw on invalid \"const x = 0,\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const x = 0,`));
    });

    it("should throw on invalid \"const x = 0,\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const x = 0,`));
    });

    it("should throw on invalid \"const x = 12, y;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const x = 12, y;`));
    });

    it("should throw on invalid \"const x, y = 12;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const x, y = 12;`));
    });

    it("should throw on invalid \"const x, y = 12;\"", () => {
        assert.throws(SyntaxError, () => parseScript(`const x, y = 12;`));
    });

    it("should throw on invalid \"const x;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const x;`));
    });

    it("should throw on invalid \"if(true) const a = 1;\"", () => {
        assert.throws(SyntaxError, () => parseModule(`if(true) const a = 1;`));
    });

    it("should throw on invalid \"const\"", () => {
        assert.throws(SyntaxError, () => parseModule(`const`));
    });

    it("should throw on invalid const const\"", () => {
        assert.throws(SyntaxError, () => parseModule(`"const const;`));
    });

    it("should throw on invalid const const\"", () => {
        assert.throws(SyntaxError, () => parseModule(`"const const;`));
    });

    it("should throw on invalid const let\"", () => {
        assert.throws(SyntaxError, () => parseScript(`"const let`));
    });

    it("should throw on invalid const.const\"", () => {
        assert.throws(SyntaxError, () => parseScript(`"const.const`));
    });

    it("should throw on invalid const var\"", () => {
        assert.throws(SyntaxError, () => parseModule(`"const var`));
    });

    it("should throw on invalid const let\"", () => {
        assert.throws(SyntaxError, () => parseModule(`"const let`));
    });

    it("should throw on \"const x = 0,\"", () => {
        assert.throws(SyntaxError, () => parseScript(`const x = 0,`));
    });

    it("should throw on \"const x = 0, y = 1,;\"", () => {
        assert.throws(SyntaxError, () => parseScript(`const x = 0, y = 1,;`));
    });

    it("should throw on \"\"use strict\"; const const = 1;\"", () => {
        assert.throws(SyntaxError, () => parseScript(`"use strict"; const const = 1;`));
    });

    it("should throw on invalid strict const const\"", () => {
        assert.throws(SyntaxError, () => parseModule(`"use strict"; const const = 1;`));
    });

    it("should throw on \"while(true) const a\"", () => {
        assert.throws(SyntaxError, () => parseScript(`while(true) const a`));
    });

    it("should throw on \"while(true) const a\"", () => {
        assert.throws(SyntaxError, () => parseScript(`with(true) const a`));
    });

    it("should throw on \"a: const a\"", () => {
        assert.throws(SyntaxError, () => parseScript(`a: const a`));
    });

    it("should parse \"const x = 42\"", () => {
        assert.match(parseScript(`const x = 42`), n("Program", {
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
        assert.match(parseScript(`{ const x = 0 }`), n("Program", {
            sourceType: "script",
            body: [n("BlockStatement", {body: [
                n("VariableDeclaration", {declarations: [
                    n("VariableDeclarator", {
                        id: n("Identifier", {name: "x"}),
                        init: n("Literal", {value: 0}),
                    }),
                ]}),
            ]})],
        }));
    });

    it("should parse \"{ const x = 0, y = 1, z = 2 }\"", () => {
        assert.match(parseScript(`{ const x = 0, y = 1, z = 2 }`), n("Program", {
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
        assert.match(parseScript(`var static;`), n("Program", {
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
        assert.match(parseScript(`{ const x = 42 }`), n("Program", {
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
        assert.match(parseScript(`const [x, y, z] = [1, 2, 3];`), n("Program", {
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
        assert.match(parseScript(`const [[...x] = values] = [];`), n("Program", {
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
        assert.match(parseScript(`const [[x]] = [null];`), n("Program", {
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
        assert.match<Program>(parseScript(`const [_, x] = [];`), {
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
        assert.match(
            parseScript(`const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }];`),
            /* tslint:enable max-line-length */
            n("Program", {
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
            }),
        );
    });

    it("should parse \"const [,] = g();\"", () => {
        assert.match(parseScript(`const [,] = g();`), n("Program", {
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
        assert.match(parseScript(`const [...[...x]] = values;`), n("Program", {
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
        assert.match(parseScript(`const { x: y = 33 } = { };`), n("Program", {
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
        assert.match(parseScript(`const { x: y } = { x: 23 };`), n("Program", {
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
        assert.match(parseScript(`const arrow = () => {};`), n("Program", {
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
        assert.match(parseScript(`const xGen = function* x() {};`), n("Program", {
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
        assert.match(parseScript(`const gen = function*() {};`), n("Program", {
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
        assert.match(
            parseScript(`const {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};`),
            n("Program", {
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
            }),
        );
    });

    it("should parse \"{ const x = 14, y = 3, z = 1977 }\"", () => {
        assert.match(parseScript(`{ const x = 14, y = 3, z = 1977 }`), n("Program", {
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
