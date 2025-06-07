import { render } from './render'
import { LaunchFluent } from './shared'

export function inject<T extends HandlerType>(handler: Handler<T>): LaunchFluent {
   const handlers = global.own.handlers

   if (handler.kind == "error") handlers
      .errors.push(handler as any as ErrorHandler)

   if (handler.kind == "request") handlers
      .requests.push(handler as any as RequestHandler)

   if (handler.kind == "property") handlers
      .properties.push(handler as any as PropertyHandler)
   
   return { inject, render }
}