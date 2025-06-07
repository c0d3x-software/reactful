import { ErrorDecoratorInfo } from "../../kernel"

/** in rendering loop, client is the fallback render, when
 * try to render in server-side, a component with no marked 
 * as client-side, and fails. Here, the failed component will
 * sent to client-side to try to render. */
export function client(jsx: RFE, url: RouteString, ex: any) {
   const fails = [ex.message, ex.stack].distinct()

   const error = getErrorDecorator(jsx) || getGenericErrorHandler()
   const jsons = stringifyObjectFieldValues(jsx.props)
   const child = error(500, fails) as RRE
   const props = { ...jsons, retry: url, hidden: true, ...child?.props }

   // server-side renders fais for this route (url)   
   global.own.routes[url].crash = jsx

   return { ...child, props }
}

function getErrorDecorator(jsx: any) {
   return jsx.type.decorators
      .map(x => x as ErrorDecoratorInfo)
      .find(x => x.name == 'error')?.throw
}

function getGenericErrorHandler() {
   const handler =  global.own.handlers
      .errors.find(x => !x.code)
   
   const exception = `
      There is no error handler injected in
      current project. Create and inject an
      error handler in launc().inject(...).`   
   
   if (!handler) throw exception
      .replaceAll('/\n', ' ')
      .replaceAll('   ', '')
      .replaceAll('  ', '')
      .trim()
}

function stringifyObjectFieldValues(obj: record) {
   const strings = (k, v) => [k, JSON.stringify(v)]
   const entries = Object.entries(strings)
   return Object.fromEntries(entries)
}
