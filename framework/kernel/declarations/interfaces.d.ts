import { SeoDecoratorInfo } from "../decorators"

declare global {
   /** CSS Rule fullstack interface */
   interface StyleRule {
      /** CSS query selector */
      selector: string

      /** CSS styling object */
      stylings: record
   }

   /** HTML string cache for fast client-side routing */
   interface HTMLCache {
      /** cached HTML to fast client-side routing  */
      html?: HTMLString

      /** HTML for suspense API for loading state */
      lazy?: HTMLString | undefined

      /** It defines if the url must has the exact correspondence, if not,
       * the not found routing will fallback to outer routing. Ex.:
       * - /a/b/c (not found) -> /a/b (not found) -> /a (not found) -> / (end) */
      must?: boolean

      /** aditional SEO metatags */
      seos?: MetaTag[]
   }

   interface Store {
      [REACTIVE]: true
    }
}

export { }