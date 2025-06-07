import { parent } from "./parent"
import { RenderArgs } from "./shared"

export async function sibling(args: RenderArgs) {

   const parser = async item => await parent({ ...args, jsx: item })

   const looper = async ([key, jsx]: any) =>  [key, await parser(jsx)]

   const asyncs = Object.entries(args.jsx).map(looper)
   
   const result = Object.fromEntries(await Promise.all(asyncs))

   return result
}