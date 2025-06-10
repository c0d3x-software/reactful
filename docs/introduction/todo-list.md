<style> @import url(todo-list.css); </style>

# Example

TodoList component started with default route `/`, with modular CSS imports, reactive object states and dual data binding props. 

</aside>
 
##### /routes/index.css

```css
.done { text-decoration: line-through }      
```
 
##### /routes/index.ts

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


##### /index.ts

```ts
import { launch } from '@c0d3x/reactful/server'
await launch().server("#root") 
```
