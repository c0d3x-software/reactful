import { params } from "../../kernel"
import { getTagName, SELF_CLOSE_TAGS } from '../../kernel'
import { RenderArgs } from "./shared"
import { awaitProps } from "./props"
import { parent } from './parent'
import { styler } from "./styler"

export async function element({ jsx, own, url, uid, dir }: RenderArgs) {
   try {
      const label = getTagName(jsx)
      const attrs = params(label, own, ++uid)
      const props = awaitProps(jsx.props, attrs)
      const style = styler({ ...jsx, props }, url)

      const internal = jsx.props?.children
      const isClosed = SELF_CLOSE_TAGS.includes(label)
      const argument = { jsx:internal, own, uid, url, dir }
      const children = isClosed ? undefined : await parent(argument)

      Object.keys(global.own.handlers.properties).forEach(k => delete jsx[k])

      return { ...jsx, props: { ...props, style, children } }
   }
   catch(ex) {
      console.error(ex)
      throw ex
   }
}