const axios = require("axios");
const xml2js = require("xml2js");
const Page = require("./models/pagSchemae");

const fetchSitemapAndSave=async()=> {
  const { data } = await axios.get("https://www.edzy.ai/sitemap.xml");
  const parsed = await xml2js.parseStringPromise(data);

  const entries = parsed.urlset.url.map(u => ({
    url: u.loc[0],
    lastmod: new Date(u.lastmod[0]),
    changefreq: u.changefreq[0]
  }));

  for (const entry of entries) {
    await Page.findOneAndUpdate(
      { url: entry.url },
      entry,
      { upsert: true }
    );
  }

  return entries.map(e => e.url);
}

module.exports = fetchSitemapAndSave;