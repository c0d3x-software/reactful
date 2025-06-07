import { RenderArgs } from './shared';
export declare function component(args: RenderArgs): {
    type: (prp: any, ioc: any) => {
        props: any;
        key: string;
        type: any;
    };
    props: Props<record>;
    key: string | null;
};
