declare global {
   const ERROR_TYPES = { build: 1, render: 2, request: 3 }
   
   type ErrorType = '' | keyof typeof ERROR_TYPES

   interface Exception<T extends ErrorType> { kind?: T }
   
   interface Error extends Exception<"">  {  }

   interface SystemError extends Exception<"system"> {
      args: record
      module: string
      message: string
      function: string
      exception: Error
   }
   
   /** Error during building process */
   interface BuildError extends SystemError<"build"> { }

   /** Error during rendering process */
   interface RenderError extends SystemError<"render"> {
      side: Side
   }

   /** Based in ProblemDetails pattern */
   interface RequestError extends Exception<"request"> {
      title: string
      status: number
      detail: string
      instance: string
      errors?: record
   }
}

export { }
