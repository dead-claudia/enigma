// The generic should be unnecessary: https://github.com/Microsoft/TypeScript/issues/14548.
export interface GenerateOpts<T extends string> {
    eval?: boolean;
    tables?: Record<T, number[]>;
    write(str: string): void | Promise<void>;
    exports: Record<T, Array<() => number[]>>;
}

export declare function generate<T extends string>(opts: GenerateOpts<T>): Promise<void>;
