import '../extensions';
export declare const SERVER_PATH_ERROR: string;
/** server rendering for SSG (static) and SSR (dynamic) */
export declare function server(mode: "static" | "dynamic"): Decorator<RFC>;
/** periodic server rendering for ISR by miliseconds */
export declare function server(mode: "periodic", ms: number): Decorator<RFC>;
/** periodic server rendering for ISR by time string format*/
export declare function server(mode: "periodic", time: Time): Decorator<RFC>;
export interface ServerDecoratorInfo<T extends Function = Function> extends DecoratorInfo<T> {
    /** current route path */
    route: RouteString;
    /** server hybrid render mode: static, dynamic, periodic */
    mode: ServerRef;
    /** periodic time in milisseconds */
    time: number;
}
