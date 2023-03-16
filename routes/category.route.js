const express = require("express");

const router = express.Router()
const category = require("../controllers/category.controller.js");

router.get("/category", category.getAll);
router.get("/category/:id", category.getOne);
router.post("/category", category.create);
router.delete("/category/:id", category.delete);
router.put("/category/:id", category.update);

module.exports = router;


