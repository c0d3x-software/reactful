import React from 'react'
import { Header } from '../components/header'
import { seo, client, useStore } from '@c0d3x/reactful'

const state1 = useStore({ value:11 })
const state2 = useStore({ value:99 })
const styles = { textAlign: 'right' } as any

const SubGlobal = (props, { store }) => <input {...props} data={store} bind='value' />

const SubLocal= props => <>
   <input {...props} style={styles} data={props} bind='value' />
   <label> = {props.value}</label>
</>

//@ts-ignore
// @client(true, state1) 
// TODO: inner component with same orbital state doesn't work ???
const SubOrbital = props => <input {...props} data={state1} bind='value' />

//@ts-ignore
@client(true, state1, state2)
@seo('Hello', 'Hello forms...')
export default function Hello(props, { store }: Feeds) {
   if (globalThis.document) globalThis.props = props

   return <>
      <Header>Hello Forms</Header>
      <main grid gaps='0 10px' cols={1} className='hello'>      
         <label>
            <b>LOCAL state </b> <code>function(props)</code><br/>
            <input id='1' data={props} bind="value" placeholder="{props}" />            
            <input id='1.1' bind="value" placeholder="default" />
            <SubLocal id='1.1.1' placeholder="inner" />
         </label>
         
          <label>
            <b>GLOBAL state</b> <code>function(props, {'{ store }'})</code><br/>
            <input id='2' data={store} bind="value" placeholder="outer" />
            <SubGlobal id='2.1' placeholder='inner' />
         </label>

          <label>
            <b>ORBITAL state</b> <code>useStore(...) + @client(true, ...)</code><br/>
            <input id='3' data={state1} bind="value" placeholder="outer" />
            <SubOrbital id='3.1' placeholder='inner' /> 
            <input id='3.2' style={styles} data={state2} bind="value" placeholder="other" /> = {state2.value}
         </label> 
      </main>
      <br />
      <hr />
      <code>
         <strong>local</strong>: <label id='l1'>{ props.value }</label><br />
         <strong>global</strong>: <label id='l2'>{ store.value }</label><br />
         <strong>orbital</strong>: <label id='l3'>{ state1.value }</label> 
      </code>
   </>
}