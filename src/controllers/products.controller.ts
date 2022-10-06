const express = require("express");
const router = express.Router();
const { myDataSource } = require("../../db");
const { Product } = require("../entity/product.entity");
const writeToCsvStream = require("../services/writeToCsv.service");

let dataSourceInitialised = false;
function initDataSources() {
    return myDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
            dataSourceInitialised = true;
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        });
}

async function getProducts(req, res) {
    if (!dataSourceInitialised) await initDataSources();

    try {
        const products = await myDataSource.getRepository(Product).find()
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('error fetching Data:', err)
    }

};

async function postProductsToDb(req, res) {
    if (!dataSourceInitialised) await initDataSources();

    try {
        const product = await myDataSource.getRepository(Product).create({
            title: "Dell e5570",
            class: "office",
            manufacturer: "Dell",
            country: "USA",
            release_year: 2016,
            price: 8000
        })
        const results = await myDataSource.getRepository(Product).save(product)
        return res.send(results)
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('error saving to DB:', err)
    }
};

async function writeDataToCsv(req, res) {
    if (!dataSourceInitialised) await initDataSources();

    res.setHeader('Content-disposition', 'attachment; filename=result.csv');
    res.setHeader('Content-type', 'text/csv');

    const stream = await writeToCsvStream(myDataSource, Product, req.query)

    stream
        .pipe(res)

    stream
        .on('data', (data) => {
            console.log('data', data);
        })
        .on('error', (error) => {
            console.error('Failed to retrieve data :', error)
            res.send(error);
        })
        .on('end', () => {
            console.log('end');
            res.status(200).end();
        })
}


router.get("/", getProducts);

router.post("/", postProductsToDb);

router.get("/write", writeDataToCsv);

module.exports = router;





// ADD ITEMS
// products.create(
//     {
//         title: "Samsung S8",
//         class: "high",
//         manufacturer: "Samsung",
//         country: "South Korea",
//         release_date: "2018-03-15",
//         price: 7500,
//     }).then(res => {
//     console.log(res)
// }).catch((error) => {
//     console.error('Failed to create a new record : ', error);
// });

// DELETE
// products.destroy({
//     where: {
//         id: 5
//     }
// }).then(() => {
//     console.log("Successfully deleted record.")
// }).catch((error) => {
//     console.error('Failed to delete record : ', error);
// });