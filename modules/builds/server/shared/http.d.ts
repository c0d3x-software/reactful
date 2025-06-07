/** response function factory of Response type */
export declare const response: (code: number, body?: any, type?: string, head?: any) => Response;
/** extract route and query from request */
export declare function queriefy(request: Request): {
    route: string;
    query: any;
};
