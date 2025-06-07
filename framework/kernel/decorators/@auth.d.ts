/** check if logon.role has any value */
export declare function auth(): Decorator<RFC>;
/** check if logon.role has the object map value, like { role:'admin' } */
export declare function auth<T extends object = any>(constraints: T): Decorator<RFC>;
