import { coder } from './coder';
import { Args } from '../../shared';
import { validate } from './validate';

export function decoratorPlugin(args: Args): Args {
   if (!validate(args)) return args

   return ({ path: args.path, code: coder(args.code, args.path) });
}
