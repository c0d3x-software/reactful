/// <reference path="own.route.d.ts" />

declare global {
   interface Own {
      is: Status,
      url: string
      root: HTMLQuery
      stack: State[]
      routes: Route
      modules: Module[]
      handlers: Handlers,
      functions: Function[]
      hydrations: Hydration[]
      directories: Folders
   }
}

export { }