import { Schema, Types, model } from "mongoose";

//& Schema
const Trending = new Schema({
  _id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
  tags: { type: [String], required: true },
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
  creators: { type: [String], required: true },
  date: { type: Date, required: true, default: Date.now },
});

//& Model
export const TrendingModel = model("Trending", Trending, "trending");

//& Methods
export async function createTrending(_parent: any, { args }: any) {
  return await TrendingModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function deleteTrending(_parent: any, { args }: any) {
  return await TrendingModel.deleteOne({ _id: Types.ObjectId(args._id) })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updateTrending(_parent: any, { args }: any) {
  return await TrendingModel.updateOne(
    { _id: Types.ObjectId(args._id) },
    args,
    () => {}
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
