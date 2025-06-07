"use client"

import { router } from '.'
import { hydration } from './hidrate'
import { streamJSX } from './stream'
import { ServerDecoratorInfo } from '../../kernel'

/** registering client-side route events */
export function routingListener(me: any) {
   me.addEventListener("click", onClick)
   me.addEventListener('popstate', onBack)   
}

async function onRoute(url: string){   
   const route = decodeURI(url) as RouteString   
   const infor = global.own.routes[route]
   const inner = infor.cache && decodeURI(infor.cache)
   const entry = document.querySelector(global.own.root)!
   const model = global.own.functions
      .flatMap(x => x.decorators)
      .filter(x => x.name == 'route')      
      .map(x => x as ServerDecoratorInfo)
      .find(x => x.route == route)
   
   if (model?.mode == "dynamic") {
      infor.await && (entry.innerHTML = infor.await)
      entry.innerHTML = await streamJSX(route)
   }   
   else if (inner) entry.innerHTML = inner   
   else return router.goto(route, true)

   document.title = infor.metas?.title || global.ioc.title
   
   await hydration()
}

function onBack(e: any) { onRoute(location.pathname) }

function onClick(e: any) {
   if (e.target.tagName != "A") return
   else e.preventDefault()

   const begin = location.origin
   const fixed = decodeURI(e.target.href)
   const route = fixed.replace(begin, '').replaceAll('`','').replace(/\/\//, '/')
   
   router.goto(route)
   onRoute(route)
}

