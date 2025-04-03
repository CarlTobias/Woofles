const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: String,
    caption: String,
    media: String, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);