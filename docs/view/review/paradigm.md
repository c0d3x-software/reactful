<script src='../js/index.js'></script>
<style>
@import url(../css/index.css);
table th { font-weight:600 !important; }
table td { font-weight:100 !important; color:white; }
</style> 

# Binding paradigm

## Dual binding

Reactful reactive objects emulates Angular's two-way data binding, abstracting the React one-way data flow using built-in `[data]` and `[bind]` <a href='directive.html'>directives</a>. The dual data binding is a two-way data binding design with a one-way data flow architecture. It is dual because it binds the value and the event change to each input-like element. 

| input | select | textarea | radio | checkbox | button | 
|-|-|-|-|-|-|
| onChange | onSelect | onChange | onChange | onChange | onClick |


## Props binding

This example is a conventional implementation of local states in React.

```tsx
import { useState } from "react"

export default function Old() {
  const [name, setName] = useState("World")
  const setValue = e => setName(e.target.value)

  return <>
      <h1>Hello, {name}!</h1>
      <input value={name} onChange={setValue) />
   </>
}
```

With reactive props, all the boilerplate code with hook imports and hoook calls are abstracted by its self-rendering algorithm.

```tsx
export default const New = props => <>
   <h1>Hello { props.name || 'World' }"</h1>
   <input value={props.name} onChange={e => props.name = e.target.value} />    
</>
```
And all implementation details of input.value and input.onChange is abstracted with `[data]` object with its `[bind]` field directives.

```tsx
const Hello = props => <>
   <h1>Hello { props.name || 'World' }"</h1>
   <input data={props} bind='name' />    
</>
```

## Form binding

Form binding enables controlled component dual where the `[data]` is placed in form and the `[bind]` in its input-like childrem elements.

```tsx
export const Form = props => <>
   <form data={props}>   
      Name: <input bind='name' />
      Mail: <input bind='mail' />    
      <button>Submit</button>
   </form>
</>
```
Here, the render is rendered only after the submit button. Form binding covers another specific features, like actions, validation and authentication.

## Validation binding

Validation binding reuse all native HTML `validation API` specification, injecting its validation errors in **feeds.fails** array in render-time.

```tsx
export const Todo = (props, feeds) => <>
   <form action='http://www.api.com' method='POST' > 
      Task: <input bind='task' maxlength={20} />
      Done: <input bind='mail' type='email' />    
      <button>Submit</button>
   </form>

   <ul hidden={!feeds.fails.length}>
      <label>Error Summary:</label>
      { feeds.fails.map((x,i) => <li>{ x }</li>) }
   </ul>   

   { feeds.await & <progress>loading...</progress>  }
</>
```

Custom extension validations is supported by `input[validate]` props and  `form[onError]` handler, as demonstrated bellow.

```tsx
export const Todo = (props, feeds) => <>
   <form action='http://www.api.com' method='POST' onError={onValidate} > 
      Task: <input bind='task' maxlength={20} />
      Done: <input bind='mail' type='email' validate={specificValidation} />    
      <button>Submit</button>
   </form>

   <ul hidden={!feeds.fails.length}>
      <label>Error Summary:</label>
      { feeds.fails.map((x,i) => <li>{ x }</li>) }
   </ul>   

   { feeds.await & <progress>loading...</progress>  }
</>

function specificValidation() {
   // return a non-empty string to invalidate
   return 'example of a custom email error message....'
}

function onValidate(errors: { field, error, value }[]) { 
   /* adding new errors to errors array */ 
   errors.push({ error: 'some custom error message' })
}
```

## Action binding

Action binding transform a form[data] into RESTful request, with JSON serialization of its data object and fetch api background request. The feeds.await updates its pending state flag, rendering the component after the response.

```tsx

export const Todo = (props, feeds) => <>
   <form data={props} action='http://www.api.com' method='POST' > 
      Task: <input bind='task' />
      Done: <input bind='mail' />    
      <button>Submit</button>
   </form>
   
   { feeds.await & <progress>loading...</progress>  }
</>
```

## Authentication binding

Authentication is yet an experimental feature, but for now, it enables JWT bearer authentication algorithm by `[bearer]` directive in submit-time. It sets the token name field of response JSON.

<style>
   aside[auth] ul { zoom: 0.95; margin-left: 20px; }
   [auth] ul li:first-of-type { 
      list-style-type: none; 
      letter-spacing: 7px;
      font-weight: bold;
      margin-left:-20px;
      margin-bottom: 5px;
      border-bottom: solid 1px grey;
   }
</style>

<aside auth cols='5:3'>

```tsx
export const Login = (props, { fails }) => <>
   <form action='https://localhost/api/auth'
         method='POST' bearer='access_token'
         data={props}> 

      username: <input bind='username' />
      password: <input bind='password' />
      <button>Submit</button>

      <ul class='error-summary'>
         { fails.map(e => ...) }
      </ul>   
   </form>
</>
```
- ALGORITHM
- submit to request
- stop if invalidated
- binding object fields
- object JSON serialization
- [bearer] sets token field
- request was sent to server
- authentication sent response
- ok: 'token' in sessionStorage
- ok: injects in feeds.logon
- err: append in feeds.fails
- err: clear 'token'

</aside>

In succeded authentication, the token is persisted in sessionStorage and could be accessed in feeds.logon, interecing with RBAC @auth decorator .

```tsx
// The `sessionStorage.set('logon')` retrives the current logged user
const Home = (props, { logon }) => <h1>username: { logon.name }</h1>
```


