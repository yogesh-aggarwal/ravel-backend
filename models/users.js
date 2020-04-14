const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Publication = require("./publications");
const Post = require("./posts");
const Story = require("./story");
const Merchandise = require("./merchandises");

//& Models
PostModel = Post.model;
PublicationModel = Publication.model;
StoryModel = Story.model;
MerchandiseModel = Merchandise.model;

//& Schema
const User = Schema({
  _id: Schema.Types.ObjectId,
  history: { type: [String], required: true },
  saved: { type: [String], required: true },
  data: {
    uname: {
      type: String,
      required: true,
    },
    pword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
      default:
        "https://i.pinimg.com/originals/60/2a/19/602a19543fde7f6c77421cbbfd82c147.jpg",
    },
    profileImg: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ", // TODO: Change it on the basis of gender
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
      default: "",
    },
    isSuspended: {
      type: Boolean,
      required: true,
      default: false,
    },
    socialLinks: {
      type: [String],
      required: true,
      default: [],
    },
    memberOf: {
      type: [String],
      required: true,
      default: [],
    },
    posts: {
      categories: [
        {
          name: {
            type: String,
            required: true,
          },
          posts: {
            type: [String],
            required: true,
          },
        },
      ],
      posts: {
        type: [String],
        required: true,
        default: [],
      },
      featuredPosts: {
        type: [String],
        required: true,
        default: [],
      },
    },
    collections: {
      type: {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        posts: {
          type: [String],
          required: true,
        },
      },
      required: true,
      default: [],
    },
    stories: {
      type: [String],
      required: true,
      default: [],
    },
    followers: {
      type: [String],
      required: true,
      default: [],
    },
    following: {
      type: [String],
      required: true,
      default: [],
    },
    stats: {
      reach: { type: Number, required: true, default: 0 },
      appreciations: { type: Number, required: true, default: 0 },
    },
    merchandise: {
      type: [String],
      required: true,
      default: [],
    },
    joinDate: { type: Date, required: true, default: Date.now },
  },
});

//& Model
const UserModel = mongoose.model("User", User, "users");

//& Methods
async function createUser(_parent, args) {
  try {
    const newUser = new UserModel({
      _id: mongoose.Types.ObjectId(),
      data: args.args,
    });
    newUser.save();
    return true;
  } catch {
    return false;
  }
}

async function deleteUser(_parent, args) {
  try {
    await UserModel.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
}

async function updateUser(_parent, args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await UserPostModel.findOneAndUpdate({ _id: _id }, args.args);
    return true;
  } catch {
    return false;
  }
}

// createUser(null, {
//   args: {
//     uname: "john-doe",
//     name: "John Doe",
//     pword: "theplainpass",
//     email: "johndoe@email.com",
//     gender: "M",
//     bio: "I am John Doe"
//   }
// });

module.exports = {
  model: UserModel,
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
