# Enigma

**Note:** This is a major work in progress.

A standards-compliant, self-hosted ECMAScript parser with high focus on both performance and stability.

> e·nig·ma
>
> *(noun)* a person or thing that is mysterious, puzzling, or difficult to understand.

## Features

*Well...once it's ready, these will all be true.*

- Full support for [ECMAScript 2018](https://tc39.github.io/ecma262/) by default, including errors and edge cases.
- Emits an [ESTree-compatible](https://github.com/estree/estree) abstract syntax tree.
- Full JSX support via option.
- Full support for all stage 3 proposals via option.
- Very well tested.

## API

```js
parseModule('var hello = 1;', options={}); // module code
parseScript('var hello = 1;', options={}); // sloppy mode
```

## Options

Both methods accept the following options, none required:

* `next`: Set to `true` to enable stage 3 support.

* `ranges`: Set to `true` to append `start` and `end` offsets to each node.

* `jsx`: Set to `true` to enable JSX support.

* `onComment`: Set to an array or function to gather each comment.

    If a function is passed for this option, whenever a comment is encountered the function will be called with the following parameters:

    - `block`: `true` if the comment is a block comment, `false` if it is a line comment.
    - `text`: The contents of the comment.
    - `start`: The start offset for the comment.
    - `end`: The end offset for the comment.

    If array is passed for this option, each found comment is pushed to it as object in the following format:

    ```ts
    interface Comment {
        type: "SingleLineComment" | "MultiLineComment";
        value: string; // The contents of the comment.
        start: number; // The start offset, if `ranges: true`
        end: number; // The end offset, if `ranges: true`
        loc: SourceLocation | null;
    }
    ```

## Contributing

If you caught a bug, please feel free to report it in the issue tracker. If you feel something could've been done better, please do feel free to file a pull request with the changes.

This is linted with TSLint and tested using Mocha and Chai.

## Rationale

Existing parsers have many issues with them:

- Acorn is the most commonly used tool out there because of its support for recent ES standards, but it's slow and it often is too permissive in what it accepts. It's also a bit bloated.
- Esprima is faster than Acorn, but only recently added async function support, and it misses some edge cases.
- Babylon is highly coupled to Babel, and is comparatively very slow and buggy, failing to correctly handle even stable ECMAScript standard features.

None of these parsers would fare any chance against the official Test262 suite, and most fail a substantial number of them. Also, more and more JS tools require parsing support, and slower parsers result in slower tools. ESLint already spends a significant portion of its time parsing, often upwards of 1/4 of its time.

## License

The following license (ISC License), unless otherwise stated:

Copyright (c) 2017 and later, Isiah Meadows <me@isiahmeadows.com> and others.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
