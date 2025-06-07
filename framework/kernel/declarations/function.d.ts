import { DecoratorList } from '../decorators/index'
import '../decorators/@seo'

declare global {
   interface Function {
      /** unique identifier in render call order */
      readonly id: number

      /** html tag relation  */
      readonly tag: string
      
      //** function file path */
      readonly path: string
      
      /** true if it is an async function  */
      readonly async: boolean
      
      /** module of the function */
      readonly module: Module
      
      /** refresh render */
      readonly refresh: () => void

      /** true if it is not stateful */
      readonly stateless: boolean
      
      /** related function decorators */
      readonly decorators: DecoratorInfo[]
   }
}

export { }

