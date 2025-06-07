<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 
<style>@import url(organization.css);</style>

# Inspiration
 
Reacftul framework was inspired by the minimalist design of stateless React, that is in direct contradiction with its stateful design.

<aside cols='5:7'>

```tsx
const Stateless = props => 
  <p>Hello, {props.name}!</p>
```

```tsx
import React, { useState } from 'react';

function Stateful() {
  const [name, setName] = useState('');
  
  return <h1>
      <p>Hello, {name || 'World'}!</p>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
   </h1>
}
```

</aside>

Based in that minimalist stateless inspiration, Reactful is designed to solve the 3 main issues in developement experience with React ecosystem.

<center>

| PROBLEM | SOLUTION |
|-:|-|
| stateful complexity  | self-rendering reactive objects |
| CSS modular leaking | fixed CSS loader by framework |
| lack of function metadata | function decorator transpiler |

</center>

Since component are function, the lack of a syntatic way to metadata function highly impacts framework features, as in routing over-conventions in next.js and limited semantics of 'use server' directive to deal with server rendering.

| | |
|-|-| 
| next.js over-conventions | page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx, route.ts, [param], [...param], [[...param]], index.tsx, api/, (group), @slot/, default.tsx |
| limited use directives | `'use server' export default const SSG ...` <br/> `'use server' export default const SSR ...`