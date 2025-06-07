import React from "react"

export class Reactful {
   public static createElement(tag: string, props: record)
   public static createElement(tag: string, props: record, children: any)
   public static createElement(tag: string, props: record, children?: any) {
      return React.createElement(tag, props, children)
   }

   public static createComponent(tag: string, props: record)
   public static createComponent(tag: string, props: record, children: any)
   public static createComponent(tag: string, props: record, children?: any) {
      const component = props => this.createElement(tag, props, children)
      component['meta'] = {
         fail: null,
         file: '',
         path: '/', name: '',
         guid: 0,
         call: null
      }

      return React.createElement(component, props)
   }
}