import mongoose from "mongoose";

const Schema = mongoose.Schema;

//& Schema
const Merchandise = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
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
export const MerchandiseModel = mongoose.model(
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
  return await MerchandiseModel.deleteOne({ _id: args._id })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export async function updateMerchandise(_parent: any, { args }: any) {
  return await MerchandiseModel.findByIdAndUpdate(
    { _id: args._id },
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
