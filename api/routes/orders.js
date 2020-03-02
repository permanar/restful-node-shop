const express = require("express");
const router = express.Router();

router.post("/", function(req, res) {
  res.send("POST request to the homepage");
});

module.exports = router;
