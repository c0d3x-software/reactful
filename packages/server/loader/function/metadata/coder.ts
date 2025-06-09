import { CodeFunction, Ignore } from "../extractor/types"
import { extractFunctions } from "../shared"

export function coder(code: string, path: string, info = { count: 0 } as any) {
   const ignoreds = Ignore.Nested | Ignore.Method | Ignore.Anonymous

   function codeMonitoring(item) {
      info.count++
      return item
   }

   const templateCode = (fn: CodeFunction) => `
______${fn.name}['id'] = 0;
______${fn.name}['tag'] = {};
______${fn.name}['path'] = '${path}';
______${fn.name}['async'] = ${fn.is.asynchronous};
______${fn.name}['module'] = module;
______${fn.name}['refresh'] = () => {};
______${fn.name}['metatags'] = [];
______${fn.name}['stateless'] = true;
______${fn.name}['decorators'] = [];`

   const appendCode = (src: string, fnc: CodeFunction) => 
      src + templateCode(fnc).trim() + '\n\n'

   return code + '\n\n'
      + extractFunctions(code, ignoreds)
         .map(codeMonitoring)
         .filter(x => x.name)
         .reduce(appendCode, '')
         .replaceAll("______", "")
}
