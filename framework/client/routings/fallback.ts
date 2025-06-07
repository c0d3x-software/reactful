import { router } from "./router"

export function fallbackRoute() {
   const fallback = globalThis.FALLBACK_ROUTE as { fix: string, try: string }

   if (fallback) {
      console.error(`Not found server-side route for ${fallback.try}`)
      router.goto(fallback.fix)
   }
}