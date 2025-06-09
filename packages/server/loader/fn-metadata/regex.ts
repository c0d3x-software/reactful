export const getFunctionRegexes = () => functionRegexes;

const functionRegexes = {
   defaultNamedAsyncFunction: /\bexport\s+default\s+async\s+function\s+([a-zA-Z_$][\w$]*)\s*\(/gm,
   defaultNamedFunction: /\bexport\s+default\s+function\s+([a-zA-Z_$][\w$]*)\s*\(/gm,
   exportedAsyncFunction: /\bexport\s+async\s+function\s+([a-zA-Z_$][\w$]*)\s*\(/gm,
   exportedFunction: /\bexport\s+function\s+([a-zA-Z_$][\w$]*)\s*\(/gm,
   namedAsyncGeneratorFunction: /\basync\s+function\*\s+([a-zA-Z_$][\w$]*)\s*\(/gm,
   namedGeneratorFunction: /\bfunction\*\s+([a-zA-Z_$][\w$]*)\s*\(/gm,
   namedAsyncFunction: /\basync\s+function\s+([a-zA-Z_$][\w$]*)\s*\(/gm,
   namedFunction: /\bfunction\s+([a-zA-Z_$][\w$]*)\s*\(/gm,
   namedAsyncGeneratorFunctionExpression: /\b(?:const|let|var)\s+([a-zA-Z_$][\w$]*)\s*=\s*async\s+function\*\s*\(/gm,
   namedGeneratorFunctionExpression: /\b(?:const|let|var)\s+([a-zA-Z_$][\w$]*)\s*=\s*function\*\s*\(/gm,
   namedAsyncFunctionExpression: /\b(?:const|let|var)\s+([a-zA-Z_$][\w$]*)\s*=\s*async\s+function\s*\(/gm,
   namedFunctionExpression: /\b(?:const|let|var)\s+([a-zA-Z_$][\w$]*)\s*=\s*function\s*\(/gm,
   asyncArrowFunction: /\b(?:const|let|var)\s+([a-zA-Z_$][\w$]*)\s*=\s*async\s*\([^\)]*\)\s*=>/gm,
   arrowFunction: /\b(?:const|let|var)\s+([a-zA-Z_$][\w$]*)\s*=\s*\([^\)]*\)\s*=>/gm
};

const legacy = {
   normal: /^function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{[\s\S]*?\}/gm,
   async: /^async\s+function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{[\s\S]*?\}/gm,
   arrowBlock: /^(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}/gm,
   arrowImplicitReturn: /^(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(async\s*)?(\([^)]*\))\s*=>\s*([^{][\s\S]*?)(?:;|$)/gm,
   functionExpression: /^(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?function(?:\s+[a-zA-Z_$][a-zA-Z0-9_$]*)?\s*\([^)]*\)\s*\{[\s\S]*?\}/gm,
   exportDefaultFunction: /^export\s+default\s+function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{[\s\S]*?\}/gm,
   exportFunction: /^export\s+(?:async\s+)?function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*\{[\s\S]*?\}/gm,
   exportDefaultAssignment: /^export\s+default\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?(?:function(?:\s+[a-zA-Z_$][a-zA-Z0-9_$]*)?\s*\([^)]*\)|(?:\([^)]*\))?\s*=>)\s*\{?[\s\S]*?\}?(?:;|$)/gm,
}