"use server"

import { render } from "./render"
import { element } from "./element"
import { fragment } from "./fragment"
import { component } from "./component"
import { RenderArgs } from "./shared"
import { isValidElement } from "react"
import { params } from "../../kernel"
import { getComponentName, logger } from "../shared"


export async function child(args: RenderArgs) {
   const { jsx, own, url, dir } = args

   const isElement = typeof jsx.type === "string"
   const isFragment = await isContainerType(jsx)
   const isComponent = typeof jsx.type === "function"
   const isComplement = isLeafComponent(jsx, dir)  
   const isArrangement = isWrapComponent(args)
   
   if (jsx && !isComponent && !isValidElement(jsx)) {
      logger.insert(`isFailed ${JSON.stringify(jsx)}\n`)
      return undefined as any
   }

   args = await fixing(args, isComponent, isFragment)

   return isArrangement ? await arrangement(args)
        : isComplement ? await complement(args) 
        : isComponent ? await component(args)
        : isFragment ? await fragment(args)
        : isElement ? await element(args)
        : jsx
}

function fixing(args: RenderArgs, isComponent: boolean, ignoring: boolean) {
   if (ignoring) return args
   
   const uid = args.uid + 1
   const jsx = args.jsx as any as RFC
   const nme = args.jsx.type?.name 
   const tag = isComponent ? nme : args.jsx.type
   const own = args.own.includes("default") ? nme || '' : args.own
   const key = args.jsx.key && args.jsx.key.includes(".") ? null : args.jsx.key
   const inn = args.jsx.props.children
   
   return <RenderArgs> <any> {
      key, own, uid,
      jsx: {
         ...args.jsx, key,
         props: {
            ...args.jsx.props,
            children: inn,
            tag, uid, own
         }
      }
   }
}

async function arrangement(args: RenderArgs) {
   const ioc = global.ioc
   const tag = getComponentName(args.jsx)
   const arg = params(tag, tag, args.uid)
   const etc = { ...args, ...args.jsx.props, ...arg }
   const jsx = args.jsx.type(etc, ioc)

   return await child({
      ...args,
      jsx: {
         ...jsx,
         props: {
            ...args,
            ...jsx.props,
            tag, own: tag,
            children: jsx.props.children
         }
      }
   })
}

function isWrapComponent(args: RenderArgs) {
   if (typeof args?.jsx?.type !== "function") return false
   if (args.jsx.type.async) return false

   const node = args.jsx.type(args.jsx.props) 
   const wrap = node.type === Symbol.for("react.fragment")

   return wrap && !node.ref && !node.key
}

function isLeafComponent(jsx, url) {
   const isComponent = typeof jsx.type === "function"
   const { path } = (jsx as RRE)?.type?.meta || {}

   return isComponent && url && path && path != url
}

function isContainerType(jsx) {
   const isFragment = jsx.type == Symbol.for("react.fragment")
   const isSuspense = jsx.type == Symbol.for("react.suspense")
   
   return isFragment || isSuspense
}

const complement = (args: RenderArgs) =>
   render(args.jsx, args.dir, args.uid + 1)