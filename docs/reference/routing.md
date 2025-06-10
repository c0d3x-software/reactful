<style>@import url(routing.css);</style>
<style>@import url(../@assets/css/index.css);</style> 
<style>
   table { margin: 0px 30px !important; zoom:0.95; }
   table th { font-weight:700; border-bottom-style: dashed }
</style> 

# Routing

> file-base routes • route decorator • dynamic route • props routing •  markdown support • lazy load • nested routes

## Static routes

Static routes uses directory routing with zero conventions and **nested routes**.

| model     | route   | resolution          | context     |
| --------- | ------- | ------------------- | ----------- |
| indexing  | /routes | /routes/index.tsx   | /routes     |
| prefixing | /admin  | /routes/admin.tsx   | /routes     |
| nesting   | ./top   | /routes/sub/top.tsx | /routes/sub |


## Dynamic routes

Dynamic route decorator has priority over directory routing. 

```tsx
@route('/profile/:id')
export default const User = (props, feeds) =>
   <h1>User id: { feeds.param.id }</h1>
```

## Props routing

<a onclick='goto("review/structure.html#props-routing")'>Route directives</a> with conditional `[route]` and clickable router `[link]`.

```tsx
export default const Menu = props => <>
   <div link='/main'>Main</div>     <!-- declarative router -->   
   <main route='/main'>...</main>   <!-- conditional render -->
</>
```

## Lazy loading

<a onclick='goto("review/structure.html#lazy-loading")'>Lazy routing</a> using `asLazyComponent` promise extension. 

```tsx
const Main = import('./main').asLazyComponent('Sample')

export default const Menu = props => <>
   <a link='/sample'>Sample</a>
   <Main route='/lazy' />
</>
```

## Fallback routing

Fallback routing retries not found routes, going up until the root (/), avoiding not found error (as a fault tolerance pattern for routing for certain scenarios).

```ts
@route('/path/to/:id', true) // true = enabling fallback routing
```


## Authorization roles

Function decorator for role authorization based on `feeds.logon.role` (experimental).

```tsx
@auth(['manager','admin'])
export default const Admin = props => <h1>Admin...</h1>
```