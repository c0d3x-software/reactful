import React from 'react'

declare global {
   type none = undefined | null
   type record = Record<Key, any>
   type primitive = string | number | boolean | none
   type Key = string | symbol | number
   type Class = { new() }   
   type Async<T> = Promise<T>   
   type Type = 'string'|'number'|'boolean'|'object'|'function'|'class'|''

   type Props<T = record> = T & { children?: any }

   /** React Function Component alias for React.FunctionComponent<T>  */
   type RFC<T = any> = React.FunctionComponent<T> 

   /** React Render Element alias for React.ReactElement<Props, T> */
   type RRE<P = Props, T extends string | REC<P> = any> = React.ReactElement<P, T>

   /** React Element Constructor alias for React.JSXElementConstructor<T> */
   interface REC<P = any> {
      (props: P, feeds: IoC): ReactNode 
      (props: P): ReactNode
   }

   /** Reactful Functional Element (reactful) */
   type RFE = RRE<Props, REC<Props>>
}

export { }