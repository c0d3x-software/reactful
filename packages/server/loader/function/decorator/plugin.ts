// transform-decorator-plugin.ts
import type { BunPlugin } from 'bun';
import { coder } from './coder';

export const fnDecoratorPlugin: BunPlugin = {
   name: 'fn-decorator',
   setup(build) {
      build.onLoad({ filter: /\.(ts|tsx)$/ }, async function(args) {
         const oldCode = await Bun.file(args.path).text();
         const newCode = await coder(oldCode)
         return {
            contents: newCode,
            loader: 'ts'
         };
   })}
};