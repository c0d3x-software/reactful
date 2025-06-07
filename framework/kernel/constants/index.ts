export * from './colors'
export * from './status'
export * from './errors'

export const UID = Symbol.for('---guid---')

export const PROXY = Symbol.for('proxy')

export const REACTIVE = Symbol.for("reactive")

export const AUTOGEN_COMMENTS = '\n\n/* ----- auto-generated code ----- */\n'

export const PRIMITIVES = ["symbol", "string", "number", "undefined", "null", "bigint"]

export const SELF_CLOSE_TAGS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']

export const SERVING = `Serving at http://localhost:{0}\n\n`