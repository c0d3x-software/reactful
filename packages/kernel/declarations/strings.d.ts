export { }

declare global {
   type URLString = `http://${string}` | `https://${string}`
   type HTMLString = `<${string}</${string}>`
   type PathString = `file://${string}`
   type RouteString = `/${string}` | `./${string}`

   // type Store<T extends Object = record> = { [K in keyof T]: UseState<Infer<T[K]>> }
}