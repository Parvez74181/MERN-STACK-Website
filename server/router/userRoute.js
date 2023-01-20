const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const userAuth = require("../middleware/auth");

const Blog = require("../model/blogSchema");
const Documentation = require("../model/codeDocumentationSchema");
const Tutorial = require("../model/tutorialSchema");

const User = require("../model/userSchema");

const signUpValidator = [
  // userName Check
  body("userName")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username Must Be Between 2 to 15 Charecter")
    .trim(),

  // Phone Check
  body("phone")
    .isNumeric()
    .withMessage("Please Provide a Valid Number")
    .isLength({ min: 10, max: 12 })
    .withMessage("Please Provide a Valid Number")
    .custom(async (phone) => {
      const userPhone = await User.findOne({ phone });
      if (userPhone) {
        return Promise.reject("Phone Is Already In Use");
      }
      return true;
    }),

  // Email Check
  body("email")
    .isEmail()
    .withMessage("Please Provide A Valid Email")
    .trim()
    .custom(async (email) => {
      const userEmail = await User.findOne({ email }).select("email");
      if (userEmail) {
        return Promise.reject("Email Is Already In Use");
      }
      return true;
    }),

  // Password Check
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password Must Be Greater Than 8 Charecter"),

  // confirmPassword Check
  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("Password Must Be Greater Than 8 Charecter")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password Does Not Matched");
      }
      return true;
    }),
];

// sign in
router.post("/sign-in", async (req, res, next) => {
  try {
    const { email, password, remember } = req.body;
    let user = await User.findOne({ email }); // find user

    // if user exist
    if (user) {
      let confirmedPassword = bcrypt.compareSync(password, user.password); // comparing the user input password and hashed password from the DB

      // if bcrypt return true then send a response to user
      if (confirmedPassword) {
        const token = await user.generateAuthToken(); // getting the token from the User model

        //    generate a new cookie
        res.cookie("jwt", token, {
          expires:
            remember === true
              ? new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000) // 3months
              : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1day
          httpOnly: true,
        });

        return res
          .status(200)
          .json({ status: "Success", message: "Login Successfull", token });
      }
    } else {
      return res.status(400).json({ msg: "Invalid details!" });
    }
  } catch (e) {
    console.log(e);
    next();
  }
});

// register
router.post("/register", signUpValidator, async (req, res, next) => {
  const errors = validationResult(req);

  //   if errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { userName, email, phone, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds); // password hashing
    let user = new User({
      userName,
      phone,
      email,
      password: hashedPassword,
    });
    const token = await user.generateAuthToken();
    await user.save();

    return res
      .status(201)
      .json({ status: "Seccess", msg: "User Registration Successfull" });
  } catch (e) {
    console.log(e);
    next();
  }
});

// user logout
router.post("/logout", userAuth, async (req, res, next) => {
  try {
    // deleting token from the database
    req.user.tokens = [];

    res.clearCookie("jwt"); //clear the cookie from the website
    await req.user.save(); // after deleting the token, update the database
    return res.status(200).json("ok");
  } catch (e) {
    console.log(e);
  }
});

// to show all users in the dashboard
router.get("/allUsers", async (req, res, next) => {
  try {
    let users = await User.find();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
});

console.log("user router is connected successfully...");
module.exports = router;
