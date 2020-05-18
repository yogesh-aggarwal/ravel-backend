import { Schema, Types, model } from "mongoose";
import { getPost } from "./posts";

//& Schema
const Collection = new Schema({
  _id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  tags: { type: [String], required: true },
  posts: { type: [String], required: true },
  dateCreated: { type: Date, required: true, default: Date.now },
  dateUpdated: { type: Date, required: true, default: Date.now },
});

//& Model
export const CollectionModel = model("Collection", Collection, "collections");

//& Methods
export async function createCollection(_parent: any, { args }: any) {
  return await CollectionModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function deleteCollection(_parent: any, { args }: any) {
  return await CollectionModel.deleteOne(
    { _id: Types.ObjectId(args._id) },
    args
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updateCollection(_parent: any, { args }: any) {
  return await CollectionModel.updateOne(
    { _id: Types.ObjectId(args._id) },
    args,
    () => {}
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function getCollection(_parent: any, { args }: any) {
  const collection = (
    await CollectionModel.findOne({ _id: Types.ObjectId(args._id) })
  )?.toObject();
  const collectionPosts = collection.posts;

  //& Parse: "posts"
  let posts = [];
  for (let post of collectionPosts) {
    try {
      posts.push(await getPost(null, { args: { _id: post } }, false));
    } catch {}
  }
  collection.posts = posts;
  return collection;
}
