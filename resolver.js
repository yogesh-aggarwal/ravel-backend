const Post = require("./models/posts");

function getPost(args) {
  return Post.getPost(args);
}

function deletePost(args) {
  return Post.deletePost(args);
}

function updatePost(args) {
  return Post.updatePost(args);
}

module.exports = {
  getPost: getPost,
  deletePost: deletePost,
  updatePost: updatePost
};
