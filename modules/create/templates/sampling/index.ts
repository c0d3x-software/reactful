import React from "react"
import { shown } from './directives'
import { launch } from "@reactful/server"

const storage = { name: "ok" }

await launch("/routes", { failure, storage })
     .inject(shown)
     .server("#root")

function failure(status, errors) {
   const children: any[] = errors.map((x, i) => 
      React.createElement('li', { key: i.toString() }, x))

   return React.createElement('div', {}, [
      React.createElement('h1', {}, status),
      React.createElement('ul', {}, children),
   ])
}