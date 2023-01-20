const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./db/DB");
const createPost = require("./router/createPost");
const userRoute = require("./router/userRoute");
const allPost = require("./router/allPost");
const searchPost = require("./router/SearchRoute");
const updatePost = require("./router/updatePost");
const deletePost = require("./router/deletePost");
const editPost = require("./router/editPost");
const basicRouter = require("./router/basicRouter");
const singleBlogPost = require("./router/singleBlogPost");
const singleDocumentationPost = require("./router/singleDocumentationPost");
const SingleTutorialSectionPage = require("./router/singleTutorialSectionPost");

const port = process.env.PORT || 3001;

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// routes
app.use(basicRouter);
app.use("/user", userRoute);
app.use("/create", createPost);
app.use("/search", searchPost);
app.use("/all", allPost);
app.use("/update", updatePost);
app.use("/delete", deletePost);
app.use("/edit", editPost);
app.use("/single-blog-page", singleBlogPost);
app.use("/single-documentation-page", singleDocumentationPost);
app.use("/single-tutorial-section-page", SingleTutorialSectionPage);

app.listen(port, () => {
  console.log("server is running...");
});
