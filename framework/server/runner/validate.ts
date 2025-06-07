"use server"

import { PREFIX_ERROR } from "../../kernel"
import { Path, File } from '../shared'

const PREFIX_CONFLICT = `${PREFIX_ERROR}Broken routing conflict rule`

/** validate if there is a naming conflit route in project */
export async function validateConflictRoutes(path?: string) {
   const directory = new Path(path || Path.routes)

   for (const entry of await directory.browser()) {
      if (!!entry.file) continue
      await validateRoutes(entry)
      await validateConflictRoutes(entry.path)
   }
}

/** check all conflict route rules for page components */
async function validateRoutes(entry: IPathBrowse) {
   if (!entry.path.includes(".")) return
   else entry.path = entry.path?.toLowerCase() || ''

   const directory = new Path(entry.path)
   const extension = [".tsx", ".ts", ".js", ".jsx"]
   const validated = extension.some(x => directory.path.endsWith(x))

   if (!!directory.name || !validated) return

   await onlySupportTSXComponents(directory.path)
   await mustBeIndexTsxInteadIndexTs(directory.path)
   await sameFileMdAndTsxAndHTML(directory.name, directory.path)
   await sameFolderIndexAndFileTsx(directory.name, directory.path)
}

/** only supports typescript components */
async function onlySupportTSXComponents(path: string) {
   if (path.endsWith(".jsx")) throw `Not supports JSX components, only support TSX component`;
}

/** index component must use '.tsx', instead of just '.ts' */
async function mustBeIndexTsxInteadIndexTs(path: string) {
   if (path.endsWith("index.ts")) throw `Uses index.tsx instead index.ts in /routes`;
}

/** there is a folder with index inside with same name of file name,
 * so the router cannot infer where will render. Example: 
 * /admin/index.tsx  <===>  /admin.tsx */
async function sameFolderIndexAndFileTsx(name: string, path: string) {
   const hasFileIndex = await new File(`${Path.routes}/${name}.tsx`).exists()
   const hasFolder = await new File(`${Path.routes}/${name}/index.tsx`).exists()
   const conflict = `conflits between '/routes/${name}.tsx' and '/routes/${name}/index.tsx'`

   if (hasFileIndex && hasFolder) throw error(conflict, path)
}

/** multiple same filename with different supported extensions, so
 * the router cannot infer what file will render (ex.: index.html, index.md, etc) */
async function sameFileMdAndTsxAndHTML(name: string, path: string) {
   const sameNameMd = await new File(`${Path.routes}/${name}.md`).exists()
   const sameNameTsx = await new File(`${Path.routes}/${name}.tsx`).exists()
   const sameNameHTML = await new File(`${Path.routes}/${name}.html`).exists()
   
   const conflict = `conflits between ${name}.md, ${name}.tsx or ${name}.html`
   const conflicted = [sameNameMd, sameNameTsx, sameNameHTML].map(x => x).length > 1

   if (conflicted) throw error(conflict, path)
}

/** shared conflict text error */
const error = (rule: string, path: string) =>
   `${PREFIX_CONFLICT}:\n- rule: ${rule}\n- path: ${path}`