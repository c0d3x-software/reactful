import { HTML, ChildProps } from "../typings/form"
import { SubmitEvent } from "../typings/form"
import { Props } from "./form[data]"

type SubmitReturn = Promise<{ errors: Invalid[], inputs: HTMLInputElement[] }>

/** form[data] for reactive rendering after submit the form  */
export async function onValidation(props: Props, e: SubmitEvent): SubmitReturn {
   global.ioc.fails = []

   const founds = document.querySelectorAll<HTML>(":invalid")
   
    Array.from(founds)
      .filter(x => !!x.setCustomValidity)
      .forEach(x => x.setCustomValidity(''))
   
   const inputs = Array.from<HTML>(e.target.elements)
   const errors = await getInvalidInputs(props, inputs)

   if (errors.length) e.target.reportValidity()  
   
   return { errors, inputs }
}

export async function getInvalidInputs(props: Props, inputs: HTML[]) {
   if (!props.children?.forEach) return []

   const getValidatePropsFrom = (props: ChildProps, bindProps: ChildProps[] = []) => {
      if (props?.bind && props?.validate) bindProps.push(props)         
      if (Array.isArray(props?.children)) props.children
         .forEach(c => getValidatePropsFrom(c.props, bindProps))

      return bindProps
   }

   const getInputFrom = (bind: string) => inputs
      .find(x => x.getAttribute('bind') == bind)

   const getErrorOf = (error: string, input: any) =>
      error && input && input.setCustomValidity(error) || ({error, input})

   const errors = getValidatePropsFrom(props)
      .map(props => ({ bind: props.bind, test: props.validate! }))
      .map(({ bind, test }) => ({ test, data: getInputFrom(bind!) }))
      .map(({ test, data }) => [ test(data?.value), data ])
      .map(([ fail, data ]) => getErrorOf(fail, data))

   // errors && console.warn('input errors', errors)

   errors.forEach(({ input }) => input.onchange = () => input.setCustomValidity(''))

   const invalids = inputs
      .filter(x => !!x.validationMessage)
      .map(x => ({
         error: x.validationMessage,
         value: x.value,
         field: x.name
      }))

   const validate = props.onValidate || (x => x)

   return (await validate(invalids)) || []
}