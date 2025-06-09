import { expect, test } from "bun:test";
import { coder } from "./coder";

const oldCode = `
function myFunction() {}
async function myAsyncFunction() {}
function* myGenFunction() { yield 1; }
async function* myAsyncGenFunction() { yield 1; }
export function exportedFunction() {}
export async function exportedAsyncFunction() {}
export default function namedDefault() {}
const funcExpr = function namedFuncExpr() {};
const asyncFuncExpr = async function namedAsyncFuncExpr() {};
const genFuncExpr = function* namedGenFuncExpr() { yield 1; };
const asyncGenFuncExpr = async function* namedAsyncGenFuncExpr() { yield 1; };
const arrow = () => {};
const asyncArrow = async () => {};
const implicitArrow = (a, b) => a + b;
const asyncImplicitArrow = async () => await Promise.resolve("done");
export default function namedDefaultExport() {}
export default async function namedAsyncDefaultExport() {}
export default function namedExportedFunction() {}`

const functions = 'myFunction,myAsyncFunction,myGenFunction,myAsyncGenFunction,'
   + 'exportedFunction,exportedAsyncFunction,namedDefault,namedFuncExpr,namedAsyncFuncExpr,'
   + 'namedGenFuncExpr,namedAsyncGenFuncExpr,arrow,asyncArrow,implicitArrow,asyncImplicitArrow,'
   + 'namedDefaultExport,namedAsyncDefaultExport,namedExportedFunction'

// test(`fn-metadata: success`, function () {
//    const info = { count:0 }
//    const code = coder(oldCode, '/', info)?.trim()
//    const linesOfCode = oldCode.trim().split('\n').length
   
//    console.log(linesOfCode, info.count)
//    console.log(code)
// })

functions.split(',').map(x => x.trim()).forEach(function (name) {
   test(`fn-metadata: ${name} success`, function () {
      const code = coder(oldCode, '/')?.trim()
      const sync = !name.includes('async')
      expect(code).toContain(template(name, !sync))
   })   
})

const template = (nm, is) => `
${nm}['id'] = 0;
${nm}['tag'] = {};
${nm}['path'] = '/';`.trim()