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
    coverImg: {
      type: String,
      required: true,
      default:
        "https://lh3.googleusercontent.com/proxy/LIMc5xaVHsGBtyZ-VzDHUyPq4sKWkjxg_DTGh42uUH6ImdfwGO_RaRqT6PWUauIcBP1kiwqw0Uidpqfu3cY8daJ1td_MMLV49-gTtHED8fO_sfM32TcPT-1HRPfvViXtjyk"
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
      categories: [
        {
          name: {
            type: String,
            required: true
          },
          posts: {
            type: [String],
            required: true
          }
        }
      ],
      posts: {
        type: [String],
        required: true,
        default: []
      },
      featuredPosts: {
        type: [String],
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

//& Model
const UserModel = mongoose.model("User", User, "users");

//& Methods
async function createUser(_parent, args) {
  try {
    const newUser = new UserModel({
      _id: mongoose.Types.ObjectId(),
      data: args.args
    });
    newUser.save();
    return true;
  } catch {
    return false;
  }
}

async function getUser(_parent, args) {
  try {
    const user = (await UserModel.find({ _id: args.args._id }))[0];
    const userPosts = user.data.posts;

    //& Parse: "posts.posts"
    posts = [];
    for (let post of userPosts.posts) {
      posts.push(await PostModel.findById(post));
    }

    //& Parse: "posts.featuredPosts"
    featuredPosts = [];
    for (let featuredPost of userPosts.featuredPosts) {
      featuredPosts.push(await PostModel.findById(featuredPost));
    }

    //& Parse: "posts.categories"
    let categories = [];
    for (let category of userPosts.categories) {
      let categoryPosts = [];
      for (post of category.posts) {
        categoryPosts.push(await PostModel.findById(post));
      }
      categories.push({ name: category.name, posts: categoryPosts });
    }

    //& Parse: "memberOf"
    let memberOf = [];
    for (let member of user.data.memberOf) {
      memberOf.push(await PublicationModel.findById(member));
    }

    //& Parse: "story"
    let stories = [];
    for (let story of user.data.stories) {
      stories.push(await StoryModel.findById(story));
    }

    //& Parse: "followers"
    let followers = [];
    for (let follower of user.data.followers) {
      followers.push(await UserModel.findById(follower));
    }

    //& Parse: "followings"
    let followings = [];
    for (let following of user.data.following) {
      followings.push(await UserModel.findById(following));
    }

    //& Parse: "merchandise"
    let merchandises = [];
    for (let merchandise of user.data.merchandise) {
      merchandises.push(await UserModel.findById(merchandise));
    }

    const data = {
      ...user.data,
      data: {
        memberOf: memberOf
      },
      posts: {
        posts: posts,
        categories: categories,
        featuredPosts: featuredPosts
      },
      memberOf: memberOf,
      stories: stories,
      followers: followers,
      following: followings,
      merchandises: merchandises
    };

    let newUser = {
      _id: user._id,
      data: data,
      history: user.history,
      saved: user.saved
    };

    return newUser;
  } catch (err) {
    throw err;
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
  getUser: getUser,
  deleteUser: deleteUser,
  updateUser: updateUser
};
