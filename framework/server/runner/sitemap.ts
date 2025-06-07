import fs from 'fs';
import { Path } from '../shared';
import { pd } from "pretty-data";
import { SitemapStream, streamToPromise } from 'sitemap';

export async function generateSiteMap() {
   const sitemapPath = `${Path.builds}/sitemap.xml`
   const writeStream = fs.createWriteStream(sitemapPath)
   const sitemap = new SitemapStream({ hostname: global.env.HOSTNAME })
      
   sitemap.pipe(writeStream)

   fs.readdirSync(Path.builds)
      .filter(file => file.endsWith('.html'))
      .map(generateEachInformationHTML)
      .forEach(link => sitemap.write(link))
   
   sitemap.end()

   const buffer = await streamToPromise(sitemap);
   const header = `<?xml version="1.0" encoding="UTF-8"?>`
   const namesp = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
   const result = header + namesp + buffer.toString() 
   
   await Bun.write(sitemapPath, global.env.MINIFIED ? result : pd.xml(result));
}

const generateEachInformationHTML = (file) =>({
   url: '/' + file.replace('index.html', '').replace('.html', ''),
   changefreq: 'monthly',
   priority: 0.7
});
