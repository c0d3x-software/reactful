import { JSXON } from "./jsxon";

/** get correspondent tag name for each react component type */
export const getTagName = (node: RRE) => 
      typeof node?.type == "function" ? node?.type.name 
    : typeof node?.type == "string" ? node?.type
    : typeof node?.type == "symbol" ? '<>'
            : node?.type?.toString() || ''

/** create a HTML based in a JSX react object */
export function createElementFromJSX(node: RRE): HTMLElement {
   const htmlString = JSXON.htmlfy(node)
   const div = document.createElement('div')
   div.innerHTML = htmlString.trim()
   return div.firstChild as HTMLElement;
}

export function clientParseCSS(cssString: string) {
   const cssList: StyleRule[] = []
   const styleSheet = new CSSStyleSheet()
   styleSheet.replaceSync(cssString)

   for (const rule of [...styleSheet.cssRules]) {
      if (rule instanceof CSSStyleRule == false) continue

      const stylings = {} as record

      for (let index = 0; index < rule.style.length; index++) {
         const style = rule.style || {} as any
         const field = style.item ? style.item(index) : style[index]
         const value = rule.style.getPropertyValue(field)
         const label = fromKebabCaseToCamelCase(field)

         if (stylings[label] || !value) continue
         else stylings[label] = value.toString()
      }

      cssList.push({ selector: rule.selectorText, stylings })
   }

   return cssList;
}

export function fromKebabCaseToCamelCase(field: string) {
   for (const match of field.matchAll(/-\w/gm)) {
      const [oldName] = match; if (!oldName) continue
      const newName = oldName.replace("-", "").toUpperCase()
      field = field.replace(oldName, newName)
   }

   return field
}