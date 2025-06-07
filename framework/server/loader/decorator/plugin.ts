import { defaultPlugin } from '../default'
import { Args, getModuleFunctions } from '../shared'
import { extractDecorators } from './extract'
import { notAllowNestedDecorator } from './nesting'

export function decoratorPlugin(args: Args) {
   const decorators = extractDecorators(args)
   const functions = getModuleFunctions(args)

   if (!functions.length || !decorators.length) return defaultPlugin(args)

   // TODO: validate if this really works...   (test scenarios)
   notAllowNestedDecorator(args.path, functions, decorators)

   for (const fn of functions) {
      if (decorators.every(d => d.function != fn.name)) continue

      const part = `(import.meta, `
      const none = !!fn.full.match(/export\s+default\s+/)
      const vars = decorators.filter(x => x.function == fn.name)
      const meta = vars.map(x => x.decorator)
      const head = meta.join(part).trim() + part
      const foot = fn.expr + (`)`.repeat(vars.length)).trim()
      const term = fn.type == 'block' ? 'const' : ''
      const name = none ? '' : `${term} ${fn.name} = `
      const done = `${fn.mods} ${name} ${head} ${foot}`

      args.code = args.code.replace(fn.full, `${done} `)
   }

   args.code = args.code
      .replaceAll(') (', ')(')
      .replace(/ {2,}/g, ' ')
      .replace(/(\w) \(/g, '$1(')
      .replaceAll('async(', 'async (')
   
   return defaultPlugin(args)
}

