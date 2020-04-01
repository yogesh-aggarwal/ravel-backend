const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//& Schema
const Trending = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  tags: {
    type: [String],
    required: true
  },
  featured: {
    topics: { type: [String], required: true },
    posts: { type: [[String]], required: true }
  },
  featuredCreators: {
    type: [String],
    required: true
  },
  date: { type: Date, required: true, default: Date.now }
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

async function getTrending() {
  try {
    return (await TrendingModel.find({}))[0];
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
  getTrending: getTrending,
  deleteTrending: deleteTrending,
  updateTrending: updateTrending
};
// require("dotenv").config(); // Configuring env variables
// mongoose.connect(process.env.DBURL)

// const TrendingModel = new mongoose.model("Trending", Trending, "trending");

// const model = new TrendingModel({
//   tags: ["hello"],
//   featured: {
//     topics: ["Psychology", "Cyber security", "Education"],
//     posts: [
//       ["5e7f3017e20f723590c45638"],
//       ["5e7f3018e20f723590c45639", "5e7f3019e20f723590c4563b"],
//       ["5e7f3018e20f723590c4563a"]
//     ]
//   },
//   featuredCreators: ["5e7f360f4f971c2d381f8719"]
// });
// console.log(model);
// model.save();
