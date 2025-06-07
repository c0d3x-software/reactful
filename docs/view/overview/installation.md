<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 
<!-- <script src='../../js/steps.js'></script> -->

# Installation

With the latest `bun` installed, create a new project with the template creator `@c0d3x/reactful/create@latest`, the entry code starts with server render.


<section cols='3:5'>

```ps
$ bunx @c0d3x/reactful/create
- none=0|init=1|full=3? 3
- project name? MyProject
- install? (Y/n) y
- start? (Y/n) y
- installing...
- bundling...
- serving...

running at localhost:3000
```

```typescript
import { launch } from '@c0d3x/reactful/server'
import { client } from '@c0d3x/reactful'

await launch().server('#root')

@client(true)
export const Hello = props => <>
   <p>Hello { props.name }</p>
   <input data={props} bind='name' />
</>
```

</section>

After creation, the project package.json starts with those scripts.

| `bun run start` | `bun run debug` |  `bun run build` | `bun run clear` |
|-:|:-:|:-:|:-|
| build and run | vscode debugger| build the project | clear build folder |

The project is structured with special folders and default files.

<section cols='2'><aside class='infos'>
   
|             |                     |
| ----------- | ------------------- |
| /apis       | RESTful functions   |
| /assets     | Static contents     |
| /routes     | Component pages     |
| /directives | Injectable props    |
| /decorators | function decorators |
| /controls   | Control components  |
| /builds     | Deploy content      |
| /tests      | unit and e2e tests  |

</aside><aside class='infos'>
   
|              |                           |
| ------------ | ------------------------- |
| .env         | Environment file          |
| .ignore      | Git ignored  files        |
| index.ts     | Startup script            |
| index.html   | HTML wrapper              |
| sitemap.xml  | automatic SEO sitemap     |
| package.json | Project configuration     |
| bun.lockb    | Bun automatic locked file |
| robot.txt    | Optional to SEO crawlers  |

</aside></section>

