// import { expect, test } from "bun:test";
// import { formProps } from "./form[data]";
// import { JSDOM } from 'jsdom';

// /*
// - validation api
// - custom validate [validate]
// - submit validation handler [onValidate]
// */

// // TODO: testing

// const htmlString = `
//    <html><body><form data>
//       <input bind='name' maxlength='3' />
//       <input bind='city' required />
//       <input bind='done' type='checkbox' />
//       <button>Send</button>
//    </form></body></html>`

// const person = { name: '', city: '', done: undefined }

// test.skip('form[validation]: validation field success', async function () {
//    const [inputs, props, submit] = await pretest()
//    const [name, city, done] = inputs

//    // name.value = 'john'
//    city.value = '!'
//    // done.checked = true   
   
//    expect(props.data.name).toBe('')
//    expect(props.data.city).toBe('')
//    expect(props.data.done).toBe(undefined)

//    validationSetupTest()

//    await submit()

//    // expect(props.data.name).toBe('')
//    // expect(props.data.city).toBe('')
//    // expect(props.data.done).toBe(undefined)
   
//    // console.log(11111111111111, name.validationMessage)
//    // console.log(11111111111111, city.validationMessage)

//    delete global.document
// })

// async function pretest(props?, params?) {   
//    global.document = new JSDOM(htmlString).window.document
//    params ||= { tag: 'form' }
//    props ||= { data: person, children: [] }
//    props = formProps(props, params)

//    const inputs = Array.from(document.querySelectorAll('input'))
//    const button = document.querySelector('button')   
//    const form = document.querySelector('form')   
//    const e = new Event('submit', <any> {
//       bubbles: false,
//       cancelable: true
//    });

//    return [inputs, props, async () => await props.onSubmit(e)]
// }

// function validationSetupTest() {
//    const inputs = Array.from(document.querySelectorAll('input'))

//    inputs.forEach(input => {
//       console.log(input.value.trim() === "",
//          `input.required: ${input.hasAttribute("required")} `)
      
//       input.setCustomValidity = x => {
//          console.log(7777777777, 'input.setCustomValidity ')
//          input = { ...input, get validationMessage() { return x } }
//       }

//       if (input.hasAttribute("required") && input.value.trim() === "") 
//          input.setCustomValidity("Required field");

//       if (input.hasAttribute("maxlength")) {
//          console.log('.................')
//          const max = parseInt(input.getAttribute("maxlength"), 10);
//          const err = input.value.length > max
//          if (err) input.setCustomValidity(`Max ${max} chars is allowed`);
//          console.log(9999999999, err, input.validationMessage)
//       }

//       if (input.hasAttribute("pattern")) {
//          const pattern = input.getAttribute("pattern");
//          const regex = new RegExp(pattern);
//          if (!regex.test(input.value)) {
//             input.setCustomValidity("Formato inválido");
//          }
//       }
//    })


//    inputs.forEach(x => x.checkValidity())
// }