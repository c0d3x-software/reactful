import { expect, test } from "bun:test";
import { coder } from "./coder";

const oldCode = `
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

const newCode = `
function log(meta: ImportMeta, target: Function) {
   console.log("Decorator called!", meta.url, target.name);
   return function (param1: any, param2: any) {
      return target;
   };
}

function myFunction(value: string) {
   console.log("...");
}

function anotherFunction() {
   console.log('anotherFunction called!');
}

const arrowFunction = () => 1+2
log(import.meta, arrowFunction)(3);
log(import.meta, anotherFunction)('hello');
log(import.meta, myFunction)('argA', 123);`

// test('fn-decorator: success', function () {
//    const code = coder(oldCode)?.trim()
//    expect(code).toBe(newCode.trim())
// })

const tmpCode = `
@log(true) function myFunction() {}
@log(true) async function myAsyncFunction() {}
@log(true) function* myGenFunction() { yield 1; }
@log(true) async function* myAsyncGenFunction() { yield 1; }
@log(true) export function exportedFunction() {}
@log(true) export async function exportedAsyncFunction() {}
@log(true) export default function namedDefault() {}
@log(true) const funcExpr = function namedFuncExpr() {};
@log(true) const asyncFuncExpr = async function namedAsyncFuncExpr() {};
@log(true) const genFuncExpr = function* namedGenFuncExpr() { yield 1; };
@log(true) const asyncGenFuncExpr = async function* namedAsyncGenFuncExpr() { yield 1; };
@log(true) const arrow = () => {};
@log(true) const asyncArrow = async () => {};
@log(true) const implicitArrow = (a, b) => a + b;
@log(true) const asyncImplicitArrow = async () => await Promise.resolve("done");
@log(true) export default function namedDefaultExport() {}
@log(true) export default async function namedAsyncDefaultExport() {}
@log(true) export default function namedExportedFunction() {}`


test('fn-decorator', function () {
   const info = { count:0 }
   const code = coder(tmpCode, info)?.trim()
   console.log(code)
   console.log(tmpCode.trim().split('\n').length, info.count)
})