import { coder } from './coder';
import { Args } from '../../shared';

export const metadataPlugin = (args: Args): Args =>
   ({ path: args.path, code: coder(args.code, args.path) })