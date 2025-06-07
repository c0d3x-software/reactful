"use server"

import React from "react"

export const raw = x => typeof x != "object"
export const rce = (fce, props) => React.createElement<any>(fce, props)

export interface RenderArgs<T = RRE<Props, REC>> {
   /** current jsx in recursive loop render */
   jsx: T

   /**  parent component tag of each element  */
   own: string

   /** url component */
   url: RouteString

   /** directory component */
   dir: string   

   /** unique id of iterative calls  */
   uid: number   
}