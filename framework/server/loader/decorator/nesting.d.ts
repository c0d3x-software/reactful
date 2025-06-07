import { ExpressionRef, FunctionRef } from "./types";
type Fs = FunctionRef[];
type Ds = ExpressionRef[];
export declare function notAllowNestedDecorator(path: string, functions: Fs, decorators: Ds): number;
export {};
