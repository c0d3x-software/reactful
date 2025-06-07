export interface ExpressionRef {
   function: string,
   decorator: string,
   expression: string
}

export interface FunctionRef {
   name: string
   path: string
   args: string
   body: string
   full: string
   sign: string
   expr: string
   mods: string
   sync: boolean
   type: CallType
   none: boolean // anonymous
}

export type Item = { index: number, regex: RegExp }
export type CallType = "arrow" | "block"