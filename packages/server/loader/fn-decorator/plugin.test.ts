import { expect, test } from "bun:test";
import { transpiler } from "./plugin";

const code = `
function log(meta: ImportMeta, target: Function) {
   console.log("Decorator called!", meta.url, target.name);
   return function (param1: any, param2: any) {
      return target;
   };
}

@log('argA', 123)
function myFunction(value: string) {
   console.log("...");
}

@log('hello')
function anotherFunction() {
   console.log('anotherFunction called!');
}

@log(3)
const arrowFunction = () => 1+2
`

test('fn-decorator', function () {
   // test.ts
   const newCode = transpiler(code)
   console.log(newCode)
})