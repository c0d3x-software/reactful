import fs from 'fs';

console.log("\x1Bc"); // clear
console.log(' --- publishing package --- \n')

const [project, version, raw] = process.argv.slice(2);
const projectPath = './builds/' + project

if (fs.existsSync(projectPath) == false)
   throw `Not found project in '${projectPath}'`

if (['minor', 'major', 'patch'].includes(version) == false)
   throw `It must be minor, major or patch, but receive '${invalid}'`

if (!raw) {
   await Bun.$`bun update`
   await Bun.$`bun run build`
}

await Bun.$`npm version ${version}`
await Bun.$`npm publish --access public`