import { JavaScriptLoader } from "bun";
import { Args } from "./shared";
export declare function defaultPlugin({ code, path }: Args): {
    loader: JavaScriptLoader;
    contents: string;
};
export declare function transpilerTS(code: string): string;
