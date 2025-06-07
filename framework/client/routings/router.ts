import { isRouted } from './is-routed'
import { Address, IRouter } from '../typings'

class Router implements IRouter {
   private routes: string[] = []
   private cursor: number = 0

   public get current() {
      if (!location) return global.own.url
      else return window.location.pathname
   }

   public get address() {
      const value: Address = {
         hash: window?.location.hash,
         host: window?.location.host
      }

      return value
   }

   public get history() { return this.routes }

   public goto(route: string, reload?: boolean) {
      if (!route) return false
      if (reload) location.href = route
      else history.pushState(null, '', route)
      return true
   }

   public next(count?: number): boolean {
      if (this.cursor >= this.routes.length) return false;
      if (count === undefined) return this.next(1)
      if (!count) return false

      this.cursor++
      this.goto(this.routes[this.cursor])

      return true
   }

   public back(count?: number): boolean {
      if (count === undefined) return this.back(1)
      if (!this.cursor) return false
      if (count < 1) return false

      this.cursor--
      this.goto(this.routes[this.cursor])

      return true
   }

   public on = event => new Promise<any>((done, fail) => {
      if (!event) fail('invalid event')
      else done(true) // TODO
   })

   public is(route: string) {
      return isRouted(this.current, route)
   }
}

export const router = new Router()