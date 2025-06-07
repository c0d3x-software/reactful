"use server"

import { createJSX } from "../runner";
import { File, Path, response } from "../shared"
import { fallbackHTML, outerRoute, hasFallbackRouting } from './fallback'

interface Fail { href: string; call: RFC; }

// redo: last try with /index.path
export async function ssg(href: RouteString, back = '') {
   href = (href ? href : '/index')
      .replaceAll('//', '/').trim()
      .replace(/\.[a-zA-z0-9]{3}$/gm, '')
      .trim() as RouteString // remove .ext
   
   const crash = global.own.routes[href].crash // failed render   
   if (crash) return await basicJSX(href, crash)
   
   const fall = hasFallbackRouting(href)   
   const file = new File(`${Path.builds}${href}.html`)
   const leaf = href.endsWith('/index')
   const have = await file.exists()
   const loop = have && back && fall
   const html = loop && await file.load()

   switch (true) {
      case have && !loop: return new Response(file.blob)
      case have && loop: return fallbackHTML(html, back, href)
      case !have && !leaf: return ssg(href + '/index' as any)
      case !have && fall: return outerRoute(href, back)
   }
      
   return response(404, `route not found in ${href}`)
}

// generate static HTML from JSX (without rendering)
async function basicJSX(url: RouteString, jsx: RFE) {      
   const html = await createJSX(jsx.type, url)
   global.ioc.fails = [] // clear validations
   return response(200, html, "text/html")   
}