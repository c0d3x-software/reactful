<script src='../@assets/js/index.js'></script>
<style>@import url(creation.css);</style> 
<style>
#tool div { display:table-cell; vertical-align:top; }
#tool img { height: 120px; width: 210px; padding: 15px 15px 0 0; }
#tool 
</style>

# Creation

> HTML | CSS | TypeScript | Bun

<aside id='tool'><div style='width: 210px; '>
   <img src='../@assets/img/cli-tool-min.png'/>
</div><div >

Create a new project with the template creator using `@c0d3x/reactful/create@latest`. 

```ps
$ bunx @c0d3x/reactful/create
```

</div></aside>


Reactful is debug-ready configuration for Vs Code and with package.json scripts:


<section style='margin-left: 30px; zoom: 95%'>

| `bun run start` | `bun run debug` |  `bun run build`  | `bun run clear`    |
| --------------: | :-------------: | :---------------: | :----------------- |
|   build and run | vscode debugger | build the project | clear build folder |

</section>

The minimal templates starts with index.html wrapper and index.ts boostrap.

<aside cols='2'>

```typescript
// index.ts
import Reactful 
from '@c0d3x/reactful'

await Reactful.launch().server()  
```

```ts
// routes/index.ts
export default props => <>
   <h1>Welcome to Reactful</h1>
   <p>Hello World!</p>
</>
```

</aside>