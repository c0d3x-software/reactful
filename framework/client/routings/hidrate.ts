"use client"

import { query, awaiting } from "../renderers/shared"
import { createRoot } from 'react-dom/client'
import { render } from "../renderers/render"
import { streamJSX } from "./stream"

export async function hydration() {
   await hidrateElement()
   await hidrateExtends()
}

async function hidrateElement() {   
   await awaiting(111)

   query('jsx[src]').forEach(async function(tag){
      try {
         const routed = location.pathname
         const params = deserializeProps(tag)
         const source = tag.getAttribute('src')!
         const client = global.own.hydrations[source]
         const parsed = await render(client.jsx, source, routed, params) 
         
         if (parsed) createRoot(tag).render(parsed)
   
         tag.hidden = false
      }
      catch(ex) {
         console.warn(ex)
      }
   }) 
}

async function hidrateExtends() {   
   query('[retry]').forEach(async function(node) {
      const entry = document.querySelector(global.own.root)!
      const route = node.getAttribute('retry')
      entry.innerHTML = await streamJSX(route)
      node.hidden = false
   })   

   query('[await]').forEach(async function(node){      
      const json = node.getAttribute('await')
      const { path, name } = JSON.parse(json)
      node.innerHTML = await streamJSX(path, name)
   })
}

function deserializeProps(elm: HTMLElement) {
   const parsing = value => JSON.is(value) 
      ? (JSON.parse(value) || value)
      : (value || '')

   const entries = [...elm.attributes]
      .map(x => [x.name, parsing(x.value)]) 
      .flatMap(functionDeserializer)

   return Object.fromEntries(entries)   

   function functionDeserializer([label, value]: [string, string]) {
      if (!value || label != 'events') return [[label, value]]
      try { 
         const lambda = x =>  new Function(`return ${x}`)()
         const mapper = ([k, x]) => [k, lambda(x)]
         return Object.entries(value).map(mapper)
       } 
      catch(ex) { return [[label, value]] }
   }
}