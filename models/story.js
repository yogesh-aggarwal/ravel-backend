const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Story = Schema({
  _id: Schema.Types.ObjectId,
  content: { type: String, required: true },
  stats: {
    views: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: true, default: 0 },
    appreciations: { type: Number, required: true, default: 0 },
    applauds: { type: Number, required: true, default: 0 }
  },
  comments: { type: [String], required: true, default: [] },
  datePublished: { type: Date, required: true, default: Date.now }
});

// Statics
Story.statics.createStory = async function(args) {
  try {
    args = args.args;
    args["_id"] = mongoose.Types.ObjectId();
    const newStory = new this(args);
    newStory.save();
  } catch {
    return false;
  }
};

Story.statics.getStory = async function(args) {
  try {
    return (await this.find({ _id: args.args._id }))[0];
  } catch {
    return false;
  }
};

Story.statics.deleteStory = async function(args) {
  try {
    await this.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("Story", Story, "Storys");
