export * from './@seo'
export * from './@auth'
export * from './@error'
export * from './@route'
export * from './@style'
export * from './@server'
export * from './@client'

declare global {
   type DecoratorInfo<T extends Function = Function> = {
      name: string
      target: T
   }

   type Decorator<T extends Function = Function, U extends Function = T> =
      (module: ImportMeta, target: T) => U
}

export { }
