const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    anchorText: String,
    isInternal: {
        type: Boolean,
        default: true
    },
    linkArray: [{
        url: {
            type: String,
            required: true,
        }
    }]
}, { timestamps: true });

module.exports = {
    model: mongoose.model("Link", linkSchema),
    schema: linkSchema
};