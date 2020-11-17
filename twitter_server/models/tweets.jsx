const mongoose = require("mongoose");

const tweetsSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    text: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    likes: { type: String, default: 0 },
    replies: [
      {
        author: { type: Number, required: true },
        dateCreated: { type: String, required: true },
        text: { type: String, required: true },
        likes: { type: Number, default: 0 },
        _id: mongoose.Schema.Types.ObjectId,
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
