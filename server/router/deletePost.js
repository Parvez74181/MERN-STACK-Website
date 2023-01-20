const express = require("express");
const router = express.Router();
const Blog = require("../model/blogSchema");
const Documentation = require("../model/codeDocumentationSchema");
const Tutorial = require("../model/tutorialSchema");

// blog delete route
router.delete("/blog/:id", async (req, res, next) => {
  let _id = req.params.id;
  await Blog.findByIdAndDelete(_id);
  res.status(202).json("Delete Successfull");
});

// tutorial delete route
router.delete("/tutorial/:id", async (req, res, next) => {
  let _id = req.params.id;
  await Tutorial.findByIdAndDelete(_id);
  res.status(202).json("Delete Successfull");
});

// documentation delete route
router.delete("/documentation/:id", async (req, res, next) => {
  let _id = req.params.id;
  await Documentation.findByIdAndDelete(_id);
  res.status(202).json("Delete Successfull");
});

console.log("post delete router is connected successfully...");
module.exports = router;
