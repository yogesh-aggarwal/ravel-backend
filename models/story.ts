import { Schema, Types, model } from "mongoose";

//& Schema
const Story = new Schema({
  _id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
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
export const StoryModel = model("Story", Story, "stories");

//& Methods
export async function createStory(_parent: any, { args }: any) {
  return await StoryModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function deleteStory(_parent: any, { args }: any) {
  return await StoryModel.deleteOne({ _id: Types.ObjectId(args._id) })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function getStory(_parent: any, { args }: any) {}
