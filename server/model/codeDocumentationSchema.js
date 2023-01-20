const { Schema, model } = require("mongoose");
const codeDocumentationSchema = new Schema(
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
    category: [String],
    tags: [String],
    views: Number || 0,
    siNo: Number,
  },
  { timestamps: true }
);

console.log("code documentation schema is connected successfully...");

module.exports = Documentation = new model(
  "documentation",
  codeDocumentationSchema
);
