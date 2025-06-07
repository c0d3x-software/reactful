import { child } from "./child";
import { sibling } from "./sibling";
import { children } from "./children";
import { RenderArgs } from "./shared";

export const parent = async (args: RenderArgs) =>
   ! args.jsx ? undefined
   : args.jsx['type'] ? await child(args)
   : isChildren(args) ? await children(args)
   : typeof args.jsx == "object" ? await sibling(args)
   : args.jsx   

const isChildren = (args): args is RenderArgs<RRE[]> => Array.isArray(args.jsx)