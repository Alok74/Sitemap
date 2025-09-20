const cheerio = require("cheerio");

const crawlPage = async(url)=> {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const links = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const absUrl = new URL(href, url).href;
    links.push({
      url: absUrl,
      anchorText: $(el).text().trim(),
      isInternal: absUrl.startsWith("https://www.edzy.ai")
    });
  });

  await Page.findOneAndUpdate(
    { url },
    {
      title: $("title").text(),
      html: res.data,
      outLinks: links,
      outLinkCount: links.length,
      statusCode: res.status,
      lastCrawledAt: new Date()
    }
  );
}

module.exports = crawlPage;
