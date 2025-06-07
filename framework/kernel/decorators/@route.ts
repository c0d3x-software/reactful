import { PREFIX_ERROR } from '../constants'

/** route an specific component to an specific route 
 * @param {string} href route mapping */
export function route(href: RouteString): Decorator<RFC>

/** route an specific component to an specific route 
 * @param {string} href route mapping 
 * @param {boolean} exact requires exact url, disabling fallback routing */
export function route(href: RouteString, exact: boolean): Decorator<RFC>
export function route(href: RouteString, exact?: boolean): Decorator<RFC> {  
   validateRouteURL(href); 
   
   return function (meta: ImportMeta, call: RFC) {
      const info: RouteDecoratorInfo = {
         name: route.name,
         target: call,
         route: href,
         exact
      }

      call.decorators.push(info)
      
      return call
   }
}

function validateRouteURL(href: string) {
   if (!href) throw `${PREFIX_ERROR}empty @route(href)`   
   if (!href.match(/^\/[^ "]+$/)) throw `${PREFIX_ERROR}invalid @route(href)`
}

export interface RouteDecoratorInfo extends DecoratorInfo {
   exact: boolean
   route: RouteString
}