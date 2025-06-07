<script src='../js/index.js'></script>
<style>
@import url(../css/index.css);
[warning] { color:#9A9A9A; margin-top: 9px; font-size: 0.95rem; }
</style> 

# Style plus

> module-scoped CSS • component scope CSS • layout props • function decorator • SoC styling • vanilla-like CSS

## Modular-scoped

<a onclick='goto("review/scoping.html#css-transpiler")'>Module-scoped CSS</a> fixes the global leaking in CSS imports\*.

<aside cols='2'><section>

```tsx
import './hello.css'
export const Hello = () => 
   <h1>Hello World!</h1>
```

</section><section>

```css
/* modular css sample */
/* file: ./hello.css */
h1 { color: black; }
```

</section></aside>

<div warning>
* <strong>WARNING</strong>: modular CSS does not support pseudo-selectors
</div>

## Component-scoped

Component-scoped by <a onclick='goto("review/scoping.html#style-decorator")'>function decorator</a> or <a onclick='goto("review/scoping.html#component-classname")'>component CSS className</a>.

```tsx
@style('../styles/hello.css')
export default const Hello = () => <h1>Hello World!</h1>
```

<aside cols='5:4' style='margin-top: 10px;'>

```tsx
import './hello.css'
export const Hello = () => <h1>Hi!</h1>
```

```css
* { background: green;  }
h1.Hello { color: red;  }
```

</aside>


## Routed style

CSS className `routed` to style the <a onclick='goto("review/scoping.html#styled-route")'>routed state</a> with `[link]` directive.

```css
button.routed { background: wheat; font-weight: bolder; }
```