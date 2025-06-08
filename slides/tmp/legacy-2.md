---
marp: true
class: invert
theme: uncover
paginate: true
---

# REACTFUL

Minimalist Stateful React framework

---

## Personal information
### reactful

- Jonathan de Sena Ribeiro
- mestre em ciência da computação (UFC)
- graduado em filosofia (UECE)
- 19 anos de fullstack dev

---

# Context

React ecosystem major problems

> stateness | modularity | conventions

---

## Stateful **paradox**
### context

<style scoped>
   /* pre { text-align: center; }
   pre * { text-align: left; } */
   h1 {
      color: whitesmoke;
      letter-spacing: 30px !important;      
      padding-bottom: 0;
      margin-bottom: 0;
      line-height:50px;
      font-size: 0.7rem;
   }

   aside * { margin-top: 0; align-self: start; }
   
   aside > *:first-of-type {      
      letter-spacing: 15px !important;
      text-transform: lowercase !important;
      border-right: dotted 30px transparent;
   }
</style>

<br/>
<aside cols='4:5' style='border-bottom: solid 20px transparent'>
<div>

# **stateless**<br/>minimalism

```tsx
const Hello = props => <>
   <h1>Hello {props.name}!</h1>
</>
```

</div><div>

# **STATEFUL**<BR/>MAXIMALISM

```tsx
import React, { useState } from 'react';

export default function Hello() {
  const [name, setName] = useState('');
  
  return <h1>
      <p>Hello, {name || 'World'}!</p>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
   </h1>
}
```

</div></aside>

---

<style scoped>
   h5 { 
      font-weight:100; 
      font-size: 0.8rem;
      color: silver;
      margin: 0;
   }
</style>

## Stateful **complexity**
### context


<div cols='3'><div>

##### useState

```tsx
import React, { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  
  return <h1>
      <p>Hello, {name || 'World'}!</p>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
   </h1>
}
```

</div><div>

##### useContext

```tsx
import React, { createContext, 
   useContext, useState } from 'react';

const MyContext = createContext();

function Child() {
  const [name, setName] = useContext(MyContext);
  return <>
      <h1>Hello, {name || 'World'}!</h1>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
   </>
}

export default function App() {
  const state = useState('');
  return <MyContext.Provider value={state}>
      <Child />
   </MyContext.Provider>
}
```

</div><div>

##### useQuery

```tsx
import React, { useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { useQuery, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function Greeting({ name }) {
  const { data, isLoading } = useQuery({
    queryKey: ['greeting', name],
    queryFn: () => fetch(url).then(x => x.json()),
    enabled: !!name, 
  });

  if (!name) return <p>Hello, World!</p>;
  if (isLoading) return <p>Loading...</p>;

  return <p>{data}</p>;
}

export default function App() {
  const [name, setName] = useState('');

  return <QueryClientProvider client={queryClient}>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
      <Greeting name={name} />
    </QueryClientProvider>
}
```

</div></div>


---

## Overall issues 
### context

Main React development issues 

<aside cols='4:5'>
<div style='font-family: agave'>

- **Stateful verbosity**
- CSS module leaking
- coupled convention
- rendering metadata

</div><div>

```tsx
import './styles.css'

// in current folder
const Hello = props => ...

// in another folder
const Hi = props => ...
```

</div></aside>

---

## Framework issues 
### context

Main React development issues 

<aside cols='4:5'>
<div style='font-family: agave'>

- Stateful verbosity
- **CSS module leaking**
- coupled convention
- rendering metadata

</div><div>

```tsx
import './styles.css'

// in current folder
const Hello = props => ...

// in another folder
const Hi = props => ...
```

</div></aside>

---

## Problem priority
### context

<style scoped>
   table td { border-color: dimgrey !important }
   table tr td { padding: 20px 50px !important; }
   table td:nth-of-type(1) { color:grey; }
   table tr:nth-of-type(1) td:nth-of-type(2) { letter-spacing:13px !important; }
   table tr:nth-of-type(2) td:nth-of-type(2) { letter-spacing:3px !important; }
   table tr:nth-of-type(1) td { font-size: 1.1rem;   }
   table tr:nth-of-type(2) td { font-size: 0.8rem; }
   table tr td:nth-of-type(2) {
      text-align: center !important;
   }
</style>

| | |
|-|-|
| principal | stateful complexity |
| secundary | css module, route conventions, render metadata, remote states
| derivative | function decorators, attribute directives, property bindings, dependency injections |

---

## Systemic flaws
### context


React ecosystem also deals with another verbosity and complexity flaws.

- **react hooks**: state handling complexity   
* **react binding**: data binding verbosity      
* **tanstack query**: remote state verbosity      
* **next rendering**: 'use directive' is modular 
* **next routing**: coupled name conventions 
* **javascript decorator**: no function support
* **javascript CSS module**: scopeless CSS import        

---

# Proposal

Reactful Framework

>  styling | routing | binding | serving | syncing

---

## Concept
### proposal


<div class='arch'>

|            |            |             |              |
| ---------- | ---------- | ----------- | ------------ |
| principles | simplicity | intuitivity | learnability |

|         |                           |                          |                         |                      |                      |
| ------- | ------------------------- | ------------------------ | ----------------------- | -------------------- | -------------------- |
| newness | dependency<br/>injections | attribute<br/>directives | property<br/>binding | **function<br/>decorators** | **reative<br/>objects** |  |

|      |         |         |         |         |         |         |         |
| ---- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| uses | ranking | routing | serving | **styling** | **storing** | **binding** | **syncing** |


</div>

---

## Styling
### proposal

Scopeless CSS issue in JavaScript React is solved by:

- **modular CSS import**: new CSS transpiler
- **component-scope CSS**: component name as CSS class
- **component binding CSS**: @style(url) function decorator

---

## Styling **modular CSS**
### proposal

Modular-scoped CSS imports by new Reactful CSS transpiler.

<aside cols='2'><section>

```css
/* modular css sample */
/* file: ./hello.css */
h1 { color: black; }
```

</section><section>

```tsx
import './hello.css'
export const Hello = () => 
   <h1>Hello World!</h1>
```

</section></aside>

---

## Styling **component CSS**
### proposal

<style scoped>
   h4 { margin-bottom:0 }    
</style>

<aside cols='2' style='text-align:left'><div>

#### Component-scope CSS

Component name as CSS className

```css
h1.Hello { color: red; padding: 20px; }
```

```tsx
import './styles.css'
export const Hello = () => <h1>Hello!</h1>
```

</div><div>

#### Component-bound CSS

Function decorator with CSS path

```css
h1 { color: red; padding: 20px; }
```

```tsx
@style('./hello.css')
export const Hello = () => <h1>Hello!</h1>
```

<div></aside>

---

## Routing
### proposal

Next coupled and weird routing naming conventions is solved by:

- **folder static route** for basic routing 
- **relative nested routes** with relative path syntax
- **decorator dynamic routes** that avoids naming convention


---

## Routing **static routes**
### proposal

Static route with  relative nesting, HTML and MD support and no name convention.

| mode     | route    | context  | resolution                |
| -------- | -------- | -------- | ------------------------- |
| absolute | /        | \*       | /routes/index.jsx         |
| absolute | /about   | \*       | /routes/about.jsx         |
| absolute | /profile | \*       | /routes/profile/index.jsx |
| relative | ./admin  | /profile | /routes/profile/admin.jsx |
| relative | ../      | /profile | /routes/index.jsx         |

---

## Routing **dynamic routes**
### proposal

Clean dynamic routing with function decorators and dependency injections.

```tsx
@route('/profile/:id')
export async function Profile(props, feeds) { 
   const url = `api.com/users/${feeds.params.id}`
   const user = await fetch(url).then(x => x.json())

   return <h1>User name: { user.name }</h1>
}
```

---

## Binding
### proposal

React binding boilerplate code is solved by:

- **prop binding** for controlled component
- **form binding** for uncontrolled component
- **fetch binding** for form actions

---

## Binding **props binding**
### proposal

A self-rendering props with **[data]** and **[bind]** props for controlled component.

```tsx
export const Hello = props => <>
   <h1> Hello { props.name || 'World' }!</h1>
   <input data={props} bind='name' />  
</>
```

---

## Binding **form binding**
### proposal

The **form[data]** and **[bind]** bindings supports validation API and DI errors.

```tsx
export const Form = (props, { fails }) => <>
   <form data={props}> 
      Name: <input bind='name' />
      Mail: <input bind='mail'/>    
      <button>Submit</button>
   </form>

   { fails.map(x => ... )}
</>
```

---

## Binding **fetch binding**
### proposal

RESTful form actions is supported with pending state in **feeds.await**.

```tsx
export const Form = (props, feeds) => <> 
   <form data={props} onFetch={onPost}
      action='www.api.com/document'>
      Document: <input bind='text' />    
      <button>Submit</button>
   </form>   

   { feeds.await & <progress>loading</progress> }
</>

async function onPost(response: Response) { /* etc... */ }
```

---

## Serving
### proposal

Reactful server has multiple features and technological supports:

- **hybrid renders**: SSR, SSG, ISR, CSR
- **multiple supports**: HTML, REST, JSX, RSC, MD
- **framework features**: routing, RESTful API, IoC
- **dependency injections**: store, error, directives

---

## Serving **IoC container**
### proposal

<aside cols='3:5'>
<div style='text-align:left; margin-right: 20px'>

The React server implements a lite IoC container with those dependency injection types:

- error component
- props handler
- global store

</div>

```ts
import { launch } from 'reactful/server'
import { directive } from './directives'

const error = (status, error) => ...
const store = { ok: true }

await launch({ store, error })
     .inject(directive)
     .server("#root")
```

</aside>

---

## Serving **render decorators**
### proposal

Full rendering with **CSR**, **SSG**, **SSR** and **ISR** using decorators.

```tsx
@client(true) export default const CSR = props => <>...</>
@server('static') export default const SSG = props => <>...</>
@server('dynamic') export default const SSR = props => <>...</>
@server('periodic', "36h")  export default const ISR = props => <>...</>
```

---

## Serving **apis folder**
### proposal

In **apis** folder serves easy RESTful API with HTTP verb function name.

```ts
// /apis/sample.ts as http://localhost:3000/api/sample
export const get = request => new Response('Hello World!')
```

---

## Syncing
### proposal

Syncing encapsulate some complexity when dealing with remote states

- **fetch SWR extensions** with cache, retry and pooling (timer)
- **syncer RESTful mapper** that abstracts all service calls
- **authentication algorithm** with fluent functions

---

## Syncing **fetch extensions**
### proposal

Fetch API extension for SWR with retry, timer and cache (array or timeout).

```ts
const cache = ["keys"] 
const timer = { delay: 3 }
const retry = { count: 3, delay: "1s" }

await fetch(url, { cache, retry, timer })

fetch.clear(["keys"])
```

---

## Syncing **webapi syncher**
### proposal

The syncher maps a standard RESTful API, abstracting remote calls with save and load.

<div cols='2'>

```ts
const userApi = syncer<User>()
   .timer(1000)
   .retry(3, 1000)
   .cache(1000, true)
   .fetch("http://api.com/users")
   .catch(e => "not found...")
   .match(x => x, "id")
   .build()
```

```ts
userApi.data // array content
userApi.wait // pending flag
userApi.code // status code
userApi.head // HTTP headers

userApi.save() // put|post|delete
userApi.load() // get|get(query)
userApi.dump() // invalidate
```

</div>


---

## Syncing **fluent authentication**
### proposal

It supports basic , JWT bearer and oAuth authentication.

```ts
const googleAuth = {
   scopings: ['profile', 'email'],
   clientId: 'asdfasfsadfasdfasdf.apps.googleusercontent.com',
   queryURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
   tokenURL: 'https://accounts.google.com/o/oauth2/auth'
}

const loginGoogleApi = authentication<User>(googleAuth)
   .fetch("http://www.google.com/login")
   .catch("/login", "Login fails")
   .match<Token>("/home", x => x.access_token)
```

---

# FIM


<style> 
@import url(./index.css); 

code {
   border: 0 !important;
   width: 100% !important;
   padding: 30px !important;
   background: #191919 !important;
   font-family: agave !important;
   font-size: 0.73rem !important;
}

.arch td { text-align: center !important; }

.hljs-keyword { color: steelblue !important; }
marp-pre { --preserve-aspect-ratio: unset }

pre { margin-bottom:0 }


h2 strong {
   color: whitesmoke !important;
   opacity: 0.8 !important;
   font-size: 40px !important;
   font-weight: 300 !important;
   font-size: 0.85rem !important;
}

/* · • ● */
</style>
