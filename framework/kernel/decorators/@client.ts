//@ts-nocheck

import React from 'react'
import { REACTIVE, UID } from '../constants'
import { JSXON, getComponentName } from '../helpers'
import '../extensions'

/** client-side component 
* @param {boolean} stateful true for stateful client component */
export function client(stateful: boolean): Decorator<RFC>

/** client-side component with modular states
* @param {boolean} stateful true for stateful client component 
* @param {object} record modular stateful object */
export function client(stateful: true, ...stores: Store[]): Decorator<RFC>

export function client(stateful, ...stores) {
   return function (meta: ImportMeta, call: RFC) {
      if (!meta || !call) return call

      const info: ClientDecoratorInfo = {
         stateless: stateful == false,
         name: client.name,
         target: call
      } 

      call.stateless = (stateful == false)
      call.tag = getComponentName(meta, call)
      call.decorators.push(info)

      if (global.env.SIDE == "server") {         
         const path = meta.url.replace('file://', '').replace(/\.[jt]sx/g, '')
         const node = React.createElement(call)
         const html = { __html: JSXON.htmlfy(node) }
         const prop = { dangerouslySetInnerHTML: html }
         const attr = { ...prop, src: path, tag: call.name, hidden: true }

         return props => React.createElement('jsx', attr)
      }

      else for (const store of stores) {
         const stack = global.own.stack
         const index = store[UID] || -1

         if (index >= 0)
            global.own.stack[index]
               .push(call.refresh)      
      }

      return call
   }
}

export interface ClientDecoratorInfo extends DecoratorInfo {
   stateless: boolean
}