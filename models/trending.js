const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

// Statics
Trending.statics.createTrending = async function(args) {
  try {
    args = args.args;
    args["_id"] = mongoose.Types.ObjectId();
    const newTrending = new this(args);
    newTrending.save();
    return true;
  } catch {
    return false;
  }
};

Trending.statics.getTrending = async function() {
  try {
    return (await this.find({}))[0];
  } catch {
    return false;
  }
};

Trending.statics.deleteTrending = async function(args) {
  try {
    await this.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

Trending.statics.updateTrending = async function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await this.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
};


// require("dotenv").config(); // Configuring env variables
// mongoose.connect(process.env.DBURL)

module.exports = mongoose.model("Trending", Trending, "trending");
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
