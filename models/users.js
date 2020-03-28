const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = Schema({
  _id: Schema.Types.ObjectId,
  history: { type: [String], required: true },
  saved: { type: [String], required: true },
  data: {
    uname: {
      type: String,
      required: true
    },
    pword: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    profileImg: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" // TODO: Change it on the basis of gender
    },
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: false,
      default: ""
    },
    isSuspended: {
      type: Boolean,
      required: true,
      default: false
    },
    socialLinks: {
      type: [String],
      required: true,
      default: []
    },
    memberOf: {
      type: [String],
      required: true,
      default: []
    },
    posts: {
      categories: {
        type: [String],
        required: true,
        default: []
      },
      posts: {
        type: [[String]],
        required: true,
        default: []
      }
    },
    stories: {
      type: [String],
      required: true,
      default: []
    },
    followers: {
      type: [String],
      required: true,
      default: []
    },
    following: {
      type: [String],
      required: true,
      default: []
    },
    stats: {
      reach: { type: Number, required: true, default: 0 },
      appreciations: { type: Number, required: true, default: 0 }
    },
    merchandise: {
      type: [String],
      required: true,
      default: []
    },
    joinDate: { type: Date, required: true, default: Date.now }
  }
});

// Statics
User.statics.createUser = async function(args) {
  try {
    const newUser = new this({
      _id: mongoose.Types.ObjectId(),
      data: args.args
    });
    newUser.save();
    return true;
  } catch {
    return false;
  }
};

User.statics.getUser = async function(args) {
  try {
    return (await this.find({ _id: args.args._id }))[0];
  } catch {
    return false;
  }
};

User.statics.deleteUser = async function(args) {
  try {
    await this.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

User.statics.updateUser = async function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await this.findOneAndUpdate({ _id: _id }, args.args);
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("User", User, "users");
