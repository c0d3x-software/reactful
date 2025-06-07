<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 

# Functional decorator

## Decorators

Since Javascript decorator is a class-only feature. The functional paradigm in React turns native decorators useles. Reactful fixes it implementing a functional decorator transpiler.

## Modelling

The decorator signature is a function that returns an specific signature function with meta and call arguments and call return, as example bellow.

```tsx
export const decorating = args => (meta, call) => call
```

The meta as import metadata and call a function object, like ReactFunctionComponent or just RFC. A decorator could intercepts each functional component. 

```tsx
export function decorating(args: string): Decorator<RFC> {   
   return function (meta: ImportMeta, call: RFC) {
      // TODO...
      return call
   }
}
```

## Library

Reactful has its built-int decorators for multiple purposes. 

|         | |
| -------: |-|
| @style  | It binds a CSS class into a component |
| @server | It sets the non-client hybrid rendering model |
| @client | It defines a component as client-side, allowing states |
| @route  | It binds a component to an specific route |
| @error  | It binds a error component to an specific component |
| @auth  | It check the authorization role in logon.role |
| @seo   | It sets metatags information |

## Limitations

Custom decorators has no support to imports, it means that it could be imported, but it cannot import anything itself. If it this happens, the app will crash.