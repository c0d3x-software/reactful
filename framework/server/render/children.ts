import { getTagName } from '../../kernel'
import { RenderArgs, raw } from "./shared"
import { logger } from "../shared"
import { parent } from './parent'

export async function children(args: RenderArgs<RRE[]>) {
   const each = async (node: RRE) => {     
      try {
         const end = raw(node)
         const tag = getTagName(node)
         if (tag) logger.append(` ${tag}`, "DIM")
         else if (end) return await node
         return await parent({...args, jsx: node})            
      }
      catch(ex: any) {
         console.error(ex)
         return undefined
      }
   }

   return await Promise.all(args.jsx.map(each))
}