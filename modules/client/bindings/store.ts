/// <reference path="index.d.ts" />

"use client"

import { AuditProxy } from './audit'
import { useProxy } from './proxy'
import { UID } from '../../kernel'

/** create a modular orbital state 
 * @param {object} store initial state object */
export function useStore<T extends Store = Store>(store: T, audit = new AuditProxy()): T {
   if (!window?.document) return store
   if (store[UID]) return store
   
   const clone = { ...store }
   const index = global.own.stack.length
   const sync = () => synchronizer(index)
   
   clone[UID] = index
         
   const state = useProxy({ data: clone, sync }, audit)
   
   global.own.stack.push([])   

   return state
}


/** stack in appended with @client(true, ...stores) */
function synchronizer(index: number) {
   return global.own.stack[index]
      .forEach(refresh => refresh())
}
