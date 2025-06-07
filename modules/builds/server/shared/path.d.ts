/** class facade for IO handling */
export declare class Path implements IPathDynamic {
    path: string;
    static e2e: boolean;
    private static paths;
    private static node_modules;
    static setCwd(value: string): void;
    constructor(path: string);
    constructor(meta: ImportMeta);
    static get npm(): any;
    get back(): Path;
    get name(): string;
    get Name(): string;
    get last(): string;
    get route(): RouteString;
    static get cwd(): string;
    static get apis(): string;
    static get assets(): string;
    static get builds(): string;
    static get routes(): string;
    static get shares(): string;
    static get components(): string;
    static get directives(): string;
    static from: (directory: IDirectory) => Path;
    browser(load?: boolean): Promise<IPathBrowse[]>;
    static startup(): boolean;
    backTo: (name: string, retry?: number) => any;
    resolve(syntax: string): Path;
}
