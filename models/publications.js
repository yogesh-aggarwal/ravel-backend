const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Publication = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    required: true
  },
  featuredImg: {
    type: String,
    required: true
  },
  posts: {
    type: [String],
    required: true,
    default: []
  },
  collections: {
    type: [String],
    required: true,
    default: []
  },
  papers: {
    type: [String],
    required: true,
    default: []
  },
  owners: {
    type: [String],
    required: true
  },
  followers: {
    type: [String],
    required: true
  },
  members: {
    type: [String],
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Statics
Publication.statics.createPublication = async function(args) {
  try {
    args = args.args;
    const newPublication = new this(args);
    newPublication.save();
    return true;
  } catch {
    return false;
  }
};

Publication.statics.getPublication = async function(args) {
  try {
    return (await this.find({_id: args.args._id}))[0];
  } catch {
    return false;
  }
};

Publication.statics.deletePublication = async function(args) {
  try {
    await this.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

Publication.statics.updatePublication = async function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await this.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
};

// require("dotenv").config(); // Configuring env variables
// mongoose.connect(process.env.DBURL)

module.exports = mongoose.model("Publication", Publication, "publications");
// const PublicationsModel = new mongoose.model(
//   "Publication",
//   Publication,
//   "publications"
// );

// const model = new PublicationsModel({
//   name: "Hello",
//   cover: "ni=o",
//   profileImg: "profoj"
// });
// model.save();
