<script src='../@assets/js/index.js'></script>
<style>@import url(essentials.css);</style> 

# Essentials

All Reacftul follows a minimalist design with low abstraction over web standards and broad paradigms, patterns and principles, specially DRY, KISS and YAGNY principles.

## All renders

Full rendering with SSR, SSG and ISR, supporting 'use' directives and functional decorators, partial hydration, streaming SSR and server components.

```tsx
@client(true) export default const Client = props => <>...</>
@server('static') export default const Static = props => <>...</>
@server('dynamic') export default cont Dynamic = props => <>...</>
@server('periodic', "36h")  export default const Periodic = props => <>...</>
```
## Modular CSS

Reactful fixes the import CSS leak, allowing modular CSS with no extra lib, extra-coding, or mixing styling with  scripting, just web standard modural CSS.

```tsx
import 'modular-css-only-applies-in-components-of-module.tss'

@style('./hello.css') export const Hello = () => <h1>Hello!</h1>
```
```css
h1.Hello { color: red; padding: 20px; } /* component className tag */
```

## Clean routing

Reactful server web apis in **/apis**, static content in **/assets** and pages in **/routes** with static directory routing, dynamic route decorator, nested routing, fallbacks, and lazy loading, etc.

<aside cols='3:5'>

| | |
|-|-|
| **/** | **/routes/index.tsx**  <br/> standard convention |
| **/about** | **/routes/about.md** <br/> markdown support | 
| **/profile** | **/routes/profile.tsx** <br/> raw HTML support

```tsx
const Main = import('./main')
   .asLazyComponent('Sample')

@route('/dynamic/route/example/:id')
const User = (props, feeds) => feeds.param.i

export default const Menu = props => <>
   <div link='/main'>Main</div>
   <main route='/main'>...</main>
</>
```

</aside>

## Reactive objects

Reactive objects brings encapsulates all state management boilerplate code in collaboration with built-in property handlers [data] and [bind].

<aside style='display:grid; grid-template-columns: auto 1fr'>
<div side-font>

stateful react

</div><div>

```tsx
import React, { useState } from 'react';

function Stateful() {
  const [name, setName] = useState('');
  
  return <div>
      <h1>Hello, {name || 'World'}!</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
   </div>
}
```

</div></aside>

---

<aside style='display:grid; grid-template-columns: auto 1fr'>
<div side-font>

reactful

</div><div>


```tsx
@client(true)
const Hello = props => <>
   <h1> Hello { props.name }!</h1>
   <input data={props} bind='name' />  
</>
```

</div></aside>

## Property handlers

Built-in framework props that encapsulates props transformation.

| **[data]** | **[bind]** | **[link]** | **[route]** | **[grid]**
|:-:|:-:|:-:|:-:|:-:|
| data bound | data binding | declarative router | conditional route | grid layout props |

It supports custom property handlers by depedency injection as in example bellow.

```tsx
const shown = props => ({ ...props, hidden: !props.shown })
export const Ok = prop => <div shown={true}>Show me!</div>
await launch("/routes").inject(shown).server("#root")
```

## Dependency injection

Reactful brings dependency injection to handle props, excetions and request.

<aside cols='5:3'>

```tsx
import { launch } from '@c0d3x/reactful'

const shown = props => props...
const token = request => new Response(ok)
const error = exception => <p>My  error!</p>
const store = { hello: 'world' }
```

```tsx
// injecting dependencies 
await launch({ store })
     .inject(shown)  
     .inject(token)  
     .inject(error)  
     .server()
```

</aside>

## Function decorators

Reactul transpiler brings decorator support to functions as currying suggar syntax and function metadata, without breaking its hoisting.

```ts
const example = (args) => (meta: ImportMeta, call: Function) => call

@example('testing') const someFunction = () => { }

example('testing')(import.meta, someFunction) // <----- transpilations
````
