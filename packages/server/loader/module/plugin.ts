
import { extractExportsFromCode } from "./exports"
import { extractImportsFromCode } from "./imports"
import { Args } from "../shared"

export function modulePlugin({ code, path }: Args) {
   const useRegex = /\s*['"]use (client|server)['"]/gi
   const use: Side = code.match(useRegex)?.at(1) as any || ''
   const imports = extractImportsFromCode(code).flatMap(x => x.list).join(', ')
   const exports = extractExportsFromCode(code)
      .filter(x => x.name != 'anonymous')
      .map(x => x.name).join(', ')

   code += `
--------const ports = {
--------   imports: { ${imports} },
--------   exports: { ${exports} }
--------}

--------global.own ||= {}
--------global.modules ||= {}
--------global.modules['${path}'] = {
--------   use: '${use}',
--------   path: '${path}',
--------   ports,
--------   styles: []
--------}
   `

   return code.trim().replaceAll('--------}', '')
}