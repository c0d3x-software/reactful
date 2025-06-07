"use server"

import { JSDOM } from 'jsdom'
import { SeoDecoratorInfo, throws } from "../../kernel"
import { TITLE_REGEX, METAS_REGEX } from "./regex"
import { Path, File } from '../shared'
import { pd } from 'pretty-data';

const NOT_FOUND_ROOT = `not fould <root> tag in index.html`
const INDEX_NOT_FOUND = `not fould index.html in routes`

/** injectin into HTML s modified HTML, SEO algorithm and JavaScript script tags */
export async function mounter(jsx: RFC|null, route: string, inner: string, outer?: string) {
   outer ||= (await new File(`${Path.cwd}/index.html`).load(INDEX_NOT_FOUND) || '')

   const oldHTML = await injectInHTML(inner, outer!)
   const newHTML = await injectingSEO(oldHTML, route, jsx)
   const nowHTML = await injectScript(newHTML)

   return nowHTML?.trim()
}

/** injecting HTML into original index.html application 
 * @param {string} inner internal HTML to inject*/
async function injectInHTML(inner: string): Promise<HTMLString>

/** injecting HTML into original index.html application 
 * @param {string} inner internal HTML to inject
 * @param {string} outer original HTML wrapper */
async function injectInHTML(inner: string, outer: string): Promise<HTMLString>

async function injectInHTML(inner: string, outer?: string): Promise<HTMLString> {   
   const INIT_REGEX = /^[\s\S]*<html.*?>/gm  

   const base = outer || '<html><body></body></html>'
   const jdom = new JSDOM(base).window.document as Document
   const html = jdom.documentElement.innerHTML
   const node = jdom.querySelector(global.own.root)

   if (!node) return throws<string>(NOT_FOUND_ROOT) as HTMLString

   const uid = node.getAttribute('id')
   const tag = node.tagName.toLowerCase()
   
   const beginHTML = outer.query(INIT_REGEX)[0]
   const innerHTML = `<${tag} id='${uid}'>${inner}</${tag}>`
   const finalHTML = html.replace(node.outerHTML, innerHTML)
   const outerHTML = beginHTML + finalHTML + '</html>'

   return outerHTML as HTMLString
}

/** injecting source script inside HTML wrapper */
async function injectScript(html: string) {  
   const bundle = `<script type='module' src='${Path.builds}/bundle.js'></script>`   
   const zipped = `<script src="https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js"></script>
       <script>        
         fetch('localhost:${global.env.PORT}/bundle.zip')
            .then(res => res.arrayBuffer()).then(bonZipper);

         function onZipper(buffer) {
            const compressed = new Uint8Array(buffer);
            const decompressed = pako.inflate(compressed, { to: 'string' });
            eval(decompressed); // running script after decompressed
         }
      </script>`   
   
   const headScript = global.env.ZIPPED ? zipped : bundle   
   return html.replace(/(<\/head.*?>)/, `${headScript}$1`)
}

/** injecting SEO information from HTML and SEO decorators */
function injectingSEO(html: string, route: string, jsx: RFC | null) {
   const seo = global.own.functions
      .flatMap(x => x.decorators)
      .filter(x => x.name == 'seo')
      .map(x => x as SeoDecoratorInfo)
      .find(x => x)
   
   const metatags = seo || extractingSeoFromHTML(html)

   if (!metatags) return html

   const openMeta = { ...metatags.og }
   const template = `<meta $1='$2' content='$3' />\n`
   const replacer = new RegExp('<(.+)> <(.+)> <(.+)>')
   const charsets = metatags['charset']
   const metaRgxs = Object.keys(metatags)
      .filter(k => k != 'title')
      .filter(k => k != 'charset')
      .map(name => METAS_REGEX(name))

   if (metatags.og) delete metatags['og']

   if (charsets)  {
      const metachar = `<meta charset='${charsets}'>`
      html = html.replace(/<meta charset.+?>/, '')
      html = html.replace('</head>', `${metachar}</head>`)
   }

   const metaHtml = Object.keys(metatags)
      .map(k => `<name> <${k}> <${metatags[k]}>`)
      .map<[string, RegExp]>(x => [x, replacer])
      .reduce((h, [x, r]) => h + x.replace(r, template), '')

   const ogMetaHtml = Object.keys(openMeta)
      .map(x => createMetaDataOgEntries(x, openMeta))
      .map(([k,v]) => `property og:${k} ${v}`)
      .map<[string, RegExp]>(x => [x, replacer])
      .reduce((h, [x, r]) => h + x.replace(r, template), '')

   html = metaRgxs.reduce((h, r) => h.replace(r, ''), html)
   html = html.replace('</head>', `${metaHtml}${ogMetaHtml}</head>`)
   html = html.replace(TITLE_REGEX, `$1${metatags.title}$2`) 

   return beautifyHTML(html)
}

function extractingSeoFromHTML(html: string): MetaTag|undefined {
   const jsxDocument = new JSDOM(html).window.document
   const jsxMetaData = extractingMetaTagFromHTML(jsxDocument, 'name')
   const titleInHTML = jsxDocument.querySelector('title')
      && jsxDocument.querySelector('title').innerHTML
   
   if (!jsxMetaData && !titleInHTML) return undefined
   if (titleInHTML && jsxMetaData) jsxMetaData.title = titleInHTML

   const ogMetaData = extractingMetaTagFromHTML(jsxDocument, 'property')
   if (ogMetaData) jsxMetaData.og = ogMetaData
   
   return jsxMetaData as MetaTag
}


function extractingMetaTagFromHTML(dom: any, field: string): any | undefined {
   const jsxMetaHTML = dom.querySelectorAll(`meta[${field}]`)
   const metaEntries = Array.from<HTMLElement>(jsxMetaHTML)
      .map(x => [x.getAttribute(field), x.getAttribute('content')])
      .map(x => x as [string, string])

   if (!metaEntries.length) return undefined
   else return Object.fromEntries(metaEntries)
}

function createMetaDataOgEntries(key: string, obj: any): [string, any] {
   if (typeof obj[key] != 'object') return [key, obj[key]]
   
   const entry = createMetaDataOgEntries(key, obj[key])
   const field = `${key}:${entry[0]}`
   const value = entry[1]

   return [field, value]
}

function beautifyHTML(htmlString: string) {
   htmlString = htmlString
      .replace('<head>', '\n<head>')
      .replace('</head>', '\n</head>')
      .replace('</body>', '\n</body>')
      .replaceAll('><', '>\n<')
   
   htmlString = pd.html(htmlString)
      .replace(/\n[\s\t]*\n/gm, '\n')

   return htmlString
}