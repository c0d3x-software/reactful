/** error component for handled exception and not found routes
 * injectable in startup launch({ error }) */
export function error(component: ErrorHandler): Decorator<RFC> {
   return function(meta: ImportMeta, call: RFC) {      
      const info: ErrorDecoratorInfo = {
         target: call, 
         name: error.name,
         throw: component
      } 

      call.decorators.push(info)

      return call
   }
}

export interface ErrorDecoratorInfo extends DecoratorInfo {
   throw: ErrorHandler
}