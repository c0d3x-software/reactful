"use server"

import { folder } from './browse'
import { File, Path, logger } from  '../shared'
import { validateConflictRoutes } from './validate'
import { ServerDecoratorInfo, throws } from '../../kernel';
import { createBundleScript } from './scripts';
import { createHTML, createJSX, createMD } from './creator'
import plugins from '../loader'
import Zlib from "zlib";
import fs from 'fs'
import { generateSiteMap } from './sitemap';

const NOT_FOUND_INDEX_HTML = `not fould index.html in /routes`

const intervals = [] as any[]

/** build the application using bun 
 * @param {boolean} indexOnly only seeks to build the index page */
export async function bundler(indexOnly: boolean): Promise<true> {
   try {
      logger.insert(`\nBUILDING...`, "FG_YELLOW")
   
      await cleanupBuildFolder()   
      await validateConflictRoutes()   
   
      const list = await folder(indexOnly)
      const html = await loadIndexHTML()
   
      for (const [path, file] of list) 
         await build(html, file, path)

      await generateSiteMap()   
      await createBundle(html) 
   
      return true
      
   } catch (error) {
      throw <BuildError>{
         args: { indexOnly },
         function: bundler.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      }
   }
}

/** load the index.html starter of application */
async function loadIndexHTML() {
   try {
      
      const path = `${Path.cwd}/index.html`
      const html = await new File(path).load(NOT_FOUND_INDEX_HTML)
      return html as HTMLString

   } catch (error) {
      throw <BuildError>{
         args: { },
         function: loadIndexHTML.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      } 
   }
}

/** iterates each file to specific build */
async function build(html, data, path) {
   try {
      
      if (typeof data == "function")
         await createJSX(data, html, path)

      else if (path.endsWith(".md"))
         await createMD(path, data, html)

      else await createHTML(path, data, html)

   } catch (error) {
      throw <BuildError>{
         args: { html, data, path},
         function: loadIndexHTML.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      } 
   }
}

/** cleans the current builds folder content */
export async function cleanupBuildFolder() {
   try {

      for (const entry of await Path.from("builds").browser()) {
         if (!entry.name || !entry.file) continue
         else fs.unlinkSync(entry.path)
      }

   } catch (error) {
      throw <BuildError>{
         args: {},
         function: cleanupBuildFolder.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      }
   }
}

/** generating javascript bundle for partial hydration */
async function createBundle(html: HTMLString) {    
   try {

      logger.insert(`\nBUNDLING...`, "FG_YELLOW")
   
      global.own.is.build = true 
   
      await createBundleScript()   
      await buildingBundler()
   
      global.own.is.build = false
      
      await bundleValidation()
      await periodicRebuilds(html)

   } catch (error) {
      throw <BuildError>{
         args: { html },
         function: createBundle.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      }
   }
}

async function buildingBundler() {
   try {
      
      const built = await Bun.build({
         entrypoints: [`${Path.builds}/bundle.ts`],
         external: ['jsdom', 'bun', 'os', 'fs', 'marked', 'pretty-data', 'css'],
         minify: global.env.MINIFY,
         target: "browser",
         plugins,
      })
   
      if (!built.success) throw errors(built.logs)
      
      const mini = global.env.ZIPPED
      const text = await built.outputs[0].text()
      const file = mini ? await Zlib.deflateSync(text) : text // TODO: ?
      const path = `${Path.builds}/bundle.${mini ? 'zip' : 'js'}`
   
      await Bun.write(path, file)

   } catch (error) {
      throw <BuildError>{
         args: {},
         function: buildingBundler.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      }
   }
}

/** ISR: Incremental Static Regeneration algorithm */
async function periodicRebuilds(html: HTMLString) {   
   try {

      intervals.forEach(t => clearInterval(t))
   
      const periodics = global.own.functions
         .flatMap(x => x.decorators)
         .filter(x => x.name == 'server')
         .map(x => x as ServerDecoratorInfo<RFC>)
         .filter(x => x.mode == "periodic")
   
      const build = async (render: ServerDecoratorInfo<RFC>) =>
         await createJSX(render.target, html, '')
   
      for (const periodic of periodics) {
         const time = periodic.time
         const call = () => build(periodic)
         const bind = setInterval(call, time)
         intervals.push(bind)
      }

   } catch (error) {
      throw <BuildError>{
         args: {},
         function: periodicRebuilds.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      }
   }
}

/** check if current bundle is ok */
async function bundleValidation() {   
   try {

      const mini = global.env.ZIPPED  ? 'zip' : 'js'
      const fail = `\n\nServer-side content inside bundle.${mini}`
      const file = new File(`${Path.cwd}/builds/bundle.${mini}`)
      const size = file.size.toString().split(".")[0].toNumber().format(true)
      const text = await file.load().then(x => x || '')
      const line = text.split('\n').length.format(true)
      
      logger.itemfy(`bundle.${mini}`)
      logger.append(`${size} kb`, "FG_GRAY")
      logger.append(` | `)
      logger.append(`${line} lines`, "FG_GRAY")   
      logger.append('\n')
   
      if (text.includes("Bun.plugin")) throws(fail, import.meta)
      if (text.match(/['"]use server[;]*['"]/)) console.error(fail);

   } catch (error) {
      throw <BuildError>{
         args: {},
         function: bundleValidation.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      }
   }
}

/** error building logs */
function errors(logs: (BuildMessage | ResolveMessage)[]) {
   try {

      const list = ['\n\n !!!!!!! ==== reactful build errors ==== !!!!!!!']
   
      for (const log of logs) {
         const line = log.position?.line
         const cols = log.position?.column
         const file = log.position?.file
         const text = log.message
   
         list.push(`- ${text} in ${file} (${line},${cols})`)
      }
   
      return list.join('\n')

   } catch (error) {
      throw <BuildError>{
         args: {},
         function: errors.name,
         module: 'bundler.ts',
         exception: error,
         message: '',
      }
   }   
}