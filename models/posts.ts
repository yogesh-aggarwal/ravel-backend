import mongoose from "mongoose";
import { UserModel } from "./users";

const Schema = mongoose.Schema;

//& Schema
const Post = new Schema({
  _id: {
    typs: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  title: { type: String, required: true, trim: true, maxlength: 55 },
  description: { type: String, required: true, trim: true, maxlength: 300 },
  content: { type: Schema.Types.Mixed, required: true },
  thumbnail: { type: String, required: true },
  readTime: { type: String, required: false },
  comments: { type: [String], required: true },
  credit: {
    author: {
      type: String,
      required: true,
    },
    publication: {
      type: String,
      required: true,
      default: "5e834ed984f4ca32d083de90", //? Ravel official
    },
  },
  tags: { type: [String], required: true },
  stats: {
    views: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: true, default: 0 },
    appreciations: { type: Number, required: true, default: 0 },
    applauds: { type: Number, required: true, default: 0 },
  },
  datePublished: { type: Date, required: true, default: Date.now },
  dateUpdated: { type: Date, required: true, default: Date.now },
});

//& Model
export const PostModel = mongoose.model("Post", Post, "posts");

//& Methods
export async function createPost(_parent: any, { args }: any) {
  args["readTime"] = "21 min"; // TODO: Change it, recieve from front-end (realtime calculations there)
  return await PostModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function deletePost(_parent: any, { args }: any) {
  return await PostModel.deleteOne({ _id: args._id })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updatePost(_parent: any, { args }: any) {
  return await PostModel.findByIdAndUpdate({ _id: args._id }, args, () => {})
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function getPost(
  _parent: any,
  { args }: any,
  collectionFromUserModel: boolean = true
) {
  // console.log(args);
  // console.log(PostModel);
  let post = await PostModel.findOne({ _id: args._id });
  console.log(post);
  return post;
  // post?.toObject();
  // post.credit.publication = await PublicationModel.findById(
  //   post.credit.publication
  // );
  // post.credit.author = await getUser(
  //   null,
  //   {
  //     args: { _id: post.credit.author },
  //   },
  //   { collection: collectionFromUserModel }
  // );

  // return post;
}
