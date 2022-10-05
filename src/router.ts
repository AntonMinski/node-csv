const express = require("express");
const router = express.Router();

const { getProducts, postProductsToDb } = require("./controller/crud");
const writeProductsToCsv = require("./controller/writeToCsv");

router.get("/", getProducts);

router.post("/", postProductsToDb);

router.get("/write", writeProductsToCsv);

module.exports = router;