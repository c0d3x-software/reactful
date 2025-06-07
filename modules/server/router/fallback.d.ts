/** One step recursive near inner routes.
 * Example: /admin/profile -> /admin */
export declare function outerRoute(href: RouteString, last: string): any;
/** Transform HTML injecting script for fallback routing algorithm */
export declare function fallbackHTML(html: string, last: string, next: string): Response;
export declare function hasFallbackRouting(href: RouteString): boolean;
