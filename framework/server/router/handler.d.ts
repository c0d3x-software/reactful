type Delegate = (route: string) => any;
export declare function handler(request: Request, routing: Delegate): any;
export {};
