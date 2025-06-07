/// <reference path="own.d.ts" />

import { folders } from "./folders";
import { status } from "./status";

const handlers: Handlers = {
   errors: [],
   requests: [],
   properties: []
}

export const own: Own = {
   is: status,
   url: '/',
   root: '#root',
   stack: [],
   routes: {},
   modules: [],
   handlers,
   functions: [],
   hydrations: [],
   directories: folders
}