import mongoose from "mongoose";

const Schema = mongoose.Schema;

//& Schema
const Explore = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  tags: {
    type: [String],
    required: true,
  },
  publications: {
    type: [String],
    required: true,
  },
  creators: {
    type: [String],
    required: true,
  },
  posts: {
    type: [String],
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
});

//& Model
const ExploreModel = mongoose.model("Explore", Explore, "explore");

//& Methods
async function createExplore(_parent: any, { args }: any) {
  return await ExploreModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function deleteExplore(_parent: any, { args }: any) {
  return await ExploreModel.deleteOne({ _id: args._id })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function updateExplore(_parent: any, { args }: any) {
  return await ExploreModel.updateOne({ _id: args._id }, args, () => {})
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

module.exports = {
  model: ExploreModel,
  createExplore: createExplore,
  deleteExplore: deleteExplore,
  updateExplore: updateExplore,
};
