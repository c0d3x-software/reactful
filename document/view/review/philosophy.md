<script src='../js/index.js'></script>
<style>
@import url(../css/index.css);
li { margin-left: 30px; }
</style> 

# Core philosophy

## Minimalist design

Minimalism is the core design philosophy in Reacful design. The model of this minimalist is based in stateless react itself.

```tsx
const Stateless = props => <h1>Hello {props.name}!</h1>
```

```tsx
import React, { useState } from 'react';

export default function Stateful() {
  const [name, setName] = useState('');
  
  return <h1>
      <p>Hello, {name || 'World'}!</p>
      <input value={name} onChange={e => setName(e.target.value)} />
   </h1>
}
```

React code design it, in same time, the most concise componentization design in its stateless code, and the most verbose, with its stateful design. The examplo above is the most simple way to deal with states, the complexity increases with shared states and remote states. Also React frameworks has its verbosity problem, as next.js over-conventions.

## Minimalist principles

Reactful core principles drivens the minimalist Reactful philosophy.

* **simplicity**: solution with less verbosity
* **intuitivity**: conceptual background reuse
* **learnability**: short and smooth learning curve

Some practical way to achieve those principles.

* no convention overheads: simplicity
* highly reusable concepts: intuitivity
* native specification APIs: learnability

Each principle are mutual between. A simpler design, is more intuitive and learnable. A more intuitive design is simple and easier to learn. And, off course, a more learnable design is based in something simples and more intuitive.

## Stateful React.js comparison

Cleaner and reduced code agains stateful React verbosity and complexity.

* local states
* global states
* partial states

## tailwind  comparison

Cleaner classless CSS, SoC principle and styles props extensions against Tailwind approach mixed messed code with CSS and JS.

- SoC principle
- classless CSS
- uncoupled fit

## next.js routing comparison

Keeping the native component-driven design against next conventions.

* declarative routing
* over-convention
* styling routeds
* optional params
* error handling
* HTTP middleware
* generateMetadata x @
* params: 3 conventions x 0
* generateStaticParams x @
* parallel routes

## react-router-dom comparison

* routing settings
* nested routing
* outlet layout
* base URL 