const express= require("express");
const router= express.Router();
const {getInLinks,getOutLinks,getTopLinkedPages} = require("../controller/linkController");

router.post("/in-links", getInLinks);
router.post("/out-links", getOutLinks);
router.post("/top-linked",getTopLinkedPages);

module.exports = router;
