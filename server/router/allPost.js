const express = require("express");
const router = express.Router();
const Blog = require("../model/blogSchema");
const Documentation = require("../model/codeDocumentationSchema");
const Tutorial = require("../model/tutorialSchema");

console.log("all post router is connected successfully...");
module.exports = router;
router.get("/blog", async (req, res, next) => {
  let blog = await Blog.find().select("title views");
  res.status(200).json(blog);
});
router.get("/tutorial", async (req, res, next) => {
  let tutorial = await Tutorial.find().select("title views");
  res.status(200).json(tutorial);
});
router.get("/documentation", async (req, res, next) => {
  let documentation = await Documentation.find().select("title views");
  res.status(200).json(documentation);
});
