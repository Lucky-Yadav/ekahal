const express = require("express");
// const session = require("express-session");
const app = express();
const PORT = 3072;
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library");
const mongoose = require("mongoose");
const taskRouter = require("./routes/crudRoutes");
// const dotenv = require("dotenv");

app.use(express.json());
app.use(cors());
// dotenv.config();
app.use("/tasks", taskRouter);
app.get("/", (req, res) => {
  console.log(res);
  res.send("success");
});

mongoose
  .connect(
    // `${process.env.MongoDb_String}`
    "mongodb+srv://luckyyadav8627:c9DZjW2L2bNC5I9Q@cluster0.jxj9tsp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
