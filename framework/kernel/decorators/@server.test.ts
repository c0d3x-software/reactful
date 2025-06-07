// import { expect, test } from "bun:test"
// import { server, SERVER_PATH_ERROR } from "./@server"
// import { getMillisecondsFrom, SampleComponent } from "../helpers"
// import { IS_ONLY_FOR_ROUTE } from "../constants"

// test('@server: default component is allowed', async function () {
//    try { server("static")(import.meta, SampleComponent) }
//    catch (error) {
//       console.warn(error)
//       expect(error).toInclude(IS_ONLY_FOR_ROUTE)
//    }
// })

// function pretest(mode: ServerRef, span?: Time) {
//    const call = SampleComponent
//    const path = '/example/routes/sample'
//    const args = { url: 'file:///example/routes/sample' } as any
//    const time = span ? getMillisecondsFrom(span) : 0
   
//    server(mode as any, time)(args, call)

//    return  {
//       call,
//       path,
//       time,
//       mode,
//       href: path,
//       name: call.name
//    }
// }

// // test('@server: static server is defined', async function () {
// //    globalThis.IS_SERVER_SIDE_TEST = true   
// //    const expected = pretest("static")   
// //    expect(env.meta.calls).toContainValue(expected)
// // })

// // test('@server: dynamic server is defined', async function () {
// //    globalThis.IS_SERVER_SIDE_TEST = true
// //    const expected = pretest("dynamic")
// //    expect(env.meta.calls).toContainValue(expected)
// // })

// // test('@server: dynamic server is defined', async function () {
// //    globalThis.IS_SERVER_SIDE_TEST = true
// //    const expected = pretest("periodic", "1s")
// //    expect(env.meta.calls).toContainValue(expected)
// // })
