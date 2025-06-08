type Props = record & { await: (props, params) => Promise<RRE> }

const LACK_OF_METADATA = '[await] props requires an exported component'
const INVALID_AWAIT_PROPS = '[await] props must be functional component'
const NO_ASYNC_AWAIT_PROPS = '[await] props must be a Promise'

function warn(message: string): true { console.warn(message); return true }

/* transform [await] in componentPath to send to client-side for stream JSX */
export const awaitProps: PropertyHandler = function (props: Props, params: Params) {
   try {
      
         if (window?.document) return props
      
         const asyncComponent = props.await as any as RFC
         const componentPath = asyncComponent?.path
         const isNotFunction = typeof asyncComponent != "function"
         const isNotAsyncJsx = asyncComponent.async == false
         const clientSideNow = global.env.SIDE == "client"
      
         if (clientSideNow || !asyncComponent) return props
         if (isNotFunction) return warn(INVALID_AWAIT_PROPS) && props
         if (!componentPath) return warn(LACK_OF_METADATA) && props
         if (isNotAsyncJsx) return warn(NO_ASYNC_AWAIT_PROPS) && props
      
         const clientSideAwaitProps: any = JSON.stringify({
            name: (props.await.name || '').replace(/\$$/, ''),
            path: componentPath
         })
      
         return (props.await = clientSideAwaitProps) && props

   } catch (error) {
      throw <RenderError>{
         args: {},
         side: 'server',
         exception: error,
         module: 'bundler.ts',
         function: awaitProps.name,
         message: 'Creating await content as html attribute',
      }
   }
}