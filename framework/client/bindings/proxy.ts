import { REACTIVE } from "../../kernel";
import { AuditProxy } from "./audit"

const ignores = ["await", "route", "children"] as any[]

export function useProxy<T = any>(args: ProxyArgs)
export function useProxy<T = any>(args: ProxyArgs, audit: AuditProxy)
export function useProxy<T = any>(args: ProxyArgs, audit = new AuditProxy()): T {
   args.data[REACTIVE] = true

   const timed = () => { args.sync(); audit?.let() }
   
   const proxy = new Proxy(args.data, {
      get(refer, field) {
         audit.get(field.toString())
         
         return refer[field]
      },

      set(refer, field, value) {
         refer[field] = value

         if (ignores.includes(field)) return true
         if (typeof value == "function") return true

         const delay = global.env.DELAY || 33

         audit.set(field.toString(), value)
         args.time && clearTimeout(args.time)
         args.time = setTimeout(timed, delay)

         return true
      }
   })

   return proxy
}