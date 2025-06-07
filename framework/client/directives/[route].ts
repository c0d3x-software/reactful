import { router } from '../routings'

type Props = record & { route: string, link: string }

export default ['route', 'link']

const context = { route: {} }

export const routeProps: PropertyHandler= function(props: Props, params: Params) {
   if (!props?.link && !props?.route) return props

   const routed = props.link ? router.is(props.link) : false
   const hidden = props.route ? !router.is(props.route) : false
   
   if (props.route) props = hidden 
      ? { ...props, hidden } 
      : { ...props }

   if (props.link) props = routed 
      ? { ...props, onClick, className: `${props.className} routed` }   
      : { ...props, onClick }   

   const route = context.route[props.link]
      ||= router.current.replace(/\/$/, '')

   function onClick() {
      if (!props.link) return
      const link = props.link.replace(/^\./, route)
      router.goto(link)
      global.ioc.react()
   }      

   return props
} 

