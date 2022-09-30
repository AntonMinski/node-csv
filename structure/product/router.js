const express = require("express");

const { getProducts, postProductsToDb, writeProductsToCsv } = require("./controller");


module.exports = () => {
    const router = express.Router();

    router.get("/", getProducts);

    router.post("/", postProductsToDb);

    router.get("/write", writeProductsToCsv);

    return router;
};