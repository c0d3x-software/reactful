"use client"

import { createElementFromJSX } from '../../kernel'

export function styler(node: RRE, path: string) {
   if (!node || !path || typeof node.type != 'string') return node?.props?.style

   const htmlElement = createElementFromJSX(node)

   for (const css of global.own.modules[path].styles) {
      if (!htmlElement.matches(css.selector)) continue
      node.props.style[css.selector] = css.stylings
   }

   return node.props.style
}