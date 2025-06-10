<script src='../js/index.js'></script>
<style>
@import url(../@assets/css/index.css);
[warning] { color:#9A9A9A; margin-top: 9px; font-size: 0.95rem; }
</style> 

# Styling

> module-scoped CSS • component scope CSS • layout props • function decorator • SoC styling • vanilla-like CSS

## Modular CSS

Reactful fixes the global leaking in CSS imports\*, enabling modular CSS.

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

## Style decorator

Style decorator enables a component-scoped CSS styling.

```tsx
@style('../styles/hello.css')
export default const Hello = () => <h1>Hello World!</h1>
```

## ClassName tag

In Reactful, all component receives the component name as a CSS className, allowing component-scoped in style-side with classless CSS.

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

Reactful reserves a CSS class .routed for toggled state in component using `[link]` props router, enabling fast and easy toggle state for element.

<aside cols='2'>

```html
<button link='/'>Main</button>
```

```css
a.routed { filter:invert(1) }
```

</aside>