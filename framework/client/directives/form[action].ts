import { getErrors, UpdateArgs } from '../typings'
import { authenticate, authorize } from './form[auth]'

/** Action binding transform [action] url into a RESTful request
 * with form authentication binding support */
export async function action(args: UpdateArgs) {
   const { props, fetch: caller } = args
   const config = authenticate(props)     
   const feeds = global.ioc

   feeds.await = true
   global.ioc.react()
   
   try {
      const result = await fetch(props.action!, config)
      if (!result.ok) feeds.fails = await getErrors(result)
      await authorize(result, props)
      caller && caller(result)
   } 
   catch (ex: any) {
      const error = ex?.message || ex?.toString()
      feeds.fails.push({ error, field: '', value: '' })
   }
   finally {
      const errors = feeds.fails

      errors.filter(e => !e.error)
            .forEach((e, i) => delete errors[i])

      errors.filter(e => errors.filter(x => e.error == x.error).length > 1)
            .forEach((e, i) => delete errors[i])

      feeds.await = false
      global.ioc.react()
   }
}  