const myDataSource = require("../db.ts");
const { Product } = require("../product.entity.ts");


const writeData = require('./writeToCsv');

exports.getProducts = async (req, res) => {

    myDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        });

    try {
        const products = await myDataSource.getRepository(Product).find()
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('error fetching Data:', err)
    }

};

exports.postProductsToDb = async (req, res) => {

    myDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        });

    try {
        const user = await myDataSource.getRepository(Product).create(req.body)
        const results = await myDataSource.getRepository(Product).save(user)
        return res.send(results)
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log('error saving to DB:', err)
    }
};

exports.writeProductsToCsv = (req, res) => {
    return writeData(0, req, res);
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