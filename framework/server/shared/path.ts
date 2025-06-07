/// <reference path="path.d.ts" />

import { File } from './file'
import { Dirent, existsSync } from 'fs' 
import { readdir } from 'fs/promises' 

const context = { lib:'', cwd:'', tst:'' }

/** class facade for IO handling */
export class Path implements IPathDynamic {
   public path: string
   public static e2e = false
   private static paths: Folders
   private static node_modules = ''
   
   public static setCwd(value: string) {
      context.cwd = value
   }

   constructor(path: string)
   constructor(meta: ImportMeta)
   constructor(args: string | ImportMeta) { 
      this.path ||= '/' 
      this.path = args['url'] || args
      this.path = this.path.toString().replace("file://", "")
      this.path = this.path.replaceAll('\\', '/')
      this.path = this.path.replace(/(\w)\/$/, '$1')

      if (!this.path.match(/^[\/\.]/) && !this.path.match(/^\w\:/))
         this.path = './' + this.path
   }

   public static get npm() {
      if (Path.node_modules) return Path.node_modules
      return Path.node_modules = getNodeModuleFolder()
   }

   get back() {
      const newPath = this.path == '/' ? '../'
         : this.path.startsWith('../') ? '../' + this.path
         : this.path.replace('/' + this.last, '') || '/'
         
      return new Path(newPath)
   }
   
   get name() { return this.last.split(".")[0] }
   get Name() { return this.name[0].toUpperCase() + this.name.slice(1)  }
   get last() { return this.path.split(/\/|\\\\|\\/)?.at(-1) || '' }
   
   get route(): RouteString { 
      const isURL = this.path.match(/^(http|https):/)
      const routes = global.own.directories.routes
      const removeHTTP = isURL? new URL(this.path).pathname : this.path
      const removeFile = removeHTTP.replace(/\.[^\/]+$/, '/').trim()
      const dropsIndex = removeFile.match(/\/index$/) ? removeFile.drop('/index') : removeFile
      const noRouteDir = dropsIndex.drop(Path.routes).drop(routes)
      const noEndSlash = noRouteDir.replace(/(.+)\/$/, '$1')
      const noWinDrive = noEndSlash.replace(/^\w:/, '')
      const beginSlash = (noWinDrive.match(/^\//) ? '' : '/') + noWinDrive

      return (beginSlash.trim() || '/') as RouteString
   }

   static get cwd() { this.startup(); return context.cwd }
   static get apis() { return `${this.cwd}${this.paths.apis}` }
   static get assets() { return `${this.cwd}${this.paths.assets}` }
   static get builds() { return `${this.cwd}${this.paths.builds}` }
   static get routes() { return `${this.cwd}${this.paths.routes}` }
   static get shares() { return `${this.cwd}${this.paths.shares}` }
   static get components() { return `${this.cwd}${this.paths.components}` }
   static get directives() { return `${this.cwd}${this.paths.directives}` }

   public static from = (directory: IDirectory) => new Path(Path[directory])

   public async browser(load = true): Promise<IPathBrowse[]> { return browser(this.path, load) }

   public static startup(): boolean {
      if (context.cwd) return true
      Path.paths = global.own.directories        
      const src = global.env.SIDE == "client" ? '/' : eval('Bun.main')
      context.cwd = new Path(src).back.path      
      return true
   }      

   public backTo = (name: string, retry = 11) => 
      ! name || retry < 0 ? '/'
      : this.last == name ? this
      : this.back.backTo(name, retry - 1)

   public resolve(syntax: string): Path {
      if (syntax.startsWith("../")) {
         const upPath = new Path(this.path).back.path
         const newPath = syntax.replace('../', '')
         return new Path(upPath).resolve(newPath)
      }
      
      return new Path(this.path + '/' + syntax)
   }
}

function getNodeModuleFolder(last: string = '') {
   last ||= `${Path.cwd}`
   const next = new Path(last).back.path
   const node = '/node_modules'
   const path = `${last}${node}`

   if (!last || last == '/')
      throw 'failed to get node_modules path'

   return existsSync(path) ? path
      : getNodeModuleFolder(next)
}

async function browser(href: string, load: boolean): Promise<IPathBrowse[]> { 
   if (global.env.SIDE == "client") throw "NOT SUPPORTED"; 

   const folders = await readdir(href, { withFileTypes: true })   

   const mapping = async (d: Dirent) => {
      const path = `${href}/${d.name}`      
      const file = d.isDirectory() ? undefined 
          : load && await new File(path).exists()
          ? new File(path)
          : undefined

      return { name: d.name, path, file, base:href }
   }

   const result = await Promise.all(folders.map(mapping))

   return result as any as IPathBrowse[]
}