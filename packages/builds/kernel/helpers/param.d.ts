/** create a params object */
export declare function params(tag: string, own: string, uid: number, now?: object): Params;
/** extracting dynamic routing params */
export declare function dynamicRoute(route: RouteString): {
    url: RouteString;
    jsx: any;
} | {
    url: string;
    jsx: Function;
};
