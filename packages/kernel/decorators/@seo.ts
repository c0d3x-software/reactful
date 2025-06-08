/// <reference path="@seo.d.ts" />

import { getComponentName } from '../helpers'

const charsets = ["UTF-8", "UTF-16"]

/** SEO decorator for title + charset */
export function seo(title: string, charset: "UTF-8"|"UTF-16"): Decorator<RFC>

/** SEO decorator for title + description */
export function seo(title: string, metadata: MetaTag): Decorator<RFC>
export function seo(title: string, description: string): Decorator<RFC>

/** SEO decorator for title + metatags object */
export function seo(title: string, metadata: string|MetaTag): Decorator<RFC> {
   const isString = typeof metadata === "string"
   const isCharSet = isString && charsets.includes(metadata)

   if (isString) return seo(title, { description: metadata })
   if (isCharSet) return seo(title, { charset: metadata })   
   
   return function (meta: ImportMeta, call: RFC) {
      const info: SeoDecoratorInfo = {
         ...metadata,
         tag: getComponentName(meta, call),
         name: seo.name,
         title,
         route: new URL(meta.url).pathname,
         target: call
      }

      call.decorators.push(info)

      return call
   }
}

export interface SeoDecoratorInfo extends DecoratorInfo, MetaTag {
   tag: string
   route: string
}