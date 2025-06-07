import { expect, test } from "bun:test";
import { AuditProxy } from "./audit";
import { useProxy } from "./proxy";
import { delay } from "../../kernel";

type Value = { numeric: number }

test('proxy: create a proxy with success', async function () {   
   const audit = new AuditProxy()
   const data: Value = { numeric: 0 }
   const sync = () => { /* fake setState(random()) */  }
   const args: ProxyArgs = { data, sync }
   const proxy = useProxy<Value>(args, audit)
   const status = { get:false, let:false, set:false }

   await scenarioTest('get')
   await scenarioTest('set')
   await scenarioTest('let')
   
   expect(audit).toBeInstanceOf(AuditProxy)

   async function scenarioTest(key: string) {
      audit[key] = () => status[key] = true
      expect(status[key]).toBe(false)

      if (key == 'set') proxy.numeric = 0;
      else { const x = proxy.numeric }
      if (key == 'let') await delay(333)

      expect(status[key]).toBe(true)
   }
})