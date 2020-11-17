const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    photoUrl: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tweets: [{ id: { type: Number, required: true } }],
  },
  { timestamps: true }
);

// password will be a sha256 hash.

// module.exports = mongoose.model("Bookmark", bookmarkSchema);

module.exports = userSchema;
