<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 
<style>@import url(./environment.css);</style> 

# Server environment

## Semantic folders

Each framework folder has a special responsability in the project lyfe-cicle, allowing multiple server features, like routing, apis, etc.

* **/apis**: RESTful function requests with HTTP verb names
* **/assets**: Public static content as images, sounds, fonts, etc
* **/routes**: Component pages for static directory routing
* **/builds**: Ready-to-deploy post-build content
* **/controls**: Common shareable components

## .env settings

The **.env** files are supported with no prefixes and with environment switch between build and debug. The required fields are typed, but support dynamic keyed fields. 

<aside cols='4:5' style='margin-bottom: 10px'>

```py
PORT=3333    # http port
MINIFY=TRUE  # js minifier
DEBOUNCE=33  # batch render
PREFIX_URL=/ # root address
MY_VALUE=100 # custom field  
```

```ts
const port = global.env.PORT
const value = global.env['MY_VALUE']
const address = global.env.PUBLIC_URL
```
</aside>

```ts
// use declare const to type env with custom fields
declare const env : IEnvironment & { MY_VALUE: number  }
```

## API handlers

In  `/apis` folder, tje framework uses HTTP verb function names to map RESTful apis. Notice that folder is `'/apis'`, but in url is  `'/api'`.

```ts
// warning: /api/ folder, but /api route
// routing: http://localhost:3000/api/sample
export const get = request => new Response('Hello World!')
```

## HTTP Middleware (draft)

The inject launch method also allows middlewares in request-response pipeline.

```ts
import { launch } from '@c0d3x/reactful/server'
import { middleware } from './middlewares'

await launch().inject(middleware).render()
```

Response is optional, if it is returned, it will stop the request pipeline.

```ts
function middleware(request: Request): Response | void {
   request.headers.set('token', 'whatever...')

   const interceptMe = request.url.contains('test')
   if (interceptMe) return new Response('test')
}
```

## Markdown support

Reactful has a built-in markdown render with routing support. In case of name conflits with another extensions, check the <a href='structure.html#conflict-rules'>confliting name resolution</a> section.

## Extended HTML

The `<link>` supports a new `type="react"`, for JSX rendering injected in HTML for default import or named imports by `rel` attribute.

```html
<html>
<head>
   <link type="react" href="./general.tsx" />   
   <link type="react" rel="Special" href="./etc.tsx" />
</head>
<body>
   <General /> <!-- default JSX into HTML -->
   <Special /> <!-- named JSX into HTML -->
</body> 
</html>
```


## Async components

Async components and `Suspense API` are supported, with a new await **props handler** an props-driven alternative to `Suspense API`.

```tsx
async function Async(props) {
   const text = await fetch('www.api.com/text').then(x => x.text());
   return <section>content response: { text }</section>
}

const SyspenseExample = async props => <>
   <Suspense fallback={<h1>loading...</h1>}>
      <Async />
   </Suspense>
</>
```

The await directive is a Reactful alternative to Suspense component. Since it is an attribute, it could use an HTML element that could by stylized.

```tsx
const Await = async () => <p await={Async}><h1>loading...</h1></p>
```

## Search Engine Optmization (SEO)

SEO using decorators with typed MetaTag with Open Graph Protocol.

<aside cols='5:4'>

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

It support dynamic SEO (draft) with high-order functions.

```tsx
function myMetadataSEO(context, feeds) {  
   context.title = feeds.params.id
   context.description = feeds.params.id
}

@seo(myMetadataSEO) 
export default const User = (props, feeds) =>
   <h1>User id: { feeds.param.id }</h1>
```
