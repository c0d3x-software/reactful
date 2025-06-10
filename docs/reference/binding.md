<style>@import url(binding.css);</style> 

# Binding

> props binding • form binding • dual binding • action binding • validation • authentication

## Dual binding

Dual binding is a two-way data binding design for React one-way data flow, with new `[data]` and `[bind]` props handlers, mapping attributes to each specific input type.

<section class='divs' style='margin-left:20px'>

|               |                                                   |
| ------------- | ------------------------------------------------- |
| data binding | controlled component with [data] and [bind] props |
| form binding | uncontrolled component with form[data] and input[bind] |
| action binding | form binding with RESTful action request | 

</section>


## Data binding

Data binding receives a reactive object in `[data]` props and its fields in `[bind]` props. When the input make any change, it sets the object field, triggering its reactive self-rendering behavior. 

```tsx
export const Hello = props => <>
   <h1> Hello { props.name || 'World' }!</h1>
   <input data={object} bind='field' />  
</>
```

## Form binding 

Form binding is a reactive form for uncontrolled componen, as `form[data]` with `input[bind]`. It does not require reactive object, since the rendering is here controlled by submit event.

```tsx
export const Form = (props, feeds) => <>
   <form data={props}> 
      Name: <input bind='name' required />
      Mail: <input bind='mail' maxlength={50} />    
      <button>Submit</button>
   </form>

   { feeds.errors.map(...) } 
</> 
```

**HTML validation API** support with `feeds.errors`, input[validate] and form[onError].  

<section id='validation-api'>

```html
export const Form = (props, feeds) => <>
  <form data={props} onError={onValidate}>  
      Email: <input bind='mail' validate={customValidate} />   
``` 
```tsx
function customValidate() { return '' }

const onValidate = (errors: { field, error, value }[]) =>
   errors.push({ error: 'some custom error message' })
```

</section>

## Action binding

The `form[data]` activates RESTful `form[action]`, serializing the object in form[data] and making a fetch call where the pending state in injected as `feeds.await`.
 
```tsx
export const Form = (props, feeds) => <> 
   { feeds.await & <progress>loading</progress> }

   <form data={props} >
      Name: <input bind='name' />
      Mail: <input bind='mail'/>    
      <button>Submit</button>
   </form>

   { feeds.fails.map(x => <li>{ x.message }</li>) }
</>

async function onPost(response: Response) { /* something... */ }
```


The `form[action]` also supports JWT authentication with `form[bearer]` props, this feature is yet in experimental stage. Here a preview algorithm and code example with authentication binding.

<aside auth cols='5:3'>

```tsx
export const Login = (props, { fails }) => <>
   <form action='https://localhost/api/auth'
         method='POST' bearer='access_token'
         data={props}>  

      username: <input bind='username' />
      password: <input bind='password' />
      <button>Submit</button>

      <ul class='error-summary'>
         { fails.map(e => ...) }
      </ul>   
   </form>
</>
```

- submit to request
- stop if invalidated
- binding object fields
- object JSON serialization
- [bearer] sets token field
- request was sent to server
- authentication sent response
- ok: 'token' in sessionStorage
- ok: injects in feeds.logon
- err: append in feeds.fails
- err: clear 'token'

</aside>

