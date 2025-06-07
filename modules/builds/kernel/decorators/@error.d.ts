/** error component for handled exception and not found routes
 * injectable in startup launch({ error }) */
export declare function error(component: ErrorHandler): Decorator<RFC>;
export interface ErrorDecoratorInfo extends DecoratorInfo {
    throw: ErrorHandler;
}
