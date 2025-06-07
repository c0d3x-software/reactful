<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 

# Hybrid rendering

## Rendering types

Hybrid rendering allows multiple rendering strategies, like client-side rendering (CSR), server-side rendering (SSR), static site generation (SSG) and incremental site regeneration (ISR). It has native support to React Server Components (RSC).


## Server starting point

The fluent launch function is the framework starting point to run the application. It sets `"/routes"` folder and `"#root"` element as default values.

```ts
import { launch } from 'reactful/server'

await launch().server()
await launch("/routes").server("#root") 
await launch({ routes: "/routes" }).server("#root")
```

Directives are injected in `inject` method, and another dependencies is passed in launch function object argument. See more details in <a onclick='goto("review/injection.html")'>dependency injection</a>.

```ts
import { launch } from 'reactful/server'
import { directive } from './directives'

const myStore = { ok: true }

await launch({ store: myStore })
     .inject(directive)
     .server("#root")
```

## Client component

Only client component could deal with states (interactive), it is marked with `@client` decorator, instead a less scoped of modular `'use client'`. To desable the self-rendering algorithm, pass false in `@client(false)`.

```tsx
@client(true) export const Hi = props => <>...</>
```

Client-side rendering works with partial hydration, sending a pre-rendered HTML and a javascript bundle to be partially hydrated in client-side. 

## Server component

Full support to static (SSG), dynamic (SSR) and periodic (ISR) server hybrid rendering using just function decorators as metadata.

```tsx
@server('static') // default
export default const Static = props => <>...</>

@server('dynamic')  
export default const Dynamic = props => <>...</>

@server('periodic', "36h") 
export default const Periodic = props => <>...</>
```

It also supports async components with Suspense component API.

```tsx
import { Suspense } from 'react'

export default async function AsyncComponent(props) {
   const user = await fetch(url).then(x => x.json())
   const loading = <h1>loading...</h1>

   return <Suspense fallback={loading}>
      Hello { hello.name }
   </Suspense>
}
```

