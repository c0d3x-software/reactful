import '../../kernel'

export default ['data', 'bind']

interface Props<T extends object = object> { type: string, data?: T, bind?: string } 

/**
 * Two-way data binding props
 * @param {object} props current props
 * @param {Params} params directive args */
export const bindProps: PropertyHandler = function(props: Props, params: Params) {   
   const fieldOf = b => b ? 'checked' : 'value'
   const valueOf = e => content.valueOf(field, e, true)
   const eventOf = (e,b?) => ({ ...props, [fieldOf(b)]: props[fieldOf(b)], [e]: valueOf })
   const inputOf = x => params.tag == "input" && props.type == x
   const noInput = !params?.tag?.match(/input|select|textarea/i)
   const content = props?.data ?? params?.mem
   const noRefer = Object.isEmpty(content)
   
   if (noInput || noRefer || !props.bind) return props
   
   const field = props.bind
   const value = content.valueOf(field)
   const child = inputOf("radio") ? eventOf('onChange', true)
               : inputOf("button") ? eventOf('onClick', true)
               : inputOf("checkbox") ? eventOf('onChange', true)      
               : params.tag == "input" ? eventOf('onChange')
               : params.tag == "select" ? eventOf('onSelect')
               : params.tag == "textarea" ? eventOf('onChange')
               : props

   return { ...child, value: value || "\r" }
} 

