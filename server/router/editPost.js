const express = require("express");
const router = express.Router();
const Blog = require("../model/blogSchema");
const Documentation = require("../model/codeDocumentationSchema");
const Tutorial = require("../model/tutorialSchema");

router.get("/blog/:id", async (req, res, next) => {
  let _id = req.params.id;
  let blog = await Blog.findById(_id);
  res.status(200).json(blog);
});

router.get("/tutorial/:id", async (req, res, next) => {
  let _id = req.params.id;
  let tutorial = await Tutorial.findById(_id);
  res.status(200).json(tutorial);
});

router.get("/documentation/:id", async (req, res, next) => {
  let _id = req.params.id;
  let documentation = await Documentation.findById(_id);
  res.status(200).json(documentation);
});

console.log("post edit router is connected successfully...");
module.exports = router;
