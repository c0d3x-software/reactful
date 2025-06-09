
import { OnLoadResult, plugin } from 'bun';
import { decoratorPlugin } from './decorator';
import { Args } from '../shared';
import { metadataPlugin } from './metadata/plugin';

export function functionPlugin(args: Args): OnLoadResult  {
   const pipeline = [decoratorPlugin, metadataPlugin]
   const reducing = ([args, plugin]) => plugin(args)
   const contents = pipeline.reduce(reducing, args)
   
   return { contents, loader: 'ts' }

}