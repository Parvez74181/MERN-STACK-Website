const { Schema, model } = require("mongoose");
const tutorialSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    desc: {
      type: String,
      require: true,
    },
    authore: {
      type: String,
      default: "Admin",
    },
    tutorialSection: {
      type: String,
      require: true,
    },
    category: [String],
    tags: [String],
    views: Number || 0,
    siNo: Number,
  },
  { timestamps: true }
);

console.log("code tutorial schema is connected successfully...");

module.exports = Tutorial = new model("tutorial", tutorialSchema);
