export const Post = require("./models/posts");
export const Collection = require("./models/collections");
export const Merchandise = require("./models/merchandises");
export const CommunityPost = require("./models/community-post");
export const User = require("./models/users");
export const Trending = require("./models/trending");
export const Story = require("./models/story");
export const Explore = require("./models/explore");
export const Publication = require("./models/publications");

//? "Get" functions are seperated because every model requires to retrieve data from another model (To prevent circular imports).
/*
Explore
// Merchandises
// Posts
// Publications
// Story
Trending
// Users
*/

export async function getMerchandise(_parent: any, args: any) {
  return (await Merchandise.model.findById(args.args._id)).toObject();
}

export async function getPost(
  _parent: any,
  args: any,
  collectionFromUserModel: boolean = true
) {
  let post = (await Post.model.findById(args.args._id)).toObject();
  post.credit.publication = await Publication.model.findById(
    post.credit.publication
  );
  post.credit.author = await getUser(
    null,
    {
      args: { _id: post.credit.author },
    },
    { collection: collectionFromUserModel }
  );

  return post;
}

export async function getPublication(_parent: any, args: any) {
  const publication = (
    await Publication.model.findById(args.args._id)
  ).toObject();

  //& Parse: "publication.categories"
  let collections = [];
  for (let category of publication.collections) {
    let categoryPosts = [];
    for (let post of category.posts) {
      categoryPosts.push(await Post.model.findById(post));
    }
    collections.push({
      name: category.name,
      posts: categoryPosts,
    });
  }
  publication.collections = collections;

  //& Parse: "publication.publication"
  let publications = [];
  for (let post of publication.publications) {
    publications.push(await Post.model.findById(post));
  }
  publication.publications = publications;

  //& Parse: "publication.owners"
  let owners = [];
  for (let owner of publication.owners) {
    owners.push(await getUser(null, { args: { _id: owner } }, {}));
  }
  publication.owners = owners;

  //& Parse: "publication.followers"
  let followers = [];
  for (let follower of publication.followers) {
    followers.push(await getUser(null, { args: { _id: follower } }, {}));
  }
  publication.followers = followers;

  //& Parse: "publication.members"
  let members = [];
  for (let member of publication.members) {
    members.push(await getUser(null, { args: { _id: member } }, {}));
  }
  publication.members = members;

  return publication;
}

export async function getUser(
  _parent: any,
  args: any,
  { collection = true, community = true }
) {
  const user = (await User.model.findById({ _id: args.args._id })).toObject();
  const userPosts = user.data.posts;

  //& Parse: "posts.posts"
  let posts = [];
  for (let post of userPosts.posts) {
    posts.push(await Post.model.findById(post));
  }
  user.data.posts.posts = posts;

  //& Parse: "posts.featuredPosts"
  let featuredPosts = [];
  for (let featuredPost of userPosts.featuredPosts) {
    featuredPosts.push(await Post.model.findById(featuredPost));
  }
  user.data.posts.featuredPosts = featuredPosts;

  //& Parse: "posts.categories"
  let categories = [];
  for (let category of userPosts.categories) {
    let categoryPosts = [];
    for (let post of category.posts) {
      categoryPosts.push(await Post.model.findById(post));
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

export async function getCollection(_parent: any, args: any) {
  const collection = (
    await Collection.model.findById({ _id: args.args._id })
  ).toObject();
  const collectionPosts = collection.posts;

  //& Parse: "posts"
  let posts = [];
  for (let post of collectionPosts) {
    try {
      posts.push(await getPost(null, { args: { _id: post } }, false));
    } catch {}
  }
  collection.posts = posts;
  return collection;
}

export async function getCommunityPost(
  _parent: any,
  { args }: any,
  { user = true }
) {
  const communityPost = (
    await CommunityPost.model.findById(args._id)
  ).toObject();
  if (user)
    communityPost.owner = getUser(
      null,
      { args: { _id: communityPost.owner } },
      { community: false }
    );
  return communityPost;
}

export async function getStory(_parent: any, args: any) {}
