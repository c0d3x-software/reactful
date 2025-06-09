import type { BunPlugin } from 'bun';
import { coder } from './coder';

export const topLevelFunctionMetadataPlugin: BunPlugin = {
   name: "bun-top-level-function-metadata-regex-specific",
   setup(build) {
      build.onLoad({ filter: /\.(ts|tsx|js|jsx)$/ }, async (args) => {
         const original = await Bun.file(args.path).text();
         const contents = coder(original, args.path)
         const loader = args.path.endsWith('.tsx')
            || args.path.endsWith('.jsx') ? "tsx" : "ts"
         
         return { contents, loader }
      });
   },
};