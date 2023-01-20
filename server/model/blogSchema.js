const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
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
    category: [String],
    tags: [String],

    views: Number,
    siNo: Number,
  },
  { timestamps: true }
);

console.log("post schema is connected successfully...");

module.exports = Blog = new model("blog", blogSchema);
