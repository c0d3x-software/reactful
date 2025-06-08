import { JSDOM } from 'jsdom'
import { expect, test } from "bun:test";
import { Reactful } from "../../kernel";
import { styler } from './style';

test.skip('styler: ignore when no node or path ', function () {
   const noNodeProps = styler(undefined, '/')
   expect(noNodeProps).toBe(noNodeProps)

   const noPathProps = styler({ } as any, undefined)
   expect(noPathProps).toBe(noPathProps)
})

test.skip('styler: ignore when is not an element ', function () {
   const functional = { node: { type: () => null } }
   const noNodeProps = styler(functional as any, '/')
   expect(noNodeProps).toBe(noNodeProps)
})

test.skip('styler: modular CSS as JSX same cached path', function () {
   const jdom = new JSDOM(`<html><body><h1>title</h1></body></html>`)
   global['document'] = jdom.window.document
   global['CSSStyleSheet'] = jdom.window.CSSStyleSheet
   global['CSSStyleRule'] = jdom.window.CSSStyleRule

   CSSStyleSheet.prototype.replaceSync = function(cssString) {
      this.insertRule(cssString)
   }

   global['meta'].style = { ['/test']: [`h1 { color: red }`] }
   
   const path = '/test'
   const node = Reactful.createElement('h1', {}) 
   
   expect(node.props.color).toBe(undefined)      
   const newProps = styler(node, path)
   expect(newProps).toEqual({ color: 'red' })

   delete global['document']
   delete global['CSSStyleSheet']
   delete global['CSSStyleRule']
})