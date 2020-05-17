import { PostModel } from "./models/posts";
import { CollectionModel } from "./models/collections";
import { MerchandiseModel } from "./models/merchandises";
import { CommunityPostModel } from "./models/community-post";
import { UserModel } from "./models/users";
import { TrendingModel } from "./models/trending";
import { StoryModel } from "./models/story";
import { ExploreModel } from "./models/explore";
import { PublicationModel } from "./models/publications";

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
export async function getMerchandise(_parent: any, { args }: any) {
  return (await MerchandiseModel.findById(args._id))?.toObject();
}

export async function getPost(
  _parent: any,
  { args }: any,
  collectionFromUserModel: boolean = true
) {
  // console.log(args);
  // console.log(PostModel);
  let post = await PostModel.findOne({ _id: args._id });
  console.log(post);
  return post;
  // post?.toObject();
  // post.credit.publication = await PublicationModel.findById(
  //   post.credit.publication
  // );
  // post.credit.author = await getUser(
  //   null,
  //   {
  //     args: { _id: post.credit.author },
  //   },
  //   { collection: collectionFromUserModel }
  // );

  // return post;
}

export async function getPublication(_parent: any, { args }: any) {
  const publication = (await PublicationModel.findById(args._id))?.toObject();

  //& Parse: "publication.categories"
  let collections = [];
  for (let category of publication.collections) {
    let categoryPosts = [];
    for (let post of category.posts) {
      categoryPosts.push(await PostModel.findById(post));
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
    publications.push(await PostModel.findById(post));
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
  { args }: any,
  { collection = true, community = true }
) {
  const user = (await UserModel.findById({ _id: args._id }))?.toObject();
  const userPosts = user.data.posts;

  //& Parse: "posts.posts"
  let posts = [];
  for (let post of userPosts.posts) {
    posts.push(await PostModel.findById(post));
  }
  user.data.posts.posts = posts;

  //& Parse: "posts.featuredPosts"
  let featuredPosts = [];
  for (let featuredPost of userPosts.featuredPosts) {
    featuredPosts.push(await PostModel.findById(featuredPost));
  }
  user.data.posts.featuredPosts = featuredPosts;

  //& Parse: "posts.categories"
  let categories = [];
  for (let category of userPosts.categories) {
    let categoryPosts = [];
    for (let post of category.posts) {
      categoryPosts.push(await PostModel.findById(post));
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
    memberOf.push(await PublicationModel.findById(member));
  }
  user.data.memberOf = memberOf;

  //& Parse: "story"
  let stories = [];
  for (let story of user.data.stories) {
    stories.push(await StoryModel.findById(story));
  }
  user.data.stories = stories;

  //& Parse: "followers"
  let followers = [];
  for (let follower of user.data.followers) {
    followers.push(await UserModel.findById(follower));
  }
  user.data.followers = followers;
  //& Parse: "followings"
  let followings = [];
  for (let following of user.data.following) {
    followings.push(await UserModel.findById(following));
  }
  user.data.following = followings;

  //& Parse: "merchandise"
  let merchandises = [];
  for (let merchandise of user.data.merchandise) {
    merchandises.push(await UserModel.findById(merchandise));
  }
  user.data.merchandise = merchandises;
  return user;
}

export async function getCollection(_parent: any, { args }: any) {
  const collection = (
    await CollectionModel.findById({ _id: args._id })
  )?.toObject();
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
    await CommunityPostModel.findById(args._id)
  )?.toObject();
  if (user)
    communityPost.owner = getUser(
      null,
      { args: { _id: communityPost.owner } },
      { community: false }
    );
  return communityPost;
}

export async function getStory(_parent: any, { args }: any) {}
