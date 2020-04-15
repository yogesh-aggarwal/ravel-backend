import mongoose from "mongoose";

const Schema = mongoose.Schema;

//& Schema
const Trending = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  tags: {
    type: [String],
    required: true,
  },
  categories: {
    type: [
      {
        name: { type: String, required: true },
        posts: { type: [String], required: true },
      },
    ],
    required: true,
    default: [],
  },
  creators: {
    type: [String],
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
});

//& Model
const TrendingModel = mongoose.model("Trending", Trending, "trending");

//& Methods
async function createTrending(_parent, args) {
  try {
    args = args.args;
    args["_id"] = mongoose.Types.ObjectId();
    const newTrending = new TrendingModel(args);
    newTrending.save();
    return true;
  } catch {
    return false;
  }
}

async function deleteTrending(_parent, args) {
  try {
    await TrendingModel.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
}

async function updateTrending(_parent, args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await TrendingModel.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  model: TrendingModel,
  createTrending: createTrending,
  deleteTrending: deleteTrending,
  updateTrending: updateTrending,
};
