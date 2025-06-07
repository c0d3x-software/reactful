export interface LaunchFluent {
    inject(handler: ErrorHandler): LaunchFluent;
    inject(handler: RequestHandler): LaunchFluent;
    inject(handler: PropertyHandler): LaunchFluent;
    render: RenderFluent;
}
export interface RenderFluent {
    (): Promise<void>;
    (query: string): Promise<void>;
}
