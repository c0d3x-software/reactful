/** route an specific component to an specific route
 * @param {string} href route mapping */
export declare function route(href: RouteString): Decorator<RFC>;
/** route an specific component to an specific route
 * @param {string} href route mapping
 * @param {boolean} exact requires exact url, disabling fallback routing */
export declare function route(href: RouteString, exact: boolean): Decorator<RFC>;
export interface RouteDecoratorInfo extends DecoratorInfo {
    exact: boolean;
    route: RouteString;
}
