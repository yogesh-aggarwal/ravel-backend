const Post = require("./models/posts");
const Merchandise = require("./models/merchandises");
const User = require("./models/users");
const Trending = require("./models/trending");
const Story = require("./models/story");
const Explore = require("./models/explore");
const Publication = require("./models/publications");

// Other tools
async function getNewRavels(args) {
  const newPosts = [
    "5e7f3017e20f723590c45638",
    "5e7f3018e20f723590c45639",
    "5e7f3018e20f723590c4563a"
  ]; // TODO: Get them from database of args.args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push((await Post.model.find({ _id: newPost }))[0]);
  }
  return result;
}

// Other tools
async function getUserRecommendations(args) {
  const newPosts = ["5e7f3019e20f723590c4563b"]; // TODO: Get them from database of args.args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push((await Post.model.find({ _id: newPost }))[0]);
  }
  return result;
}

async function getFeaturedUser(args) {
  const user = await User.getUser(args);
  // user.data.posts.posts = user.data.posts.posts.slice(0, 3);
  // console.log(user.data.posts.posts);
  return user;
}

async function getTrending() {
  return await Trending.model.getTrending();
}

async function getExplore() {
  return await Explore.model.getExplore();
}

module.exports = {
  QueryResolver: {
    getPost: Post.getPost,
    getStory: Story.getStory,
    getMerchandise: Merchandise.getMerchandise,
    getUser: User.getUser,
    getPublication: Publication.getPublication,
    // Other tools
    getNewRavels: getNewRavels,
    getUserRecommendations: getUserRecommendations,
    getTrending: getTrending,
    getExplore: getExplore,
    getFeaturedUser: getFeaturedUser
  },
  MutationResolver: {
    // Post
    deletePost: Post.deletePost,
    createPost: Post.createPost,
    updatePost: Post.updatePost,
    // Story
    deleteStory: Story.deleteStory,
    createStory: Story.createStory,
    // Merchandise
    deleteMerchandise: Merchandise.deleteMerchandise,
    createMerchandise: Merchandise.createMerchandise,
    updateMerchandise: Merchandise.updateMerchandise,
    // User
    deleteUser: User.deleteUser,
    createUser: User.createUser,
    updateUser: User.updateUser
  }
};
