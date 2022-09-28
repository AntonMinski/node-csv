const express = require("express");

const { getProducts, postProductsToDb, writeProductsToCsv } = require("./controller");


module.exports = (sequelizeData) => {
    const router = express.Router();

    router.get("/", getProducts(sequelizeData));

    router.post("/", postProductsToDb);

    router.get("/write", writeProductsToCsv(sequelizeData));

    return router;
};