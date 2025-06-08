export {}

declare global {
   type TestCase = {
      sampling: string
      expected: string
      hasError?: boolean
   }

   type Encoder = (sample: string) => string | Promise<string>
   
   type Scenarios = Record<string, TestCase>
}