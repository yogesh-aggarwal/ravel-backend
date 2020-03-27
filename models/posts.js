const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  comments: { type: [String], required: true },
  tags: { type: [String], required: true },
  stats: { type: [Number], required: true },
  datePublished: { type: Date, required: true },
  dateUpdated: { type: Date, required: true }
});

// Statics
Post.statics.createPost = function(args) {
  try {
    // TODO: Implement here
  } catch {
    return false;
  }
};

Post.statics.getPost = async function(args) {
  try {
    return (await this.find({ _id: args.args._id }))[0];
  } catch {
    return false;
  }
};

Post.statics.deletePost = async function(args) {
  try {
    console.log("onj");
    await this.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

Post.statics.updatePost = async function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    console.log("jojn");
    this.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("Post", Post, "posts");
