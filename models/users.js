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
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    isSuspended: {
      type: Boolean,
      required: true
    },
    socialLinks: {
      type: [String],
      required: true
    },
    memberOf: {
      type: [String],
      required: true
    },
    posts: {
      type: [String],
      required: true
    },
    stories: {
      type: [String],
      required: true
    },
    followers: {
      type: [String],
      required: true
    },
    following: {
      type: [String],
      required: true
    },
    stats: {
      reach: { type: Number, required: true },
      appreciations: { type: Number, required: true }
    },
    merchandise: {
      type: [String],
      required: true
    }
  }
});

// Statics
User.statics.createUser = function (args) {
  try {
    // TODO: Implement here
  } catch {
    return false;
  }
};

User.statics.getUser = function(args) {
  try {
    return this.findById({ _id: args.args._id });
  } catch {
    return false;
  }
};

User.statics.deleteUser = function(args) {
  try {
    this.deleteById({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

User.statics.updateUser = function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    this.findOneAndUpdate({ _id: _id }, args.args);
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("User", User, "users");
