export { }

declare global {

   /** dependency injection object */
   interface IoC<P extends object = any, S extends object = record, L extends object = record> {
      
      /** current logon user from Reactful auth */
      logon: L // current user
      
      //** params from dynamic route using @route */
      param: P

      /** injected raw global state */
      store: S
      
      /** pending flag during request response */
      await: boolean
      
      /** HTML validation API array */
      fails: Invalid[]
      
      /** current route */
      route: RouteString

      /** current title */
      title: string

      /** imperative render */
      react: () => void

      /** internal react 2nd component arg */
      refer?: any
   }
}