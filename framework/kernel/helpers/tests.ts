// DOT NOT IMPORT env HERE

import React from "react"

export const SampleComponent = props =>
   React.createElement('h1', {}, 'sample...')

const memoryStorage = {}

// checking server-side only
if (!globalThis.window?.document) { sessionStorageFake() }

function sessionStorageFake() {
   // @ts-ignore
   globalThis['sessionStorage'] = {
      get length() { return Object.keys(memoryStorage).length },
      getItem(field) { return memoryStorage[field] || null },
      setItem(field, value) { memoryStorage[field] = value },
      removeItem(field) { delete memoryStorage[field] }
   }
}