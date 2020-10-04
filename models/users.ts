import { Schema, Types, model } from "mongoose";
import { CollectionModel, getCollection } from "./collections";
import { PublicationModel, getPublication } from "./publications";
import { StoryModel } from "./story";
import { getCommunityPost } from "./community-post";
import { PostModel, getPost } from "./posts";

//& Schema
const User = new Schema({
  _id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
  history: { type: [String], required: true },
  saved: { type: [String], required: true },
  data: {
    uname: { type: String, required: true },
    pword: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    coverImg: {
      type: String,
      required: true,
      default: "https://bit.ly/35PJbj1",
    },
    profileImg: {
      type: String,
      required: true,
      default: "https://bit.ly/2yXnT74", // TODO: Change it on the basis of gender
    },
    name: { type: String, required: true },
    bio: { type: String, required: false, default: "" },
    isSuspended: { type: Boolean, required: true, default: false },
    socialLinks: { type: [String], required: true, default: [] },
    memberOf: { type: [String], required: true, default: [] },
    posts: {
      categories: [
        {
          name: { type: String, required: true },
          posts: { type: [String], required: true },
        },
      ],
      posts: { type: [String], required: true, default: [] },
      featuredPosts: { type: [String], required: true, default: [] },
    },
    collections: {
      type: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        thumbnail: { type: String, required: true },
        tags: { type: [String], required: true, default: [] },
        dateCreated: { type: Date, required: true, default: Date.now },
        dateUpdated: { type: Date, required: true, default: Date.now },
        posts: { type: [String], required: true },
      },
      required: true,
      default: [],
    },
    stories: { type: [String], required: true, default: [] },
    followers: { type: [String], required: true, default: [] },
    following: { type: [String], required: true, default: [] },
    stats: {
      reach: { type: Number, required: true, default: 0 },
      appreciations: { type: Number, required: true, default: 0 },
    },
    merchandise: { type: [String], required: true, default: [] },
    joinDate: { type: Date, required: true, default: Date.now },
  },
});

//& Model
export const UserModel = model("User", User, "users");

//& Methods
export async function createUser(_parent: any, { args }: any) {
  return await UserModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function deleteUser(_parent: any, { args }: any) {
  return await UserModel.deleteOne({ _id: Types.ObjectId(args._id) })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updateUser(_parent: any, { args }: any) {
  return await UserModel.updateOne({ _id: Types.ObjectId(args._id) }, args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function getUser(
  _parent: any,
  { args }: any,
  { collection = true, community = true }
) {
  const user = (
    await UserModel.findOne({ _id: Types.ObjectId(args._id) })
  )?.toObject();
  const userPosts = user.data.posts;

  //& Parse: "posts.posts"
  let posts = [];
  for (let post of userPosts.posts) {
    posts.push(await PostModel.findOne({ _id: Types.ObjectId(post) }));
  }
  user.data.posts.posts = posts;

  //& Parse: "posts.featuredPosts"
  let featuredPosts = [];
  for (let featuredPost of userPosts.featuredPosts) {
    featuredPosts.push(
      await PostModel.findOne({ _id: Types.ObjectId(featuredPost) })
    );
  }
  user.data.posts.featuredPosts = featuredPosts;

  //& Parse: "posts.categories"
  let categories = [];
  for (let category of userPosts.categories) {
    let categoryPosts = [];
    for (let post of category.posts) {
      categoryPosts.push(
        await PostModel.findOne({ _id: Types.ObjectId(post) })
      );
    }
    categories.push({ name: category.name, posts: categoryPosts });
  }
  user.data.posts.categories = categories;

  //& Parse: "collections"
  if (collection) {
    let collections = [];
    for (let collection of user.data.collections) {
      collections.push(getCollection(null, { args: { _id: collection } }));
    }
    user.data.collections = collections;
  }

  //& Parse: "community"
  if (community) {
    let communityPosts = [];
    for (let communityPost of user.data.community) {
      communityPosts.push(
        await getCommunityPost(
          null,
          { args: { _id: communityPost } },
          { user: false }
        )
      );
    }
    user.data.community = communityPosts;
  }

  //& Parse: "memberOf"
  let memberOf = [];
  for (let member of user.data.memberOf) {
    memberOf.push(
      await getPublication(null, {args: { _id: Types.ObjectId(member) }})
    );
  }
  user.data.memberOf = memberOf;

  //& Parse: "story"
  let stories = [];
  for (let story of user.data.stories) {
    stories.push(await StoryModel.findOne({ _id: Types.ObjectId(story) }));
  }
  user.data.stories = stories;

  //& Parse: "followers"
  let followers = [];
  for (let follower of user.data.followers) {
    followers.push(await UserModel.findOne({ _id: Types.ObjectId(follower) }));
  }
  user.data.followers = followers;
  //& Parse: "followings"
  let followings = [];
  for (let following of user.data.following) {
    followings.push(
      await UserModel.findOne({ _id: Types.ObjectId(following) })
    );
  }
  user.data.following = followings;

  //& Parse: "merchandise"
  let merchandises = [];
  for (let merchandise of user.data.merchandise) {
    merchandises.push(
      await UserModel.findOne({ _id: Types.ObjectId(merchandise) })
    );
  }
  user.data.merchandise = merchandises;

  console.log(user);
  return user;
}
