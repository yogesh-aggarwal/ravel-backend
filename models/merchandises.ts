import { Schema, Types, model } from "mongoose";

//& Schema
const Merchandise = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  pictures: { type: [String], required: true },
  price: {
    type: Number,
    required: true,
  },
  dateAdded: { type: Date, required: true, default: Date.now },
  dateUpdated: { type: Date, required: true, default: Date.now },
});

//& Model
export const MerchandiseModel = model(
  "Merchandise",
  Merchandise,
  "merchandises"
);

//& Methods
export async function createMerchandise(_parent: any, { args }: any) {
  return await MerchandiseModel.create(args)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function deleteMerchandise(_parent: any, { args }: any) {
  return await MerchandiseModel.deleteOne({ _id: Types.ObjectId(args._id) })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updateMerchandise(_parent: any, { args }: any) {
  return await MerchandiseModel.updateOne(
    { _id: Types.ObjectId(args._id) },
    args,
    () => {}
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function getMerchandise(_parent: any, { args }: any) {
  return (
    await MerchandiseModel.findOne({ _id: Types.ObjectId(args._id) })
  )?.toObject();
}
