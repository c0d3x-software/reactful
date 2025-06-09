import { getCodeRegexes } from "./regex";

type CodeDetails = {
   full: string;
   call: string;
   sort: number;
   expr: string;
   name: string
}

export function coder(code: string, info = {} as any) {
   const introspections: CodeDetails[] = [];

   // avoid failure when has no space between ')' of decorator and function 
   code = code.replace(/\)(function|const|let|var|export|async|default)/gm, ') $1')

   for (const [field, regex] of getCodeRegexes()) {
      let match; regex.lastIndex = 0; // Reset regex index for each new scan

      while ((match = regex.exec(code)) !== null) {
         const [full, dn, args, fn, fn2] = match
         const expr = `@${dn}(${args})`
         const call = `${dn}(import.meta, ${fn || fn2})(${args});`;

         if (introspections.some(x => x.call == call)) continue;

         introspections.push({ expr, full, call, sort: match.index, name: field });
      }
   }

   info.count = introspections.length
   const removingDecoratorSyntax = (src: string, ref: CodeDetails, idx = 0) =>
      (idx = src.indexOf(ref.full)) < 0 ? src
         : src.substring(0, idx)
         + src.substring(idx + ref.expr.length + 1)

   return introspections
      .sort((a, b) => b.sort - a.sort)
      .reduce(removingDecoratorSyntax, code)
      + '\n\n' + introspections
         .map(x => x.call)
         .join('\n')
}