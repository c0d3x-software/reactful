
export { }

interface Event<T> { target: { value: T } }


declare global {
   interface Object {
      /** get an object member by dot syntax field 
       * @param {boolean} empty cast null and undefined to ''
       * @param {string} field dot syntax path to object value
       * @returns object value of object field */
      valueOf<T = any>(empty: boolean, field: string): T

      /** set an object member by dot syntax field 
       * @param {boolean} empty cast null and undefined to ''
       * @param {string} field dot syntax path to object value
       * @param {object} value value to set within object field 
       * @returns log array with mutation information */
      valueOf<T = any>(empty: boolean, field: string, value: T): record[]

      /** set an object member by dot syntax field 
       * @param {boolean} empty cast null and undefined to ''
       * @param {string} field dot syntax path to object value
       * @param {object} value event.target.value to set in field 
       * @returns log array with mutation information */
      valueOf<T = any>(empty: boolean, field: string, value: Event<T>): record[]

      /** convert to JSON stringify */
      toString(): string

      /** convert to JSON stringify with identation */
      toString(identation?: number): string
   }

   interface ObjectConstructor {
      isEmpty(that: any): boolean
      merge<T extends Object>(of: T, to: AnyKeyOf<T> | record)
      parse<T extends Object = any>(obj: T): ParseObject<T>      
      fromProxy(that: any): any
   }
}