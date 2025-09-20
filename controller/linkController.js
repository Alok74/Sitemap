const Page = require("../models/pageSchema");

exports.getInLinks = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({
        success: false,
        message: "URL is required" });

    const page = await Page.findOne({ url });
    if (!page) return res.status(404).json({ 
        success: false, 
        message: "Page not found" }
      );

    res.json({
      success: true,
      inLinks: page.inLinks.map(l => ({ url: l.url, anchorText: l.anchorText }))
    });
  } catch (err) {
    res.status(500).json({
       success: false, 
       message: err.message }
        );
  }
};

exports.getOutLinks = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: false, message: "URL is required" });

    const page = await Page.findOne({ url });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });

    res.json({
      success: true,
      outLinks: page.outLinks.map(l => ({ url: l.url, anchorText: l.anchorText }))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getTopLinkedPages = async (req, res) => {
  try {
    const n = parseInt(req.body.n, 10) || 5;

    const pages = await Page.find()
      .sort({ inLinkCount: -1 })
      .limit(n)
      .select("url title inLinkCount outLinkCount");

    res.json({ success: true, data: pages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
