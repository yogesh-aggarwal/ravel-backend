const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Explore = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  tags: {
    type: [String],
    required: true
  },
  publications: {
    type: [String],
    required: true
  },
  creators: {
    type: [String],
    required: true
  },
  posts: {
    type: [String],
    required: true
  },
  date: { type: Date, required: true, default: Date.now }
});

// Statics
Explore.statics.createExplore = async function(args) {
  try {
    args = args.args;
    args["_id"] = mongoose.Types.ObjectId();
    const newExplore = new this(args);
    newExplore.save();
    return true;
  } catch {
    return false;
  }
};

Explore.statics.getExplore = async function() {
  try {
    return (await this.find({}))[0];
  } catch {
    return false;
  }
};

Explore.statics.deleteExplore = async function(args) {
  try {
    await this.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

Explore.statics.updateExplore = async function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await this.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
};

require("dotenv").config(); // Configuring env variables
mongoose.connect(process.env.DBURL);

module.exports = mongoose.model("Explore", Explore, "explore");
// const ExploreModel = new mongoose.model("Explore", Explore, "explore");

// const model = new ExploreModel({
//   tags: ["Psychology", "CyberSecurity", "Education"],
//   publications: ["5e834ed984f4ca32d083de90"],
//   creators: ["5e7f360f4f971c2d381f8719"],
//   posts: ["5e7f3018e20f723590c45639", "5e7f3019e20f723590c4563b"]
// });
// console.log(model);
// model.save();
