function createLogo(content) {
   const logo = content.querySelector("logo")
   const div1 = document.createElement('div')
   const div2 = document.createElement('div')
   const div3 = document.createElement('div')
   const ball = document.createElement('span')
   const divs = [div1, div2, div3, ball]

   divs.forEach(x => logo.appendChild(x))

   setInterval(animation, 3000)
}

function animation() {
   const anime = div => div.style.animationDuration = `${during}ms`
   const from0To3 = Math.floor(Math.random() * 3) 
   const during = 150 + (100 * (from0To3 * 5))

   document.querySelectorAll("logo div").forEach(anime)
}