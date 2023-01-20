const express = require("express");
const router = express.Router();
const Tutorial = require("../model/tutorialSchema");

router.get("/:id", async (req, res, next) => {
  try {
    let tutorial = await Tutorial.findById({ _id: req.params.id });

    let views = tutorial.views;
    views += 1;

    await Tutorial.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { views } },
      { new: true }
    );
    res.status(200).json(tutorial);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
