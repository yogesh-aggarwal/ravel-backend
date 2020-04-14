const Post = require("./models/posts");
const Merchandise = require("./models/merchandises");
const User = require("./models/users");
const Trending = require("./models/trending");
const Story = require("./models/story");
const Explore = require("./models/explore");
const Publication = require("./models/publications");

/*
Explore
// Merchandises
// Posts
Publications
Story
Trending
// Users
*/

async function getMerchandise(_parent, args) {
  return (await Merchandise.model.findById(args.args._id)).toObject();
}

async function getPost(_parent, args) {
  let post = (await Post.model.findById(args.args._id)).toObject();
  post.credit.publication = await Publication.model.findById(
    post.credit.publication
  );
  post.credit.author = await getUser(null, {
    args: { _id: post.credit.author },
  });

  return post;
}

async function getPublication(_parent, args) {
  const publication = (
    await Publication.model.findById(args.args._id)
  ).toObject();

  //& Parse: "publication.categories"
  let collections = [];
  for (let category of publication.collections) {
    let categoryPosts = [];
    for (post of category.posts) {
      categoryPosts.push(await Post.model.findById(post));
    }
    collections.push({
      name: category.name,
      posts: categoryPosts,
    });
  }
  publication.collections = collections;

  //& Parse: "publication.publication"
  publications = [];
  for (let post of publication.publications) {
    publications.push(await Post.model.findById(post));
  }
  publication.publications = publications;

  //& Parse: "publication.owners"
  let owners = [];
  for (let owner of publication.owners) {
    owners.push(await getUser(null, { args: { _id: owner } }));
  }
  publication.owners = owners;

  //& Parse: "publication.followers"
  let followers = [];
  for (let follower of publication.followers) {
    followers.push(await getUser(null, { args: { _id: follower } }));
  }
  publication.followers = followers;

  //& Parse: "publication.members"
  let members = [];
  for (let member of publication.members) {
    members.push(await getUser(null, { args: { _id: member } }));
  }
  publication.members = members;

  return publication;
}

async function getUser(_parent, args) {
  const user = (await User.model.findById({ _id: args.args._id })).toObject();
  const userPosts = user.data.posts;

  //& Parse: "posts.posts"
  posts = [];
  for (let post of userPosts.posts) {
    posts.push(await Post.model.findById(post));
  }
  user.data.posts.posts = posts;

  //& Parse: "posts.featuredPosts"
  featuredPosts = [];
  for (let featuredPost of userPosts.featuredPosts) {
    featuredPosts.push(await Post.model.findById(featuredPost));
  }
  user.data.posts.featuredPosts = featuredPosts;

  //& Parse: "posts.categories"
  let categories = [];
  for (let category of userPosts.categories) {
    let categoryPosts = [];
    for (post of category.posts) {
      categoryPosts.push(await Post.model.findById(post));
    }
    categories.push({ name: category.name, posts: categoryPosts });
  }
  user.data.posts.categories = categories;

  //& Parse: "collections"
  let collections = [];
  for (let collection of user.data.collections) {
    let collectionPosts = [];
    for (post of collection.posts) {
      collectionPosts.push(await Post.model.findById(post));
    }
    collections.push({
      title: collection.title,
      description: collection.description,
      thumbnail: collection.thumbnail,
      tags: collection.tags,
      dateCreated: collection.dateCreated,
      dateUpdated: collection.dateUpdated,
      posts: collectionPosts,
    });
  }
  user.data.collections = collections;

  //& Parse: "memberOf"
  let memberOf = [];
  for (let member of user.data.memberOf) {
    memberOf.push(await Publication.model.findById(member));
  }
  user.data.memberOf = memberOf;

  //& Parse: "story"
  let stories = [];
  for (let story of user.data.stories) {
    stories.push(await Story.model.findById(story));
  }
  user.data.stories = stories;

  //& Parse: "followers"
  let followers = [];
  for (let follower of user.data.followers) {
    followers.push(await User.model.findById(follower));
  }
  user.data.followers = followers;

  //& Parse: "followings"
  let followings = [];
  for (let following of user.data.following) {
    followings.push(await User.model.findById(following));
  }
  user.data.following = followings;

  //& Parse: "merchandise"
  let merchandises = [];
  for (let merchandise of user.data.merchandise) {
    merchandises.push(await User.model.findById(merchandise));
  }
  user.data.merchandise = merchandises;

  return user;
}

module.exports = {
  getMerchandise: getMerchandise,
  getPost: getPost,
  getPublication: getPublication,
  getUser: getUser,
};
