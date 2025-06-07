export interface IRouter {
   current: string
   history: string[]
   address: Address
   next(): boolean
   back(): boolean
   back(count: number): boolean
   goto(route: string): boolean
   goto(route: string, reload?: boolean): boolean
   is(route: string): boolean
   on<T = any>(event: RouteEvent): Promise<T>
}

export interface Address {
   hash: string
   host: string
}

export type RouteEvent = 'back' | 'goto'