const Page = require("../schema/PageSchema");

const getPageSummary = async (url) => {
  const p = await Page.findOne({ url });
  if (!p) return null;
  return {
    url: p.url,
    title: p.title,
    outLinkCount: p.outLinkCount,
    inLinkCount: p.inLinkCount,
    outLinks: p.outLinks.map(l => l.url),
    inLinks: p.inLinks.map(l => l.url)
  };
};

const getTopLinkedPages = async (limit = 5) => {
  return Page.find().sort({ inLinkCount: -1 }).limit(limit);
};

module.exports = { getPageSummary, getTopLinkedPages };
