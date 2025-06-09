import { expect, test } from "bun:test";
import { getFunctionCodes } from "./extract";

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
export default function namedExportedFunction() {}

function topFunction() { function subFunction() { } }`

const functions = 'myFunction,myAsyncFunction,myGenFunction,myAsyncGenFunction,'
   + 'exportedFunction,exportedAsyncFunction,namedDefault,namedFuncExpr,namedAsyncFuncExpr,'
   + 'namedGenFuncExpr,namedAsyncGenFuncExpr,arrow,asyncArrow,implicitArrow,asyncImplicitArrow,'
   + 'namedDefaultExport,namedAsyncDefaultExport,namedExportedFunction,topFunction'

test('fn-pattern: ignore nested function', function () {
   const functionCodes = getFunctionCodes(oldCode, true)

   // console.log(functionCodes)

   console.log(functionCodes.filter(x => x.name == 'subFunction'))
})

test('fn-pattern: ignore anonymous function', function () {
})