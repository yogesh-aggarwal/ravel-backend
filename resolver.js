const Post = require("./models/posts");
const Merchandise = require("./models/merchandises");
const User = require("./models/users");

function createPost(args) {
  return Post.createPost(args);
}

function getPost(args) {
  return Post.getPost(args);
}

function deletePost(args) {
  return Post.deletePost(args);
}

function updatePost(args) {
  return Post.updatePost(args);
}


// Merchandise
function createMerchandise(args) {
  return Merchandise.createMerchandise(args);
}


// User
function createUser(args) {
  return User.createUser(args);
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
};
