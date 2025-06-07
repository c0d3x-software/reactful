# 🗺️ Reactful Project Roadmap

Welcome to the roadmap of **Reactful**, a fullstack React meta-framework.

## ✓ | Milestones


- **framework architecture**: monorepo repository structure  
- **hybrid rendering**: support to SSR, SSG and ISR 
- **create CLI tool**: template generator with `create-reactful` 
- **dependency injection**: IoC container resolved in 2nd component argument 
- **function decorator**: adecorator for functions 
- **function extensions**: metadata to functions 
- **modular CSS**: fixed CSS modular import bug 
- **dual data biding**: two-way data binding design for React 
- **reactive forms**: dual binding for uncontrolled components submit 
- **directory routing**: static routing with zero conventions 
- **context globals**: env, ioc and own as new global contexts 
- **action binding**: form[action] as a serialized fetch request 
- **prefetched routing**: cached HTML routes in client-side
- **webapi folder**: RESTful API supported in /apis folder 
- **fallback routing**: retry not-found routing with upper route 
- **partial hydration**: JS hydration only in interactive content 
- **streaming SSR**: JSX is streamed with Suspense API support 
- **extended HTML**: HTML is extended with link[type=react] to embed 
- **route validator**: It prevents ambiguos like /about.jsx and /about.md 
- **declarative routing**: Client-side prosp handler for routing as [route] and[link] 
- **dommunication**: Documentation site, marp slides and youtube videos 

## ○◔◐◕  | Pendings 

 - **HTML Validation API** | ◕ | ProblemDetails interface, unit tests, etc
 - **Documentation updates** | ◐ | sitemap, use directives, fallback routing, web standard driven, zipped responses, framework=modules, prototype=samples, document=docs
 - **zipped response** | ◕ | unit tests, client-side unzip
 - **GitHub Sponsors page launched** | ◔
 - **SEO sitemap + robot**: | ◐
 - **prefix_url context** | ◔
 - **SEO inner HTML** | ◔
 - **JWT + oAuth auth decorator** | ○  
 - env.yaml + @seo configuration 
 - Zero bundle.js
 - iFrame merging
 - performance benchmarks
 - preact support abstration
 - new template CLI
 - [type=file] binding
 - template error default
 - outlet props
 - e2e test coverage 
 - .env.yaml alternative
 


## △ | Warnings

- CSS modular imports does not support pseudo-selector (yet)
- the prototype project is outdated (update is pending)
- custom decorators does not support 'import' keyword
- inner component code must preceed outer components
- no intelissense for new function decorators
- validation form[data] only after first render
- ambigous fragment children behavior: array x not-array

## @ | Want to contribute?

Check out [CONTRIBUTING.md](./CONTRIBUTING.md) or suggest a feature in [Discussions](https://github.com/your-repo/discussions) or [Issues](https://github.com/your-repo/issues).

---

_This roadmap is a living document and may change based on community feedback and priorities._
