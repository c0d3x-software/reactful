import { LaunchFluent } from './shared';
interface Settings {
    store?: record;
    query?: string;
    paths?: Folders;
}
/** reactful startup server
 * @param {string} routes entry routes folder */
export declare function launch(routes: RouteString | Settings): LaunchFluent;
/** reactful startup server
 * @param {string} routes entry routes folder
 * @param {Context} settings custom server settings */
export declare function launch(routes: RouteString | Settings, settings: Settings): LaunchFluent;
/** reactful startup server
 * @param {string} routes entry routes folder
 * @param {Context} settings custom server settings */
export declare function launch(settings?: Settings): LaunchFluent;
export {};
