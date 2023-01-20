const express = require("express");
const router = express.Router();
const Documentation = require("../model/codeDocumentationSchema");

router.get("/:id", async (req, res, next) => {
  try {
    let documentation = await Documentation.findById({ _id: req.params.id });

    let views = documentation.views;
    views += 1;

    await Documentation.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { views } },
      { new: true }
    );
    res.status(200).json(documentation);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
