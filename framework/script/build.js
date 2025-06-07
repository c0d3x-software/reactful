console.log('bulding...\n')

// await Bun.$`mkdir -p builds/server builds/client builds/kernel`
await Bun.$`mkdir -p builds builds/create`
await Bun.$`rm -rf tsconfig.tsbuildinfo`
await Bun.$`rm -rf tsconfig.tsbuildinfo`
await Bun.$`bunx tsc --declaration`

console.log('\n--- build with success! ---\n')


function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}
 

