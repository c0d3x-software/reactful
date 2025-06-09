
export function getCodeRegexes() {
   const regexes = {
      decoratedFunction: /^@([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\(([^)]*)\))?\s+(?:export\s+)?(?:async\s+)?function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/gm,
      decoratedConstArrowBlock: /^@([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\(([^)]*)\))?\s+(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{/gm,
      decoratedConstArrowImplicit: /^@([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\(([^)]*)\))?\s+(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*[^{]/gm,
      decoratedConstFuncExpression: /^@([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\(([^)]*)\))?\s+(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?function(?:\s+[a-zA-Z_$][a-zA-Z0-9_$]*)?\s*\([^)]*\)/gm,
      decoratedExportDefaultFunction: /^@([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\(([^)]*)\))?\s+export\s+default\s+(?:async\s+)?function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/gm,
      decoratedExportDefaultAssignment: /^@([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\(([^)]*)\))?\s+export\s+default\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?(?:function(?:\s+[a-zA-Z_$][a-zA-Z0-9_$]*)?\s*\([^)]*\)|\([^)]*\)\s*=>)/gm,
      decoratedGenFunction: /^@([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\(([^)]*)\))?\s+(?:(?:export\s+)?(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*)?(?:async\s+)?function\*\s*([a-zA-Z_$][a-zA-Z0-9_$]*)?/gm,
   }    

   return Object.entries(regexes)
}
