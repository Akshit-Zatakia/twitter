const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      maxlength: 140,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Post = mongoose.model("post", PostSchema);
