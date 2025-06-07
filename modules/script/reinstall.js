import { rm } from "fs/promises";

console.log("\x1Bc"); // clear
console.log(' --- reseting packages --- \n')

const project = process.argv.slice(2).at(0)?.trim()
const defaults = ["node_modules", "package-lock.json", "bun.lockb"];
const projects = ['client', 'kernel', 'server', 'create']
const directory = `../builds/${project}`

if (projects.includes(project) == false)
   throw `Not a valid project name: '${project}'`

for (const path of defaults.concat([directory])) {
   try {
      const file = Bun.file(path);
      const stat = await file.stat();

      if (stat.isDirectory()) await rm(path) 
      else await Bun.remove(path);

   } catch {  }
}

await Bun.$`mkdir -p ${directory}`
await Bun.$`bun update`
await Bun.$`bun install`
await Bun.$`bun run build`
