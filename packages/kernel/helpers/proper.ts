export const createProper = (library: PropertyHandler[]) => 
   <T extends Object>(props: T, params: Params) =>
      library.concat(global.own.handlers.properties ?? [])
         .reduce((props, apply) => apply(props, params), props)