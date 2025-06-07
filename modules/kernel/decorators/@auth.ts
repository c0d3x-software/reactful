import { STATUS_CODE } from '../constants'
import { ErrorDecoratorInfo } from './@error'

const UNHANDLED_UNAUTHORIZED = 'Unhandled authorization error...'
const DETAIL_ERROR = 'Try to access a component that requires '
   + 'an authorization from logon.role'

/** check if logon.role has any value */
export function auth(): Decorator<RFC>

/** check if logon.role has the object map value, like { role:'admin' } */
export function auth<T extends object = any>(constraints: T): Decorator<RFC>
export function auth(rule?: any): Decorator<RFC|ErrorHandler> {
   rule ||= {}

   return function (meta: ImportMeta, call: RFC) {
      const user = global.ioc.logon
      const args = JSON.stringify(rule).replace(/["\{\}]/g,"").replaceAll(':','=')
      const fail = getErrorDecorator(call) || getInjectedExceptionHandler()
      const none = !user || Object.keys(user).length == 0
      const rest = `for authorization defined by @auth(${args})`
      const kind = `The component ${call.name} requires`
      const errs = none ? [`${kind} a logged user`]
                        : Object.entries(rule).flatMap(validateOf)  
                                .flatMap(x => x ? [x] : [])

      if (errs.length == 0) return call      
      if (errs.length && !fail) throw UNHANDLED_UNAUTHORIZED

      const title = `The component ${call.name} requires authorization rule`

      const errorRequest: RequestError = {  
         title,
         status: STATUS_CODE.UNAUTHORIZED,
         detail: DETAIL_ERROR,
         instance: global.own.url,
         errors: rule
      }

      throw fail(errorRequest)

      function validateOf(entry: [string, any]) {   
         const [ field, value ] = entry
         const noLoggedUsers = !user
         const isNestingRule = typeof value == 'object'
         const notIncludeKey = !Object.keys(user).includes(field)

         const contentDiffer = value !== undefined
            && !user[field].match(new RegExp(value)) 

         // console.log(0, { noLoggedUsers, isNestingRule, notIncludeKey, contentDiffer })
         // console.log(1, { rule, field, value, user, userValue: user[field], regex:new RegExp(value) })
      
         if (noLoggedUsers) return [`Requires a logged user`]      
         if (isNestingRule) return Object.entries(value).map(validateOf)         
         if (notIncludeKey) return [`${kind} field user.${field} ${rest}`]      
         if (contentDiffer) return [`${kind} user.${field}=${value} ${rest}`]
      }  
   }
}

function getErrorDecorator(component: RFC) {
   const info = component.decorators.flatMap(x => x)
      .filter(x => x.name == 'error')
      .map(x => x as ErrorDecoratorInfo)
      .find(x => x)
   
   return info ? info.throw : undefined
}

function getInjectedExceptionHandler() {
   const specific = global.own.handlers.errors
      .filter(x => x.type == "request")
      .find(x => x.code == STATUS_CODE.UNAUTHORIZED)
   
   if (specific) return specific

   return global.own.handlers.errors
      .find(x => !x.code || x.code === 0)
}

// TODO: AuthDecoratorInfo