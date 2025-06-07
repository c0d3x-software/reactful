---
marp: true
class: invert
theme: uncover
paginate: true
---

# REACTFUL

Comprehensive stateful React framework

---

## Personal information
### reactful

- Jonathan de Sena Ribeiro
- mestre em ciência da computação (UFC)
- graduado em filosofia (UECE)
- 19 anos de fullstack dev

---

# Context

Comparing Angular x React technologies

---

## Comparing challenges
### motivation

Challenges relateds to internal differences between React and Angular.

|                      |                          |     |
| -------------------- | ------------------------ | --- |
| library vs framework | getting framework subset |
| data architecture    | one-way vs two-way       |
| design approach      | VM x MVVM                |

--- 

## Comparing criteria
### motivation

Some main comparable criteria between React and Angular.

|             |                                           |     |
| ----------- | ----------------------------------------- | --- |
| popularity  | React, but Angular also is huge           | admin |
| performance | React, but uncomparable or negligenceable | user |
| produtitvy  | Learnability, maintenability and simplicity | dev |

<br>
PRODUCTIVITY IS THE TIE BREAKER...

---

## Productivity comparison
### motivation

Some main comparable criteria between React and Angular.

- **state**: Angular data bindings
- **module**: React (Angular duplicity modularity )
- **component**
  - **stateful**: Angular data bindings
  - **stateless**: React function component

<br>
THE TIE CONTINUES...

---

## Coding design
### motivation


<style>
   [table] { 
      display:table;
      color: transparent;
      & > *:first-of-type { width:100%; }
      & > *:nth-of-type(2) { margin-right:10px; }
      & > * { display:table-cell; vertical-align: middle }
   }
   code { margin-bottom:3px !important; }
</style>

<div table>

```tsx
const Hello = props => <>
   <h1>Hello {props.name}!</h1>
</>

const Hello = props => <>
   <h1>Hello {props.name}!</h1>
   <input  />
</>
```

**.**
</div>
<br/>
<div table>

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

**.**

</div>
<br/>

---

```tsx
import React, { createContext, 
   useContext, useState } from 'react';

const MyCtx = createContext();

function Hello() {
  const [name, setName] = useContext(MyCtx);
  
  return <>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
      <p>Hello, {name || 'World'}!</p>
   </>
}

export default function App() {
  const state = useState('');
    return <>
      <MyContext.Provider value={state}>
      <Hello />
    </MyContext.Provider>
  </>
}
```

---

## Boilerplate code
### motivation

Increasing complexity in more advanced state handling use cases.

<div cols='3'>

<strong>useState</strong>

<strong>useContext</strong>

<strong>useQuery</strong>

</div>

<div cols='3'>

```tsx
import React, { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  
  return <h1>
      <p>Hello, {name || 'World'}!</p>
      <input value={name} 
         onChange={e => setName(e.target.value)} />
   </h1>
}
```

```tsx
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

function Child() {
  const [name, setName] = useContext(MyContext);
  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Hello, {name || 'World'}!</p>
    </>
  );
}

export default function App() {
  const state = useState('');
  return (
    <MyContext.Provider value={state}>
      <Child />
    </MyContext.Provider>
  );
}
```

```tsx
import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function fetchGreeting(name) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Hello, ${name || 'World'}!`);
    }, 500);
  });
}

function Greeting({ name }) {
  const { data, isLoading } = useQuery({
    queryKey: ['greeting', name],
    queryFn: () => fetchGreeting(name),
    enabled: !!name, // só faz a requisição se houver nome
  });

  if (!name) return <p>Hello, World!</p>;
  if (isLoading) return <p>Loading...</p>;

  return <p>{data}</p>;
}

function App() {
  const [name, setName] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Greeting name={name} />
    </QueryClientProvider>
  );
}

export default App;
```

</div>

---

# Proposal

Innovative React framework

---

## Library
### proposal

Intercept and transform the React client-side rendering with:

- changes are intercepted with Proxy Object
- encapsulate it with state handling hooks 
- correlates it its host component

---

## Mutation
### proposal

After prototype fase, arrives the new React framework that turns the Reactful library unfeasable, due the need to:

- Reapply rendering interception in server-side
- Reapply to each server rendering framework

<br>
LIBRARY EVOLVES TO FRAMEWORK...

---

## Framework
### proposal
<div cols='4:5' left>
<section>

The framework developments deals with several challenges to achieve its aim minimalist design in whole framework aspects, covering features of:

- **react hooks**: stateful handling
- **tanstack query**: remove states
- **next frameworks**: ssr, seo, etc

</section>

|                |                             |
| -------------- | --------------------------- |
| javascript     | scopeless css import        |
| javascript     | non-functional decorator    |
| react hooks    | state handling complexity   |
| react hooks    | data binding verbosity      |
| next framework | coupled routing conventiong |
| next framework | metadata scopeless function |
| tanstack query | object remote mapping       |
</div>

---

## Conception
### proposal

Here a mind map of principles, novelties and use cases of framework architeture.

<div class='arch'>

|            |            |             |              |
| ---------- | ---------- | ----------- | ------------ |
| principles | simplicity | intuitivity | learnability |

|         |                         |                         |                         |                         |                         |
| ------- | ----------------------- | ----------------------- | ----------------------- | ----------------------- | ----------------------- |
| newness | dependency<br/>injections | attribute<br/>directives | function<br/>decorators | property<br/>binding | reactive<br/>objects |

| | | | | | | | |
|-|-|-|-|-|-|-|-|
| uses | binding | routing | ranking | serving | styling | syncing | storing |

</div>

---

# Demonstration

Framework coding showcase
>  styling | routing | binding | serving | syncing

---


## Styling
### demonstration

Reactful fixes scopeless isues using CSS in React.

- modular-scoped CSS
- component-scoped CSS by decorator
- component-scoped CSS by CSS className

---

## Styling **modular-scoped CSS**
### demonstration

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

```
hello.module.css
hello.jsx
```

<style scoped>
   code {  width:100% }
</style>

---
```css
/* styles/hello.module.css */ 

.hello {
  color: whitesmoke;
  background: dimgrey;
  font-weight: bold;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
}
```

---


```tsx
/* components/hello.tsx */

import css from './hi.module.css'

export const Hello = () => <>
   <h1 className={css.hi}>
      Hello World!
   </h1>
</>
```

---


```tsx
const Title = styled.h1`
  color: whitesmoke;
  background: dimgrey;
  font-weight: bold;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
`;

export const Hello = () => <>
   <Title>Hello World!</Title>
</>
```

---

```tsx
export const Hello = () => (
  <h1 className="font-bold
      text-[whitesmoke] mt-4
      bg-[dimgrey] rounded-lg 
      shadow-md px-4 py-2">
    Hello World!
  </h1>
);

```


```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

```js
module.exports = {
  content: [ "**/*.{js,jsx}" ],
  theme: { extend: {}, },
  plugins: [],
}
```


---

## Styling **component-scoped CSS**
### demonstration

<aside class='coded' cols='3:5'>
<div style='text-align: left; padding-right: 50px'>

Component-scoped CSS by function decorator or using the component name as CSS className to apply to its inner HTML elements.

</div><div>

```tsx
import './styles.css'
export const Hello = () => <h1>Hello!</h1>
```

```css
h1.Hello { color: red; }
```

```tsx
@style('./component/hi.css')
const Hi = () => <h1>Hi!</h1>
```

</div>

---

## Routing
### demonstration

Advanced and comprehensive routing features with:

- folder static routie
- relative nested routes
- decorator dynamic routes


---

## Routing **static routes**
### demonstration

Simple static routing with no extra file name convention (next.js), supporting nesting route with relative url.

<aside cols='3:5'>

| directory | route |
|-|-|
| /routes/index.tsx | / |
| /routes/about.tsx | /about |
| /routes/a/b/c.tsx | /a/b/c |

| directory       | relative  | absolute |
| --------------- | ------ |-|
| /routes/a.tsx | ./b | /a/b |
| /routes/a/b.tsx | ./c | /a/b/c |
| /routes/a/b.tsx | ../a | /a |

</aside>

---
<!-- 
## Routing **dynamic routes**
### demonstration

Dynamic route supported with no extra coupled naming convetion using function decorators and dependency injection. -->

```tsx
@auth(['admin'])
@route('/profile/:id')
export function User(props, i) { 
   return <h1>{ i.params.id }</h1>
}

@client(true) 
export function Client() {   
   return <h1>Client Side</h1>
}

@server('dynamic') 
export function SSR() {   
   return <h1>Server Side</h1>
}
```

---

## Binding
### demonstration

Framework built-in [data] and [bind] props handlers, allowing two-way data binding code design within React one-way directional flow.

- props binding 
- forms binding
- fetch binding

---

## Binding **props binding**
### demonstration

The **[data]** gets the object and **[bind]** mapps to its field, as controlled component approach with delayed render algorithm.

```tsx
export const Hello = props => <>
   <h1> Hello { props.name }!</h1>
   <input data={props} bind='name' />  
</>
```

---

## Binding **form binding**
### demonstration

The **form[data]** gets the object and its inputs maps fields with **[bind]** for uncontrolled component with validation API support by DI.

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
### demonstration

Fetch binding enables pending states, RESTful actions and JWT auth.

```tsx
export const Form = (props, feeds) => <> 
   <form data={props} onError={onValidate} onFetch={onPost}>
      Document: <input bind='text' validate={validateMe} />    
      <button>Submit</button>
   </form>   

   { feeds.await & <progress>loading</progress> }
   { feeds.fails.map(x => <li>{ x.message }</li>) }
</>

const validateMe = () => "Invalidated if return something"
const onValidate = x => x.errors.push({ error: 'new error' })
async function onPost(response: Response) { /* etc... */ }
```

---

## Serving
### demonstration

Reactful server has multiple and versatile features, as:

- **rendering docorators**: SSR, SSG, ISR, CSR
- **multiple servers**: HTML, REST, JSX, RSC, MD
- **IoC container**: store, error, directives, decorators

---

## Serving **rendering decorators**
### demonstration

Component function decorators for **CSR**, **SSG**, **SSR** and **ISR** rendering.

```tsx
@client(true) export default const Client = props => <>...</>
@server('static') export default const Static = props => <>...</>
@server('dynamic') export default const Dynamic = props => <>...</>
@server('periodic', "36h")  export default const Periodic = props => <>...</>
```

---

## Serving **IoC container**
### demonstration

<aside cols='3:5'>
<div style='text-align:left; margin-right: 20px'>

The React server function starts the IoX container with those dependency injection types:

- props handler
- function decorator
- error component
- global store

</div>

```ts
import { launch } from 'reactful/server'
import { directive } from './directives'
import { decorator } from './decorators'

const error = (status, error) => ...
const store = { ok: true }

await launch({ store, error })
     .inject(directive)
     .inject(decorator)
     .server("#root")
```

</aside>

---

## Syncing
### demonstration

- fetch extensions
- object restful mapping
- caching results
- global state

---

## Syncing **fetch**
### demonstration

Fetch API extension for SWR with retry, timer and cache (array or timeout).

```ts
const cache = ["keys"] 
const timer = { delay: 3 }
const retry = { count: 3, delay: "1s" }

await fetch(url, { cache, retry, timer })

fetch.clear(["keys"])
```

---

## Syncing **sync**
### demonstration

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

# Comparison

Comparing before x after

- react: stateful data binding
- next: hybrid rendering


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

h2 strong {
   font-size: 27px;
   opacity: 0.8 !important;
   font-weight: 100 !important;
   font-size: 0.85rem !important;
   color: whitesmoke !important;
}


h2 strong:before { 
   content: ' ● ';
   color: dimgrey;
   font-size: 27px;
}

/* · • ● */
</style>
