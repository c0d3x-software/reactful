import { expect, test } from "bun:test";
import { coder } from "./coder";

const oldCode = `
@log(true) function myFunction() {}
@log(11,2) async function myAsyncFunction() {}
@log([12]) function* myGenFunction() { yield 1; }
@log('ok') async function* myAsyncGenFunction() { yield 1; }
@log(1234) export function exportedFunction() {}
@log() export async function exportedAsyncFunction() {}
@log({ ok: true}) export default function namedDefault() {}
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


const newCode = `
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
export default function namedExportedFunction() {}

log(import.meta, namedExportedFunction)(true);
log(import.meta, namedAsyncDefaultExport)(true);
log(import.meta, namedDefaultExport)(true);
log(import.meta, asyncImplicitArrow)(true);
log(import.meta, implicitArrow)(true);
log(import.meta, asyncArrow)(true);
log(import.meta, arrow)(true);
log(import.meta, asyncGenFuncExpr)(true);
log(import.meta, genFuncExpr)(true);
log(import.meta, asyncFuncExpr)(true);
log(import.meta, funcExpr)(true);
log(import.meta, namedDefault)(true);
log(import.meta, exportedAsyncFunction)(true);
log(import.meta, exportedFunction)(true);
log(import.meta, myAsyncGenFunction)(true);
log(import.meta, myGenFunction)(true);
log(import.meta, myAsyncFunction)(true);
log(import.meta, myFunction)(true);`

const cases = [
   'namedExportedFunction',
   'namedAsyncDefaultExport',
   'namedDefaultExport',
   'asyncImplicitArrow',
   'implicitArrow',
   'asyncArrow',
   'arrow',
   'asyncGenFuncExpr',
   'genFuncExpr',
   'asyncFuncExpr',
   'funcExpr',
   'namedDefault',
   'exportedAsyncFunction',
   'exportedFunction',
   'myAsyncGenFunction',
   'myGenFunction',
   'myAsyncFunction',
   'myFunction']

// test(`fn-decorator: success`, function () {
//    const code = coder(oldCode)?.trim()
//    // expect(code.trim()).toBe(newCode.trim())
//    console.log(code)
// })   

// cases.forEach(function (name) {
//    test(`fn-decorator: ${name} success`, function () {
//       const code = coder(oldCode)?.trim()
//       const have = `log(import.meta, ${name})(true)`
//       // console.log(code)
//       // expect(code.trim()).toContain(have)
//    })   
// })

// nesting decorators !!! : TODO: nesting decorator
const tmpCode = `
@log(true) const asyncGenFuncExpr = async function* namedAsyncGenFuncExpr() { yield 1; };
@log(true) const arrow = () => {};
@log(true) const asyncArrow = async () => {};
@log(true) const implicitArrow = (a, b) => a + b;
@log(true) const asyncImplicitArrow = async () => await Promise.resolve("done");
@log(true) export default function namedDefaultExport() {}
@log(true) export default async function namedAsyncDefaultExport() {}
@log(true) export default function namedExportedFunction() {}
`

const expectedCode = `
function Ok() {}
auth(import.meta, log(import.meta, Ok))
`


test(`fn-decorator: playground`, function () {
   const code = coder(tmpCode)
   console.log(code)
})   