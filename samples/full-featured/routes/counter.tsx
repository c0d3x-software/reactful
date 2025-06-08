import React from 'react'
import { Header } from '../components';
import { seo, client } from '@c0d3x/reactful'

const complexDataForTest = { person: { name: 'john' } }
const functionProps = () => console.log('function props works!')

//@ts-ignore
@seo('Counter', '...')
export default (props: any) => <>
   <Header>Counter</Header>
   <CountButton complex={complexDataForTest} onEvent={functionProps} />
   <h6 shown={false}>DONT SHOW ME!</h6>
</>

//@ts-ignore
@client(true)
export function CountButton(props: any, feeds: any) {
   function onClick() { props.count ||= 0; props.count++ }

   if (props.onEvent) props.onEvent()

   return <>
      <button style={{ padding:'20px' }} onClick={onClick}>
         COUNTED: <b>{ props.count || 0 }</b>
      </button><hr />
      tuple: <code>{ JSON.stringify(props.complex) }</code><br/>
      event: <code>{ props.onEvent?.toString() || 'fails...' }</code>
   </>
}