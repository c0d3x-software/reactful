export declare const context: {
    latest: any;
    count: number;
};
export declare const fixKey: (child: {
    key: string | null;
}) => string;
export declare const awaiting: (delay: any) => Promise<unknown>;
export declare const query: (x: any) => HTMLElement[];
export interface RenderArgs<T = RFE> {
    top: RFE;
    jsx: T;
    url: string;
    dir: string;
    own: string;
}
