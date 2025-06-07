import { bundler } from '../runner'
import { Path, logger } from '../shared'
import { SERVING } from '../../kernel'
import { fetcher } from "../router"
import { loadEnv } from './loader'

/** starts the server from '#root' HTML element */
export async function render()

/** starts the server from query selector entry point  
 * @param {string} query query select for root element */
export async function render(query: string)

export async function render(query = '#root') {   
   await global.env.load(async _ => await loadEnv('.env'))

   Path.startup() && await bundler(false)
   const port = parseInt(process.env.PORT || '3000')             
   logger.append(`\n${SERVING.swap(port)}`, "FG_GREEN")    
   global.env.FLAGS.serve = true

   return Bun.serve({ 
      development: global.env.FLAGS.debug,
      port: process.env.PORT || port,
      fetch: fetcher,
   }) 
}