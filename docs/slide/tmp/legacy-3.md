---
marp: true
class: invert
theme: uncover
paginate: true
---

<style> @import url(./index.css); </style>

<!-- transition: swap 1s -->

<style scoped>
   section > * { zoom:1.1 }
   h1 { font-weight:bolder; margin:0;  }
   img { width:70px !important; }
</style>

![reactful](./img/reactful.png)

# REACTFUL

Modern fullstack React framework

---

<style scoped>
   h1 + blockquote { margin-top: -30px !important; }
</style>

# CONTEXT
> some contextual informations

> **Jonathan de Sena Ribeiro**
> science computing master degree
> 20+ years of fullstack dev
> .NET specialist

</aside>

---

<!-- transition: cover -->

## Frontend development

Some important contextual concepts realtead.

- Assynchornous Javascript (AJAX)
- Single-Page Application (SPA)
- Component-based SPA techs


---

## SPA technologies

The three main technologies for component-based single page application.

|         |                                          |
| ------- | ---------------------------------------- |
| react   | component-based frontend library for SPA |
| angular | component-based SPA framework            |
| next.js | SPA framework for SSR React              |


---

## SPA capabilities

Most common component-based single-page application capabilities.

|         |                             |
| ------- | --------------------------- |
| routing | page component routing with dynamic routes     |
| serving | server rendering components (SSR, SSG and ISR) |
| binding | attaching model data the component view |
| ranking | SEO integration into the componentization |
| storing | state management algorithm and design |

<!-- transition: swap 1s -->
---

# Problem
<style scoped>
   h1 { margin:0 0 10px 0; padding:0 }
   table { width:777px; margin-top:-20px }
   table td { border-color: dimgrey !important }
   table tr td { padding: 20px 50px !important; }
   table td:nth-of-type(1) { color:grey; display:none }
   table tr:nth-of-type(1) td:nth-of-type(2) { letter-spacing:13px !important; }
   table tr:nth-of-type(2) td:nth-of-type(2) { letter-spacing:3px !important; }
   table tr:nth-of-type(1) td { font-size: 1rem; color:white;  }
   table tr:nth-of-type(2) td { font-size: 0.7rem; color:silver; }
   table tr:nth-of-type(3) td { color:#aaa; font-size:0.6rem }
   table tr td:nth-of-type(2) {
      text-align: center !important;
   }
</style>

|            |                                                                                     |
| ---------- | ----------------------------------------------------------------------------------- |
| principal  | stateful complexity                                                                 |
| secundary  | css module, route conventions, render metadata, remote states                       |
| derivative | function decorators, attribute directives, property bindings, dependency injections |


---

<!-- transition: cover -->

## Overall issues 
### Problem

<aside cols='3:5'>
<div issues>

- **Stateful verbosity**
- CSS module leaking
- coupled convention
- rendering metadata
- fetching verbosity

</div><div>

```tsx
const Stateless = props => 
   <h1>Hello, {props.name}!</h1>
```

```tsx
import React, { useState } from 'react';

function Stateful() {
  const [name, setName] = useState('');
  
  return <h1>
      <h1>Hello, {name || 'World'}!</h1>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
   </h1>
}
```

</div></aside>

---

## Overall issues 
### Problem

<aside cols='3:5'>
<div issues>

- Stateful verbosity
- **CSS module leaking**
- coupled convention
- rendering metadata
- fetching verbosity

</div><div>

| | |
|-|-|
| vanilla | CSS import leaks to global scope |
| css-module | create a file with pattern filename.module.css, import the style and set it the React element style property |
| styled-components | create a script-side notation with literal string that allows css scripting (but it not supports pure CSS) |

</div></aside>

---

## Overall issues 
### Problem

<aside cols='3:5'>
<div issues>

- Stateful verbosity
- CSS module leaking
- **coupled convention**
- rendering metadata
- fetching verbosity

</div>
<div next style='font-weight: 100 !important'>
<br/>

| next.js framework routing conventions |
|-| 
| page.js, page.tsx, layout.js, layout.tsx, loading.js, loading.tsx, error.js, error.tsx, not-found.js, not-found.tsx, route.js, route.ts, [param], [...param], [[...param]], index.js, index.tsx, api/, (group), @slot/, default.tsx |

</div></aside>

---

## Overall issues 
### Problem

<aside cols='3:5'>
<div issues>

- Stateful verbosity
- CSS module leaking
- coupled convention
- **rendering metadata**
- fetching verbosity

</div>
<div style='letter-spacing: 0 !important'>

```tsx
'use client'
export function ClientSide() {
  const onClick = () =>  alert('Client side!');
  return <button {onClick}>Clique</button>;
}
```
```tsx
'use server'
export function ServerSide() {
  return <h1>I'm server side</h1>
}
```

</div></aside>

---

## Overall issues 
### Problem

<aside cols='3:5'>
<div issues>

- Stateful verbosity
- CSS module leaking
- coupled convention
- rendering metadata
- **fetching verbosity**

</div>
<div style='letter-spacing: 0 !important'>

```tsx
import { useState } from 'react';
export default function PostingName() {
   const [name, setName] = useState('');
   const url = 'https://jsonplaceholder.typicode.com/posts'
   const config = {  method: 'POST', body: JSON.stringify({ name }),
                     headers: { 'Content-Type': 'application/json' }}

  async function onSubmit(e) {
    try {
      const res = await fetch(url, config);
      if (!res.ok) throw new Error('Request error');      
      alert(`Success! ID: ${(await res.json()).id}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return <><h1>Send your name: {message}</h1>
      <form {onSubmit}>
        <input value={name} placeholder="name" 
               onChange={(e) => setName(e.target.value)} />
        <button type="submit">Send</button>
      </form>
   </>
}
```

</div></aside>

<!-- transition: swap 1s -->

---

<style scoped>
   h2 {  
      color: grey;
      border: 0 !important;
      text-align: center !important;
      margin-top: -30px !important;
   }

   table tr td:first-of-type { display:none }
</style>

# Proposal
## REACTFUL FRAMEWORK


<div class='arch' style='margin-top:-50px'>

||           |
|-| --------- |
| |  |

|            |            |             |              |
| ---------- | ---------- | ----------- | ------------ |
| guideline | simplicity | intuitivity | learnability |

|         |                           |                          |                         |                      |                      |
| ------- | ------------------------- | ------------------------ | ----------------------- | -------------------- | -------------------- |
| novelty | dependency<br/>injections | attribute<br/>directives | property<br/>binding | **function<br/>decorators** | **reactive<br/>objects** |  |

|      |         |         |         |         |         |         |         |
| ---- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| usage | ranking | routing | serving | **styling** | **storing** | **binding** | **syncing** |


</div>

---

<!-- transition: cover -->

## Styling 
### proposal

<div left style='margin: 20px 0 10px 0'>
Modular-scoped CSS imports by new Reactful CSS transpiler.
</div>

<aside cols='3:5'>

```css
* { font-size: 1rem; }
h1 { color: black; }
```

```tsx
import './hello.css'
export const Hello = () => <h1>Hello World!</h1>
```

</aside>
<style scoped> h4 { margin-bottom:0 }  </style>

<div left style='margin: 20px 0 10px 0'>
Component-scoped by style-to-script or script-to-style.
</div>

<aside cols='2' style='text-align:left'><div>

```css
/* component name as CSS className */
h1.Hello { color: red; padding: 20px; }
```

</div><div>

```tsx
@style('./hello.css')
export const Hello = () => <h1>Hello!</h1>
```

<div></aside>

---

## Routing 
### proposal

Static route with nesting syntax and decorator for dynamic routes.

<style scoped>
   [cols] > *:nth-of-type(1) {
      zoom: 0.9;
      padding-left: 20px !important;
   }
</style>

<div cols='2'>

|          |            |                         |
| -------- | ---------- | ----------------------- |
| absolute | /          | /routes/index.jsx       |
| absolute | /about     | /routes/about.jsx        |
| relative | ./admin    | /routes/about/admin.jsx |
| relative | ../profile | /routes/profile.jsx     |

```tsx
@route('/profile/:id')
function Profile(props, feeds) { 
   const id = feeds.params.id
   ...etc
}
```

</div>

---

## Binding
### proposal

Controlled and uncontrolled component with props and form binding.

<aside cols='2'>

```tsx
export const Hello = props => <>
   <h1> Hello { props.name }!</h1>
   <input data={props} bind='name' />  
</>
```

```tsx
export const Form = (props, feeds) => <>
   <form data={props}> 
      Name: <input bind='name' />
      <button>Submit</button>
   </form>

   { feeds.fails.map(x => ... )}
</>
```

</aside>

---

## Serving
### proposal

<aside cols='3:5'>
<div style='text-align:left; margin: 20px 0 0 0'>

IoC container, full hybrid rendering and API folder.

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


```tsx
@server('static') export default const SSG = props => <>...</>
@server('dynamic') export default const SSR = props => <>...</>
@server('periodic', "36h")  export default const ISR = props => <>...</>
```

---

## Syncing
### proposal

Fetch SWR extensions and syncher webapi mapping for OOP remote states.

```ts
await fetch(url, { cache:"7min", retry:{ delay:3 }, cycle:1000 }) 
```

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


<!-- transition: swap 1s -->

---

# Summary
Summary of the solving issues
> stateness | modularity | conventions

<!-- transition: cover -->

---

## Summary

The main issues and how the React framework solves it.

| | |
|-|-|
| Stateful verbosity | reactive objects with property binding |
| CSS module leaking | CSS scoped by module and component |
| coupled conventions | decorators replaces conventions  |
| rendering metadata | function decorators metadata |
| fetching verbosity | fetch SWR and sync mappers |

<!-- transition: swap 1s -->

---

<div style='zoom:2'>

# FIM

</div>


<style> 
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

[issues] {   
   padding-top: 20px;
   & li { font-family: agave; }
}

[issues] li strong {
   color:wheat !important;
}

[next] td { 
   font-weight: 300 !important; 
   text-align:left !important; 
}


/* · • ● */
</style>
