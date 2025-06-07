"use client"

import { onSubmit } from "./form[bind]"

export default ['data', 'bearer', 'validade', 'onFetch', 'onSubmit', 'onValidate']

export interface Props<T extends object = object> {
   data: T
   children?: any
   onFetch?: OnFetchEvent
   onSubmit?: OnSubmitEvent
   onValidate?: OnValidateEvent // custom post-validation
}

/** reactful forms as form[data] and children[bind] 
 * with RESTful actions and validation api */
export function formProps(props: Props, params: Params) {
   if (global.env.SIDE == "server") return props
   if (params.tag !== "form") return props
   if (!Object.keys(props).includes("data")) return props
   
   // applying onSubmit binding from form[bind].ts
   return { ...clearProps(props), onSubmit: onSubmit(props, params) }
}

export function clearProps(props: any) {
   const newProps = { ...props }
   delete newProps['onAwait']
   delete newProps['onValidate']
   return newProps
}

