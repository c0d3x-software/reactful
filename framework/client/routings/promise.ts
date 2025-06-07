import React from "react"
import { throws } from '../../kernel'
import { router } from './router'
export { }

declare global {
   interface Promise<T> {
      asLazyComponent(): React.FC<{route:string}>
      asLazyComponent(member: keyof T): React.FC<{route:string}>
   }
}

Promise.prototype.asLazyComponent = function(member?) {
   if (!member || member.endsWith('$')) member = 'default'
   
   const base = this as any
   const hide = React.createElement('div')
   const fail = `Not found '${member}' to LazyComponent`

   if (global.env.SIDE == "server") return props => hide   
   else return function(props) {      
      base['routing'] ||= props.route

      const routing = React.useRef(false)
      const [component, setComponent] = React.useState(hide)
      
      React.useEffect(() => { base.then(afterImported) }, [routing.current])

      function afterImported(imported) {
         if (!imported[member]) throws(fail, import.meta)

         const importing = imported[member](props)
         const nowRouted = props.route || base['routing']
         const hasRouted = nowRouted && router.is(nowRouted)

         routing.current = hasRouted

         if (hasRouted && component != hide) return         
         else setComponent(hasRouted ? importing: hide)
      }

      return component
   } 
}