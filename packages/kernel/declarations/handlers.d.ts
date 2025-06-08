declare global {
   const HANDLER_TYPES = { error: 1, property: 2, request: 3 }
   
   type HandlerType = keyof typeof HANDLER_TYPES

   interface Handler<T extends HandlerType> { kind?:T }

   interface ErrorHandler extends Handler<"error"> {
      (fail: Exception): RRE
      type: ErrorType
      code: number
   }
   
   interface RequestHandler extends Handler<"request"> {
      (request: Request): Response | void
   }

   interface PropertyHandler<P = record> extends Handler<"property"> {
      (props: P, params: Params): P & record
   }

   interface Handlers {
      properties: PropertyHandler[]
      requests: RequestHandler[]
      errors: ErrorHandler[]
   }
}

export { }