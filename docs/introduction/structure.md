<script src='../@assets/js/index.js'></script>
<style>@import url(creation.css);</style> 

# Structure

Reactful is made with ultra fast **bun** toolkit. The project is structured with some default folders and files.

<section cols='2'><aside class='infos'>
   
|           |                      |
| --------- | -------------------- |
| /apis     | RESTful functions    |
| /assets   | Static contents      |
| /routes   | Content pages        |
| /controls | Shared components    |
| /builds   | Deploy-ready content |
| /tests    | unit and e2e tests   |

</aside><aside class='infos'>
   
|               |                       |
| ------------- | --------------------- |
| .env          | Environment file      |
| index.ts      | Startup script        |
| index.html    | HTML wrapper          |
| package.json  | Project configuration |
| tsconfig.json | TypeScript settings   |
| .gitignore    | Git ignored  files    |

</aside></section>

The startup is made by standard index semantics. 

<section style='margin-left:50px'>

* **/index.ts**: startup script with IoC container
* **/index.html**: template warpper HTML
* **/routes/index**: home page (supports JSX, HTML and MD)

</section>

<aside cols='4:5'>

```html
<html>
<head>
  <meta charset="utf-8">
  <title>Reactful</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

```ts
import Reactful from '@c0d3x/reactful'

// customizing system folders
const folders = { route: '/pages' }

await Reactful
   .launch({ folders })
   .server('#root')  
```

</aside>