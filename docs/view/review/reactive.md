<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 

# Reactive objects

## Reactive concept

Reactive objects are self-rendering states, that encapsulates the React state handling algorithm, avoiding any extra boilerplate, with no class, hooks, calls, etc, just OOP. The reactive object is a Proxy Object thattiggers the host component render when it is changed.

## Self-rendering props 

The most basic state in React is the useState hook. In example bellow, is the lesser boilerplate code you will deal handling states in React.

```tsx
import React, { useState } from 'react';

function Hello() {
  const [name, setName] = useState('');
  const onName = e => setName(e.target.value)

  return <>
      <h1>Hello, {name || 'World'}!</h1>
      <input value={name} onChange={onName} />
   </>
}
```

All props are converted in reactive objects in Reactful, avoiding any extra coding for imports, hooks and calls to deal with local states.

```tsx
const Hello = props => <>   
   <h1>Hello, { props.name } !</h1>
   <input value={props.name} 
      onChange={e => props.name = e.target.value} />
</>
```

## Injecting global store

Global store is an injectable global state that follows the single source of thuth principle (SSoT), beeing injected in the server IoC Container.

```tsx
const myStore = { name: 'world' }
await launch({ store: myStore }).render()
``` 

After injected, it is available as feeds.store ias component second argument.

```tsx
const Hi = (props, { store }) => <>   
   <h1>Hi, { store.name } !</h1>
   <input data={store} bind='name' />
</>

const Hello = (props, { store }) => <>   
   <h1>Hello, { store.name } !</h1>
   <input data={store} bind='name' />
</>
```

## Partial modular states

For multiple shared states, the partial states allows modular approach. First, you need to creat explicitly a store by useStore function.

```ts
import { useStore } from '@c0d3x/reactful'

export const person = useStore({ guid: 0, name: 'john' })
```

After that, you need to import the crated store and binding it into a component using `@client(true, state=null)` decorator.

```tsx
import { client } from '@c0d3x/reactful'
import { person } from './stores'

@client(true, person)
const Hello = props => <>   
   Hello { person.name } !
   <input data={person} bind='name' />
</>
```

## Performatic debounce algorithm

The Reactful implements in background a debounce render algorithm with 0.5s delay between each rendering, avoiding render overload.

## Deconstruction state concern

When deconstructed, reactive objects losses its self-rendering behavior. 

```tsx
const Hello = ({ name }) => <>   
   <h1>Hello { name } !</h1> <!-- no self-rendering here -->
   <input value={name} onChange={e => name = e.target.value} />
</>
```