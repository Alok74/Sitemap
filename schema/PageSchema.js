const mongoose = require("mongoose");
const { Schema } = mongoose;
const linkSchema = require("./linkSchema");

const pageSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    lastmod: Date,
    changefreq: String,
    title: String,
    html: String,
    outLinks: [linkSchema.schema],
    inLinks: [linkSchema.schema],
    outLinkCount: { type: Number,
         default: 0 },
    inLinkCount: { type: Number, 
        default: 0 },
    lastCrawledAt: Date,
    statusCode: Number
}, { timestamps: true });

module.exports = mongoose.model("Page", pageSchema);