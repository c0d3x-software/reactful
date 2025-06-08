import '../extensions'

//** get component name base import metadata and function JSX */
export function getComponentName(meta: ImportMeta, call: RFC): string {
   const file = meta.url.split('/').at(-1)?.split(".").at(0) || ''
   const name = call.name.includes("default") ? "" : call.name.trim()
   return name || file || ""
}