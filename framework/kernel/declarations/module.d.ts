declare global {
   interface Module {
      /** active use side of module */
      use: Side

      /** module path */
      path: `file://${string}`

      /** imports and exports */
      ports: Ports

      /** imported CSS in module */
      styles: StyleRule[]
   }

   type Ports = { imports: object[], exports: object[] }

   type ImportCode = { path: string, list: string[] }

   type ExportCode = { type: string, list: string[], name?: string, from?: string }
}

export { }