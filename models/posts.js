const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = Schema({
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

Post.statics.getPost = function(args) {
  try {
    return this.findById({ _id: args.args._id });
  } catch {
    return false;
  }
};

Post.statics.deletePost = function(args) {
  try {
    this.deleteById({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

Post.statics.updatePost = function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    this.findOneAndUpdate({ _id: _id }, args.args);
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("Post", Post, "posts");
