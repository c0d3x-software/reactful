/// <reference path="object.d.ts" />

import { BIND_SYNTAX_ERROR, BINDING_SET_ERROR, INVALID_BINDING_URI } from "../constants"
import { ParseObject } from "./object.parse"

/** @module WARNING Add new object fields generate Bun bugs,
* only support static extension or existent method overrides.
*/

export { }

Object.isEmpty = function(that) {
   if (!that) return true
   return Object.keys(that).length == 0
}

Object.parse = (function(that: any) { return new ParseObject(that) }) as any

Object.merge = function(self, that) {
   Object.keys(self).forEach(function (name) {
      if (that[name] === undefined) return         
      else self[name] = that[name]
   })
}

Object.prototype.toString = function (identation?: number) {
   return identation ? JSON.stringify(this, null, identation) : JSON.stringify(this)
}

Object.fromProxy = function (that) {
   const plain = {}

   for (const key in that) {
      if (Array.isArray(that[key]))
         plain[key] = that[key].map(x => Object.fromProxy(x))

      else if (typeof that[key] == 'object')
         plain[key] = Object.fromProxy(that[key])

      else if (that.hasOwnProperty(key))
         plain[key] = that[key]
   }

   return plain;
}

const valueOf = Object.prototype.valueOf.bind({})

Object.prototype.valueOf = function (fix?: boolean, uri?: string, val?: any, ori?: string, log?: any[]): any {
   if (!uri && typeof fix !== "boolean") return valueOf.bind(this)()

   ori ??= uri
   log = log || []
   uri = (uri || '').trim()
   val = val?.target?.value ?? val

   var that = { ...this }

   const slicing = uri.split('.')
   const getting = val === undefined
   const pathing = /(\.[a-zA-Z_][a-zA-Z0-9_]*)*/gm
   const unfound = slicing.every(k => k in that && (that = that[k]) == that)

   if (uri.match(/^\.|\.$/)) throw INVALID_BINDING_URI
   if (!uri.match(pathing)) throw BIND_SYNTAX_ERROR
   if (!unfound) throw `Not found path binding '${ori}' in ${this.toString(2)}`

   return getting ? getValueOf(this) : setValueOf(this)

   function getValueOf(obj: object) {
      const value = slicing.reduce((x, k) => x[k], obj)
      return fix ? (value?.toString() || '') : value
   }

   function setValueOf(obj: object) {
      const sub = slicing.at(0)?.trim() || ''
      const key = uri.replace(sub + '.', '')
      const inf = { key: key, sub: sub, uri, val, obj: this }

      try {
         if (sub == key) obj[sub] = val
         else obj[sub].valueOf(fix, key, val, ori, log)
      }
      catch (ex) {
         const info = `: 
            property = ${key}, 
            subfield = ${sub},
            instance = ${obj.toString(2)}`
         console.error(BINDING_SET_ERROR + info)
      }

      return log.push(inf) || log
   }
}

