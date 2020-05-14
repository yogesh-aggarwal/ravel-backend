import { Schema, Types, model } from "mongoose";

const CommunityPostSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    default: Types.ObjectId,
  },
});

const CommunityPost = model(
  "CommunityPost",
  CommunityPostSchema,
  "community_posts"
);

async function createPost(_parent: any, args: any) {
  await CommunityPost.create(args.args, () => {
    return true;
  });
}

async function updatePost(_parent: any, { args }: any) {
  return await CommunityPost.updateOne({ _id: args._id }, args, () => {
    return true;
  });
}

async function deletePost(_parent: any, { args }: any) {
  return await CommunityPost.deleteOne({ _id: args._id }, () => {
    return true;
  });
}

module.exports = {
  model: CommunityPost,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
};
