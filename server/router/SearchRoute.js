const express = require("express");
const router = express.Router();
const Blog = require("../model/blogSchema");
const Documentation = require("../model/codeDocumentationSchema");
const Tutorial = require("../model/tutorialSchema");

// for searching data
router.get("/:path", async (req, res, next) => {
  // this query is for search
  let key = req.query.search;
  try {
    // if user search from the blog path then show just blogs query results
    if (req.params.path === "blog") {
      let blog = await Blog.find({
        $or: [
          { title: { $regex: key, $options: "i" } },
          { desc: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
          { tags: { $regex: key, $options: "i" } },
        ],
      });
      if (blog) return res.status(200).json(blog);
    }

    // if user search from the documentation path then show just documentations query results
    if (req.params.path === "documentation") {
      let documentation = await Documentation.find({
        $or: [
          { title: { $regex: key, $options: "i" } },
          { desc: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
          { tags: { $regex: key, $options: "i" } },
        ],
      });
      if (documentation) return res.status(200).json(documentation);
    }

    // if user search from the documentation path then show just documentations query results
    if (req.params.path === "tutorial") {
      let tutorial = await Tutorial.find({
        $or: [
          { title: { $regex: key, $options: "i" } },
          { desc: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
          { tags: { $regex: key, $options: "i" } },
        ],
      });
      if (tutorial) return res.status(200).json(tutorial);
    }

    // rest of the path goes to here
    else {
      let blog = await Blog.find({
        $or: [
          { title: { $regex: key, $options: "i" } },
          { desc: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
          { tags: { $regex: key, $options: "i" } },
        ],
      });

      let tutorial = await Tutorial.find({
        $or: [
          { title: { $regex: key, $options: "i" } },
          { desc: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
          { tags: { $regex: key, $options: "i" } },
        ],
      });

      let documentation = await Documentation.find({
        $or: [
          { title: { $regex: key, $options: "i" } },
          { desc: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
          { tags: { $regex: key, $options: "i" } },
        ],
      });

      // let data = [];
      // blog.forEach((blog) => data.push(blog));
      // tutorial.forEach((blog) => data.push(blog));
      // documentation.forEach((blog) => data.push(blog));

      res.status(200).json({ blog, tutorial, documentation });
    }
  } catch (e) {
    console.log(e);
  }
});

console.log("search router is connected successfully...");
module.exports = router;
