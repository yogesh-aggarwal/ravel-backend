import mongoose from "mongoose";

const Schema = mongoose.Schema;

//& Schema
const Merchandise = new Schema({
  _id: Schema.Types.ObjectId,
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
const MerchandiseModel = mongoose.model(
  "Merchandise",
  Merchandise,
  "merchandises"
);

//& Methods
async function createMerchandise(_parent: any, args: any) {
  try {
    args = args.args;
    args["_id"] = mongoose.Types.ObjectId();
    const newMerchandise = new MerchandiseModel(args);
    newMerchandise.save();
    return true;
  } catch {
    return false;
  }
}

async function deleteMerchandise(_parent: any, args: any) {
  try {
    await MerchandiseModel.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
}

async function updateMerchandise(_parent: any, args: any) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await MerchandiseModel.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  model: MerchandiseModel,
  createMerchandise: createMerchandise,
  deleteMerchandise: deleteMerchandise,
  updateMerchandise: updateMerchandise,
};
