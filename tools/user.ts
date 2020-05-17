import { getPost } from "../models/posts";
import { getUser } from "../models/users";

export async function getUserRecommendations({ args }: any) {
  const newPosts = ["5ec114893ca0c626345dadc2"]; // TODO: Get them from database of args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push(await getPost(null, { args: { _id: newPost } }));
  }
  return result;
}

export async function getFeaturedUser(args: any) {
  const user = await getUser(null, args, {});
  // user.data.posts.posts = user.data.posts.posts.slice(0, 3);
  // console.log(user.data.posts.posts);
  return user;
}
