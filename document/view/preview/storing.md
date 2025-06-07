<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 
<style>@import url(storing.css);</style> 

# Stateful objects

> reactive object • stateful props • modular state • global state • self-rendering state • dependency injection

## Local props 

Local states with reactive props as <a onclick='goto("review/reactive.html#stateful-props")'>self-rendering states</a>.

```tsx
const Hello = props => <> Hello { props.name } !
   <input value={props.name} {e => props.name = e.target.value} />
</>
```

## Global store

Injectable <a onclick='goto("review/reactive.html#global-store")'>global store</a> as global store as Single Source of Truth (SSoT) pattern.

```tsx
await launch({ store: { name: 'world' } }).server("#root")

const Hello = (props, feeds) => <>
   Hello { feeds.store.name || 'World' } !
   <input value={feeds.store.name} 
            onChange={e => props.name = e.target.value} />
</>
```

## Partial states

<a onclick='goto("review/reactive.html#partial-states")'>Partial states</a> is a modular state set in the `@client` decorator.

```ts
const guy = useStore({ guid: 0, name: 'john' })

@client(true, guy)
const Hello = props => <> Hello { guy.name } !
   <input value={guy.name} {e => guy.name = e.target.value} />
</>
```