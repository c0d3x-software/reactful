import { RenderArgs } from './shared';
import '../declares';
export declare const parent: (args: RenderArgs<any>) => any;
export declare function child(args: RenderArgs<RRE>): RRE | RRE[];
export declare const children: (args: RenderArgs<RFC[]>) => RRE[];
export declare const syblings: (args: RenderArgs<any>) => any;
export declare function client(_: RRE, own: string): RRE;
