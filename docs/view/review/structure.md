<script src='../index.js'></script>
<style>
@import url(../css/index.css);
@import url(./structure.css);
</style> 

# Routing structure

## Folder routing

Static folder routing has no extra naming conventions. Its routing fallbacks retries into nearest inner route until achieve the root path (/).

| DIRECTORY                 | ROUTING                | RESOLUTION          |
| ------------------------- | ---------------------- | ------------------- |
| /routes/index.tsx         | localhost:3000/        | index JSX           |
| /routes/about.tsx         | localhost:3000/about   | filename JSX        |
| /routes/sample.html       | localhost:3000/sample  | filename HTML       |
| /routes/example.md        | localhost:3000/example | filename markdown   |
| /routes/profile/index.tsx | localhost:3000/profile | subfolder index JSX |

## Nesting routes

Nesting routes uses relative dot slash syntax.

| CONTEXT                | ROUTING   | RESOLUTION            |
| ---------------------- | --------- | --------------------- |
| /                      | ./about   | /about                |
| /admin/system          | ./account | /admin/account        |
| /user/profile/overview | ./details | /user/profile/details |

## Conflict rules

Considering the index and extension supression, there is some conflict cases listed below. All routing conflits throws exception in build time exception. 

| CONTEXT SAMPLING                             | CONFLICT TYPE                 |
| -------------------------------------------- | ----------------------------- |
| file.tsx, file/index.tsx                     | filename x index              |
| file.html, file.tsx, file.md                 | filename x extensions         |
| file.html, file.tsx, file.md, file/index.tsx | filename x extensions x index |

## Cached Routing

As Reactful supports for <a href='structure.html#client-component'>partial hydration</a>, all routes are sent and cached to the browser as a performatic user experience as a client-side app.

## Dynamic routes

Dynamic routing (aka parametric route) uses functions decorator. It has highets priority, overriding any static routing conflicts.

```tsx
import { route } from '@c0d3x/reactful'

@route('/whatever/profile/:id')
export default async function Profile(props, { params }) {
   const user = fetch(`${url}/${params.id}`).then(x => x.json())

   return <>
      <h1>Profile</h1>
      <h2>User ID: { params.id }</h2>
      <h3>User name: { user.name }</h3>
   </h1>
}
```

All routing params are optional by default, to enable optional parameters, it requires pass true in @route second argument (draft).

```tsx
@route('/whatever/profile/:id', true)
```

## Declarative routing

The `[route]` enables declarative routing, meanwhile `[link]` directive adds a clickable behavior into its host element to switch routes.

```tsx
export default const Menu = props => <>
   <h1>Menu</h1>   
   <a link='/main'>Main</a>         <!-- clicable router -->   
   <main route='/main'>Main</main>  <!-- conditional rendering -->
</>
```

All page components is placed where it it will render, with no extra convention or boilerplate settings code. It renders when [route] props is matched. Declarative routing works as next.js slots or Angular transclusion (component project), but in a clearer way.

## Actived routing style

The active routing elements using [link] directives could be easily style with built-in <a href='./scoping.html#styled-route'>.routed CSS className</a>, to easily creates a toggled state button.

## Imperative routing (draft)

For imperative routing cases, Reactful has a router object.

```tsx
import { router } from '@c0d3x/reactful/kernel'

router.history  // all routes
router.current  // current route
router.address  // location object
router.queries  // query string values (URL.searchParams)

router.goto('/admin')   // location.href = '/admin'
router.back()           // back to previous route
router.back(2)          // back 2 previous routes

router.on('back', f)    // back event
router.on('goto', f)    // goto event
```

## Lazy loading routes

Lazy routing enables lazy component that is imported in runtime, only when it matches the route. It is enabled by import using a promise extension as `asLazyComponent`. 

```tsx
const MyLazyComponent = import('./main').asLazyComponent('Sample')

export const Menu = (props, feeds) => <>
   <h1>Menu</h1>
   <a link='/sample'>Sample</a>
   <MyLazyComponent route='/lazy' /> 
   { feeds.await && <p>importing component...</>}
</>
```

## Outlet templating (draft)

The @outlet decorators applies transparent template/layout components.

```tsx
@outlet() // './outlet' path by defalt
export const Sample2 = (props, feeds) => <>...</>

@outlet('/templates/my-specific-template')
export const Sample2 = (props, feeds) => <>...</>
```

```tsx
// ./outlet.tsx component example
export default function({ children }) {
   return <section>{ section }</section>
}
```
