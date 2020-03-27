const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Merchandise = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  picture: { type: [String], required: true },
  price: {
    type: Number,
    required: true
  }
});

// Statics
Merchandise.statics.createMerchandise = function (args) {
  try {
    // TODO: Implement here
  } catch {
    return false;
  }
};

Merchandise.statics.getMerchandise = async function(args) {
  try {
    return (await this.find({ _id: args.args._id }))[0];
  } catch {
    return false;
  }
};

Merchandise.statics.deleteMerchandise = async function(args) {
  try {
    await this.deleteOne({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

Merchandise.statics.updateMerchandise = async function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    await this.findByIdAndUpdate({ _id: _id }, args.args, () => {});
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("Merchandise", Merchandise, "merchandises");
