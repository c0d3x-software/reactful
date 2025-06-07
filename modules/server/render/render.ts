"use server"

import { rce } from "./shared"
import { parent } from "./parent"
import { getComponentName, logger as log, Path } from "../shared"

export async function render(root: RFC, href: string)
export async function render(root: RRE, href: string)
export async function render(root: RFC, href: string, guid: number)
export async function render(root: RRE, href: string, guid: number)
export async function render(root: RRE | RFC, href: string, guid = 0) {
   href = href.replace(/\/$/, '') || '/'
   root = root['type'] ? root as RFE : rce(root, {}) as RFE

   const tag = getComponentName(root)
   const jsx: RFE = root['type'] ? root as RFE : rce(root, {}) as RFE
   const url = new Path(jsx.type.path).route
   const dir = jsx.type.path   
   const now = await parent({ jsx, own: tag, url, dir, uid: guid })

   return (guid = 0) || (now as RRE)
}