import { createProper } from '../../kernel'

import { bindProps } from './[bind]'
import { styleProps } from './[style]'
import { routeProps } from './[route]'
import { formProps } from './form[data]'

export const proper = createProper([
   bindProps,
   formProps,
   styleProps,
   routeProps
])