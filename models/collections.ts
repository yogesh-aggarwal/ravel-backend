import mongoose from "mongoose";

const Schema = mongoose.Schema;

//& Schema
const Collection = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  posts: {
    type: [String],
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//& Model
export const CollectionModel = mongoose.model("Collection", Collection, "collections");

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
  return await CollectionModel.deleteOne({ _id: args._id }, args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updateCollection(_parent: any, { args }: any) {
  return await CollectionModel.updateOne({ _id: args._id }, args, () => {})
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
