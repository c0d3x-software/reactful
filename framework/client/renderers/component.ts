import React from 'react'
import { fixKey, context, RenderArgs } from './shared'
import { getTagName, params, REACTIVE } from '../../kernel'
import { useProxy } from '../bindings/proxy'
import { proper } from '../directives'
import { syblings } from './children'
import { refocus} from "../bindings"


export function component(args: RenderArgs) {
   const { jsx, own, url } = args
   const that = this as RFE

   const retype = (prp, ioc) => {
      const [state, feeds] = rebind(prp, ioc)     
      const child = jsx.type(state, feeds) as RRE
      const props = reprop(child)

      return { ...child, props, key: fixKey(child) }
   }
   
   const rebind = (props, feeds = {} as IoC): [any, IoC] => {
      const now = that.type as Writable<Function>
      const top = args.top.type as Writable<Function>
      const [app, ioc] = [global.own, global.ioc]

      if (props[REACTIVE] || now.stateless) return [props, feeds]
      if (feeds.store && feeds.store[REACTIVE]) return [props, feeds]

      // preverving originals
      const originalSecondArgument = { ...feeds }
      const originalChildrenProps = props?.children

      // preserve original 2nd arg from feact in feeds.refer
      props.children ||= props.children
      
      // creating a refrensh render in current component
      now.id++; now.refresh = () => React.useState(0)[1](Number.newUID())

      // create a reactive props (local state)
      props = useProxy({ data: props, sync: now.refresh })

      // create a reactive store if it exists (global state)
      feeds.store = ioc.store && ioc.store[REACTIVE] ? ioc.store
         : ioc.store ? useProxy<IoC>({ data: ioc.store, sync: top.refresh })
         : undefined
         
      // restoring originals
      feeds.refer ||= originalSecondArgument
      props.children = originalChildrenProps

      return [context.latest = props, feeds]
   }
   
   const reprop = child => {
      if (!child?.props) return { }

      const value = context.latest
      const label = getTagName(child)
      const count = context.count
      const isRaw = typeof child.type == 'string'
      const param = isRaw ? params(label, own, count, value) : null
      const props = syblings({ ...args, jsx:child.props, own:label })
      const names = Object.keys(props || {})
      
      for (const field of names) {
         const value = props[field]
         if (value === undefined) continue
         else if (props[field]) continue
         else props[field] = value
      }    
      
      return param ? proper(props, param) : props
   }

   return refocus(9) && ({ ...jsx, type: retype })   
}  