/** in rendering loop, client is the fallback render, when
 * try to render in server-side, a component with no marked
 * as client-side, and fails. Here, the failed component will
 * sent to client-side to try to render. */
export declare function client(jsx: RFE, url: RouteString, ex: any): {
    props: {
        children?: any;
        retry: RouteString;
        hidden: boolean;
    };
    type: any;
    key: string | null;
};
