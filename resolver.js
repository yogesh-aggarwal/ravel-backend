const Post = require("./models/posts");
const Merchandise = require("./models/merchandises");
const User = require("./models/users");
const Trending = require("./models/trending");
const Explore = require("./models/explore");
const Publication = require("./models/publications");

async function createPost(args) {
  return await Post.createPost(args);
}

async function getPost(args) {
  return await Post.getPost(args);
}

async function deletePost(args) {
  return await Post.deletePost(args);
}

async function updatePost(args) {
  return await Post.updatePost(args);
}

// Merchandise
async function createMerchandise(args) {
  return await Merchandise.createMerchandise(args);
}

// User
async function createUser(args) {
  return await User.createUser(args);
}

async function getUser(args) {
  return await User.getUser(args);
}

// Publication
async function getPublication(args) {
  return await Publication.getPublication(args);
}

// Other tools
async function getNewRavels(args) {
  const newPosts = [
    "5e7f3017e20f723590c45638",
    "5e7f3018e20f723590c45639",
    "5e7f3018e20f723590c4563a"
  ]; // TODO: Get them from database of args.args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push((await Post.find({ _id: newPost }))[0]);
  }
  return result;
}

// Other tools
async function getUserRecommendations(args) {
  const newPosts = ["5e7f3019e20f723590c4563b"]; // TODO: Get them from database of args.args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push((await Post.find({ _id: newPost }))[0]);
  }
  return result;
}

async function getFeaturedUser(args) {
  const user = await getUser(args);
  // user.data.posts.posts = user.data.posts.posts.slice(0, 3);
  // console.log(user.data.posts.posts);
  return user;
}

async function getTrending() {
  return await Trending.getTrending();
}

async function getExplore() {
  return await Explore.getExplore();
}

module.exports = {
  // Post
  createPost: createPost,
  getPost: getPost,
  deletePost: deletePost,
  updatePost: updatePost,

  // Merchandise
  createMerchandise: createMerchandise,

  // User
  createUser: createUser,
  getUser: getUser,

  // Publication
  getPublication: getPublication,

  // Other tools
  getNewRavels: getNewRavels,
  getUserRecommendations: getUserRecommendations,
  getTrending: getTrending,
  getExplore: getExplore,
  getFeaturedUser: getFeaturedUser
};
