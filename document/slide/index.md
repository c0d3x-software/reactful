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
   h1 + P { padding: 0 200px;}
</style>

![reactful](./img/reactful.png)


# REACTFUL

Fixing React ecosystem with a innovative, minimalist and comprehensive React framework

<!-- > **Jonathan de Sena Ribeiro**
> science computing master degree
> 20+ years of fullstack dev
> .NET specialist -->

---

<style scoped>
   h1 + blockquote { margin-top: -30px !important; }
</style>

# flaws
react ecosystem main issues

<div flaws>

|     |                           |
| --- | ------------------------- |
|     | stateful complexity       |
|     | scopeless modular css     |
|     | lack of function metadata |

</div>
</aside>

---



<!-- transition: cover -->

## Flaws
### **css** | state | metadata

Scopeless modular CSS and its most popular workarounds (without fixing).

<aside cols='auto:fill'>
<legend>vanilla</legend>

```ts
import 'my-modular.css' // not restrict to the imported module...
```

</aside>
<aside cols='auto:fill'>
<legend>css-module</legend>

```ts
import styles from './Tag.module.css';
const Tag = () => <h1 className={styles.h1}>css-module</h1>
```

</aside>
<aside cols='auto:fill'>
<legend>styled-components</legend>


```ts
import styled from 'styled-components';
const Titulo = styled.h1`color: blue; background: yellow`;
const Tag = () => <Titulo>Olá, Styled Components!</Titulo>
```

</aside>

---

## Flaws
### css | **state** | metadata

Stateful increases complexity in geometric progression in global and remote states.

<aside cols='5:7'>
<div>

```tsx
const Stateless = props => 
   <h1>Hello, {props.name}!</h1>
```

</div>

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

</aside>

---

<style scoped>
   pre, code { 
      padding:0 !important;
      color: #CCC !important;
      background: transparent !important;
   }
</style>

## Flaws
### css | state | **metadata**

Lack of metadata syntax for functions overloads the framework design.

| | |
|-|-| 
| next.js routing convention excess | page.\*, layout.\*, loading.\*, error.\*, not-found.\*, route.ts, [param], [...param], [[...param]], index.\*, api/, (group), @slot/, default.\* |
| use directives with limited semantics | `'use server' export default const SSR ...` <br/> `'use server' export default const SSG ...` |
| special exports for special semantics | metadata, dynamic, revalidate, fetchCache, runtime, generateMetadata, getStaticProps, generateStaticParams, etc

<!-- transition: swap 1s -->

---

<style scoped>
   table tr td:first-of-type { 
      font-weight: 200 !important;
      /* text-align:center !important; 
      color: white !important; */
   }     
   table tr td:nth-of-type(2) {
      display:none
   }
</style>

# FIXINGS
Solutions and approaches

| | | |
|-|-|-|
| css transpiler | transpiler | scopeless css  |
| function decorator | transpiler | metadataless |
| dependency injection | rendering | stateful complexity |
| self-rendering state | rendering | stateful complexity |
| injectable props | rendering | stateful complexity |

---

<!-- transition: cover -->

## Fixings
### scopeless CSS | **css transpiler**

React CSS loader applies the imported CSS only into module components. But this modular CSS does not support CSS pseudo-selectors (:hover, :focus, etc).

```css
h1 { color: black; font-family: 'agave'; font-weight: bolder }
```

```tsx
import './modular.css' // only applied in this module..

export const Hello = () => <h1>Hello World!</h1>
```

---

## Fixings 
### metadataless | **functional decorator**

Reactful transpiles function decorator for easy metadata function.

<div cols='auto:fill' style='margin-top:-10px'>
<aside>

| |
|-|
| @style |
| @server |
| @client |
| @route |
| @error |
| @auth |
| @seo |

</aside>
<aside>

```ts
'use server'

export const metadata = { title: `blog`, description: `...` }

export default const Blog = () => <>...</>
```

```tsx
@server('dynamic')
@seo('caption', 'details') 
export default const Blog = () => <>...</>
```

</aside>
</div>

---

## Fixings
### stateful complexity | **reactive object**

Reactive objects are self-rendering states triggered by object changes.

```tsx
/* local state with reactive stateful props */
export const Hello = props => <><h1> Hello { props.name }!</h1>
   <input value={props.name} onChange={e => props.name = e.target.value} />  
</>
```

```tsx
/* global state by store dependency injection */
export const Hello = (props, { store }) => <><h1> Hello { store.name }!</h1>
   <input value={store.name} onChange={e => store.name = e.target.value} />  
</>
```

---

## Fixings
### stateful complexity | **injectable props**

Directives as injectable props, similar to Angular attribute directives.

<section cols='auto:fill'>

| |
|-|
| [data] |
| [bind] |
| [grid] |
| [cols] |
| [gaps] |
| [link] |
| [route] |

<aside>

```tsx
declare module "react" { interface HTMLAttribute { show?:boolean }}

const shown = props => ({ ...props, hidden: !props.shown })
```

```ts
await launch({ settings... }).inject(shown).server('#root')
```

```tsx
const Component = props => <h1 show={props.show}>Hi...</h1>
```

</aside>
</section>

---

## Fixings
### stateful complexity | **dependency injection**

Reactful resolves dependencies with feeds object of component second argument, injecting dependencies like directives, error, state and context.

```ts
const Component = (props, feeds) => feeds... // contextual + injections
```

<aside cols='7:6'>

```ts
import { launch } from 'reactful/server'
import { highlight } from './directives'
import error from './error-component'
import store from './store'

await launch({ store, error })
     .inject(highlight)
     .server("#root")
```

```ts
/* injectable context object type */

interface Feeds {
   param: record  // route params
   store: record  // global state
   logon: record  // logged user
   await: boolean // pending flag
   fails: Error[] // current errors
}
```

</aside>

<!-- transition: swap 1s -->

---

# Features
comprehensive framework features

|         |                                                          |
| ------- | -------------------------------------------------------- |
| routing | static, nested, dynamic, error     |
| serving | ssr, isr, ssg, seo, ioc, api, md, csr, rsc               |
| binding | props, forms, action, authentication     |
| storing  | local stateful props, global store, modular states  |
| styling | css module, component-scoped css, routed style |


---

## Routing 
### features

Static route with nested route syntax and decorator for dynamic routes.

<style scoped>
   [cols] > *:nth-of-type(1) {
      zoom: 0.9;
      padding-left: 20px !important;
   }
</style>

<div cols='2'>

|          |            |                     |
| -------- | ---------- | ------------------- |
| normal | /          | /routes/index.jsx   |
| normal | /about     | /routes/about.jsx   |
| nested | ./admin    | /routes/admin.jsx   |
| nested | ../profile | /routes/profile.jsx |

```tsx
@route('/profile/:id')
function Profile(props, feeds) { 
   const id = feeds.param.id
   ...etc
}
```

</div>

---

## Styling
### features

<section cols='3:5'><aside>

Styling improvements and feature helpers with:

- @style decorator
- fixed modular CSS
- component className
- pico.css default
- grid props 

</aside><aside>

```css
/* component className */
h1.Hello { color: red; padding: 20px; }
```

```tsx
/* style decorator */
@style('./hello.css')
export const Hello = () => <h1>Hello!</h1>
```

</aside>
</section>

---
## Serving
### features

<aside cols='3:7'>
<div>

Fluent launch with IoC container that supports:

- markdown render
- server components
- hybrid renderings
- seo decorator
- assets folder
- apis folder


</div><div>

```ts
/* IoC with error, store and directives */
await launch({ store, error }).inject(shown).render()

/* RESTful service in /apis */
export const get = args => new Response('Ok!')

/* SEO metatags decorators */
@seo('title', { description: 'sample' }) 
const About = props => <>etc...</> 

/* SSR with React server components (RSC) */
@server('dynamic') const Dynamic = props => <>etc...</>
```

</div>
</aside>

---

## Storing
### features

<section cols='3:5'>
<aside>

Reactive objects is a OOP self-rendering states in 3 scopes:

- local stateful props
- global injectable store
- partial modular states

</aside><aside>

```tsx
const Local = props => <>
   <h1> Hello { props.name }!</h1>
   <input value={props.name} onChange={e =>
          props.name = e.target.value } />  
</>
```

```tsx
const Global = (props, { store }) => <>
   Hello { store.name || 'World' } !
   <input value={store.name} onChange={e 
      => props.name = e.target.value} />
</>
```
</aside>
</section>

---

## Binding
### features

<section cols='4:5'>
<aside>

Data binding directives for controlled and uncontrolled components:

- props binding (controlled)
- forms binding (uncontrolled)
- action binding (uncontrolled)

</aside><aside>

```tsx
const Hello = props => <>
   <h1> Hello { props.name }!</h1>
   <input data={props} bind='name' />  
</>
```

```tsx
const Form = (props, { store }) => <>
   <form form={store}>
      <input bind='name'>
   </form>
</>
```
</aside>
</section>


<!-- transition: swap 1s -->

---

# Summary

<style scoped>
   [end] {zoom:0.9 !important }
   [end] table { margin-top: 50px !important; }
   [end] table td { text-align:center !important; }   
   [end] table td { vertical-align:top !important; }
   [end] table td:first-child { display:none !important }   
   [end] table th:first-child { display:none !important }
   [end] table tr:nth-of-type(1) td {zoom:0.9 !important }
   [end] th { border:0; letter-spacing: 9px; text-transform: uppercase }
   [end] td { padding: 0 10px !important }
   [end] td { border-left: solid 3px grey; }
   [end] td:nth-of-type(2) { border:0 }
</style>


| | |
|-|-|
| scopeless CSS | transpiler |
| Stateful verbosity | binding + reacting |
| dysfunctional metadata | functional decorators |

<section end>

| . | routing | styling | serving | storing | binding |
|-|-|-|-|-|-|
| . | static, nested, dynamic, @route, @auth, error |  @style, pico.css, component CSS, CSS imports, routed style | IoC, CSR, SSR, SSG, ISR, SEO, RSC, MD, HTML+, hydrate | stateful props, global store, modular states | props, forms, action, state, validations |




</section>

<!-- transition: swap 1s -->

---

<style scoped>
   h2 { 
      border:0 !important;
      text-align: center !important;
      color: grey !important;
      margin-top: -20px;
   }
   
   h3 { 
      border:0 !important;
      color: grey !important;
      text-align: center !important;
      margin: -40px 0 0 0px !important;
      font-size: 0.8rem;
   }
</style>

<div style='zoom:2'>

# END
## thanks!

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

[next] td { 
   font-weight: 300 !important; 
   text-align:left !important; 
}


h3 strong {
   color: unset;
   font-weight: 500 !important;
}

h1 { margin:7px; }


/* · • ● */
</style>
