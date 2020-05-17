import mongoose from "mongoose";
import { PostModel } from './posts';
import { getUser } from './users';

const Schema = mongoose.Schema;

//& Schema
const Publication = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    required: true,
  },
  featuredImg: {
    type: String,
    required: true,
  },
  publications: {
    type: [String],
    required: true,
    default: [],
  },
  collections: {
    type: [String],
    required: true,
    default: [],
  },
  papers: {
    type: [String],
    required: true,
    default: [],
  },
  owners: {
    type: [String],
    required: true,
  },
  followers: {
    type: [String],
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//& Model
export const PublicationModel = mongoose.model(
  "Publication",
  Publication,
  "publications"
);

//& Methods
export async function createPublication(_parent: any, { args }: any) {
  return await PublicationModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function deletePublication(_parent: any, { args }: any) {
  return await PublicationModel.deleteOne({ _id: args._id })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updatePublication(_parent: any, { args }: any) {
  return await PublicationModel.findByIdAndUpdate(
    { _id: args._id },
    args,
    () => {}
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
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
