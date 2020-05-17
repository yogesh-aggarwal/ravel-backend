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

async function createPost(_parent: any, { args }: any) {
  return await CommunityPost.create(args, () => {})
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function updatePost(_parent: any, { args }: any) {
  return await CommunityPost.updateOne({ _id: args._id }, args, () => {})
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function deletePost(_parent: any, { args }: any) {
  return await CommunityPost.deleteOne({ _id: args._id }, () => {})
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

module.exports = {
  model: CommunityPost,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
};
