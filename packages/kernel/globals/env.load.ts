/** it loads the env file and sets to env object */
export async function load(that: any, delegate: (d: Date) => Promise<record>) {
   const ref = await delegate(new Date());

   Object.keys(ref) // boolean
      .filter(k => ref[k])
      .filter(k => ref[k].match(/true|false/i))
      .forEach(k => ref[k] = ref[k].toLowerCase().trim() == 'true')

   Object.keys(ref) // number
      .filter(k => !isNaN(parseFloat(ref[k])))
      .forEach(k => ref[k] = parseFloat(ref[k]))

   Object.merge(that, ref)

   validation(that)
}

/** validate if env file is ok */
export function validation(instance) {
   const requireds = {
      PORT: 3000,
      DEBOUNCE: 50,
      PREFIX_URL: '/'
   }

   for (const k of Object.keys(requireds)) {
      const done = Object.hasOwn(instance, k)
      const none = !(done && instance[k])

      if (!done) throw fail(k, 'field')
      if (none) instance[k] = requireds[k]
   }

   return true
}


/** env file error message */
const fail = (key, pre = '') => `Not found ${pre}'${key.trim()}' of .env file`