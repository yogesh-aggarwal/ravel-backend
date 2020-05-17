import { ExploreModel } from "../models/explore";
import { getPublication } from "../models/publications";
import { getUser } from "../models/users";
import { getPost } from "../models/posts";

export async function getExplore() {
  let explore = (
    await ExploreModel.find().limit(1).sort({ $natural: -1 })
  )[0].toObject();

  //& Parse: "Explore.publications"
  let publications = [];
  for (let publication of explore.publications) {
    publications.push(
      await getPublication(null, { args: { _id: publication } })
    );
  }
  explore.publications = publications;

  //& Parse: "Explore.creators"
  let creators = [];
  for (let creator of explore.creators) {
    creators.push(await getUser(null, { args: { _id: creator } }, {}));
  }
  explore.creators = creators;

  //& Parse: "Explore.posts"
  let posts = [];
  for (let post of explore.posts) {
    posts.push(await getPost(null, { args: { _id: post } }));
  }
  explore.posts = posts;

  return explore;
}
