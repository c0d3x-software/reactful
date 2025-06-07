export {}

declare global {
   interface Params<T extends object = any> {
      uid: number
      tag: string
      own: string
      ioc: IoC
      mem?: T | undefined
   }
}