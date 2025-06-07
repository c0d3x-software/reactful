import { FunctionRef } from './decorator/types';
import '../../kernel';
export type Args = {
    path: `file://${string}`;
    code: string;
};
export declare const historical: string[];
export declare const cleanCode: (code: any) => any;
export declare function getModuleFunctions({ code, path }: Args): FunctionRef[];
