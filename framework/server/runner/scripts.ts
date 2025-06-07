"use server"

import { Path, File, logger } from '../shared'
import { ClientDecoratorInfo, throws } from '../../kernel'

const ENTRY_CLIENT_LIB = `${Path.npm}/@reactful/client/entry`

const scriptTemplate = `
   window.global = {
      env: {#1},
      ioc: {#2},
      own: {#3},
      loads: {}
   };

   {{ --- client imports here --- }}

   await import('{#4}').then(x => x.default());`

const importTemplate = `
   global.own.hydrations[{#1}] = { off:{#2}, tag:'{#3}' };
   import('{#1}').then(x => x.{#3}).then(x => global.own.hydrations['{#1}'].jsx = x);`

export async function createBundleScript() {
   const envScript = JSON.scriptify(global.env)
   const iocScript = JSON.scriptify(global.ioc)
   const ownScript = JSON.scriptify(global.own)

   const componentImports = await Object
      .entries(extractClientComponentStatus())
      .reduce(injectJsxImportScript, Promise.resolve(''))
   
   const scripts = scriptTemplate
      .place(envScript, iocScript, ownScript, ENTRY_CLIENT_LIB)
      .replace('{{ --- client imports here --- }}', componentImports)

   await new File(`${Path.builds}/bundle.js`).save(scripts)   
   
   await scriptsLogging()
}

async function injectJsxImportScript(last: Promise<string>, [path, info]: [string, Hydration]) {
   const module = await import(path).then(x => x)
   const member = module[info.tag] ? info.tag : module['default'] ? 'default' : ''
   const script = (await last) + importTemplate.place(path, info.tag, info.tag)
   const failed = 'Not found exported route component in ' + path

   return member ? script : throws<string>(failed, import.meta)
}

function extractClientComponentStatus() {
   const components = global.own.functions
      .flatMap(x => x.decorators)
      .map(x => x as ClientDecoratorInfo)

   const result: Record<string, Hydration> = { }

   for (const c of components) {
      const path = c.target.path
         .replace(/\.(ts|js|tsx|jsx)$/g, '')
         .replace('file://', '')
         .trim()

      result[path] = {
         off: c.stateless,         
         tag: c.target.name,
         jsx: undefined
      }
   }

   return result
}

/** browser script logs */
async function scriptsLogging() {   
   const path = `${Path.builds}/shared.ts`
   const file = new File(path)
   const size = file.size.toString().split(".")[0].toNumber().format(true)
   const text = await file.load().then(x => x || '')
   const line = text.split('\n').length.format(true)
   const name = (path.split('/').at(-1) || '').toLowerCase()
   
   logger.itemfy(name)
   logger.append(`${size} kb`, "FG_GRAY")
   logger.append(` | `)
   logger.append(`${line} lines`, "FG_GRAY")
}
