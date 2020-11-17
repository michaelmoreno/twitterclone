const mongoose = require("mongoose");

const tweetsSchema = mongoose.Schema(
  {
    author: { type: Number, required: true },
    authorName: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: String, default: 0 },
    replies: [
      {
        _id: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// password will be a sha256 hash.

// tweet author is author of original
// reply author is the id of the replier

// module.exports = mongoose.model("Bookmark", bookmarkSchema);

module.exports = tweetsSchema;
