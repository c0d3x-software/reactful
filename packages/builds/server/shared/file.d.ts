import { BunFile } from 'bun';
import { IFile } from './file.d';
export declare class File implements IFile {
    readonly blob: BunFile;
    readonly mime: string;
    readonly path: string;
    readonly size: number;
    readonly name: string;
    get href(): string;
    constructor(path: string);
    exists(): Promise<boolean>;
    save(text: string): Promise<number>;
    load(error?: string, decode?: boolean): Promise<string>;
}
