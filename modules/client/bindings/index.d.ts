export { }

declare global {
   export type StateResult = { props: Props, feeds: IoC }

   export interface StateArgs<T = any> {
      uri: RouteString 
      jsx: RRE<any, REC>
      get: T
   }   

   export interface StoreArgs<T = any> {
      uri: RouteString
      jsx: RRE<any, REC>
      get: T
   }   
   
   export interface ProxyArgs<T=any> {
      sync: () => void
      data: T
      time?: any
   }
}