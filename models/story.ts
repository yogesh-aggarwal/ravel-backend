import mongoose from "mongoose";

const Schema = mongoose.Schema;

//& Schema
const Story = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  content: { type: String, required: true },
  stats: {
    views: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: true, default: 0 },
    appreciations: { type: Number, required: true, default: 0 },
    applauds: { type: Number, required: true, default: 0 },
  },
  comments: { type: [String], required: true, default: [] },
  datePublished: { type: Date, required: true, default: Date.now },
});

//& Model
const StoryModel = mongoose.model("Story", Story, "stories");

//& Methods
async function createStory(_parent: any, { args }: any) {
  return await StoryModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function deleteStory(_parent: any, { args }: any) {
  return await StoryModel.deleteOne({ _id: args._id })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function updateStory(_parent: any, { args }: any) {
  return await StoryModel.updateOne({ _id: args._id }, args, () => {})
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

module.exports = {
  model: StoryModel,
  createStory: createStory,
  deleteStory: deleteStory,
  updateStory: updateStory,
};
