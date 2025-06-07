import { Args } from '../shared'
import { clientParseCSS } from './client'
import { serverParseCSS } from './server'

export async function cssPlugin({ code }: Args) {
   const cssString = code

   const nextCSS = global.own.is.serve
      ? await serverParseCSS(cssString)
      : await clientParseCSS(cssString)

   global.own.modules ||= []

   const previousJs = global.own.modules.at(-1)

   if (!previousJs) return

   previousJs.styles ||= []
   previousJs.styles = [
      ...previousJs.styles,
      ...nextCSS
   ]
}
