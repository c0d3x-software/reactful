"use server"

import { PRIMITIVES, JSXON } from '../../kernel'
import { JSDOM } from 'jsdom'

export function styler(jsx: RRE, src: string) {
   try {
      
      if (!jsx || !src || typeof jsx.type != 'string') return jsx.props
   
      const child = wrapper(jsx)
      const htmlString = JSXON.htmlfy(child)
      const [node] = new JSDOM(htmlString).window.document.body.childNodes
   
      for (const css of global.own.modules[src].styles) {
         if (!node.matches(css.selector)) continue
         node.props.style[css.selector] = css.stylings
      }
   
      return node.props.style

   } catch (error) {
      throw <RenderError>{
         args: {},
         side: 'server',
         function: styler.name,
         module: 'bundler.ts',
         exception: error,
         message: 'During CSS parser',
      }
   }
}

function wrapper(child: RRE|any[]|any) {
   if (Array.isArray(child)) return child.map(wrapper)

   const props = child?.props
   const feeds = global.ioc
   const basic = PRIMITIVES.includes(typeof child)

   if (!child?.type || basic) return child
   if (child?.type != "function") return child

   function retype(p, f){
      const reducer = ([ key, obj ]) => [ key, wrapper(obj) ]
      const element = child.type({...props, p}, { ...feeds, ...f})            
      const entries = Object.entries(element.props).map(reducer)

      return { ...element, props: Object.fromEntries(entries) }
   }

   return { ...child, type: retype }
}