const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//& Schema
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

//& Model
const PostModel = mongoose.model("Post", Post, "posts");

//& Methods
async function createPost(_parent, args) {
  try {
    args = args.args;
    args["_id"] = mongoose.Types.ObjectId();
    const newPost = new PostModel(args);
    newPost.save();
    return true;
  } catch {
    return false;
  }
};

async function getPost(_parent, args) {
  try {
    return (await PostModel.find({ _id: args.args._id }))[0];
  } catch {
    return false;
  }
};

async function deletePost(_parent, args) {
  try {
    await PostModel.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

async function updatePost(_parent, args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await PostModel.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  model: PostModel,
  createPost: createPost,
  getPost: getPost,
  deletePost: deletePost,
  updatePost: updatePost
};
