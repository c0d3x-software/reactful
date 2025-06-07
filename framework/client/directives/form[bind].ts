import { SubmitEvent } from "../typings/form"
import { onValidation } from "./form[validation]"
import { action } from "./form[action]"
import { Props } from "./form[data]"

export function onSubmit(props: Props, params: Params): OnSubmitEvent {
   
   function inputValueOf(input: any) {
      const checkedTypes = ['checkbox', 'radiobutton']
      const isChecked = checkedTypes.includes(input.type)
      return isChecked ? input.checked : input.value
   }

   return async function(e: SubmitEvent) {
      e.preventDefault()
      e.stopPropagation()
      e.nativeEvent.submitter.onclick = "return false"

      const { errors, inputs } = await onValidation(props, e)
      
      if (errors.length > 0) return 

      else for (const input of inputs) {
         const field = input.getAttribute('bind')
         const value = inputValueOf(input)
         field && props.data.valueOf(true, field, value)
      }

      /** it follows to form[action] */
      if (props['action']) action({ props, params, inputs })

      global.ioc.react()
   }
}