

const ioc: IoC = {
   await: false,
   refer: undefined,
   logon: undefined,
   react: () => { },
   route: '/',
   title: '...',
   fails: [],
   param: {},
   store: {}
}

export interface InputProps {
   bind: string
   type: string
}

export const testParams: Params = {
   own: 'Sample',
   tag: 'input',
   mem: {},
   uid: 0,
   ioc
}