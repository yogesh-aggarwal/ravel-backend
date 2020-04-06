const Post = require("./models/posts");
const Merchandise = require("./models/merchandises");
const User = require("./models/users");
const Trending = require("./models/trending");
const Story = require("./models/story");
const Explore = require("./models/explore");
const Publication = require("./models/publications");

const modelsGet = require("./models");

// Other tools
async function getNewRavels(args) {
  const newPosts = [
    "5e7f3017e20f723590c45638",
    "5e7f3018e20f723590c45639",
    "5e7f3018e20f723590c4563a"
  ]; // TODO: Get them from database of args.args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push(await modelsGet.getPost(null, { args: { _id: newPost } }));
  }
  return result;
}

// Other tools
async function getUserRecommendations(args) {
  const newPosts = ["5e7f3019e20f723590c4563b"]; // TODO: Get them from database of args.args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push(await modelsGet.getPost(null, { args: { _id: newPost } }));
  }
  return result;
}

async function getFeaturedUser(args) {
  const user = await modelsGet.getUser(args);
  // user.data.posts.posts = user.data.posts.posts.slice(0, 3);
  // console.log(user.data.posts.posts);
  return user;
}

async function getTrending() {
  let trending = (
    await Trending.model
      .find()
      .limit(1)
      .sort({ $natural: -1 })
  )[0].toObject();

  //& Parse: "trending.categories"
  let categories = [];
  for (let category of trending.categories) {
    let categoryPosts = [];
    for (post of category.posts) {
      categoryPosts.push(
        await modelsGet.getPost(null, { args: { _id: post } })
      );
    }
    categories.push({
      name: category.name,
      posts: categoryPosts
    });
  }
  trending.categories = categories;
  
  //& Parse "trending.creators"
  let creators = [];
  for (let creator of trending.creators) {
    creators.push(await modelsGet.getUser(null, { args: { _id: creator } }));
  }
  trending.creators = creators;

  console.log(trending);
  return trending;
}

async function getExplore() {
  let explore = (
    await Explore.model
      .find()
      .limit(1)
      .sort({ $natural: -1 })
  )[0].toObject();

  //& Parse: "Explore.publications"
  let publications = [];
  for (publication of explore.publications) {
    publications.push(
      await modelsGet.getPublication(null, { args: { _id: publication } })
    );
  }
  explore.publications = publications;

  //& Parse: "Explore.creators"
  let creators = [];
  for (creator of explore.creators) {
    creators.push(await modelsGet.getUser(null, { args: { _id: creator } }));
  }
  explore.creators = creators;

  //& Parse: "Explore.posts"
  let posts = [];
  for (post of explore.posts) {
    posts.push(await modelsGet.getPost(null, { args: { _id: post } }));
  }
  explore.posts = posts;

  return explore;
}

module.exports = {
  QueryResolver: {
    getPost: modelsGet.getPost,
    getStory: Story.getStory,
    getMerchandise: modelsGet.getMerchandise,
    getUser: modelsGet.getUser,
    getPublication: modelsGet.getPublication,
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
