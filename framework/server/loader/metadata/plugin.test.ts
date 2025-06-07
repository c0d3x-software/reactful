import { AUTOGEN_COMMENTS } from "../../../kernel"
import { tester } from "../decorator/tester"
import { metadataPlugin } from "./plugin"

const functionDecoratorCase: TestCase = {
   sampling: 'function Hello(props) { return <>Hello World</> }',
   expected: `function Hello(props) { return <>Hello World</> }
   Hello["meta"] ||= { };
   Hello["meta"].path = '/file.tsx';`
}

const asyncFunctionDecoratorCase: TestCase = {
   sampling: 'async function Hello(props) { return <>Hello World</> }',
   expected: `async function Hello(props) { return <>Hello World</> }
   Hello["meta"] ||= { };
   Hello["meta"].path = '/file.tsx';`
}

const defaultFunctionDecoratorCase: TestCase = {
   sampling: 'export default function Hello(props) { return <>Hello World</> }',
   expected: `function Hello(props) { return <>Hello World</> }
   Hello["meta"] ||= { };
   Hello["meta"].path = '/file.tsx';
   export default Hello`
}

const defaultAsyncFunctionDecoratorCase: TestCase = {
   sampling: 'export default async function Hello(props) { return <>Hello World</> }',
   expected: `async function Hello(props) { return <>Hello World</> }
   Hello["meta"] ||= { };
   Hello["meta"].path = '/file.tsx';
   export default Hello`
}

const defaultAnonymousFunctionDecoratorCase: TestCase = {
   sampling: 'export default function(props) { return <>Hello World</> }',
   expected: `function default$(props) { return <>Hello World</> }
   default$["meta"] ||= { };
   default$["meta"].path = '/file.tsx';
   export default default$`
}

const defaultAnonymousAsyncFunctionDecoratorCase: TestCase = {
   sampling: 'export default async function(props) { return <>Hello World</> }',
   expected: `async function default$(props) { return <>Hello World</> }
   default$["meta"] ||= { };
   default$["meta"].path = '/file.tsx';   
   export default default$`
}

const arrowFunctionDecoratorCase: TestCase = {
   sampling: 'export const Hello = (props) => <>Hello World</>',
   expected: `export const Hello = (props) => <>Hello World</>
   Hello["meta"] ||= { };
   Hello["meta"].path = '/file.tsx';`
}

const asyncArrowFunctionDecoratorCase: TestCase = {
   sampling: 'export const Hello = async (props) => <>Hello World</>',
   expected: `export const Hello = async (props) => <>Hello World</>
   Hello["meta"] ||= { };
   Hello["meta"].path = '/file.tsx';`
}

const defaultArrowFunctionDecoratorCase: TestCase = {
   sampling: 'export default (props) => <>Hello World</>',
   expected: `const default$ = (props) => <>Hello World</>
   default$["meta"] ||= { };
   default$["meta"].path = '/file.tsx';   
   export default default$`
}

const defaultAsyncArrowFunctionDecoratorCase: TestCase = {
   sampling: 'export default (props) => <>Hello World</>',
   expected: `const default$ = (props) => <>Hello World</>
   default$["meta"] ||= { };
   default$["meta"].path = '/file.tsx';   
   export default default$`
}

const multipleExportedFunctions: TestCase = {
   sampling: `export const F1 = async (props) => <>F1</>
   export const F2 = props => { return null }
   export function F3(props) { return null }`,
   expected: `export const F1 = async (props) => <>F1</> 
   export const F2 = props => { return null }
   export function F3(props) { return null }
   F1["meta"] ||= { };
   F1["meta"].path = '/file.tsx';
   F2["meta"] ||= { };
   F2["meta"].path = '/file.tsx';
   F3["meta"] ||= { };
   F3["meta"].path = '/file.tsx';`
}

const scenarios = {
   functionDecoratorCase,
   asyncFunctionDecoratorCase,
   defaultFunctionDecoratorCase,
   defaultAsyncFunctionDecoratorCase,
   defaultAnonymousFunctionDecoratorCase,
   defaultAnonymousAsyncFunctionDecoratorCase,
   arrowFunctionDecoratorCase,
   asyncArrowFunctionDecoratorCase,
   defaultArrowFunctionDecoratorCase,
   defaultAsyncArrowFunctionDecoratorCase,
   multipleExportedFunctions
}

tester(true, true, scenarios, AUTOGEN_COMMENTS, sample => 
   metadataPlugin({code: sample, path:'file:///fake.tsx'}))