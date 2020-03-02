const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Product = require("../models/product");

// GET All Products
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "yeay"
  });
});

// TODO: GET Indidually
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("Success", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          code: 404,
          error: {
            message: "ID is not valid."
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        code: 500,
        error: err
      });
    });
});

// POST A Product
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);

      res.status(201).json({
        status: {
          code: 201,
          message: "Success added new product"
        },
        data: {
          product: product
        }
      });
    })
    .catch(err => console.log(err));
});

// TODO: PATCH
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
});

// TODO: DELETE
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
});

module.exports = router;
