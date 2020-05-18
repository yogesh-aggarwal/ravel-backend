import { Schema, Types, model } from "mongoose";
import { getUser } from "./users";

const CommunityPostSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, default: Types.ObjectId },
});

export const CommunityPostModel = model(
  "CommunityPost",
  CommunityPostSchema,
  "community_posts"
);

export async function createCommunityPost(_parent: any, { args }: any) {
  return await CommunityPostModel.create(args, () => {})
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updateCommunityPost(_parent: any, { args }: any) {
  return await CommunityPostModel.updateOne(
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

export async function deleteCommunityPost(_parent: any, { args }: any) {
  return await CommunityPostModel.deleteOne(
    { _id: Types.ObjectId(args._id) },
    () => {}
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function getCommunityPost(
  _parent: any,
  { args }: any,
  { user = true }
) {
  const communityPost = (
    await CommunityPostModel.findOne({ _id: Types.ObjectId(args._id) })
  )?.toObject();
  if (user)
    communityPost.owner = getUser(
      null,
      { args: { _id: communityPost.owner } },
      { community: false }
    );
  return communityPost;
}
