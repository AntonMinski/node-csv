import { myDataSource } from "../../db"
import { Product } from "../entity/product.entity";
const writeData = require('./writeToCsv');

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

exports.getProducts = async (req, res) => {

    if (!dataSourceInitialised) await initDataSources();
    try {
        const products = await myDataSource.getRepository(Product).find()
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('error fetching Data:', err)
    }

};

exports.postProductsToDb = async (req, res) => {

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