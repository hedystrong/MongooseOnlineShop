const express = require("express");

const router = express.Router()
const product = require("../controllers/product.controller.js");

router.get("/product", product.getAll);
router.get("/product/:id", product.getOne);
router.post("/product", product.create);
router.delete("/product/:id", product.delete);
router.put("/product/:id", product.update);

module.exports = router;