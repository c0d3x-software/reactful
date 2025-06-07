<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 
<style>@import url(serving.css);</style> 

# Server flows

> hybrid rendering • server components • partial hydration • web apis • extended html • error handling • markdown support


## Server launcher

Reactful IoC container for <a onclick='goto("review/reactive.html#global-store")'>global store</a>, <a onclick='goto("review/injection.html#error-components")'>error components</a> and <a onclick='goto("review/directive.html#props-directives")'>props handlers</a>.

```ts
import { launch } from '@c0d3x/reactful/server'
import { directive } from './directives'
import { decorator } from './decorators'

await launch({ store: { ok:true } })
     .inject(directive)
     .inject(decorator)
     .server("#root")
```

Fullstack support with `/apis` as <a onclick='goto("review/rendering.html#restful-apis-folder")'>RESTful</a> folder using HTTP verb in function names. 

```ts
// /apis/sample.ts as http://localhost:3000/api/sample
export const get = request => new Response('Hello World!')
```

## Decorator side

Component metadata with <a onclick='goto("review/decorator.html")'>function decorators</a> for <a onclick='goto("review/hybriding.html")'>hybrid rendering</a>.

```tsx
@client(true) export default const Client = props => <>...</>
@server('static') export default const Static = props => <>...</>
@server('dynamic') export default cont Dynamic = props => <>...</>
@server('periodic', "36h")  export default const Periodic = props => <>...</>
```

## SEO decorator

Function decorator overloads for SEO with typed metatags.

<aside cols='2'>

```tsx
import { seo } from '@c0d3x/reactful'
import { MetaTag } from '@c0d3x/reactful'

@seo('title', 'description') 
export function Hi(props) {
   return <>Hi...</>
}
```

```tsx
const meta: MetaTag = { 
   chartset: 'UTF-8', 
   keywords: 'a,b,etc' 
   og: { ... }
}

@seo('title', meta) 
const About = props => <>etc...</> 
```

</aside>

## Multiple supports

It supports <a onclick='goto("review/multiple.html#markdown-support")'>Markdown</a>, <a onclick='goto("review/multiple.html#extended-html")'>extended HTML</a> and <a onclick='goto("review/multiple.html#async-components")'>async components</a>.

