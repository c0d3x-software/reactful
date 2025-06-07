import { children, syblings } from "./children"
import { RenderArgs, context } from './shared'
import { getTagName, params } from '../../kernel'
import { proper } from "../directives"
import { styler } from "./style"

export function element(args: RenderArgs): RRE | RRE[] {      
   const { jsx, own, dir } = args
   const tag = getTagName(jsx)
   const now = context.latest

   const count = args.jsx.type.id
   const attrs = params(tag, own, count, now)
   const props = proper(jsx.props, attrs) 
   const style = styler({ ...jsx, props }, dir)
   
   jsx.props = syblings({ ...args, jsx: { ...props, style } })

   // removing directive props handler names of the final component props
   Object.keys(global.own.handlers.properties).forEach(k => delete jsx.props[k])

   return jsx
}

export function fragment(args: RenderArgs<RRE>): RRE | RRE[] {   
   const FRAGMENT = Symbol.for('react.fragment') 
   const internal = args.jsx.props?.children
   const argument = { ...args, jsx: internal }
   const fragment = args.jsx.type == FRAGMENT

   return fragment ? children(argument) : internal
}