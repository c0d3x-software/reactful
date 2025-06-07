---
marp: true
class: invert
theme: uncover
paginate: true
---

<style> 
@import url(./index.css); 
code {
   border: 0 !important;
   width: 100% !important;
   padding: 30px !important;
   background: #191919 !important;
   font-family: agave !important;
   font-size: 0.73rem !important;
}
</style>

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

node = document.getElementById('root')
root = ReactDOM.createRoot(node)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

```tsx
const App = () => <Router>  
   <ul className='menu'>
      <li>
         <Link to="/">Home</Link>
      </li>
      <li>
         <Link to="/about">Sobre</Link>
      </li>
   </ul>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
   </Routes>
</Router>
```

---

```tsx
const Menu = props => <>
   <div link='/main'>Main</div>        
   <main route='/main'>...</main>   
</>
```

---

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html' })
export class HelloComponent {
   @Input() name: string = '';
}
```
---


```html
<h1>Hello {{ name || 'World' }}!</h1>
<input type="text" [(ngModel)]="name" />
```

---

```ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component'; 
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent, HelloComponent],
  imports: [BrowserModule, FormsModule], 
  bootstrap: [AppComponent] })
export class AppModule { }
```

---


```html
<app-hello name='John'></app-hello>
```

---

```tsx
export const Hello = props => <>
   <h1> Hello World!!</h1>
</>
```

```tsx
import { Hello } from './hello.tsx'

export const App = () => <>
   <Hello />
</>

```

---

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NameService {
  private name = 'World';

  set name(x: string) { this.name = x }
  get name(){ return this.name; }
}

```

---

```ts
import { Component } from '@angular/core';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html'
})
export class HelloComponent {
  constructor(public nameService: NameService) {}
}
```

----

```ts
import { Component } from '@angular/core';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html' })
export class HelloComponent {   
   constructor(public nameService: NameService) {}   

   public get name() { return nameService.name }
   public set name(value) { nameService.name=value }
}
```

```html
<h1>Hello {{ nameService.name }}!</h1>
<input type="text" [(ngModel)]="name" />
```

---

```tsx
import React, { createContext, 
   useContext, useState } from 'react';

const MyCtx = createContext();

function Hello() {
  const [name, setName] = useContext(MyCtx);
  
  return <>
      <input value={name} onChange={e => 
         setName(e.target.value)} />
      <p>Hello, {name || 'World'}!</p>
   </>
}

export default function App() {
  const state = useState('');
    return <>
      <MyContext.Provider value={state}>
      <Hello />
    </MyContext.Provider>
  </>
}
```