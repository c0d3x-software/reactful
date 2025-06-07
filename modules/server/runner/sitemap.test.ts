import { expect, test } from "bun:test";
import { generateSiteMap } from "./sitemap";
import { Path } from "../shared";

test('sitemap: success', async function () {
   // global.env.MINIFIED = false
   const path = new Path(Path.cwd).back.back.back.path
   Path.setCwd(path + '/prototype')
   await generateSiteMap()

   const text = await Bun.file(path + '/prototype/builds/sitemap.xml').text()

   expect(text).toInclude('<?xml version="1.0" encoding="UTF-8"?>')
   expect(text).toInclude('<priority>0.7</priority>')
   expect(text).toInclude('<urlset xmlns')
})