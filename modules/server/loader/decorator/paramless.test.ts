import { expect, test } from "bun:test";
import { getAllParenthelessDecorators } from "./paramless";

const code = `
   @test1
   @test2()
   @test3(a,b,c)
   @test4('testing...')
   function ok() { return true }
`

test('decorator: parenteless decorator', function () {
   const resulted = getAllParenthelessDecorators({ code, path: 'file://' })
   const expected = ['@test1']
   
   expect(resulted).toEqual(expected)
})