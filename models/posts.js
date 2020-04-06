const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//& Models
// PublicationModel = models.Publication;
// console.log(models);
// UserModel = User.model;

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
      default: "5e834ed984f4ca32d083de90" //? Ravel official
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
}

async function deletePost(_parent, args) {
  try {
    await PostModel.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
}

async function updatePost(_parent, args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await PostModel.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  model: PostModel,
  createPost: createPost,
  deletePost: deletePost,
  updatePost: updatePost
};
