import { expect, test } from "bun:test";
import { formProps } from "./form[data]";
import { JSDOM } from 'jsdom';

const htmlString = `
   <html><body><form>
      <input bind='name' />
      <textarea bind='a.b.c'></textarea>
      <input type='checkbox' bind='info.status' />
   </form></body></html>`

const person = { name: '', info: { status: false }, a: { b: { c: '' } } }

test.skip('form[submit]: success binding after submit', async function () {
   const [input, checkbox, textarea, props, submit] = await pretest()

   input.value = 'john'
   checkbox.checked = true
   textarea.value = 'hello world!'

   expect(props.data.name).toBe('')
   expect(props.data.a.b.c).toBe('')
   expect(props.data.info.status).toBe(false)

   await submit()

   expect(props.data.name).toBe(input.value)
   expect(props.data.a.b.c).toBe(textarea.value)
   expect(props.data.info.status).toBe(checkbox.checked)

   delete global['document']
})

async function pretest(props?, params?) {
   global['document'] = new JSDOM(htmlString).window.document

   params ||= { tag: 'form' }
   props ||= { data: person, children: [] }
   props = formProps(props, params)

   const event: Partial<SubmitEvent> | any = {
      preventDefault() { },
      stopPropagation() { },
      nativeEvent: { submitter: { onclick: '' } },
      target: {
         elements: document.querySelectorAll('form > *'),
         reportValidity() { return true }
      }
   }

   const input = document.querySelector('input')
   const check = document.querySelector<any>('input[type="checkbox"]')
   const text = document.querySelector<any>('textarea')

   return [input, check, text, props, async () => await props.onSubmit(event)]
}