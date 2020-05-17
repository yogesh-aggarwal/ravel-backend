//& Models
import { getPost, createPost, updatePost, deletePost } from "./models/posts";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getCollection,
} from "./models/collections";
import {
  createMerchandise,
  updateMerchandise,
  deleteMerchandise,
  getMerchandise,
} from "./models/merchandises";
import {
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  getCommunityPost,
} from "./models/community-post";
import { createUser, updateUser, deleteUser, getUser } from "./models/users";
import { TrendingModel } from "./models/trending";
import { createStory, deleteStory, getStory } from "./models/story";
import { ExploreModel } from "./models/explore";
import {
  createPublication,
  updatePublication,
  deletePublication,
  getPublication,
} from "./models/publications";

//& Tools
import { getUserRecommendations, getFeaturedUser } from "./tools/user";
import { getTrending } from "./tools/trending";
import { getExplore } from "./tools/explore";
import { getNewRavels } from "./tools/global";

//& Imports
import GraphQLJSON from "graphql-type-json";

export default {
  JSON: GraphQLJSON,
  QueryResolver: {
    getCollection: getCollection,
    getCommunityPost: getCommunityPost,
    getMerchandise: getMerchandise,
    getPost: getPost,
    getPublication: getPublication,
    getStory: getStory,
    getUser: getUser,
    // Other tools
    getNewRavels: getNewRavels,
    getUserRecommendations: getUserRecommendations,
    getTrending: getTrending,
    getExplore: getExplore,
    getFeaturedUser: getFeaturedUser,
  },
  MutationResolver: {
    // Collection
    createCollection: createCollection,
    updateCollection: updateCollection,
    deleteCollection: deleteCollection,
    // CommunityPost
    createCommunityPost: createCommunityPost,
    updateCommunityPost: updateCommunityPost,
    deleteCommunityPost: deleteCommunityPost,
    // Merchandise
    createMerchandise: createMerchandise,
    updateMerchandise: updateMerchandise,
    deleteMerchandise: deleteMerchandise,
    // Post
    createPost: createPost,
    updatePost: updatePost,
    deletePost: deletePost,
    // Publication
    createPublication: createPublication,
    updatePublication: updatePublication,
    deletePublication: deletePublication,
    // Story
    createStory: createStory,
    deleteStory: deleteStory,
    // User
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
  },
};
