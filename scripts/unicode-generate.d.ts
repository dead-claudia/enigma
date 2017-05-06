export interface GenerateOpts {
    eval?: boolean;
    write(str: string): void | Promise<void>;
    exports: {
        [key: string]: Array<() => number[]>;
    };
}

export declare function generate(opts: GenerateOpts): Promise<void>;
