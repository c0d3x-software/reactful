import { JavaScriptLoader, } from "bun"
import { log } from "../shared"
import { Args } from "./shared"
import ts from "typescript"

const flags = global.own.is

export function defaultPlugin({ code, path }: Args) {
   const contents = transpilerTS(code)

   const loader: JavaScriptLoader
      = path.endsWith('x') ? flags.build ? "tsx" : "jsx"
      : flags.serve ? "js" as JavaScriptLoader
      : (path.split('.').at(-1) || 'ts') as JavaScriptLoader

   return { loader, contents } // bugfix
}

export function transpilerTS(code: string) {
   const params = {
      compilerOptions: {
         jsx: ts.JsxEmit.React,
         target: ts.ScriptTarget.Latest,
      }
   }

   return ts.transpileModule(code, params).outputText;
}

function debugging(path: string, contents: string, filename: string) {
   if (!filename) return

   if (path.includes(filename)) {
      const lining = false
      const num = i => lining ? `${i + 1}: ` : ''
      const linedCode = contents.split('\n')
         .map((x, i) => `${num(i)}${x}`)
         .join('\n')

      log('' + linedCode + '\n', 'FG_CYAN')
   }
}
