"use server"

import * as fs from 'fs'
import { File, Path } from '../shared'
import { throws } from '../../kernel'

const NO_DEFAULT_EXPORT = `\nno default export in ???.`
   + ` Routed components need to be exported as default!`

/** file list of HTML string or JSX function */
type FileList = Array<[string, string|RFC|undefined]>

/** get routing file list from path */
export async function folder(indexOnly: boolean, routes?: string, files: FileList = []) {
   for await (const entry of await new Path(routes || Path.routes).browser()) {    
      const valid = entry.path.match(/\.[tj]sx$|\.html|\.md/)
      const noIndex = indexOnly && !entry.name.includes('index.')
      const repeated = isRepeatedItem(files, entry)
      
      if (!entry.file) await folder(indexOnly, entry.path, files)
      else if (noIndex || repeated || !valid) continue
      else files.push(await file(entry))
   }

   /** remove itens with empty content in path or file  */
   return files.filter(([path, file]) => path && file).distinct()
}


/** getting file from path and file name */
export async function file({ path, name }: { path: string, name: string }) {
   const fail = 'not found file in browse.file'
   const file = new File(path)

   if (!(await file.exists()))
      return throws<[string, string]>(fail) 

   else if (path.match(/\.html$|\.md$/))
      return [path, await file.load()] as [string, string]

   const module = await import(path)     

   if (!module?.default) {
      const isIndex = name.toLowerCase().includes("index.")
      const error = NO_DEFAULT_EXPORT.replace("???", path)
      if (isIndex) throws(error)
   }      

   return [ path, module.default ] as any as [string, RFC]
}

/** check if item is already in list  */
function isRepeatedItem(list, info) {
   const isEqual = item => item['src'] == info['path']
   const isObject = item => typeof item == "object"
   const isAlready = item => isObject(item) && isEqual(item)

   return list.some(isAlready)
}