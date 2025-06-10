const wait = (timeout, action) => setTimeout(action, timeout)

function startup() {
   const frame = document.querySelector("iframe")

   createLinks('introduction')
   createLinks('reference')
   
   resize(frame)

   createLogo(document)
}

function resize(iframe, remake) {
   const repeat = () => resize(iframe, true)   
   const target = iframe.contentWindow.document.body
   const height = target?.scrollHeight + 'px'

   if (!height || !iframe) return
   else iframe.style.height = height
   if (!remake) setTimeout(repeat, 333)
}
 
function createLinks(where) {
   const mount = uid => `${where}/${uid}.html`
   const click = elm => goto(mount(elm.id), true)  
   const links = document.querySelectorAll(`#${where} a`)

   links.forEach(a => a.onclick = () => click(a))

   clearHash()
}

function goto(address, manual) {   
   loading(true)

   const menu = address.split('/').at(-1).split('.')[0]
   const main = document.querySelector('iframe')

   main.src = address
   main.style.height = 'auto'

   wait(111, () => resize(main))
   wait(999, () => loading(false))

   if (manual) return
   if (address.split('#').length < 2) return 

   const hash = '#' + address.split('#').at(-1).trim()     

   wait(999, () => gotoHash(main, hash))
}

function loading(ok) {
   const display = ok ? 'flex' : 'none'
   document.querySelectorAll('.loading')
      .forEach(x => x.style.display = display)
}

function select(label) {
   document.querySelectorAll('.active')
      .forEach(x => x.classList.remove('active'))
   
   if (label == 'index') return
   const child = document.querySelector(`#${label}`)
   child.classList.add('active')
} 

function gotoHash(iframe, hash) {
   const target = iframe.contentWindow.document.querySelector(hash);   
   if (target) target.scrollIntoView({ behavior: 'smooth' })
}

function clearHash() {
   const route = window.location.pathname
   const query = window.location.search
   const value = route + query
   const clear = () => history.replaceState(null, '', value)

   wait(999, clear)   
}

window.addEventListener("popstate", function (event) {
   console.log("popstate", window.history) 
});

window.addEventListener('hashchange', () => {
   console.log('hashchange', window.location.hash);
});

window.addEventListener('message', function(event) {
   if (event.data.command != 'update-path') return
   const path = JSON.parse(event.data.text)?.path?.pathname
   const name = path?.split('/').at(-1)?.split('.')[0]
   const node = this.document.querySelector('iframe')
   console.log(name, { path, name })     
   select(name)
   resize(node)
   window.scrollTo({ top: 0, behavior: 'smooth' });
});