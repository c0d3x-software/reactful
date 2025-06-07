export declare class ParseObject<T extends object = any> {
    private readonly entries;
    constructor(that: T);
    map(fn: (value: [keyof T, any], index: number) => [keyof T, any]): [keyof T, any][];
    filter(fn: (value: [keyof T, any], index: number) => boolean): [keyof T, any][];
    toObject(): {
        [k: string]: any;
    };
    toArray: () => [keyof T, any][];
}
