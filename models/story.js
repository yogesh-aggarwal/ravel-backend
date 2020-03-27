const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Story = Schema({
  _id: Schema.Types.ObjectId,
  content: { type: String, required: true },
  stats: { type: [Number], required: true },
  comments: { type: [String], required: true },
  datePublished: { type: Date, required: true }
});

// Statics
Story.statics.createStory = function(args) {
  try {
    // TODO: Implement here
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
