<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 

# Dependency Injection

## IoC Container

The Reactful IoC container handles <a onclick='goto("review/reactive.html")'>global state</a>, <a href='#error-handling'>error components<a> and<a onclick='goto("review/directive.html")'>props handlers</a> dependencies as server argument or inject method. 

```ts
import { launch } from 'reactful/server'
import { directive } from './directives'

const error = (status, errors) => ...
const store = { name: 'john', date: '0001-01-01' }

await launch({ store, error })
     .inject(directive)
     .inject(middleware)
     .server("#root")
```

The launch parameter is typed by Settings interface

```ts
interface Settings<T = any>  {
   store: T          // global state  (default: undefined)
   route: string     // component page folder (default: '/routes')
   query: string     // query selector for root HTML (default: '#root')
}
```

## Injection resolution

It uses the the function second parameter to inject the feeds object. A object that contains all injected dependencies and contextual informations.

```ts
function Component(props, feeds) {
   const isPending = feeds.awaits
   const globalState = feeds.store
}
```

```ts
interface Feeds {
   param: record    // route params of dynamic routing
   store: record    // custom global store by DI
   logon: record    // current logged user by Reactful auth
   await: boolean   // global pending fetch for loading spine
   fails: Invalid[] // current fetch errors
}
```

Using the function second argument, the props are preserved to its original semantics: the component attributes and children. Insteado of mixing it with other information, like next.js with params.


## Error components

The high-order error component receives an HTTP status code with an error array cached by unhandled exception throws or HTTP eror responses.

```tsx
const errorComponent = (status, errors) => <p>
   <h1>My custom error component...</h1>
   { errors.map((e,i) => <p key={i}>{ e }</p>) }
</p>
```

The error component is injected in Reactful launch function.

```tsx
await launch({ error: errorComponent }).server("#root")
```
Specific compnoent errors is handled by  `@error(component)` decorator.

```tsx
@error(specificErrorComponent)
export function SomeComponent() { ... }

const specificErrorComponent = (status, errors) => <p>
   <h1>My custom error component...</h1>
   { errors.map((e,i) => <p key={i}>{ e }</p>) }
</p>
```

## Conflits with React 19

Canary React 19 will is considering use the function second parameter for server component context. So, when if this decision goes to final version,  Reactful will realocate this information to serve field in Feeds.

```ts
interface Feeds {
   serve: Context
   ...,
}
```