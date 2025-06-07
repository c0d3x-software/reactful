import React from "react"
import { REACTIVE, getTagName } from "../../kernel"
import { RenderArgs, context, fixKey } from './shared'
import { element, fragment } from './element'
import { component } from './component'
import '../../kernel/declarations'

export const parent = (args: RenderArgs<any>) =>
   ! args.jsx ? undefined 
   : args.jsx[REACTIVE] ? args.jsx
   : args.jsx['type'] ? child(args)
   : Array.isArray(args.jsx) ? children(args)
   : typeof args.jsx == "object" ? syblings(args)
   : args.jsx   

export function child(args: RenderArgs<RRE>): RRE | RRE[] {
   const { jsx, own } = args
   const tag = getTagName(jsx)

   const typed = x => typeof jsx?.type == x 
   const count = context.count++
   const props = { ...jsx.props, tag, uid: count, own }
   const fixed = { ...jsx, props, key: fixKey(jsx) }

   return typed("string") ? element({ ...args, jsx: fixed })
        : typed("symbol") ? fragment(args)
        : typed("function") ? component(args)
        : jsx
}

export const children = (args: RenderArgs<RFC[]>): RRE[] =>
   React.Children.map(args.jsx, jsx => parent({...args, jsx }))

export const syblings = (args: RenderArgs<any>) => 
   Object.fromEntries(Object.entries(args.jsx)
      .map(([ key, jsx ]) => [ key, parent({ ...args, jsx }) ]))

export function client(_: RRE, own: string): RRE { 
   throw new Error("client not implemented...") 
}