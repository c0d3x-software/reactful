export async function loadEnv(path = '.env'): Promise<Record<string, string>> {
   const file = Bun.file(path)
   const have = await file.exists()

   if (!have) throw new Error(`File env not found in '${path}'.`)

   const content = await file.text()
   const lines = content.split('\n')
   const env: Record<string, string> = {}

   for (const line of lines) {
      const trimmed = line.trim()

      if (!trimmed || trimmed.startsWith('#')) continue

      const [key, ...rest] = trimmed.split('=')
      const value = rest.join('=').trim().replace(/^"|"$/g, '')

      if (key) env[key.trim()] = value
   }

   return env
}