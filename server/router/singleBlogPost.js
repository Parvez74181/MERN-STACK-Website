const express = require("express");
const router = express.Router();
const Blog = require("../model/blogSchema");

router.get("/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findById({ _id: req.params.id });
    let views = blog.views;
    views += 1;
    await Blog.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { views } },
      { new: true }
    );
    res.status(200).json(blog);
  } catch (e) {
    console.log(e);
    next();
  }
});

router.get("/previous-next-button/:siNo", async (req, res, next) => {
  try {
    let { siNo } = req.params;
    /* 
  for the previous button
  decreasing siNo and find the data from the database
  *** previous button means next button cause we are getting the blogs in the sort type of 'z to a' ***
  */
    let previousButton = await Blog.find({ siNo: parseInt(siNo) + 1 });
    /* 
  for the previous button
  increasing siNo and find the data from the database
    *** next button means previous button cause we are getting the blogs in the sort type of 'z to a' ***
  */
    let nextButton = await Blog.find({ siNo: parseInt(siNo) - 1 });
    res.status(200).json({ previousButton, nextButton });
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
