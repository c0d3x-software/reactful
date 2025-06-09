import { getFunctionRegexes } from "./regex";

export function coder(code: string, path: string, info = {} as any) {
   info.count = 0

   const regexes = getFunctionRegexes();

   const counter = () => {
      info.count++
      return true
   }

   const isAsync = fn => 
      code.match(regexes.asyncArrowFunction)
         ?.filter(x => x.length)
         .some(x => x[0].includes(fn))
         .toString() ?? 'false'

   const templateCode = fn => counter() && `
______${fn}['id'] = 0;
______${fn}['tag'] = {};
______${fn}['path'] = '${path}';
______${fn}['async'] = ${isAsync(fn)};
______${fn}['module'] = module;
______${fn}['refresh'] = () => {};
______${fn}['metatags'] = [];
______${fn}['stateless'] = true;
______${fn}['decorators'] = [];`
   
   const distinct = (arr, itm) =>
      arr.includes(itm) ? arr : arr.concat([itm])

   const appendCode = (src, nme) => nme?.length
      ? src + templateCode(nme).trim() + '\n\n'
      : src

   const addCode = Object
      .entries(regexes)
      .map(([_, rgx]) => rgx)
      .map(rgx => code.matchAll(rgx))
      .flatMap(res => res.toArray())
      .filter(res => res.length > 0)
      .flatMap(x => x[1])
      .reduce(distinct, [])
      .reduce(appendCode, '')
      .replaceAll("______", "")

   return code + '\n\n' + addCode
}