import { JSXON, } from "../../kernel"
import { RenderArgs } from "./shared"
import { parent } from './parent'

export async function fragment({ jsx, own, url, uid, dir }: RenderArgs) {
   const fall = jsx.props.fallback // fallback HTML during loading...
   const lazy = (jsx.type as any) === Symbol.for("react.suspense")
   const html = (fall ? JSXON.htmlfy(fall) : '') as HTMLString

   if (lazy && fall && html) global.own.routes[url].await = html
   
   const props = {
      ...jsx?.props,
      fallback: undefined,
      children: jsx?.props?.children
   }

   const argument = {
      jsx: props.children,
      own, url, uid, dir      
   }

   return await parent(argument)
}