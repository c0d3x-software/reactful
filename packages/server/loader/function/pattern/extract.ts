import { namedFunctionRegexes } from "./regex"
import { FunctionRegexResult, RegexLoop } from "./types"

type FRR = FunctionRegexResult

export function getFunctionCodes(code: string, topLevelOnly: boolean): FRR[] {
   const regexes = Object.entries(namedFunctionRegexes)

   const map = ([field, regex]): RegexLoop[] =>
      code.matchAll(regex).toArray()
         .map(match => ({ field, regex, match }))

   const checkIfMatched = (rl: RegexLoop) => rl.match.length > 0

   function checkTopLevelOnly(rl: RegexLoop) {
      if (!topLevelOnly) return true 

      const head = rl.match[0].split('(')[0]
      const regx = new RegExp('^[\\s\\t\\n]+' + head)

      return !code.match(regx)
   }

   const getHeader = (text: string) => text
      .replace(/\($/, '')
      .replace(/\($/, '')
      .replace(/\s*=.+$/, '')

   const getResult = (rl: RegexLoop): FRR => ({
      key: rl.field,
      name: rl.match[1],
      index: rl.match.index,
      header: getHeader(rl.match[0]),
      pattern: rl.regex,
      complete: rl.match[0]
   })

   const results = regexes
      .flatMap<RegexLoop>(map)
      .filter(checkIfMatched)
      .filter(checkTopLevelOnly)
      .map<FunctionRegexResult>(getResult)

   return results
}