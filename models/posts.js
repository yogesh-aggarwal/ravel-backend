const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true, trim: true, maxlength: 55 },
  description: { type: String, required: true, trim: true, maxlength: 300 },
  content: { type: String, required: true },
  thumbnail: { type: String, required: true },
  readTime: { type: String, required: false },
  comments: { type: [String], required: true },
  credit: {
    author: {
      type: String,
      required: true
    },
    publication: {
      type: String,
      required: true,
      default: "Ravel Official"
    }
  },
  tags: { type: [String], required: true },
  stats: {
    views: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: true, default: 0 },
    appreciations: { type: Number, required: true, default: 0 },
    applauds: { type: Number, required: true, default: 0 }
  },
  datePublished: { type: Date, required: true, default: Date.now },
  dateUpdated: { type: Date, required: true, default: Date.now }
});

// Statics
Post.statics.createPost = async function(args) {
  try {
    args = args.args;
    args["_id"] = mongoose.Types.ObjectId();
    const newPost = new this(args);
    newPost.save();
    return true;
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
    await this.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("Post", Post, "posts");
