const Mongoose = require("mongoose");

const videoSchema = new Mongoose.Schema(
  {
    title: String,
    // description: String,
    videoId: String,
    thumbnail: String,
    duration: Number,
    upvote: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Account" }],
    downvote: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Account" }],
    suggestedBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Video = Mongoose.model("Video", videoSchema);

module.exports = Video;
