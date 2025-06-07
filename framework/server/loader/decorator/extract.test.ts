import { expect, test } from "bun:test";
import { extractDecorators } from "./extract";

const code = `
   @test1(a,b,c)
   function test() { return true }

   @sample2
   function sample() { return true }

   @example3('it works')
   function example() { return true }
`

const expected = [
   {
      function: "test",
      decorator: "test1",
      expression: "@test1(a,b,c)",
   }, {
      function: "sample",
      decorator: "sample2",
      expression: "@sample2()",
   }, {
      function: "example",
      decorator: "example3",
      expression: "@example3('it works')",
   }
 ]

test('decorator: extract decorators', function () {
   const resulted = extractDecorators({ code, path: 'file://' })   
   expect(resulted).toEqual(expected)
})