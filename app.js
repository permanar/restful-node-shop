const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productsRoute = require("./api/routes/products");
const ordersRoute = require("./api/routes/orders");

const app = express();
dotenv.config();

const uri =
  "mongodb+srv://gw:" +
  process.env.MONGO_PW +
  "@cluster0-wagxd.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Logger middleware
app.use(logger("dev"));

// Init body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.send(200).json({});
  }
  next();
});

// Routes
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);

// Handling invalid endpoint
app.use((req, res, next) => {
  const error = Error("Invalid endpoint!");
  error.status = 404;
  next(error); // Passing error as an argument and going next() handler
});
app.use((err, req, res, next) => {
  // res.setHeader("Content-Type", "text/plain");
  res.status(err.status || 500);
  res.json({
    error: {
      code: err.status,
      message: err.message
    }
  });
  res.end();
});

module.exports = app;
