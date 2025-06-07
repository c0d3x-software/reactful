export type IResult = Promise<string | boolean>

export type IParser = (node: RFC, path: string) => Promise<any>