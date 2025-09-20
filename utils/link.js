const PageSchema = require("../schema/PageSchema");

const buildLink= async()=> {
  const pages = await PageSchema.find({});
  await PageSchema.updateMany({}, { $set: { inLinks: [], inLinkCount: 0 } });

  for (const page of pages) {
    for (const link of page.outLinks) {
      if (link.isInternal) {
        await PageSchema.updateOne(
          { url: link.url },
          {
            $push: { inLinks: { url: page.url, anchorText: link.anchorText } },
            $inc: { inLinkCount: 1 }
          }
        );
      }
    }
  }
}


module.exports = buildLink;