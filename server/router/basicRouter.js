const express = require("express");
const router = express.Router();
const Blog = require("../model/blogSchema");
const Documentation = require("../model/codeDocumentationSchema");
const Tutorial = require("../model/tutorialSchema");
const VisitorCount = require("../model/visitorsCountSchema");

// for visitors count
router.get("/visitorCount", async (req, res, next) => {
  try {
    let visitors = await VisitorCount.find();
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    if (visitors.length > 0) {
      visitors.forEach(async (visitor) => {
        if (
          visitor.day === day &&
          visitor.year === year &&
          visitor.month === month
        ) {
          let count = visitor.visitorsCount;
          count++;
          await VisitorCount.findOneAndUpdate(
            { year },
            { $set: { visitorsCount: count } }
          );
        }
      });
    } else {
      let visitorCount = new VisitorCount({
        year,
        month,
        day,
        visitorsCount: 1,
      });
      await visitorCount.save();
    }

    return res.status(200).json("ok");
  } catch (e) {
    console.log(e);
    next();
  }
});

// for blog section where all blogs will show
router.get("/blog", async (req, res, next) => {
  try {
    // this query is for normal and InfinityScrolling perpouse

    let currentPage = parseInt(req.query.page) || 1;
    let itemPerPage = 9; // how many post I wanted to show
    let highestRequest = Math.ceil((await Blog.find().count()) / itemPerPage); // counting the highestRequest for how many calls needed to get the all data

    // if currentPage > highestRequest then return
    if (currentPage > highestRequest)
      return res.status(200).json({ completed: "All Content Has Been loaded" });

    let blog = await Blog.find()
      .sort({ _id: -1 }) // SORT data on the basis of new to old
      .limit(itemPerPage * currentPage); // showing limited post

    if (blog) return res.status(200).json(blog);
  } catch (e) {
    console.log(e);
    next();
  }
});

// for category box to show the category based on different section like createTutorial section category, createBlog section category etc.
router.get("/category/:component", async (req, res, next) => {
  let component = req.params.component;
  try {
    if (component === "blog") {
      let category = await Blog.find().select("category");

      res.status(200).json({ category });
    }
    if (component === "tutorial") {
      let category = await Tutorial.find().select("category");
      console.log(category.length);
      res.status(200).json({ category });
    }
    if (component === "tutorialSection") {
      let category = await Tutorial.find().select("tutorialSection");
      res.status(200).json({ category });
    }
    if (component === "documentation") {
      let category = await Documentation.find().select("category");
      console.log(category.length);
      res.status(200).json({ category });
    }
  } catch (error) {
    console.log(error);
    next();
  }
});

// for documentation section where all documentations will show
router.get("/documentation", async (req, res, next) => {
  try {
    let currentPage = parseInt(req.query.page) || 1;
    let itemPerPage = 9; // how many post I wanted to show

    let highestRequest = Math.ceil(
      (await Documentation.find().count()) / itemPerPage
    ); // counting the highestRequest for how many calls needed to get the all data

    // if currentPage > highestRequest then return
    if (currentPage > highestRequest)
      return res.status(200).json({ completed: "All Content Has Been loaded" });

    let documentation = await Documentation.find()
      .sort({ _id: -1 }) //sorting the post from new to old
      .limit(itemPerPage * currentPage); // showing limited post

    if (documentation) return res.status(200).json({ documentation });
  } catch (e) {
    console.log(e);
    next();
  }
});

// basis on different category, this will work for each and every category is clicked
router.get("/tutorials/:data", async (req, res, next) => {
  let tutorialSection = req.params.data;
  try {
    let currentPage = parseInt(req.query.page) || 1;
    let itemPerPage = 9; // how many post I wanted to show

    let highestRequest = Math.ceil(
      (await Tutorial.find().count()) / itemPerPage
    ); // counting the highestRequest for how many calls needed to get the all data

    // if currentPage > highestRequest then return
    if (currentPage > highestRequest)
      return res.status(200).json({ completed: "All Content Has Been loaded" });

    let tutorial = await Tutorial.find({ tutorialSection })
      .sort({ _id: -1 }) //sorting the post from new to old
      .limit(itemPerPage * currentPage); // showing limited post

    if (tutorial) return res.status(200).json(tutorial);
  } catch (e) {
    console.log(e);
    next();
  }
});

// for tutorial section where all tutorial will show
// router.get("/tutorials", async (req, res, next) => {
//   try {
//     if (!req.query.search) {
//       let tutorial = await Tutorial.find();
//       res.status(200).json(tutorial);
//     }
//     // this query is for search
//     if (req.query.search) {
//       let key = req.query.search;
//       let tutorial = await Tutorial.find({
//         $or: [
//           { title: { $regex: key, $options: "i" } },
//           { desc: { $regex: key, $options: "i" } },
//           { category: { $regex: key, $options: "i" } },
//           { tags: { $regex: key, $options: "i" } },
//         ],
//       });
//       res.status(200).json(tutorial);
//     }
//   } catch (e) {
//     console.log(e);
//     next();
//   }
// });

// for admin or user dashboard

router.get("/backend", async (req, res, next) => {});

// for analysis section
router.get("/analysis", async (req, res, next) => {
  let visitors = await VisitorCount.find();
  res.status(200).json(visitors);
});

// for goto next post
router.get("/:id/next/:component", async (req, res, next) => {
  try {
    const { id, component } = req.params;
    if (component === "blog") {
      const currentPost = await Blog.findById(req.params.id);
      const nextPost = await Blog.find({ _id: { $lt: currentPost._id } })
        .sort({ _id: -1 })
        .limit(1)
        .select("_id title");
      return res.status(200).json(nextPost[0]);
    }
  } catch (e) {
    console.log(e);
    next();
  }
});

// for goto prefvious page
router.get("/:id/previous/:component", async (req, res, next) => {
  try {
    const { id, component } = req.params;
    if (component === "blog") {
      const currentPost = await Blog.findById(req.params.id);
      const prevPost = await Blog.find({ _id: { $gt: currentPost._id } })
        .sort({ _id: 1 })
        .limit(1)
        .select("_id title");
      return res.status(200).json(prevPost[0]);
    }
  } catch (e) {
    console.log(e);
    next();
  }
});

console.log("basic router is connected successfully...");
module.exports = router;
