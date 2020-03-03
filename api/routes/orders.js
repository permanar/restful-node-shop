const express = require("express");
const mongoose = require("mongoose");

const Order = require("../models/order");

const router = express.Router();

router.get("/", (req, res) => {
  Order.find()
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Order.findById(id)
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          code: 404,
          error: {
            message: "Order not found."
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    id_product: req.body.id_product,
    quantity: req.body.quantity
  });
  const timestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  order
    .save()
    .then(result => {
      res.status(201).json({
        code: 201,
        status: "success",
        data: {
          message: "Order was successfully made",
          timestamp: timestamp,
          result: result
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:id", (req, res) => {
  res.status(200).json({});
});

router.delete("/:id", (req, res) => {
  res.status(200).json({});
});

module.exports = router;
