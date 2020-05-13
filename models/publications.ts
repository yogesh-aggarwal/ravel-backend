import mongoose from "mongoose";

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
const PublicationModel = mongoose.model(
  "Publication",
  Publication,
  "publications"
);

//& Methods
async function createPublication(_parent: any, args: any) {
  try {
    args = args.args;
    const newPublication = new PublicationModel(args);
    newPublication.save();
    return true;
  } catch {
    return false;
  }
}

async function deletePublication(_parent: any, args: any) {
  try {
    await PublicationModel.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
}

async function updatePublication(_parent: any, args: any) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await PublicationModel.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  model: PublicationModel,
  createPublication: createPublication,
  deletePublication: deletePublication,
  updatePublication: updatePublication,
};
