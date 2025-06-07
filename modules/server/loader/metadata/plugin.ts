import { Args, cleanCode, getModuleFunctions } from '../shared'

export function metadataPlugin(args: Args) {
   for (const fn of getModuleFunctions(args)) {  
      const char = fn.name == 'default' ? '$' : ''
      const name = char == '$' ? `default${char}` : fn.name

      // ignore if is not a component
      if (ignoreForMetadata(fn.name, args))
         return cleanCode(args.code)

      // anonymous default arrow function
      if (fn.name == 'default' && fn.type == 'arrow')  {
         const regex = fn.sync ? /export.+default/ : /export.+async\s*(.+)=>/
         const value = fn.sync ? `const default${char} =` : `const default${char} = $1 =>`

         args.code = args.code.replace(regex, value)
      }

      // anonymous default block function
      else if (fn.name == 'default' && fn.type == 'block') {
         const regex = /export.+function/
         const value = `function default${char}`
         const annex = fn.sync ? '' : 'async '

         args.code = args.code.replace(regex, annex + value)
      }

      // non-anonymous default block function
      // export default async function Name(props) { ... }
      // ------
      // async function Name(props) { ... }
      // export default Name
      else if (fn.mods.includes("default") && fn.type == 'block') {
         const clearedExportDefault = `export\\s+default`
         const clearedExportDefaultRgx = new RegExp(clearedExportDefault)

         args.code = args.code.replace(clearedExportDefaultRgx, '')
      }

      const functionNameRef = `${fn.name}${char}`

      const extendedFunctionMetadataCode = `
         const module = global.own.modules.find(x => x.path == meta.url);
         if (module) module.callers.push(${functionNameRef});
         
         ${functionNameRef}['id'] = 0;
         ${functionNameRef}['tag'] = {};
         ${functionNameRef}['path'] = '${args.path}';
         ${functionNameRef}['async'] = false;
         ${functionNameRef}['module'] = module;
         ${functionNameRef}['refresh'] = () => {};
         ${functionNameRef}['metatags'] = [];
         ${functionNameRef}['stateless'] = true;
         ${functionNameRef}['decorators'] = [];`
      
      const encodedClearedCode = ' ' + extendedFunctionMetadataCode
         .replaceAll('         ', '  ').trim()
      
      args.code += '\n\n /* ------------------ auto-generated code ------------------ */\n\n'
      args.code += `\n\ntry {\n ${encodedClearedCode} \n}`
      args.code += '\n catch(ex) { console.error("metadata auto-generated code", ex) } '

      if (fn.mods.includes('default')) args.code += `\n\nexport default ${name}`
   }         

   return cleanCode(args.code)
}


function capitalize(text: string) {
   if (!text) return text
   if (text.length < 2) return text
   const first = text[0].toUpperCase().trim()
   const lasts = text.slice(1).toLowerCase().trim()
   return first + lasts
}

function ignoreForMetadata(name: string, args: Args) {
   const isReactfulLib = args.path.includes('/@reactful/')
   const isExtension = new RegExp(`\\n.+\\.prototype\\..+${name}`)

   return isReactfulLib || isExtension.test(args.code)
}