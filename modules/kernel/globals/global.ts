/// <reference path="global.d.ts" />

import { ioc } from './ioc'
import { env } from './env'
import { own } from './own'
import '../extensions'

global.env = env
global.own = own
global.ioc = ioc

export { }