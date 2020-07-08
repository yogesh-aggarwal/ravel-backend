import { TrendingModel } from "../models/trending";
import { getPost } from "../models/posts";
import { getUser } from "../models/users";
import { parseResolveInfo, FieldsByTypeName } from "graphql-parse-resolve-info";

export async function getTrending(
  _parent: any,
  args: any,
  context: any,
  info: any
) {
  const fieldInfo = parseResolveInfo(info);
  if (fieldInfo == null) {
    return null;
  }

  const fields = fieldInfo.fieldsByTypeName["Trending"];

  console.log(
    "===================================================================="
  );
  console.log(fields);
  console.log(
    "===================================================================="
  );
  let trending = (
    await TrendingModel.find().limit(1).sort({ $natural: -1 })
  )[0].toObject();

  //& Parse: "trending.categories"
  let categories = [];
  for (let category of trending.categories) {
    let categoryPosts = [];
    for (let post of category.posts) {
      categoryPosts.push(await getPost(null, { args: { _id: post } }));
    }
    categories.push({
      name: category.name,
      posts: categoryPosts,
    });
  }
  trending.categories = categories;

  //& Parse "trending.creators"
  let creators = [];
  for (let creator of trending.creators) {
    creators.push(await getUser(null, { args: { _id: creator } }, {}));
  }
  trending.creators = creators;

  return trending;
}
