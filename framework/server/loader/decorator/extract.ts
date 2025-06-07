import { Args } from "../shared"
import { ExpressionRef } from "./types"
import { regexes, IS_ANONYMOUS } from "./shared"
import { getAllParenthelessDecorators } from "./paramless"

export function extractDecorators(args: Args): ExpressionRef[] {
   let regex = undefined as any, results = [] as ExpressionRef[]

   const parentheless = getAllParenthelessDecorators(args)

   while ((regex = regexes.find(regex => args.code.match(regex)))) {
      const discovereds = args.code.query(regex)
      const [full, expr] = discovereds
      const name = expr.replace('@', '').split('(').at(0)
      const last = discovereds.at(-1) || ''
      const none = full.match(IS_ANONYMOUS) || last.match(/export\s+default/)
      const call = none ? 'default' : last

      args.code = args.code.replace(expr, '')

      results.push({ function: call, decorator: name, expression: expr })
   }

   for (const found of results) { // restoring parentheless
      const decorated = found.decorator.split("(")[0]
      const parenthed = parentheless.some(name => name.includes(decorated))
      found.decorator = found.decorator.replace(parenthed ? '()' : '§§§', '')
   }

   args.code = args.code.trim()

   return results
}