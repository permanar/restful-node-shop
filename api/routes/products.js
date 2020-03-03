const express = require("express");
const mongoose = require("mongoose");

const Product = require("../models/product");

const router = express.Router();

// GET All Products
router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => console.log(err));
});

// GET Indidually
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
            message: "Product is not exist."
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

// PATCH
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// DELETE
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({ result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
