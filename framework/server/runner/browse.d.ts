/** file list of HTML string or JSX function */
type FileList = Array<[string, string | RFC | undefined]>;
/** get routing file list from path */
export declare function folder(indexOnly: boolean, routes?: string, files?: FileList): Promise<[string, string | RFC<any>][]>;
/** getting file from path and file name */
export declare function file({ path, name }: {
    path: string;
    name: string;
}): Promise<[string, string] | [string, RFC<any>]>;
export {};
