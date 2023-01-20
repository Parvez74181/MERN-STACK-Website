require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("mongoose database is connected successfully...");
  })
  .catch((err) => {
    console.log(err);
  });
  
 
 