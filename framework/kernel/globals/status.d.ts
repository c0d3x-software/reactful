declare global {
    interface Status {
        debug: boolean;
        build: boolean;
        serve: boolean;
        fails: boolean;
    }
}
export declare const status: {
    debug: boolean;
    build: boolean;
    serve: boolean;
    fails: boolean;
};
