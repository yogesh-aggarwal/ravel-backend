import mongoose from "mongoose";

const Schema = mongoose.Schema;

//& Schema
const User = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
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
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        thumbnail: { type: String, required: true },
        tags: { type: [String], required: true, default: [] },
        dateCreated: { type: Date, required: true, default: Date.now },
        dateUpdated: { type: Date, required: true, default: Date.now },
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
export const UserModel = mongoose.model("User", User, "users");

//& Methods
export async function createUser(_parent: any, { args }: any) {
  return await UserModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function deleteUser(_parent: any, { args }: any) {
  return await UserModel.deleteOne({ _id: args._id })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updateUser(_parent: any, { args }: any) {
  return await UserModel.findOneAndUpdate({ _id: args._id }, args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
