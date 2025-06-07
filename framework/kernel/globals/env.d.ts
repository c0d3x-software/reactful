import { Settings } from "./global"

declare global {
   interface Env extends record {
      SIDE: Side
      PORT: number
      DELAY: number
      ZIPPED: boolean
      MINIFIED: boolean
      HOSTNAME: string
      PREFIX_URL: string
      load(file: (d: Date) => Promise<record>)
   }
}

export { }