const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routes = require("./app/routes/employee.route");

dotenv.config({
  path: "./config.env",
});

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.PORT) {
    throw new Error("PORT must be defined");
  }

  const app = express();

  app.use(cors());

  app.use(bodyParser());

  app.use("/api/v1", routes);

  app.use("/", express.static("build"));

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("Mongo database connected !!");
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Services are running on port ${process.env.PORT}`);
  });
};

start();
