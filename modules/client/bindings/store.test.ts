import { expect, test } from "bun:test";
import { auth, client, delay, Reactful, UID } from "../../kernel"
import { useStore } from "./store";
import { AuditProxy } from "./audit";


test('useStore: multiple modular store component', async function () {
   const component1 = []
   const component2 = []

   const sample = { ok: true, name: 'john' }
   const store0 = pretest(sample, component1)
   const store1 = pretest(sample, component2)
   const store2 = pretest(sample, component1)
  
   store0.ok = false
   store0.ok = true
   store0.ok = false
   await delay(55) // count as 1 change due debounce algorithm
   
   store0.ok = true
   store1.ok = false
   store2.ok = false
   await delay(55) // count +1 change for all 3

   store0.ok = false // delay is not finish yet

   expect(component1.length).toBe(3)
   expect(component2.length).toBe(1)
})

global.own ||= {} as any
global.own.stack ||= [] as any

function pretest(store, refer: number[]) {
   globalThis.document = {} as any
   globalThis.window = { document: globalThis.document } as any

   const state = useStore(store)
   const index = state[UID]

   // action made by @client(true, ...stores) for each estore
   global.own.stack[index].push(() => { refer.push(index) })

   return state
}