import { ownPlugin } from "./plugin";

const library = [ ownPlugin ]

const plugins = library.map(p => { Bun.plugin(p); return p })

export default plugins