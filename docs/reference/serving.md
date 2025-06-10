<script src='../js/index.js'></script>
<style>@import url(../@assets/css/index.css);</style> 
<style>@import url(serving.css);</style> 

# Serving

> hybrid render • server components • partial hydration • web apis • markdown • error handling • html+


## Server launcher

Server launcher starting point allows some configurations.
```ts
import { launch } from '@c0d3x/reactful/server'

await launch({ folders:{ routes: '/pages' }}).server('#root')
```

The Reactful IoC supports injection stores (global states) and handlers.

<aside cols='5:4'>

```ts
import { error } from './components'
import { myProps } from './props'
import { pipe } from './middleware'

await launch({ store: { ok:true } }) 
     .inject(myProps)
     .inject(error)
     .inject(pipe)
     .server("#root")
```

* **error handler**: get the error and returns an component
* **request handler**: it allows request and response interceptions
* **property handler**: user custom property handler for props transformation

</aside>

## RESTful server

Fullstack support with RESTFul api in `/apis` folder, it maps each function by its HTTP verb name, exposing the directory structure with `/api` prefix URL.

```ts
// /apis/sample.ts  ->  http://localhost:3000/api/sample
export const get = request => new Response('Hello World!')
```

## Decorator renders

Rendering mode with 'use' directives and component-scoped metadata decorators.

```tsx
@client(true) export default const Client = props => <>...</>
@server('static') export default const Static = props => <>...</>
@server('dynamic') export default cont Dynamic = props => <>...</>
@server('periodic', "36h")  export default const Periodic = props => <>...</>
```

It server component and suspense API for server-side rendering.

```tsx
async function Async(props) {
   const text = await fetch(url).then(x => x.text())
   return <section>content response: { text }</section>
}

const SyspenseExample = async props => <>
   <Suspense fallback={<h1>loading...</h1>} />
</>
```

## SEO decorator

SEO with function decorator with string or metatatag object. The **sitemap** and **robot.txt** auto-generation is soft coded with **.env file** that was enhanced with complexy type support.

<aside cols='5:3'> 
 

```tsx
import { seo } from '@c0d3x/reactful'
 
@seo('title', 'description')  
function Home(props) { return <>Home</> }

const metas = { chartset:'UTF-8', etc... }

@seo('title', metas) 
const About = props => <>etc...</> 
```


```js
PORT=3333
ZIPPED=FALSE
MINIFIED=FALSE
PREFIX_URL=/  
SITEMAP=['www.site.com']
ROBOT=[{ 
   agent:'*',  
   allow: '/' 
}]
``` 

</aside>


## Markdown and HTML+

Reactful supports markdown rendering with Marko lib and extends HTML to allow JSX in HTML, enabling micro component tree and container page design, breaking a monolith component tree in micro-component threes (still in experimental stage).

```html
<section>
   <script type='jsx' src='./components/sample.jsx' />      
   <script type='tsx' src='./components/example.tsx' />

   <Sample />  <!-- only works with default exports -->
   <Example name='ok' />   <!-- supports parameters -->
</section>
```
