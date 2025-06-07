export {}

declare global {            
   type Side = "client" | "server"   
   type Time = `${number}h` | `${number}min` | `${number}s`

   type UseState<T = any> = [T, SetState<T>]
   type SetState<T = any> = (value: T) => void
   type LetState<T = any> = [T, SetState<T>, LetEvent<T>]
   type LetEvent<T = any, U = T> = (value: T) => U

   type Infer<T> = T extends [infer A] ? A : T

   type AnyKeyOf<T, K extends keyof T = keyof T> =
      Pick<T, K> & { [P in Exclude<keyof T, K>]?: never };
   
   type Predicate<T> = (entity: T) => boolean

   type Writable<T> = { -readonly [P in keyof T]: T[P]; };
   
   // type Store<T extends Object = record> = { [K in keyof T]: UseState<Infer<T[K]>> }
}