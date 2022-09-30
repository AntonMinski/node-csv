const express = require("express");
const router = express.Router();

const { getProducts, postProductsToDb, writeProductsToCsv } = require("./controller");

router.get("/", getProducts);

router.post("/", postProductsToDb);

router.get("/write", writeProductsToCsv);

module.exports = router;