// transform-decorator-plugin.ts
import type { BunPlugin } from 'bun';

export const decoratorTransformPlugin: BunPlugin = {
   name: 'decorator-transform',
   setup(build) {
      build.onLoad({ filter: /\.(ts|tsx)$/ }, async function(args) {
         const oldCode = await Bun.file(args.path).text();
         const newCode = await transpiler(oldCode)
         return {
            contents: newCode,
            loader: 'ts'
         };
   }) },
};

type CodeDetails = {
   full: string;
   call: string;
   base: string;
   sort: number;
}

export function transpiler(code: string) {
   const introspections: CodeDetails[] = [];

   for (const regex of getCodeRegexes()) {
      let match; regex.lastIndex = 0; // Reset regex index for each new scan

      while ((match = regex.exec(code)) !== null) {
         const [full, decorator, args, sign, fn] = match
         const call = `${decorator}(import.meta, ${fn})(${args});`;
         const base = full.replace(sign, '')

         introspections.push({ base, full, call, sort: match.index });
      }
   }

   const removingDecoratorSyntax = (src: string, ref: CodeDetails, idx = 0) =>
      (idx = src.indexOf(ref.full)) < 0 ? src
         : src.substring(0, idx)
         + src.substring(idx + ref.base.length)

   return introspections
      .sort((a, b) => b.sort - a.sort)
      .reduce(removingDecoratorSyntax, code)
      + introspections
         .map(x => x.call)
         .join('\n')
}

function getCodeRegexes() {
   const NM = `[a-zA-Z_$][a-zA-Z0-9_$]*`;
   const FN_ARGS = `\\([^()]*\\)`;
   const DEC_ARGS = `(?:\\(((?:[^)(]+|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\))?`;

   const namedFunctionRegexes = {
      simple: new RegExp(`@(${NM})${DEC_ARGS}\\s*(function\\s+(${NM})\\s*${FN_ARGS}\\s*\\{)`, 'g'),
      async: new RegExp(`@(${NM})${DEC_ARGS}\\s*(async\\s+function\\s+(${NM})\\s*${FN_ARGS}\\s*\\{)`, 'g'),
      export: new RegExp(`@(${NM})${DEC_ARGS}\\s*(export\\s+function\\s+(${NM})\\s*${FN_ARGS}\\s*\\{)`, 'g'),
      exportAsync: new RegExp(`@(${NM})${DEC_ARGS}\\s*(export\\s+async\\s+function\\s+(${NM})\\s*${FN_ARGS}\\s*\\{)`, 'g'),
   };

   const arrowFunctionRegexes = {
      const: new RegExp(`@(${NM})${DEC_ARGS}\\s*(const\\s+(${NM})\\s*=\\s*${FN_ARGS}\\s*=>)`, 'g'),
      let: new RegExp(`@(${NM})${DEC_ARGS}\\s*(let\\s+(${NM})\\s*=\\s*${FN_ARGS}\\s*=>)`, 'g'),
      var: new RegExp(`@(${NM})${DEC_ARGS}\\s*(var\\s+(${NM})\\s*=\\s*${FN_ARGS}\\s*=>)`, 'g'),
   };

   return [
      ...Object.values(namedFunctionRegexes),
      ...Object.values(arrowFunctionRegexes),
   ];
}