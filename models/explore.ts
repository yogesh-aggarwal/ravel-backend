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
async function createExplore(_parent: any, args: any) {
  try {
    args = args.args;
    args["_id"] = mongoose.Types.ObjectId();
    const newExplore = new ExploreModel(args);
    newExplore.save();
    return true;
  } catch {
    return false;
  }
}

async function deleteExplore(_parent: any, args: any) {
  try {
    await ExploreModel.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
}

async function updateExplore(_parent: any, args: any) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await ExploreModel.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  model: ExploreModel,
  createExplore: createExplore,
  deleteExplore: deleteExplore,
  updateExplore: updateExplore,
};
