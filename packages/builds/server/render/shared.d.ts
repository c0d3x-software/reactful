import React from "react";
export declare const raw: (x: any) => boolean;
export declare const rce: (fce: any, props: any) => React.FunctionComponentElement<any>;
export interface RenderArgs<T = RRE<Props, REC>> {
    /** current jsx in recursive loop render */
    jsx: T;
    /**  parent component tag of each element  */
    own: string;
    /** url component */
    url: RouteString;
    /** directory component */
    dir: string;
    /** unique id of iterative calls  */
    uid: number;
}
