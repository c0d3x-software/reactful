import { expect, test } from "bun:test";
import { ExpressionRef, FunctionRef } from "./types";
import { notAllowNestedDecorator } from "./nesting";

function pretest(functionNames: string[], decoratorNames: string[]) {
   const functions = functionNames.map(name => ({ name } as FunctionRef))
   const decorators = decoratorNames.map(name => ({ function: name } as ExpressionRef))
   
   return { functions, decorators, path: 'file://'}
}

test('decorator: not allowed nested decorator', function () {
   const { functions, decorators, path } = pretest(['test'], ['sample'])
   
   try { notAllowNestedDecorator(path, functions, decorators) }   
   catch (ex) { expect(ex).toInclude('Invalid nesting functions decorators') }
})

test('decorator: all decorator has a function for', function () {
   const { functions, decorators, path } = pretest(['test'], ['test'])

   notAllowNestedDecorator(path, functions, decorators)
})
