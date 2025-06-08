export { }

declare global {
   declare const global: Global

   interface Global {
      /** global env file */
      env: Env

      /** application reflection */
      own: Own

      /** IoC container */
      ioc: IoC
   }

   type Feeds<TParam = any, TState = any, TLogon = any> = IoC<TParam, TState, TLogon>
}