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

Merchandise.statics.getMerchandise = function(args) {
  try {
    return this.findById({ _id: args.args._id });
  } catch {
    return false;
  }
};

Merchandise.statics.deleteMerchandise = function(args) {
  try {
    this.deleteById({ _id: args.args._id });
    return true;
  } catch {
    return false;
  }
};

Merchandise.statics.updateMerchandise = function(args) {
  try {
    const _id = args.args._id;
    delete args.args._id;
    this.findOneAndUpdate({ _id: _id }, args.args);
    return true;
  } catch {
    return false;
  }
};

module.exports = mongoose.model("Merchandise", Merchandise, "merchandises");
