const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/Spotify";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
