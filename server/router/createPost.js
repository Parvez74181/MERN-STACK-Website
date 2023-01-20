const express = require("express");
const router = express.Router();
const Blog = require("../model/blogSchema");
const Documentation = require("../model/codeDocumentationSchema");
const Tutorial = require("../model/tutorialSchema");

// route for posting blogs
router.post("/blog", async (req, res, next) => {
  let { title, desc, thumbnail, tags, category } = req.body;
  // from the thumbnail url, getting the image id and change it
  thumbnail = `https://drive.google.com/uc?export=view&id=${
    thumbnail.split("/")[5]
  }`;
  try {
    let siNo = await Blog.find().countDocuments(); // counting total document
    siNo += 1; // increament siNo
    let blog = new Blog({
      thumbnail,
      title,
      desc,
      tags,
      category,
      views: 0,
      siNo,
    });
    await blog.save();
    return res.status(201).json({
      status: "Success",
      msg: "Post has been created",
    });
  } catch (error) {
    next();
  }
});

// route for posting documentation
router.post("/documentation", async (req, res, next) => {
  let { title, desc, tags, category } = req.body;
  try {
    // save data into the reference document
    let siNo = await Documentation.find().countDocuments(); // counting total document
    siNo += 1; // increament siNo
    let reference = new Documentation({
      title,
      desc,
      tags,
      category,
      views: 0,
      siNo,
    });
    await reference.save();

    return res.status(201).json({
      status: "Success",
      msg: "Documentation has been created",
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

// route for posting tutorial
router.post("/tutorial", async (req, res, next) => {
  let { title, desc, tags, category, tutorialSection } = req.body;
  try {
    // save data into the reference document
    let siNo = await Tutorial.find().countDocuments(); // counting total document
    siNo += 1; // increament siNo
    let tutorial = new Tutorial({
      title,
      desc,
      tags,
      category,
      views: 0,
      siNo,
      tutorialSection,
    });
    await tutorial.save();

    return res.status(201).json({
      status: "Success",
      msg: "Tutorial has been created",
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

console.log("create router is connected successfully...");
module.exports = router;
