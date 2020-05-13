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
const CollectionModel = mongoose.model("Collection", Collection, "collections");

//& Methods
async function createCollection(_parent: any, args: any) {
  try {
    args = args.args;
    const newCollection = new CollectionModel(args);
    newCollection.save();
    return true;
  } catch {
    return false;
  }
}

async function deleteCollection(_parent: any, args: any) {
  try {
    await CollectionModel.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
}

async function updateCollection(_parent: any, args: any) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await CollectionModel.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  model: CollectionModel,
  createCollection: createCollection,
  deleteCollection: deleteCollection,
  updateCollection: updateCollection,
};
