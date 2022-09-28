const writeData = require('./writeToCsv');

exports.getProducts = function ({sequelize, products}) {
    return ((req, res) => {
        products.findAndCountAll().then(result => {
            res.send({
                status: 200,
                data: result.rows.map(item => item.dataValues),
                count: result.count
            });
            }).catch((error) => {
                console.error('Failed to retrieve data : ', error);
            });
    });
};

exports.postProductsToDb = (req, res) => {
    console.log(req)
    res.send("NOT IMPLEMENTED: postProductsToDb");
};

exports.writeProductsToCsv = function(sequelizeData) {
    return ((req, res) => {
        return writeData(sequelizeData, req, res)
    });
}




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