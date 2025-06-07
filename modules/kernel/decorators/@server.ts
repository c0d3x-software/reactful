import { IS_ONLY_FOR_ROUTE, PREFIX_ERROR } from '../constants'
import { getMillisecondsFrom } from '../helpers'
import '../extensions'

export const SERVER_PATH_ERROR = `${PREFIX_ERROR}@server ` + IS_ONLY_FOR_ROUTE

/** server rendering for SSG (static) and SSR (dynamic) */
export function server(mode: "static" | "dynamic"): Decorator<RFC>

/** periodic server rendering for ISR by miliseconds */
export function server(mode: "periodic", ms: number): Decorator<RFC>

/** periodic server rendering for ISR by time string format*/
export function server(mode: "periodic", time: Time): Decorator<RFC>
export function server(mode: ServerRef, args?: Time|number): Decorator<RFC> {
   setTimeout(() => global.own.is.fails = true, 3) /// ???
   global.own.is.fails = false // ???

   const time = typeof args == "number" ? args
      : getMillisecondsFrom(args as Time) || 0

   return function (meta: ImportMeta, call: RFC) {
      if (global.env.SIDE == "client") return call

      const routed = meta.url.replace('file://', '') as RouteString
      const routes = global.own.directories.routes;

      if (!routed.includes(routes)) throw SERVER_PATH_ERROR
      
      const info: ServerDecoratorInfo = {
         name: server.name,
         route: routed,
         target: call, 
         mode, 
         time
      }
      
      call.decorators.push(info)

      return call
   }
}

export interface ServerDecoratorInfo<T extends Function=Function> extends DecoratorInfo<T> {
   /** current route path */
   route: RouteString,
   
   /** server hybrid render mode: static, dynamic, periodic */
   mode: ServerRef

   /** periodic time in milisseconds */
   time: number
}