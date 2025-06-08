export const context = {
   latest: {} as any,
   count: 0
}

export const fixKey = (child: { key: string|null }) => 
   child?.key && child?.key.includes(".") ? null : child?.key

export const awaiting = async delay => new Promise(resolve => setTimeout(resolve, delay))

export const query = x => [...document.querySelectorAll<HTMLElement>(x)]

export interface RenderArgs<T = RFE> {
   top: RFE
   jsx: T
   url: string
   dir: string
   own: string
}