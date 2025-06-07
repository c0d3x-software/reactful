/// <reference path="ioc.d.ts" />

export const ioc: IoC = {
   react: () => {},
   refer: undefined,
   await: false, 
   fails: [], 
   store: {}, 
   param: {}, 
   title: '',
   
   get route() {
      return globalThis.location?.pathname as RouteString
   },

   get logon () {
      if (!globalThis.sessionStorage) return ''
      const json = sessionStorage.getItem('logon')
      return json && JSON.parse(json)
   }
}