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
Story.statics.createStory = function (args) {
  try {
    // TODO: Implement here
  } catch {
    return false;
  }
};

Story.statics.getStory = function(args) {
  try {
    return this.findById({ _id: args.args._id });
  } catch {
    return false;
  }
};

Story.statics.deleteStory = function(args) {
  try {
    this.deleteById({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("Story", Story, "Storys");
