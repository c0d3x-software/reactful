import { clientParseCSS } from "../helpers"

export function style(url: `/assets/${string}`): Decorator<RFC> {
   return function (meta: ImportMeta, call: RFC) {
      if (global.env.SIDE == "server") return call
      
      else fetch(url).then(x => x.text())
         .then(appendingFunctionCSS)      

      function appendingFunctionCSS(css) {
         const styles = clientParseCSS(css)

         const info: StyleDecoratorInfo = {
            name: style.name,
            target: call,
            styles
         }

         call.decorators.push(info)
      }
      
      return call
   }
}

interface StyleDecoratorInfo extends DecoratorInfo {
   styles: StyleRule[]
}