// import { expect, test } from "bun:test";
// import { routeProps } from "./[route]";
// import { testParams } from "./shared";

// test('[route|link]: ignore when [link] and [route] are empties', function() {
//    const oldProps = { link: '', route: '' }
//    const newProps = routeProps(oldProps, testParams)

//    expect(oldProps).toBe(newProps)
// })

// const scenariosRoute = [
//    { elementRoute: '/sample', currentRoute: '/test', hidden: true },
//    { elementRoute: '/test', currentRoute: '/', hidden: true },
//    { elementRoute: '/', currentRoute: '/test', hidden: false },
//    { elementRoute: '/', currentRoute: '/', hidden: false }
// ]

// test('[route]: routing hidden succeed', function () {
//    scenariosRoute.forEach(function (scenario) {   
//       window = { location: { pathname: scenario.currentRoute } } as any
//       window.location = global.window.location
   
//       const oldProps = { route: scenario.elementRoute }
//       const newProps = routeProps(oldProps, testParams)

//       if (scenario.hidden) expect(newProps.hidden).toBe(scenario.hidden)
//       else expect(newProps.hidden).toBe(undefined)
      
//       delete global.window
//       delete global.location
//    })
// })

// test('[link]: link binding succeed ', function () {
//    global.window = { location: { pathname: '/' } } as any
//    global.location = global.window.location
//    globalThis.history = <any> {
//       state: [],
//       pushState(a, b, route) {
//          this.state.push(route)
//       }
//    }

//    const oldProps = { link: '/test' }
//    const newProps = routeProps(oldProps, testParams)

//    expect(globalThis.history.state.length).toBe(0)
//    newProps.onClick()
//    expect(globalThis.history.state[0]).toBe('/test')

//    delete global.window
//    delete global.history
//    delete global.location
// })