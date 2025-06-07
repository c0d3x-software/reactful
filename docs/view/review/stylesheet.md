<script src='../js/index.js'></script>
<style>
@import url(../css/index.css);
table { margin-top:-20px;  }
</style> 

# Extended CSS

## Classless CSS

Instead of Tailwind approach, tha mixes style information into component, breaking the separation of concern between scripts and styles, Reactful follows a classless CSS approach, using a classless lib minimal.css as starter styling. Minimal.css is an extension of popular classless lib pico.css. It enable SoC between style and script fixing internal issues, as CSS imports bug, using just HTML, CSS and JS native specifications.

## CSS imports bug

All imported CSS leaks to global scope. It is the same behavior of a link[href] in static HTML. CSS imports in React are useless and error phrone.

```tsx
import 'my.css' // global, not modular
```

Libraries like **css-module** and **styled-components** have both very different approch, but share in common the failure to solve the CSS import bug.

| | |
|-|-|
| css-module | it uses name conventions with imported css into a object, and injected in styles props of React element |
| styled-component | it uses literal string to allow CSS text into javascript file, but not support actual CSS file |



```tsx
// css-module library approach using 'module.css' suffix convention
import cssModule from './blog.module.css' 

// styled-component library approach using special into script
const styledComponent = styled.section`padding: 4em; background: papayawhip;`;
```

## Transpiler

Reacftul fixes this bug with a bun transpiler that manages all CSS imports in javascript module in a way that it work as it is expected. So, 

```tsx
import 'my.css' // only applied into intra-module components
```

## Limitations

This solution version not support pseudo-selector, so, for this case ():first-of-type, :before, :hover, etc), use the convention HTML `link[href]`.

## CSS class attribute

It allows web standard class attribute em JSX element.

```tsx
const Hello = () => <h1 class='myCssClass'>Hello World!</h1>
```
 
## CSS Decorator

The `@style('path')` decorator enables a component-scoped CSS in script-side.

```tsx
@style('../styles/hello.css')
export default const Hello = () => <h1>Hello World!</h1>
```

## Component className

Reactful automatically adds the component name in CSS className of its inner elements, allowing a CSS-side styling for an specific component.

<aside cols='5:4'>

```tsx
import './hello.css'
const Hello = _ => <h1>Hello!</h1>
```

```css
h1 { color:silver }
h1.Hello { color: red }
```

</aside>

## Grid layout props

Style props handlers for easy CSS grid layout with `[grid]`, `[cols]` and `[gaps]`, allowing an easy and clear way to layout directally in HTML.

```tsx
const Before = props => <>
   <p style='gap:10px; display:grid; grid-template-columns:1fr 1fr'>
      <div>Column 1</div>
      <div>Column 2</div>
   </p>   
</>
```

```tsx
const After = props =>  <>
   <p grid gaps='10px' cols='1fr 1fr'> 
      <div>Column 1</div>
      <div>Column 2</div>
   </p>   
</>
```

Alias in `cols` directive allows shorter syntax for grid-template-columns syntax. 

<br/>

| cols | grid-template-columns | description |
|-|-|-|
| `2` | `1fr 1fr` | number of columns |
| `2:3:1` | `2fr 3fr 1fr` | column proportions |
| `auto:1:2` | `auto 1fr 2fr` | proportions with auto width |
| `100px:1:2` | `100px 1fr 2fr` | proportions with absolute width |


## Styled route

The `.routed` is built-in a CSS className for the element with `[link]` that is in current route, as an simplified way to toggle state CSS.

```css
button.routed { background: wheat; font-weight: bolder; }
```
