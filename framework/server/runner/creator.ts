"use server"

import { JSDOM } from 'jsdom'
import { marked } from 'marked'
import { JSXON } from '../../kernel'
import { Path, File, logger as log } from '../shared'
import { renderToString } from 'react-dom/server'
import { throws } from '../../kernel'
import { JSX_IN_HTML } from './regex'
import { render } from '../render' 
import { mounter } from './mount'
import React from 'react'

export function createMD(route: RouteString, md: string, html: string): Promise<HTMLString>
export async function createMD(route, md, html) {
   const REGEX_FIX = /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/
   const inner = await marked.parse(md.replace(REGEX_FIX, "")) as HTMLString
   return await createHTML(route, inner, html)
}

export async function createJSX(component: RFC, path: string)
export async function createJSX(component: RFC, path: string, html: string)
export async function createJSX(component, path, html?, done = []) {
   path ||= component.path

   try {
      const error = /<!--\$!-->([\s\S]+)<!--\/\$-->/
      const route = new Path(path).route

      if (done.includes(route)) return ''

      const url = `${Path.builds}${route}.html`
      const jsx = await render(component, route)
      const jms = jsx ? JSXON.htmlfy(jsx) : ''
      const htm = await mounter(jsx, route, jms, html)
      const out = jms.replaceAll("'", '"')
      const err = htm.match(error)
      const get = global.own.routes[path]

      get.cache = encodeURI(out) as HTMLString

      if (!!err) throw err[1]
      await new File(url).save(htm)
      return done.push(route) && htm as HTMLString
   }
   catch (ex: any) {
      throws<boolean>(ex, import.meta)
      throw ex
   }
}

export function createHTML(href: RouteString, innerHTML: string, outerHTML: string): Promise<HTMLString> 
export async function createHTML(href, innerHTML, outerHTML, done = []) {
   innerHTML = innerHTML.replace(/<!--[\s\S]+?-->/gm, '') // removing comments

   // extracting JSX imported inside HTML link[type=react]
   const info = global.own.routes[href]
   const { last: final, route: route } = new Path(href)
   const [name, text] = [final.split(".")[0], `${href.slice(1)}.html`]

   if (done.includes(text)) return ''

   else if (innerHTML.match(JSX_IN_HTML))
      innerHTML = await loadFromHTMLX(name, innerHTML)

   const { body, head } = new JSDOM(innerHTML).window.document as Document
   const title = head?.querySelector('title')?.innerHTML || ''
   if (title) info.metas['title'] = title

   const inner = body.innerHTML.replaceAll("'", '"')
   const outer = await mounter(null, route, inner, outerHTML)

   info.cache = encodeURI(inner) as HTMLString

   head.querySelectorAll('meta[name]').forEach(meta => {
      const name = meta.getAttribute('name')
      const data = meta.getAttribute('content')

      if (!meta || !name || !data) return
      else info[name] = data
   })

   await new File(`${Path.builds}/${name}.html`).save(beutify(outer))

   done.push(text) && log.itemfy(text, false)

   return text as HTMLString
}


// <link type="react" rel="Counter" href="../counter.tsx">
async function loadFromHTMLX(file: string, html: string) {
   const { head } = new JSDOM(html).window.document as Document
   const imports = [] as { path: string, name: string }[]
   const filename = file.split('.')[0]

   for (const link of head.querySelectorAll('link[type="react"]')) {
      const name = link.getAttribute("rel")
      const href = link.getAttribute("href") || ''
      const path = href.replace(/\.[tj]sx$/, '')
      const Name = filename[0].toUpperCase() + filename.slice(1)
      const item = { path, name: name ? `{ ${name} }` : Name }
      path && imports.push(item) && link.remove()
   }

   const path = `${Path.builds}/${filename}.tsx`
   const BODY_REGEX = /<body.*?>([\s\S]+)<\/\s*body\s*>/
   const base = (html.match(BODY_REGEX) || ['', ''])[1]
   const code = `import React from 'react'
         ${imports.map(x => `import ${x.name} from '${x.path}'\n`)}
         export default function() { \n\treturn <>${base}</> \n}`

   await new File(path).save(beutify(code))

   const fnc = await import(path).then(x => x.default)
   const jsx = React.createElement(fnc)

   return html.replace(base, renderToString(jsx))
}

const beutify = (code: string) => code
   .replaceAll(/\n[\s\t]*\n/gm, '\n')
   .replaceAll(/^[\s\t]+(import|export)/gm, '$1')