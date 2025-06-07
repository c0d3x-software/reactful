import { routing } from './routing'
import { response } from '../shared'

/** One step recursive near inner routes. 
 * Example: /admin/profile -> /admin */
export function outerRoute(href: RouteString, last: string) {
   last = last || (href + '')
   
   href = href.replace('/index', '/') 
      .replace(/\/[^\/]+$/, '/') 
      .trim() as RouteString

   return routing(href, last) 
}

/** Transform HTML injecting script for fallback routing algorithm */
export function fallbackHTML(html: string, last: string, next: string) {
   const data = `globalThis.FALLBACK_ROUTE = { try:'${last}', fix:'${next}' }`
   const code = `\n\t<script>${data}</script>` + '</head>'
   
   html = html?.replace('</head>', code) || ''
   
   return response(200, html, "text/html")
}

export function hasFallbackRouting(href: RouteString) {
   if (!global.own.routes[href]) return false 
   else return !global.own.routes[href].exact
}