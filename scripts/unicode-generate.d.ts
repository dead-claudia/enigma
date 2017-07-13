// The generic should be unnecessary: https://github.com/Microsoft/TypeScript/issues/14548.
export interface GenerateOpts<T extends string> {
    eval?: boolean;
    write(str: string): void | Promise<void>;
    exports: Record<T, number[][]>;
}

export declare enum DataInst {Empty, Many, Link}
export declare function generate<T extends string>(opts: GenerateOpts<T>): Promise<void>;

export interface Compressor {
    dict: number[];
    result: number[];
    size: number;
}

export declare function compressorCreate(): Compressor;
export declare function compressorSend(compressor: Compressor, code: number): void;
export declare function compressorEnd(compressor: Compressor): void;
export declare function decompress(compressed: Compressor): Uint32Array;
