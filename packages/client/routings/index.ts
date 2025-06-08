export * from './router'

declare const global: Global

import { routingListener } from './client'
import { fallbackRoute } from './fallback'
import { hydration } from './hidrate'

export default async function () {
   if (!window.document) return

   global.ioc.title = document.title
   routingListener(window)
   await hydration()
   recachingHTML()
   fallbackRoute()
}

function recachingHTML() {
   const query = global.own.root
   const route = location.pathname
   const cache = document.querySelector(query)?.innerHTML || ''
   const value = encodeURI(cache) as HTMLString

   if (!global.env.cache[route])
      global.env.cache[route] = value
}