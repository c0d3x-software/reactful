import { extractFunctions } from "../extractor";
import { Ignore } from "../extractor/types";
import { Check } from "./types";

export function coder(code: string, info = {} as any) {
   const checks: Check = { match: [] as any, catch: {}, found: null, check:null }
   const ignoreds = Ignore.Nested | Ignore.Anonymous | Ignore.Method
   const functions = extractFunctions(code, ignoreds)

   // avoid failure when has no space between ')' of decorator and function 
   code = code.replace(/\)(function\**|const|let|var|export|async|default)/gm, ') $1') 

   // decorator regex with @decoratorName and (decoratorArgs)
   const decoratorRgx = /@(\w+)\(([^)]*)\)/

   // recursive extract and remove decorators
   for (const cf of functions) {
      const found = cf.header.match(decoratorRgx)

      if (!found) console.log(0, found, cf.header, decoratorRgx)

      while (checks.match = cf.header.match(decoratorRgx)) {
         const [full, name, args] = checks.match
         const expr = new RegExp(`\\@${name}\\s*\\(\\s*${args}\\s*\\)\\s*`)
         const crop = cf.header.replace(expr, '') // header without now-decorator
         const swap = new RegExp(expr.source + `(${crop})`)
         const call = `${name}(${args})`

         cf.header = cf.header.replace(swap, '$1')
         code = code.replace(swap, '$1')

         checks.catch[cf.name] ||= []
         checks.catch[cf.name].push({ full, name, args, call })
      }
   }

   // creating chaining call for decorators
   // from: @a(1) @b(2) @c(3) function f(){}
   // to: a(import.meta, b(import.meta, c(import.meta, f)(1))(2))(3)
   for (const [fn, ds] of Object.entries(checks.catch)) {
      const ini = ds.reduce((x, d) => x + `${d.name}(import.meta, `, '')
      const end = ds.reduce((x, d) => x + `)(${d.args})`, '')

      code += `\n${ini}${fn}${end};`
   }

   return code
}