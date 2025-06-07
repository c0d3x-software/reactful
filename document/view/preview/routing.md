<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 
<style>
   @import url(routing.css);
   table { margin: 0px 30px !important; zoom:0.95; }
   table th { font-weight:700; border-bottom-style: dashed }
</style> 

# Routing pages

> path routing • route decorator • dynamic route • props routing •  markdown support • lazy components • nested routes

## Folder routing

<a onclick='goto("review/structure.html#folder-routing")'>Directory routing</a> with recursive fallbacks and nested routes.

| model     | route   | resolution          | context     |
| --------- | ------- | ------------------- | ----------- |
| indexing  | /routes | /routes/index.tsx   | /routes     |
| prefixing | /admin  | /routes/admin.tsx   | /routes     |
| nesting   | ./top   | /routes/sub/top.tsx | /routes/sub |


## Dynamic routes

Dynamic <a onclick='goto("review/structure.html#dynamic-routes")'>route decorator</a> as highest priority routing resolution.

```tsx
@route('/profile/:id')
export default const User = (props, feeds) =>
   <h1>User id: { feeds.param.id }</h1>
```

## Authorization roles

Function decorator for role authorization based on `feeds.logon.role`.

```tsx
@auth(['manager','admin'])
export default const Admin = props => <h1>Admin...</h1>
```

## Props routing

<a onclick='goto("review/structure.html#props-routing")'>Route directives</a> with conditional `[route]` and clickable router `[link]`.

```tsx
export default const Menu = props => <>
   <div link='/main'>Main</div>     <!-- clickable router -->   
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

