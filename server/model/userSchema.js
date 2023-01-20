const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
// const Profile = require("./profile");

//create User Schema
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//generate token
UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_SEKRET_KEY
    );

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
  } catch (error) {
    console.log(error);
  }
};

console.log("user schema is connected successfully...");

module.exports = User = new model("User", UserSchema);
