const { Schema, model } = require("mongoose");
const visitorsCount = new Schema(
  {
    year: Number,
    month: Number,
    day: Number,
    visitorsCount: Number,
  },
  { timestamps: true }
);

console.log("visitor count schema is connected successfully...");
module.exports = Tutorial = new model("visitorCount", visitorsCount);
