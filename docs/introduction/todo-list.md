<style> @import url(todo-list.css); </style>

# Example

TodoList component started with default route `/`, with modular CSS imports, reactive object states and dual data binding props. 

</aside>
 
```css
.done { text-decoration: line-through } /* path: /routes/index.css  */
```
 
```tsx
import './index.css'

export const TodoList = props => <div>
   <h1>Todo List</h1>
   <input data={props} bind='task'/>
   <button onChange={add(props)}>Add</button>      
   { props.list?.map(todoItem) }
</div> 
 
const todoItem = item = <li> 
   <label class={item.done && 'done'}>{ item.name }</label> | 
   <input type='checkbox' checked={item.done} />
</li>

const add = props = e => props.list 
   ? props.list.push(props.task)
   : props.list = [props.task]
```


Project structure with index.ts starter and index.html wrapper.

<aside id='step-1' cols='2:5'>

```py
├─── apis/ 
├─── assets/
├─── builds/
├─┬─ routes/
│ ├─ index.ts 
│ └─ index.css
├─── .env
├─── .env.local
├─── .gitignore 
├─── index.html
├─── index.ts
├─── package.json
└─── tsconfig.json 
```

```html
<!-- path: /index.html -->
<!DOCTYPE html>
<html>
<head>
   <meta charset="UTF-8">
   <title>Hello World</title>
   <meta name="description" contents='Hello' />
   <meta name="viewport" content="width=device-width">
</head>
<body>
   <div id="root"></div>
</body>
</html>
```

</aside>
<aside id='launch'>

```ts
await launch().server("#root") // path: /index.ts
```
