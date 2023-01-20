const multer = require("multer");
const path = require("path");
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../server/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
console.log("multer is connected successfully...");
module.exports = upload = multer({ storage });
