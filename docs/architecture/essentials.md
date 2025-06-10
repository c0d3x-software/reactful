<script src='../@assets/js/index.js'></script>
<style>@import url(essentials.css);</style> 

# Essentials

Reacftul follows a standardized minimalist design with low abstraction based on DRY, KISS and YAGNY design principles and high performance architecture. 
 
## Modular CSS

Fixed modular CSS imports with component-scoped style decorator.

```tsx
import 'modular-css-only-applies-in-components-of-module.tss'
@style('./hello.css') export const Hello = () => <h1>Hello!</h1>
```

## Hybrid renders

Full rendering with SSR, SSG and ISR with 'use' directives and function decorators.

```tsx
@client(true) export default const Client = props => <>...</>
@server('static') export default const Static = props => <>...</>
@server('dynamic') export default cont Dynamic = props => <>...</>
@server('periodic', "36h")  export default const Periodic = props => <>...</>
```

## Clean routing

Server with **/apis**, **/assets** and **/routes** with zero conventions.

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

<aside cols='4:5'>

Reactive objects is a hookless stateful approach that encapsulates all state boilerplate codewith dual data binding props for clean minimalist components

```tsx
const Hello = props => <>
   <h1> Hello { props.name }!</h1>
   <input data={props} bind='name' />  
</>
```

</aside>

## Property handlers

Built-in framework props that encapsulates props transformation.

| **[data]** | **[bind]** | **[link]** | **[route]** | **[grid]**
|:-:|:-:|:-:|:-:|:-:|
| data bound | data binding | declarative router | conditional route | grid layout props |

```tsx
// custom property handlers using depedency injection.
const shown = props => ({ ...props, hidden: !props.shown })
export const Ok = prop => <div shown={true}>Show me!</div>
await launch("/routes").inject(shown).server("#root")
```

## Dependency injection

Dependency injection to handle props, requests and exceptions.

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

Function decorator as currying suggar syntax and function metadata.

```ts
const example = (args) => (meta, call) => call     // <-- definition 
@example('testing') const someFunction = () => { } // <-- consumption
example('testing')(import.meta, someFunction)      // <-- transpilation
````