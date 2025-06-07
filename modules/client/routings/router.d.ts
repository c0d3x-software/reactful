import { Address, IRouter } from '../typings';
declare class Router implements IRouter {
    private routes;
    private cursor;
    get current(): string;
    get address(): Address;
    get history(): string[];
    goto(route: string, reload?: boolean): boolean;
    next(count?: number): boolean;
    back(count?: number): boolean;
    on: (event: any) => Promise<any>;
    is(route: string): boolean;
}
export declare const router: Router;
export {};
