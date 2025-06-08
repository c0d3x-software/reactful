import { ExpressionRef, FunctionRef } from "./types"

type Fs = FunctionRef[]
type Ds = ExpressionRef[]

export function notAllowNestedDecorator(path: string, functions: Fs, decorators: Ds) {
   const decoratorsWithNoModuleFunction = decorators
      .filter(d => functions.every(f => f.name != d.function))

   if (decoratorsWithNoModuleFunction.length)
      throw 'Invalid nesting functions decorators: '
      + decoratorsWithNoModuleFunction.map(x =>
         `function ${x.decorator} in ${path}`).join('\n')
   
   return decoratorsWithNoModuleFunction.length
}