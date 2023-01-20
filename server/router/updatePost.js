const express = require("express");
const router = express.Router();
const Blog = require("../model/blogSchema");
const Documentation = require("../model/codeDocumentationSchema");
const Tutorial = require("../model/tutorialSchema");

// blog update route
router.post("/:id/blog", async (req, res, next) => {
  let { title, desc, thumbnail, tags, category } = req.body;
  let _id = req.params.id;
  await Blog.findByIdAndUpdate(
    { _id },
    {
      $set: { title, desc, thumbnail, tags, category },
    }
  );

  res.status(200).json("Ok");
});

// tutorial update route
router.post("/:id/tutorial", async (req, res, next) => {
  let { title, desc, tags, category } = req.body;
  let _id = req.params.id;

  await Tutorial.findByIdAndUpdate(
    { _id },
    {
      $set: { title, desc, tags, category },
    }
  );

  res.status(200).json("Ok");
}); // documentation update route
router.post("/:id/documentation", async (req, res, next) => {
  let { title, desc, tags, category } = req.body;
  let _id = req.params.id;

  await Documentation.findByIdAndUpdate(
    { _id },
    {
      $set: { title, desc, tags, category },
    }
  );

  res.status(200).json("Ok");
});

console.log("update router is connected successfully...");
module.exports = router;
