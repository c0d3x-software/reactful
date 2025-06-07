"use client"

import React from "react"
import { parent } from './children'
import { context } from "./shared"

export async function render(root: RFC, path: string, href: string, attr: any)
export async function render(root: RRE, path: string, href: string, attr: any)
export async function render(root: RRE|RFC, path: string, href: string, attr: any) {
   const build = fce => React.createElement<any>(fce, {})
   const refer = root['type'] ? root as RRE : build(root) as RRE
   const label = refer.type.name
   const props = {...refer.props, ...attr}
   const value = { ...refer, props } as any
   const param = { jsx: value, own: label, dir: path, url: href, top: value };

   context.count = 0 // render loop counter

   // top refresh componet for global store self-rendering
   param.top.type.refresh = () => React.useState(0)[1](Number.newUID())

   return parent(param) as RRE
}
