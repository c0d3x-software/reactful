"use server"

import { fallbackHTML, hasFallbackRouting } from "./fallback"
import { JSXON, ServerDecoratorInfo, dynamicRoute } from "../../kernel"
import { stream } from "./stream"
import { mounter } from "../runner"
import { render } from "../render"
import { handler } from "./handler"
import { isRoute } from "./is-route"
import { ssg } from './static'
import { response } from "../shared"

export async function routing(request: Request)
export async function routing(route: RouteString, start?: string)
export async function routing(href: Request|RouteString, last = '') {
   if (href instanceof Request) setGlobalLocationPathname(href)
   if (href instanceof Request && !isRoute(href)) return undefined
   if (href instanceof Request) return handler(href, routing)
   
   const { jsx, url } = await dynamicRoute(href as RouteString)
   
   return await ssrDecorator(jsx, url, href, last)
       || await ssrDirectory(url, last)
       || await ssg(href, last)
}

// server-side rendering (decorator)
async function ssrDecorator(node, path, href, last) {
   const fall = hasFallbackRouting(href) || hasFallbackRouting(path)
   const text = node && await renderizer(node, path)
   const html = text && await mounter(node, path, text)

   if (html) return fall
      ? fallbackHTML(html, last, href)
      : response(200, html, "text/html")
   
   else return false
}

// server-side rendering (folder)
async function ssrDirectory(href, last) {
   
   const ssr = global.own.functions
      .flatMap(x => x.decorators)
      .filter(x => x.name == 'server')
      .map(x => x as ServerDecoratorInfo)
      .filter(x => x.route == href)
      .find(x => x.mode == "dynamic")
   
   return ssr && await stream(href, "html", last)
}

// rendering JSX to HTML in each routing item
async function renderizer(call: RFC, href: string) {   
   const node = await render(call, href)
   const html = node && JSXON.htmlfy(node)
   return html
} 

function setGlobalLocationPathname(request: Request) {   
   globalThis.location.pathname = new URL(request.url).pathname
}