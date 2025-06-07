<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 

# Property handlers

## Directive concept

Property handler emulates the Angular-like attribute directive, but a functional approach and with less coding. Directive enables attributes that you can encapsulate algorithm and shared between elements.

## Reactful directives

Reactful directives are built-in props handlers that appends new attributes into React elements, enabling resources like data binding, style extensions, etc.

<section cols='5:4'>

```tsx
// decorator producer
const decorator = props => { ...props }
```

```html
<!-- decorator consumer -->
<element decorator='done' />
```

</section>

## Custom directives

Custom directives are registered it server IoC container, here an example of how to creation, register and usage of a custom directive.

```tsx
import { server } from '@c0d3x/reactful'

// 1. create a function that receives and returns a props 
const shown = props => ({ ...props, hidden: !props.shown })

// 2. inject the function into launch IoC container
await launch("/routes").inject([ shown ]).server("#root")

// 3. declare in module "react" to enable intellisense
declare module "react" { interface HTMLAttribute { show?:boolean }}

// 4. just the props handler in elements
export const Ok = prop => <div shown={true}>Show me!</div>
```

## Performance concerns

Directive time cost is negligenciable, in general, but a large number of it could decreases performance. So, consider this for custom directives, due it be a render-time function call.