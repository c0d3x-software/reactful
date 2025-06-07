import { params } from "../../kernel"
import { getComponentName } from "../shared"
import { RenderArgs } from "./shared"
import { parent } from './parent'
import { client } from './client'

export async function component({ jsx, own, url, uid, dir }: RenderArgs) {
   const tag = getComponentName(jsx)
   const arg = params(tag, own, ++uid)
   const ioc = global.ioc

   try {
      const ownProps = { ...jsx.props, own: tag }
      const newChild = await jsx.type(ownProps, ioc) 
      const subProps = { ...ownProps, ...newChild.props }
      const endChild = { ...newChild, props: subProps }
      const argument = { jsx: endChild, own: tag, url, uid, dir }
      const endProps = await serialize(endChild, arg)
      const children = await parent(argument)
      
      if (Array.isArray(children)) return children
      else if (!children) return []     
      else return  {
         ...children, props: {
            ...children.props,
            ...endProps,
            own: jsx.props.tag,
         }
      }
   }
   catch (ex: any) {
      return client(jsx, url, ex)
   }
}

async function serialize(child: any, params: any) {
   const newChild = () => ({ ...child, props: { ...child.props, events: {} } })

   if (Array.isArray(child.props)) return child.props
   if (!child.props.dangerouslySetInnerHTML) return child.props

   for (const [label, value] of Object.entries(child.props)) {
      if (label == 'dangerouslySetInnerHTML') continue
      if (typeof value != 'function') continue
      if (!child.props?.events) child = newChild()
      child.props.events[label] = value.toString()
      delete child.props[label]
   }

   for (const [label, value] of Object.entries(child.props)) {
      if (label == 'dangerouslySetInnerHTML') continue
      if (typeof value != 'object') continue
      child.props[label] = JSON.stringify(value)
   }

   return child.props
}