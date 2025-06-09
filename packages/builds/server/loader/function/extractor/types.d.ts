export interface CodeFunction {
    is: Flags;
    name: string;
    index: number;
    header: string;
    content: string;
    complete: string;
    signature: string;
}
export interface Flags {
    arrow?: boolean;
    nested?: boolean;
    method?: boolean;
    default?: boolean;
    anonymous?: boolean;
    asynchronous?: boolean;
}
export declare enum Ignore {
    None = 0,
    Anonymous = 1,
    Nested = 2,
    Method = 4,
    Arrow = 8,
    Default = 16
}
