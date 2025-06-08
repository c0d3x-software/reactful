export { }

declare global {
   interface IRender<T = RFE, TTs = T[]> {
      root: RRE
      path: string
      href: string

      parent(all: RRE | RFE[], own: string): TTs
      child(jsx: RRE, own: string): TTs
      children(jsxs: RRE[], own: string): TTs
      syblings<O extends object = object>(props: O, own: string): TTs

      element(jsx: RRE, own: string): TTs
      fragment(jsx: RRE, own: string): TTs
      component(jsx: REC, own: string): TTs

      render(): T
   }

   type ServerRef = "static" | "dynamic" | "periodic"

   type Hydration = { off: boolean, tag: string, jsx?: RFC }

   interface SyncRender extends IRender<RFE, RFE | RFE[]> { }

   interface AsyncRender extends IRender<Async<RFE>, Async<RFE | RFE[]>> { }
}