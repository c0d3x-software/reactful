import { inject } from './inject'
import { render } from './render'
import { LaunchFluent } from './shared'

interface Settings {
   store?: record,
   query?: string
   paths?: Folders
}

/** reactful startup server 
 * @param {string} routes entry routes folder */
export function launch(routes: RouteString | Settings): LaunchFluent

/** reactful startup server 
 * @param {string} routes entry routes folder 
 * @param {Context} settings custom server settings */
export function launch(routes: RouteString | Settings, settings: Settings): LaunchFluent

/** reactful startup server 
 * @param {string} routes entry routes folder 
 * @param {Context} settings custom server settings */
export function launch(settings?: Settings): LaunchFluent

export function launch(args: RouteString | Settings, settings?: Settings) {
   const route = typeof args == 'string' && args as RouteString
   settings = route ? settings : args as Settings   
   
   global.ioc.store = settings.store ?? undefined
   global.own.root = settings.query ?? global.own.root
   global.own.directories.routes = route || '/routes'
   global.own.directories = settings.paths ?? global.own.directories

   return { inject, render }
}