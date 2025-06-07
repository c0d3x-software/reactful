import { expect, test } from "bun:test";
import { Path } from "./path";

const scenarios = [
   { key: 'path', inn: '/top/sub', out: '/top/sub', txt: 'normal case' },
   { key: 'path', inn: 'top/sub/', out: './top/sub', txt: 'no / in the begin' },
   { key: 'path', inn: '/top/sub/', out: '/top/sub', txt: 'extra / in the end' },
   { key: 'path', inn: 'file:///top/sub', out: '/top/sub', txt: 'file protocol' },
   { key: 'path', inn: 'file://c:\\ok', out: 'c:/ok', txt: 'window path' },
   { key: 'up.path', inn: '/top/sub', out: '/top', txt: 'up folder' },
   { key: 'name', inn: 'file://c:\\logs.txt', out: 'logs', txt: 'file name' },
   { key: 'name', inn: 'file://c:\\logs\\', out: 'logs', txt: 'folder name' },
   { key: 'Name', inn: 'file://c:\\logs.txt', out: 'Logs', txt: 'capitalize name' },
   { key: 'last', inn: 'file://c:\\routes\\logs.txt', out: 'logs.txt', txt: 'last part or the path' },
   { key: 'route', inn: 'file://c:\\logs.txt', out: '/logs', txt: 'file path to route' },
   { key: 'route', inn: 'file://c:\\routes\\logs.txt', out: '/logs', txt: 'file path to route with /route' },
]

scenarios.forEach(function ({ key, txt, inn, out }) {
   test(`Path: ${txt}`, function () {
      const path = new Path(inn)
      const data = key.split('.')
         .reduce((last, next) => last[next], path)

      expect(data).toBe(out)
   })
})


test('Path: up folder until find with "goto"', async function () {
   const resulted = await new Path('/a/b/c/d/e/f/g/h/i/j').backTo('c')
   const expected = '/a/b/c' 

   expect(resulted).toBe(expected)
})


test('Path: resolve relative path syntax', async function () {
   const resulted = await new Path('/a/b/c/d/e/f/g/h/i/j').resolve('../../../H').path
   const expected = '/a/b/c/d/e/f/g/H'
   expect(resulted).toBe(expected)
})

test('Path: get NPM module folder', async function () {
   const resulted = Path.npm
   const expected = 'reactful/framework/node_modules'
   expect(resulted).toInclude(expected)
})

test('Path: list file and folders in path with "browser"', async function () {
   const resulted = await new Path('.').resolve('../../kernel').browser(false)
   const expected = {
      name: "declarations",
      path: "./kernel/declarations",
      file: undefined,
      base: "./kernel",
    }   
   
   expect(resulted).toContainEqual(expected)
})