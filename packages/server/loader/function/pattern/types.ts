export interface FunctionRegexResult {
   key: string
   name: string
   index: number
   header: string
   pattern: RegExp
   complete: string
}

export interface RegexLoop {
   field: string
   regex: RegExp
   match: RegExpExecArray
}
