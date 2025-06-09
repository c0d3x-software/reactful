"use server"

import { BunPlugin } from "bun"
import { log, Path } from '../shared'
import { modulePlugin } from './module'
import { defaultPlugin } from './default'
import { cssPlugin } from "./stylesheet";
import { functionPlugin } from "./function"
import fs from 'fs'

const flags = global.env.FLAGS

export const ownPlugin: BunPlugin = {
   name: "all plugins",
   setup(build) {      
      const ignore = flags.build

      ignore || log('PLUGINS', 'FG_YELLOW')
      ignore || log('- css plugins')

      build.onLoad({ filter: /\.*$/ }, onLoad)
   }
}

async function onLoad({ path }: Bun.OnLoadArgs) {
   const uri = path as `file://${string}`
   const args = { path: uri, code: '' }
   
   args.code = fs.readFileSync(path, 'utf-8')

   const isStyleFiles = path.match(/\.(css)$/)
   const isScriptFile = path.match(/\.(js|ts|jsx|tsx)$/)
   const isTestScript = path.match(/.test.[tj]sx*/)
   const isProjectCwd = path.startsWith(Path.cwd)
   const isNotSpecial = isTestScript || flags.serve || !isProjectCwd
   
   if (isScriptFile) modulePlugin(args)   
   if (isStyleFiles) await cssPlugin(args)   
   if (isNotSpecial) return defaultPlugin(args)
   else if (isScriptFile) return functionPlugin(args)
   else return defaultPlugin(args)
}

