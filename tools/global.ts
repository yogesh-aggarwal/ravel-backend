import { getPost } from "../models/posts";

export async function getNewRavels(_parent: any, { args }: any) {
  const newPosts = [
    "5e7f3017e20f723590c45638",
    "5e7f3018e20f723590c45639",
    "5e7f3018e20f723590c4563a",
    "5e7f3019e20f723590c4563b",
  ]; // TODO: Get them from database of args.quantity

  let result = [];
  for (let newPost of newPosts) {
    result.push(await getPost(null, { args: { _id: newPost } }));
  }
  return result;
}
