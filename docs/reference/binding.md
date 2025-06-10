<script src='../js/index.js'></script>
<style>@import url(../css/index.css);</style> 
<style>@import url(binding.css);</style> 

# Data binding

> props binding • form binding • dual binding • action binding • validation • authentication

## Props binding

<a onclick='goto("review/paradigm.html#props-binding")'>Props binding</a> is enabled by `[data]` receiving the object and `[bind]` mapping to its field.

```tsx
export const Hello = props => <>
   <h1> Hello { props.name || 'World' }!</h1>
   <input data={object} bind='field' />  
</>
```

## Form binding

<a onclick='goto("review/paradigm.html#props-binding")'>Form binding</a> is a uncontrolled uses `form[data]` and `child[bind]` directives, with full support to a customizable HTML <a onclick='goto("review/paradigm.html#form-binding-validation")'>validation API</a>.

```tsx
export const Form = props => <>
   <form data={props}> 
      Name: <input bind='name' />
      Mail: <input bind='mail'/>    
      <button>Submit</button>
   </form>
</>
```

## Action binding

<a onclick='goto("review/paradigm.html#action-binding")'>Action binding</a> has a pending state in **feeds.await**, error states in **feeds.fails' and `[onFetch]` props handler. It also support <a onclick='goto("review/paradigm.html#authentication-binding")'>authentication</a> binding variation.

```tsx
export const Form = (props, feeds) => <> 
   { feeds.await & <progress>loading</progress> }

   <form data={props} onError={onValidate}>
      Name: <input bind='name' maxlength={50} />
      Mail: <input bind='mail' validate={validateMe} />    
      <button>Submit</button>
   </form>

   { feeds.fails.map(x => <li>{ x.message }</li>) }
</>

const validateMe = () => "Is invalidated if return something"
const onValidate = invalids => invalids.errors.push({ error: 'new error' })
async function onPost(response: Response) { /* something... */ }
```



