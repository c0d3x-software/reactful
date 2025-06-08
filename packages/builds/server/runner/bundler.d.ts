/** build the application using bun
 * @param {boolean} indexOnly only seeks to build the index page */
export declare function bundler(indexOnly: boolean): Promise<true>;
/** cleans the current builds folder content */
export declare function cleanupBuildFolder(): Promise<void>;
