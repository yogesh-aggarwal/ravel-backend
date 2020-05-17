//& Models
import { createPost, updatePost, deletePost } from "./models/posts";
import {
  createCollection,
  updateCollection,
  deleteCollection,
} from "./models/collections";
import {
  createMerchandise,
  updateMerchandise,
  deleteMerchandise,
} from "./models/merchandises";
import {
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
} from "./models/community-post";
import { createUser, updateUser, deleteUser } from "./models/users";
import {
  TrendingModel,
  createTrending,
  updateTrending,
  deleteTrending,
} from "./models/trending";
import { createStory, updateStory, deleteStory } from "./models/story";
import { ExploreModel } from "./models/explore";
import {
  createPublication,
  updatePublication,
  deletePublication,
} from "./models/publications";

//& Imports
import {
  getPost,
  getCollection,
  getUser,
  getCommunityPost,
  getPublication,
  getMerchandise,
  getStory,
} from "./models";
import GraphQLJSON from "graphql-type-json";

//& Get tools
async function getNewRavels({ args }: any) {
  const newPosts = [
    "5e7f3017e20f723590c45638",
    "5e7f3018e20f723590c45639",
    "5e7f3018e20f723590c4563a",
    "5e7f3019e20f723590c4563b",
  ]; // TODO: Get them from database of args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push(await getPost(null, { args: { _id: newPost } }));
  }
  return result;
}

//& Get (Models) tools
async function getUserRecommendations({ args }: any) {
  const newPosts = ["5ec114893ca0c626345dadc2"]; // TODO: Get them from database of args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push(await getPost(null, { args: { _id: newPost } }));
  }
  return result;
}

async function getFeaturedUser(args: any) {
  const user = await getUser(null, args, {});
  // user.data.posts.posts = user.data.posts.posts.slice(0, 3);
  // console.log(user.data.posts.posts);
  return user;
}

async function getTrending() {
  let trending = (
    await TrendingModel.find().limit(1).sort({ $natural: -1 })
  )[0].toObject();

  //& Parse: "trending.categories"
  let categories = [];
  for (let category of trending.categories) {
    let categoryPosts = [];
    for (let post of category.posts) {
      categoryPosts.push(await getPost(null, { args: { _id: post } }));
    }
    categories.push({
      name: category.name,
      posts: categoryPosts,
    });
  }
  trending.categories = categories;

  //& Parse "trending.creators"
  let creators = [];
  for (let creator of trending.creators) {
    creators.push(await getUser(null, { args: { _id: creator } }, {}));
  }
  trending.creators = creators;

  return trending;
}

async function getExplore() {
  let explore = (
    await ExploreModel.find().limit(1).sort({ $natural: -1 })
  )[0].toObject();

  //& Parse: "Explore.publications"
  let publications = [];
  for (let publication of explore.publications) {
    publications.push(
      await getPublication(null, { args: { _id: publication } })
    );
  }
  explore.publications = publications;

  //& Parse: "Explore.creators"
  let creators = [];
  for (let creator of explore.creators) {
    creators.push(await getUser(null, { args: { _id: creator } }, {}));
  }
  explore.creators = creators;

  //& Parse: "Explore.posts"
  let posts = [];
  for (let post of explore.posts) {
    posts.push(await getPost(null, { args: { _id: post } }));
  }
  explore.posts = posts;

  return explore;
}

export default {
  JSON: GraphQLJSON,
  QueryResolver: {
    getPost: getPost,
    getCollection: getCollection,
    getStory: getStory,
    getMerchandise: getMerchandise,
    getUser: getUser,
    getCommunityPost: getCommunityPost,
    getPublication: getPublication,
    // Other tools
    getNewRavels: getNewRavels,
    getUserRecommendations: getUserRecommendations,
    getTrending: getTrending,
    getExplore: getExplore,
    getFeaturedUser: getFeaturedUser,
  },
  MutationResolver: {
    // Post
    deletePost: deletePost,
    createPost: createPost,
    updatePost: updatePost,
    // Story
    createStory: createStory,
    deleteStory: deleteStory,
    // Merchandise
    deleteMerchandise: deleteMerchandise,
    createMerchandise: createMerchandise,
    updateMerchandise: updateMerchandise,
    // User
    deleteUser: deleteUser,
    createUser: createUser,
    updateUser: updateUser,
  },
};
