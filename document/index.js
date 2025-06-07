console.log('index.js')

function startup() {   
   createLogo(document)
}

function goto(href) {
   console.log({ href })
   document.querySelector('main[iframe]').hidden = false
   document.querySelector('iframe').src = href
   document.querySelector('main[index]').hidden = true
}

function adjustZoom(content) {
   content.style.zoom = 1.17
   content.style.padding = '50px !important'   
}

function createLink(iframe, content) {
   const links = content.querySelectorAll('[overview] a')
   const found = x => x.href.split('#').at(-1) ?? ''
   const apply = a => iframe.src = `./preview.html#${found(a)}`
   const refix = () => setTimeout(() => adjustZoom(content), 999)
   const click = a => { apply(a); refix(); }

   links.forEach(a => a.onclick = () => click(a))
}

function onKey(event) {
   button.disabled = !event.target.value?.trim()
}


function sendEmail() {
   const SERVICE_ID = 'service_5x1js7s'
   const PUBLICK_KEY = 'pC_QRVGa3CtXY7xpv'
   const TEMPLATE_ID = 'template_qvb7fpm'

   textarea.disabled = true
   button.disabled = true
   email.disabled = true

   from_email = email.value?.trim()
      || "anonymous@email.com"
   
   const message = textarea.value.trim()
      + '\n\n' + from_email

   const params = {
      from_email,
      from_name: "commentator",
      message
   }

   emailjs.init(PUBLICK_KEY);
   emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
      .then(onSuccess, onFailure)
   
   function onSuccess() {
      alert('Thanks for your comment!')
      textarea.value = ''
      email.value = ''
      onFinnaly()
   }

   function onFailure(ex) {
      alert("The email was not sent!")
      console.error(ex)
      onFinnaly()
   }

   function onFinnaly() {
      textarea.disabled = false
      button.disabled = true
      email.disabled = false
   }
}