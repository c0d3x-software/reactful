<style>@import url(syncing.css);</style>

# Syncing

> SWR fetch API • event API • EventSource facade • RESTful sync mapping • low abstraction

## Sync ways

Synchronization brings remote data into application, and could be in two ways:

| | | |
|-|-|-|
| fetching | client to server request-response | fetch API |
| eventing | server to client request-response | EventSource class |

Reactful uses **syncher library** (`experimental`), that improves fetch with SWR support, brings a fluent facade to EventSource, and implements an object mapping to RESTful APIs. 

## FETCH+ SWR

Fetch API gets a minimalist SWR polyfill extension for SWR, adding cache support to cache keys and timeout by milliseconds number ou time string format. Revalidation is done with fetch.clear.

<aside cols='2'>

```ts
fetch(url, { cache: "7min30s" })
fetch(url, { cacheKeys: ['todos'] })   
```

```ts
fetch.clear(cacheKeys)
fetch.clear() // invalidate all
```

</aside>


It includes `retry` and `reget` (for pooling), `fetch.token` for easy access to the last header.Authorizaton value, and implement interception with `fetch.on`. 

<aside cols='5:4'> 


```ts
const retry = { repeat:3, interval:1000 }
const reget = { interval:1000, callback }

await fetch(url, { retry })
await fetch(url, { reget })
```

```ts
fetch.token = `Bearer ${token}`

fetch.on("request", req => ...)
fetch.on("response", res => ...)
fetch.on("exception", err => ...)
```

</aside>

## EVENT API

HTML web stardard has an API for server-client communication with EventSource classe.

<aside>

```js
const es = new EventSource(url, { withCredentials: true }) 

es.addEventListener('message', e => console.log('Message:', e.data))

es.addEventListener('status', e => {
    const data = JSON.parse(e.data)
    console.log('progress:', data.progress + '%')
});

es.onopen = () => console.log('Open connection....')
es.onerror = ex => console.error(ex)
es.close();
```

Reactful has an event API alterantive that emulates fluent fetch API. 

```js
const es = event(url, { withCredentials: true })
   .then(() => console.log('Open connection...'))
   .then('message', e => console.log('Message', e.text))
   .then('status', e => console.log('Message', e.json.progress + '%'))
   .catch(ex => console.error(ex))
   .finnaly(() => console.log('close'))

es.close() 
```

</aside>


## SYNCHER API

Syncher API maps an object into a CRUD RESTful API, creating a function synchronizer object, that create in background by diff algorithm, all the necessary request call to bring the remote state .

<aside cols='2'> 

```ts 
// basic RESTful user mapping
const userApi = syncher<User>(true)
   .fetch("http://api.com/users")
   .catch(e => "not found...")
   .match(x => x, "id")   

// RESTful mapping with full SWR 
const userApi = syncher<User>(true)
   .retry(3, 1000)
   .cache(1000, ["messages", 1])
   .reget(1000, x => "pooling...")
   .fetch("http://api.com/users")
   .catch(e => "not found...")
   .match(x => x, "id")   
```

```ts 
// syncher interface 
interface ISync<T,E> {   
   value: T            // state
   await: boolean      // pending
   error: E|undefined  // exception
   async(mutate?)      // syncing 
}

// create the mappeed get request 
await userApi.async() 

// create post, put or delete by
// diff between local and remote
await userApi.async(true) 
```

</aside>

It also support authentication (`experimental`) for JWT Bearer and oAuth authentication. So, instead of a synchronizer methods, it returns an object with login and logout methods .

```ts
const jwtAuth = syncher<User>(false, true)
   .fetch("http://www.google.com/login")
   .catch("/login", "Login fails")
   .match<Token>("/home", x => x.token)   

// oAuth provider support

const googleCredentials = {
   scopings: ['profile', 'email'],
   clientId: 'zzzzzzzzzzzzzzz.apps.googleusercontent.com',
   queryURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
   tokenURL: 'https://accounts.google.com/o/oauth2/auth'
}

const googleLogin = auth(true, googleCredentials)
   .catch('/index.html', 'failed login...')
   .match('/poc/home.html', x => x.access_token)

await session.login(username, password)
const user = session.logged
session.logout()
```