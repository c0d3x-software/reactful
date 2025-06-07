const goto = window.parent.goto

window.addEventListener('DOMContentLoaded', () => resize(false));

function resize(remake) {
   const repeat = () => resize(true)
   const iframe = document.querySelector('#folder')
   const target = iframe?.contentWindow?.document?.body
   const height = target?.scrollHeight + 'px'

   if (!height || !iframe) return
   else iframe.style.height = height
   if (!remake) setTimeout(repeat, 222)
}