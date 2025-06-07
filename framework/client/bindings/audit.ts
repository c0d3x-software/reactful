export class AuditProxy {
   /** let event: when the rendered is triggered after change 
    * after delay of the debounce algoritm */
   let: () => void = () => { }
   
   /** get event: when state is rendered */
   get: (field: string) => void = () => { }

   /** set event: when state is changed */
   set: (field: string, value: any) => void = () => { }
}