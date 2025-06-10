<script src='../@assets/js/index.js'></script>
<style>@import url(structure.css);</style> 

# Structure
> env complex | index standard | fullstack app

<section style='margin: 0 50px;' cols='2'><aside class='infos'>
   
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

## .env settings

Reactful supports **.env** file swith complex types and prefix in fullstack global.env variable. 

<aside cols='2:5' style='margin-bottom: 10px'>

```py
PORT: 333
DELAY: 50
ZIPPED: FALSE
MINIFIED: FALSE
PREFIX_URL: /
MY_VALUE=100 
```

```ts
const port = global.env.PORT
const value = global.env['MY_VALUE']
const address = global.env.PUBLIC_URL

// extending Env type with custom values
declare interface Env { MY_VALUE: number }
```

</aside> 

<aside id='standard' cols='2'>
 
The Reactful follows web standard index semantics and vanilla React, with index.html as wrapper and index.ts entry file.
  
* **/index.ts**: startup script with IoC container
* **/index.html**: template warpper HTML
* **/routes/index**: home page with JSX, HTML or MD
 
</aside>

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