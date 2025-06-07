# Architecture

Reactful is a full-featured react meta-framework with a minimalist design and maximalist performance.

|| | |
|-|-|-| 
| ux  | performance | consumption (RAM, CPU, HD), speedness (latence, etc), scalability (concurrency, etc) |  lazy, minified, zero bundles, 
| dx | productivity | simplicity, learnability, intuitivity | styling, routing, binding | modular CSS, classless CSS |
| mx | proficiency | supports, principles, highlights |

## PRODUCTIVITY

Reactful has a large focus in dev experience with component-based SPA. 
Reactful is an standard-driven minimalist stateful React.

* simplicity
* intuitivity
* learnability

Instead of overwhelming the developer with new concepts, conventions, components, standards and pattern. The minimalist architecture philosophy is standard-driven, with OOP, attributes, decorators and directory routing. As a react meta-framework, instead of be an react extension, it is a react compression, removing, for example, the need of hooks as optional in favor of object.

### Styling

The lack of CSS modularization, or CSS leaking imports, push React ecosystem to some workround solutions, that not solved the problem, but deal with it. The main 3 solutions are css-module, styled-component and tailwing. In common, none of them solve the CSS modular issue, and decreases the design quality.

| | | |
|-|-|-|
| css-module | Import modules with '.module.css' suffix and inject into JSX style props | It enable some CSS scoping, but based in convention with some coupling with JSX by the style props |
| styled-component | It uses literal strings to code CSS string content inside of script, converting it in a CSS object to associate to JSX style props | It is similar to css-module but without any opaque convention required, but mix style inside script, and  is not able to deal with existent CSS files |
| tailwind CSS lib | Create utility CSS to style component using CSS class composition inside component className props | It completelly breaks the SoC between style and component, and polluted the code with styling information |

Reactful made the more obvious solution, just fix the CSS imports, allowing that any CSS import is only injected inside the modular components, a more web standard solution with zero learning curve overhead.

Warning! the current version does not support pseudo-selector. For CSS pseudo-selector content, just load your CSS files by HTML link[href] attribute.

### Routing

Routing cruscial to a SPA in the most common solutions are the client-side lib react-router-dom and server-side react meta frameworks line next.js. Both defines the approach that influences othes technologies, as Remix, Astro, etc.

| problems | solutions |
|-|-|
| - react-router-dom boilerplate code | directory for static routing |
| - next.js conventions overhead | decorator for dynamic routing |
| - extra hooks and components | transversal props handlers |

Next.js brings an great improvement with directory routing in relation to verbose component-driven solution in react-router-dom. But, the limit of this approach to deal with dynamic routing, open the door to naming conventions, losing its original advantage with a syntatic and sematic convention overhead.

| | |
|-|-|
| next.js routing conventions | page.js, page.tsx, layout.js, layout.tsx, loading.js, loading.tsx, error.js, error.tsx, not-found.js, found.tsx, route.ts, [param], [...param], [[...param]], index.js, index.tsx, api/, (group), @slot/, default.js, default.tsx

React solves route mapping bringing back the simplicity of directory routing, but for dynamic routing, it intruduces functional decorators by its transpiler.

```tsx
@route('/profile/:id')
function Profile(props, feeds) { 
   const id = feeds.param.id
   ...etc
}
```

For routing navigation, just props handlers and declarative routing. The [link] props create a clickable element, and [route] a conditional rendering.

```tsx
export default const Menu = props => <>
   <div link='/main'>Main</div>     <!-- clickable router -->   
   <main route='/main'>...</main>   <!-- conditional render -->
</>
```

### Binding

React has the easiest componization design when dealing with stateless component, but the most verbose, complex and couter-intuitive when deals with stateful component. Even with hook functions, it much more complex that angular-like solutions, like vue and angular itself with its local data binding and shared service injection. The complexity and verbosity scales within stateful React scope.

#### a) stateless

```tsx
const Stateless = props => <h1>Hello, {props.name}!</h1>
```

#### b) stateful (local)

```tsx
import React, { useState } from 'react';

function LocalStates() {
  const [name, setName] = useState('');
  
  return <h1>
      <h1>Hello, {name || 'World'}!</h1>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
   </h1>
}
```

#### c) stateful (global)

```tsx
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

function GlobalState() {
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
      <GlobalState />
    </MyContext.Provider>
  );
}
```

Reactful solution implements reactive objects, property handlers and dependency injections. Here, props are reactives objects that triggers the render when it is change, and store is a global state injected in component second argument. So, in Reactful, the props itself is a state, avoiding any imports, hooks, call, etc. 

```tsx
export const LocalState = props => <>
   <h1> Hello { props.name }!</h1>
   <input data={props} bind='name' />  
</>
```

```tsx
export const GlobalState = (props, { store }) => <>
   <h1> Hello { store.name }!</h1>
   <input data={store} bind='name' />  
</>
```

It also supports uncontrolled forms with `form[data]` with `form > input[bind]` with RESTful action, validation API and embbeded JWT auth algorithm.

```tsx
const Hello = props => <>
   <h1> Hello { props.name }!</h1>
   <input data={props} bind='name' />  
</>
```

```tsx
const Form = props => <>
   <h1> Hello { props.name }!</h1>
   <form form={props} action='webapi...'>
      <input bind='name' maxlength='50'>
   </form>
</>
```

Global states are injected with the Reacful IoC container.

```ts
import { launch } from 'reactful/server'
import store from './store'

await launch({ store }).server("#root")
```

## PERFORMANCE

### consumption

#### a) static server rendering (SSG)

|             |   reactful | next.js | remix | fresh | astro |
| ----------- | --- |-|-|-|-|
| RAM   |
| CPU  |
| HD |

#### b) dynamic server rendering (SSR)


#### c) periodic server rendering (ISR)

#### d) client rendering (CSR)

### velocity

|             |     |
| ----------- | --- |
| load-time   |
| build-time  |
| render-time |


## PROFICIENCY

In this contenxt, proficiency is the range of capacities and features of a given technology. It implies the manager experience to minimizes the number of licences and technological fragmentation of the project and team. Reactful supports:

### supports

- .env integration
- server-side rendering 
- static site generation 
- incremental site regeneration 
- search engine optmization 
- client-side rendering
- partial-hidration
- component streaming
- property directivy 
- markdown rendering 
- modular CSS
- nested routing
- cached routing
- routing pre-fetch
- component-scoped CSS 
- RESTful form actions
- HTML validation API
- error handling 
- async component
- server component 
- http middleware
- lazy components
- CLI create tool
- api routing 

### innovations (highlights)

- dependency injection (react)
- function decorators (all)
- declarative routing (all)
- dual data binding (react)
- reactive objects (all)
- HTML links JSX (all)

### foundations

- KISS principles
- XP simple design
- SoC (style x script)
- web standards
- classless CSS
- typescript
- bun

