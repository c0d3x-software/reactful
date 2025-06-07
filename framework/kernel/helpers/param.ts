/// <reference path="param.d.ts" />

import { RouteDecoratorInfo } from "../decorators"

/** create a params object */
export function params(tag: string, own: string, uid: number, now?: object): Params {
   return ({ tag, own, uid, mem: now, ioc: global.ioc })
}

/** extracting dynamic routing params */
export function dynamicRoute(route: RouteString) {
   route = removeLastBar(route)

   global.ioc.route = route     // current route
   global.ioc.param = {}  // clear params

   var newRoute = ''

   const state = {}
   const ignore = { url: route, jsx: null }
   const routes = global.own.functions
      .flatMap(x => x.decorators)
      .map(x => x as RouteDecoratorInfo)
      .filter(x => x.route == route)
   
   for (const decorator of routes) {
      const map = removeLastBar(decorator.route).split('/')
      const uri = removeLastBar(route).split('/')

      if (map.length != uri.length) return ignore
      
      for (let i = 0; i < map.length; i++) {
         const { args, name, part, diff } = extract(map, uri, i)

         if (diff) return ignore
         if (args) state[name] = part
         else newRoute += `/${part}`
      }

      const jsx = decorator.target
      const url = newRoute || route

      if (Object.isEmpty(state) == false)
         global.ioc.param = state

      return { url, jsx }
   }

   return ignore
}

const removeLastBar = (route: RouteString) =>
   route = (route.replace(/\/$/, '') || '/') as RouteString   

const extract = (routed, params, i) => ({
   name: params[i].replace(':', ''),
   args: routed[i].startsWith(':'),
   part: params[i] || '',
   diff: params[i] != routed[i]
})